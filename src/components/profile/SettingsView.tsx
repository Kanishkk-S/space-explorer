// ============================================================
// SPACE EXPLORER — SETTINGS & HARDWARE DIAGNOSTICS VIEW
// ============================================================

import React, { useState } from 'react';
import { AuthManager } from '@/systems/auth/AuthManager';
import { 
  User, 
  Cpu, 
  Sliders, 
  LogOut 
} from 'lucide-react';

interface SettingsViewProps {
  onLogout: () => void;
  controllerConnected?: boolean;
  onConnectHardware?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  onLogout,
  controllerConnected = false,
  onConnectHardware
}) => {
  const auth = AuthManager.getInstance();
  const student = auth.getCurrentStudent();

  const [tiltEnabled, setTiltEnabled] = useState(true);
  const [audioFeedback, setAudioFeedback] = useState(true);

  return (
    <div className="w-full h-full flex flex-col font-sans text-cosmos-text p-6 overflow-hidden">
      <div className="mb-6 shrink-0">
        <span className="text-xs font-mono tracking-widest text-cosmos-cyan uppercase">SYSTEM & PROFILE</span>
        <h2 className="text-2xl font-black text-white">Settings & Diagnostics</h2>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto pr-2">
        {/* Student Profile Card */}
        <div className="glass-panel rounded-2xl border border-cosmos-border p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-3 pb-3 border-b border-cosmos-border">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cosmos-blue to-cosmos-violet flex items-center justify-center text-white shadow-cosmos-glow">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{student?.name}</h3>
              <span className="text-xs font-mono text-cosmos-cyan">{student?.role}</span>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-cosmos-subdark/80">
              <span className="text-cosmos-muted">STUDENT ID</span>
              <span className="text-white">{student?.id}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-cosmos-subdark/80">
              <span className="text-cosmos-muted">RFID CARD UID</span>
              <span className="text-cosmos-blue font-bold">{student?.rfidUid}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-cosmos-subdark/80">
              <span className="text-cosmos-muted">REGISTRATION DATE</span>
              <span className="text-white">{student?.registeredAt}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-cosmos-subdark/80">
              <span className="text-cosmos-muted">ACCOUNT MODE</span>
              <span className={`px-2 py-0.5 rounded text-[10px] ${
                student?.isDemo ? 'bg-amber-950 text-amber-300' : 'bg-emerald-950 text-emerald-300'
              }`}>
                {student?.isDemo ? 'DEMO SIMULATION' : 'PHYSICAL RFID AUTH'}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onLogout}
              className="w-full py-2.5 rounded-xl bg-red-950/60 border border-red-500/40 hover:bg-red-900/60 text-red-200 text-xs font-semibold flex items-center justify-center space-x-2 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>LOGOUT OF SESSION</span>
            </button>
          </div>
        </div>

        {/* Physical Hardware Diagnostics Card */}
        <div className="glass-panel rounded-2xl border border-cosmos-border p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cosmos-border">
            <div className="flex items-center space-x-2.5">
              <Cpu className="w-5 h-5 text-cosmos-cyan" />
              <h3 className="font-bold text-white text-base">ESP32 Hardware Diagnostics</h3>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${
              controllerConnected 
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' 
                : 'bg-cosmos-subdark border-cosmos-border text-cosmos-muted'
            }`}>
              {controllerConnected ? 'ONLINE (115200)' : 'OFFLINE'}
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60 flex items-center justify-between">
              <span className="text-cosmos-muted">ST7735 1.8" SPI TFT</span>
              <span className="text-emerald-400">GPIO 5, 27, 4, 18, 23 (VSPI)</span>
            </div>

            <div className="p-3 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60 flex items-center justify-between">
              <span className="text-cosmos-muted">RC522 RFID SPI</span>
              <span className="text-emerald-400">GPIO 16, 17, 19, 18, 23</span>
            </div>

            <div className="p-3 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60 flex items-center justify-between">
              <span className="text-cosmos-muted">MPU6050 Gyroscope</span>
              <span className="text-emerald-400">GPIO 21 (SDA), 22 (SCL)</span>
            </div>

            <div className="p-3 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60 flex items-center justify-between">
              <span className="text-cosmos-muted">KY-023 Joystick</span>
              <span className="text-emerald-400">GPIO 34 (VRx), 35 (VRy), 33 (SW)</span>
            </div>

            <div className="p-3 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60 flex items-center justify-between">
              <span className="text-cosmos-muted">Pushbuttons (4)</span>
              <span className="text-emerald-400">GPIO 25, 26, 14, 32</span>
            </div>

            <div className="p-3 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60 flex items-center justify-between">
              <span className="text-cosmos-muted">LEDs & Piezo Buzzer</span>
              <span className="text-emerald-400">GPIO 13 (G), 15 (R), 2 (Tone)</span>
            </div>
          </div>

          {!controllerConnected && onConnectHardware && (
            <button
              onClick={onConnectHardware}
              className="w-full py-2.5 rounded-xl border border-cosmos-blue/50 bg-cosmos-blue/20 hover:bg-cosmos-blue/30 text-white text-xs font-semibold flex items-center justify-center space-x-2 transition"
            >
              <Cpu className="w-4 h-4 text-cosmos-cyan" />
              <span>Connect Physical Controller (Web Serial)</span>
            </button>
          )}
        </div>

        {/* Display & Interaction Preferences */}
        <div className="glass-panel rounded-2xl border border-cosmos-border p-6 shadow-xl space-y-4 md:col-span-2">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-cosmos-border">
            <Sliders className="w-5 h-5 text-cosmos-violet" />
            <h3 className="font-bold text-white text-base">Interaction & Exhibition Preferences</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-white mb-1">MPU6050 Gyro Tilt Navigation</h4>
                <p className="text-[11px] text-cosmos-muted">Allow physical controller tilting to tilt the 3D planetarium camera.</p>
              </div>
              <button
                onClick={() => setTiltEnabled(!tiltEnabled)}
                className={`mt-3 py-1.5 px-3 rounded-lg text-xs font-mono font-semibold transition ${
                  tiltEnabled ? 'bg-emerald-950 border border-emerald-500 text-emerald-300' : 'bg-cosmos-card border border-cosmos-border text-cosmos-muted'
                }`}
              >
                {tiltEnabled ? 'TILT CONTROLS ON' : 'DISABLED'}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-white mb-1">Acoustic Tone Feedback</h4>
                <p className="text-[11px] text-cosmos-muted">Piezo buzzer tones on card scans and button presses.</p>
              </div>
              <button
                onClick={() => setAudioFeedback(!audioFeedback)}
                className={`mt-3 py-1.5 px-3 rounded-lg text-xs font-mono font-semibold transition ${
                  audioFeedback ? 'bg-emerald-950 border border-emerald-500 text-emerald-300' : 'bg-cosmos-card border border-cosmos-border text-cosmos-muted'
                }`}
              >
                {audioFeedback ? 'BUZZER ACTIVE' : 'MUTED'}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-white mb-1">Three.js Graphics Profile</h4>
                <p className="text-[11px] text-cosmos-muted">Optimized for college exhibition laptops at 60 FPS.</p>
              </div>
              <div className="mt-3 py-1.5 px-3 rounded-lg text-xs font-mono font-semibold bg-cosmos-card border border-cosmos-border text-cosmos-cyan text-center">
                HIGH RESOLUTION 60FPS
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
