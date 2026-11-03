// ============================================================
// SPACE EXPLORER — ESP32 CONTROLLER INTEGRATION & TELEMETRY
// Web Serial & WebSocket Bridge with dual-format JSON decoder
// ============================================================

import { ControllerEvent, ControllerButton, JoystickPayload, IMUPayload } from '@/types/cosmos';
import { normalizeUID } from '@/systems/auth/AuthManager';

export type ControllerListener = (event: ControllerEvent) => void;

export class CosmosControllerManager {
  private static instance: CosmosControllerManager;
  private port: SerialPort | null = null;
  private reader: ReadableStreamDefaultReader<string> | null = null;
  private ws: WebSocket | null = null;
  private isConnected: boolean = false;
  private isReading: boolean = false;
  private buffer: string = '';
  private listeners: Set<ControllerListener> = new Set();
  private lastJoystickEmit: number = 0;
  private readonly JOYSTICK_INTERVAL_MS = 50;

  private constructor() {
    // Listen for OS USB disconnection
    if (typeof navigator !== 'undefined' && 'serial' in navigator) {
      (navigator.serial as unknown as EventTarget).addEventListener('disconnect', (event: any) => {
        if (event.port === this.port) {
          this.handleDisconnect();
        }
      });
    }

    // Attempt automatic local WebSocket telemetry link if server is present
    this.initWebSocketFallback();
  }

  public static getInstance(): CosmosControllerManager {
    if (!CosmosControllerManager.instance) {
      CosmosControllerManager.instance = new CosmosControllerManager();
    }
    return CosmosControllerManager.instance;
  }

  private initWebSocketFallback(): void {
    if (typeof window === 'undefined') return;
    try {
      const wsUrl = `ws://${window.location.hostname}:81`;
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.isConnected = true;
        this.emit({ type: 'connected' });
      };

      this.ws.onmessage = (event) => {
        this.processLine(event.data);
      };

      this.ws.onclose = () => {
        if (!this.port) {
          this.isConnected = false;
          this.emit({ type: 'disconnected' });
        }
      };

      this.ws.onerror = () => {
        // Silent fallback to Web Serial
      };
    } catch {
      // Offline/Web Serial mode
    }
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
      const type = data.type;
      if (!type) return;

      // 1. RFID Event (supporting both {"type":"rfid", "uid":"..."} and {"type":"rfid_scan", "payload":{"uid":"..."}})
      if (type === 'rfid' || type === 'rfid_scan') {
        const rawUid = data.uid || data.payload?.uid;
        if (rawUid) {
          const norm = normalizeUID(rawUid);
          this.emit({
            type: 'rfid_scan',
            payload: { uid: norm }
          });
        }
      } 
      // 2. Joystick Event (supporting {"type":"joystick", "x":..., "y":...} and nested payload)
      else if (type === 'joystick' || type === 'joystick_input') {
        const rawX = data.x !== undefined ? data.x : data.payload?.x;
        const rawY = data.y !== undefined ? data.y : data.payload?.y;
        const btn = data.button !== undefined ? data.button : (data.payload?.button || false);

        const now = Date.now();
        if (now - this.lastJoystickEmit > this.JOYSTICK_INTERVAL_MS) {
          this.lastJoystickEmit = now;
          this.emit({
            type: 'joystick_input',
            payload: {
              x: Number(rawX),
              y: Number(rawY),
              button: Boolean(btn)
            } as JoystickPayload
          });
        }
      } 
      // 3. Button Press Event (supporting {"type":"button", "name":"..."} and {"type":"button_press", "payload":{"button":"..."}})
      else if (type === 'button' || type === 'button_press') {
        const rawBtn = (data.name || data.payload?.button || '').toLowerCase();
        let normalizedBtn: ControllerButton = 'select';

        if (rawBtn.includes('back')) normalizedBtn = 'back';
        else if (rawBtn.includes('map') || rawBtn.includes('action')) normalizedBtn = 'action';
        else if (rawBtn.includes('journal') || rawBtn.includes('pause')) normalizedBtn = 'pause';
        else normalizedBtn = 'select';

        this.emit({
          type: 'button_press',
          payload: { button: normalizedBtn }
        });
      } 
      // 4. IMU Gyro Data Event
      else if (type === 'imu' || type === 'imu_data') {
        const p = data.pitch !== undefined ? data.pitch : data.payload?.pitch;
        const r = data.roll !== undefined ? data.roll : data.payload?.roll;
        const y = data.yaw !== undefined ? data.yaw : (data.payload?.yaw || 0);

        this.emit({
          type: 'imu_data',
          payload: { pitch: Number(p), roll: Number(r), yaw: Number(y) } as IMUPayload
        });
      }
    } catch {
      // Non-fatal parse warning
    }
  }

  public async sendTelemetryToESP32(type: 'auth_success' | 'auth_failed' | 'display_update', payload: any): Promise<void> {
    const msg = JSON.stringify({ type, payload }) + '\n';

    // 1. Send via Web Serial if active
    if (this.port && this.port.writable) {
      try {
        const encoder = new TextEncoder();
        const writer = this.port.writable.getWriter();
        await writer.write(encoder.encode(msg));
        writer.releaseLock();
      } catch (err) {
        console.error('Serial telemetry send error:', err);
      }
    }

    // 2. Send via WebSocket if active
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(msg);
      } catch (err) {
        console.error('WebSocket telemetry send error:', err);
      }
    }
  }

  private handleDisconnect(): void {
    this.isConnected = false;
    this.port = null;
    this.reader = null;
    this.emit({ type: 'disconnected' });
  }
}
