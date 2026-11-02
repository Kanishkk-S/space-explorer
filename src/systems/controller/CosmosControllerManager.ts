// ============================================================
// SPACE EXPLORER — ESP32 CONTROLLER INTEGRATION & TELEMETRY
// Web Serial & WebSocket Bridge for Hardware Controller
// ============================================================

import { ControllerEvent, ControllerButton, JoystickPayload, IMUPayload } from '@/types/cosmos';
import { normalizeUID } from '@/systems/auth/AuthManager';

export type ControllerListener = (event: ControllerEvent) => void;

export class CosmosControllerManager {
  private static instance: CosmosControllerManager;
  private port: SerialPort | null = null;
  private reader: ReadableStreamDefaultReader<string> | null = null;
  private isConnected: boolean = false;
  private isReading: boolean = false;
  private buffer: string = '';
  private listeners: Set<ControllerListener> = new Set();
  private lastJoystickEmit: number = 0;
  private readonly JOYSTICK_INTERVAL_MS = 60;

  private constructor() {
    // Listen for OS USB disconnection
    if (typeof navigator !== 'undefined' && 'serial' in navigator) {
      (navigator.serial as unknown as EventTarget).addEventListener('disconnect', (event: any) => {
        if (event.port === this.port) {
          this.handleDisconnect();
        }
      });
    }
  }

  public static getInstance(): CosmosControllerManager {
    if (!CosmosControllerManager.instance) {
      CosmosControllerManager.instance = new CosmosControllerManager();
    }
    return CosmosControllerManager.instance;
  }

  public subscribe(callback: ControllerListener): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private emit(event: ControllerEvent): void {
    this.listeners.forEach(cb => cb(event));
  }

  public getIsConnected(): boolean {
    return this.isConnected;
  }

  public async requestConnection(): Promise<boolean> {
    if (typeof navigator === 'undefined' || !('serial' in navigator)) {
      console.warn('Web Serial API is not supported in this browser environment.');
      return false;
    }

    try {
      const serial = (navigator as any).serial;
      this.port = await serial.requestPort();
      await this.port!.open({ baudRate: 115200 });

      this.isConnected = true;
      this.emit({ type: 'connected' });

      // Start text decoder stream
      const textDecoder = new TextDecoderStream();
      this.port!.readable?.pipeTo(textDecoder.writable as any).catch(() => {});
      this.reader = textDecoder.readable.getReader();

      this.startReading();
      return true;
    } catch (err) {
      console.error('Failed to open Web Serial connection:', err);
      this.handleDisconnect();
      return false;
    }
  }

  private async startReading(): Promise<void> {
    if (!this.reader || this.isReading) return;
    this.isReading = true;

    try {
      while (this.isConnected && this.reader) {
        const { value, done } = await this.reader.read();
        if (done) break;
        if (value) {
          this.buffer += value;
          const lines = this.buffer.split('\n');
          this.buffer = lines.pop() || '';

          for (const line of lines) {
            this.processLine(line.trim());
          }
        }
      }
    } catch (e) {
      console.error('Serial read error:', e);
    } finally {
      this.isReading = false;
      this.handleDisconnect();
    }
  }

  private processLine(rawLine: string): void {
    if (!rawLine || !rawLine.startsWith('{')) return;

    try {
      const data = JSON.parse(rawLine);
      if (!data.type) return;

      if (data.type === 'rfid_scan' && data.payload?.uid) {
        this.emit({
          type: 'rfid_scan',
          payload: { uid: normalizeUID(data.payload.uid) }
        });
      } else if (data.type === 'joystick_input' && data.payload) {
        const now = Date.now();
        if (now - this.lastJoystickEmit > this.JOYSTICK_INTERVAL_MS) {
          this.lastJoystickEmit = now;
          this.emit({
            type: 'joystick_input',
            payload: data.payload as JoystickPayload
          });
        }
      } else if (data.type === 'button_press' && data.payload?.button) {
        this.emit({
          type: 'button_press',
          payload: { button: data.payload.button as ControllerButton }
        });
      } else if (data.type === 'imu_data' && data.payload) {
        this.emit({
          type: 'imu_data',
          payload: data.payload as IMUPayload
        });
      }
    } catch {
      // Invalid JSON fragment
    }
  }

  public async sendTelemetryToESP32(type: 'auth_success' | 'auth_failed' | 'display_update', payload: any): Promise<void> {
    if (!this.isConnected || !this.port || !this.port.writable) return;

    try {
      const msg = JSON.stringify({ type, payload }) + '\n';
      const encoder = new TextEncoder();
      const writer = this.port.writable.getWriter();
      await writer.write(encoder.encode(msg));
      writer.releaseLock();
    } catch (err) {
      console.error('Failed to send telemetry to ESP32:', err);
    }
  }

  private handleDisconnect(): void {
    this.isConnected = false;
    this.port = null;
    this.reader = null;
    this.emit({ type: 'disconnected' });
  }
}
