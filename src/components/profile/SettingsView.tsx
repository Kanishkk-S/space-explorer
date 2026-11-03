// ============================================================
// SPACE EXPLORER — SETTINGS & HARDWARE DIAGNOSTICS VIEW
// Interactive configuration, live hardware telemetry, and preferences
// ============================================================

import React, { useState, useEffect } from 'react';
import { AuthManager } from '@/systems/auth/AuthManager';
import { 
  User, 
  Cpu, 
  Sliders, 
  LogOut,
  Volume2,
  VolumeX,
  Compass,
  RotateCcw,
  CheckCircle,
  Sparkles
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

  // Load preferences from localStorage
  const [tiltEnabled, setTiltEnabled] = useState<boolean>(() => {
    return localStorage.getItem('cosmos_tilt_enabled') !== 'false';
  });

  const [audioFeedback, setAudioFeedback] = useState<boolean>(() => {
    return localStorage.getItem('cosmos_audio_enabled') !== 'false';
  });

  const [graphicsQuality, setGraphicsQuality] = useState<'ultra' | 'balanced' | 'performance'>(() => {
    return (localStorage.getItem('cosmos_graphics_quality') as any) || 'ultra';
  });

  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    localStorage.setItem('cosmos_tilt_enabled', tiltEnabled.toString());
    localStorage.setItem('cosmos_audio_enabled', audioFeedback.toString());
    localStorage.setItem('cosmos_graphics_quality', graphicsQuality);
    setSavedNotice(true);
    const t = setTimeout(() => setSavedNotice(false), 1500);
    return () => clearTimeout(t);
  }, [tiltEnabled, audioFeedback, graphicsQuality]);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to reset your exploration progress and bookmarks?')) {
      if (student) {
        student.bookmarks = [];
        student.exploredObjects = [];
        auth.saveStudentProfile(student);
        window.location.reload();
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col font-sans text-cosmos-text p-6 overflow-hidden select-none">
      <div className="mb-6 shrink-0 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono tracking-widest text-cosmos-cyan uppercase block font-bold">
            CONFIGURATION & EXHIBITION TELEMETRY
          </span>
          <h2 className="text-2xl font-black text-white">System Settings & Controller</h2>
        </div>

        {savedNotice && (
          <div className="hud-panel px-3.5 py-1.5 rounded-full border border-emerald-500/40 text-emerald-400 text-xs font-mono flex items-center space-x-1.5 shadow-lg animate-fade-in">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Preferences Auto-Saved</span>
          </div>
        )}
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto pr-2 pb-6">
        {/* Student Profile Card */}
        <div className="hud-panel rounded-3xl border border-cosmos-border p-6 shadow-2xl space-y-4 backdrop-blur-2xl">
          <div className="flex items-center space-x-3 pb-3 border-b border-cosmos-border/50">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cosmos-electric via-cosmos-violet to-cosmos-cyan flex items-center justify-center text-white shadow-cyan-glow">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display">{student?.name}</h3>
              <span className="text-xs font-mono text-cosmos-cyan uppercase tracking-wider">{student?.role}</span>
            </div>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-black/40 border border-white/5">
              <span className="text-cosmos-muted">STUDENT CADET ID</span>
              <span className="text-white font-bold">{student?.id}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-black/40 border border-white/5">
              <span className="text-cosmos-muted">AUTHENTICATED RFID UID</span>
              <span className="text-cosmos-cyan font-bold tracking-wider">{student?.rfidUid}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-black/40 border border-white/5">
              <span className="text-cosmos-muted">REGISTRATION DATE</span>
              <span className="text-white font-bold">{student?.registeredAt}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-black/40 border border-white/5">
              <span className="text-cosmos-muted">SECURITY CLEARANCE</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                student?.isDemo ? 'bg-amber-950/60 border-amber-500/40 text-amber-300' : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
              }`}>
                {student?.isDemo ? 'DEMO SIMULATION' : 'PHYSICAL RFID VERIFIED'}
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center space-x-2">
            <button
              onClick={handleClearHistory}
              className="flex-1 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-cosmos-muted hover:text-white text-xs font-mono transition flex items-center justify-center space-x-2"
              title="Reset bookmarked celestial objects"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Portfolio</span>
            </button>
            <button
              onClick={onLogout}
              className="flex-1 py-2.5 rounded-full bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-300 text-xs font-mono transition flex items-center justify-center space-x-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>

        {/* Physical Hardware Diagnostics Card */}
        <div className="hud-panel rounded-3xl border border-cosmos-border p-6 shadow-2xl space-y-4 backdrop-blur-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-cosmos-border/50">
            <div className="flex items-center space-x-2.5">
              <Cpu className="w-5 h-5 text-cosmos-cyan" />
              <h3 className="font-bold text-white text-base font-display">ESP32 Hardware Diagnostics</h3>
            </div>
            <span className={`px-3 py-0.5 rounded-full text-[10px] font-mono border font-bold ${
              controllerConnected 
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 shadow-sm' 
                : 'bg-black/40 border-white/10 text-cosmos-muted'
            }`}>
              {controllerConnected ? 'ONLINE (115200)' : 'STANDBY'}
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <div className="p-2.5 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
              <span className="text-cosmos-muted">ST7735 1.8" SPI TFT</span>
              <span className="text-emerald-400">GPIO 5, 27, 4, 18, 23 (VSPI)</span>
            </div>

            <div className="p-2.5 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
              <span className="text-cosmos-muted">RC522 RFID SPI</span>
              <span className="text-emerald-400">GPIO 16, 17, 19, 18, 23 (CS=16)</span>
            </div>

            <div className="p-2.5 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
              <span className="text-cosmos-muted">MPU6050 6-Axis IMU</span>
              <span className="text-emerald-400">GPIO 21 (SDA), 22 (SCL)</span>
            </div>

            <div className="p-2.5 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
              <span className="text-cosmos-muted">KY-023 Joystick</span>
              <span className="text-emerald-400">GPIO 34 (VRx), 35 (VRy), 33 (SW)</span>
            </div>

            <div className="p-2.5 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
              <span className="text-cosmos-muted">Physical Pushbuttons</span>
              <span className="text-emerald-400">GPIO 25, 26, 14, 32</span>
            </div>

            <div className="p-2.5 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
              <span className="text-cosmos-muted">Status LEDs & Buzzer</span>
              <span className="text-emerald-400">GPIO 13 (G), 15 (R), 2 (Tone)</span>
            </div>
          </div>

          {!controllerConnected && onConnectHardware && (
            <button
              onClick={onConnectHardware}
              className="w-full py-2.5 rounded-full border border-cosmos-cyan/50 bg-cosmos-cyan/20 hover:bg-cosmos-cyan/30 text-white text-xs font-mono font-bold flex items-center justify-center space-x-2 transition shadow-cyan-glow"
            >
              <Cpu className="w-4 h-4 text-cosmos-cyan" />
              <span>Connect Physical Controller (Web Serial)</span>
            </button>
          )}
        </div>

        {/* Display & Interaction Preferences */}
        <div className="hud-panel rounded-3xl border border-cosmos-border p-6 shadow-2xl space-y-4 md:col-span-2 backdrop-blur-2xl">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-cosmos-border/50">
            <Sliders className="w-5 h-5 text-cosmos-violet" />
            <h3 className="font-bold text-white text-base font-display">Interaction & Exhibition Preferences</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Tilt Control Toggle */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-white mb-1 flex items-center space-x-1.5">
                  <Compass className="w-3.5 h-3.5 text-cosmos-cyan" />
                  <span>MPU6050 Gyro Tilt Navigation</span>
                </h4>
                <p className="text-[11px] text-cosmos-muted leading-relaxed font-light">
                  Enables physical controller tilting to pan the 3D planetarium camera.
                </p>
              </div>
              <button
                onClick={() => setTiltEnabled(!tiltEnabled)}
                className={`mt-4 py-2 px-3 rounded-full text-xs font-mono font-bold transition flex items-center justify-center space-x-1.5 ${
                  tiltEnabled ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 shadow-sm' : 'bg-white/5 border border-white/10 text-cosmos-muted'
                }`}
              >
                <span>{tiltEnabled ? 'TILT CONTROLS ACTIVE' : 'DISABLED'}</span>
              </button>
            </div>

            {/* Audio Feedback Toggle */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-white mb-1 flex items-center space-x-1.5">
                  {audioFeedback ? <Volume2 className="w-3.5 h-3.5 text-cosmos-gold" /> : <VolumeX className="w-3.5 h-3.5 text-cosmos-muted" />}
                  <span>Acoustic Tone Feedback</span>
                </h4>
                <p className="text-[11px] text-cosmos-muted leading-relaxed font-light">
                  Plays tone arpeggios on card scans, navigation clicks, and quiz responses.
                </p>
              </div>
              <button
                onClick={() => setAudioFeedback(!audioFeedback)}
                className={`mt-4 py-2 px-3 rounded-full text-xs font-mono font-bold transition flex items-center justify-center space-x-1.5 ${
                  audioFeedback ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 shadow-sm' : 'bg-white/5 border border-white/10 text-cosmos-muted'
                }`}
              >
                <span>{audioFeedback ? 'ACOUSTIC AUDIO ON' : 'MUTED'}</span>
              </button>
            </div>

            {/* Graphics Quality Preset */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-white mb-1 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cosmos-cyan" />
                  <span>Three.js Visual Quality</span>
                </h4>
                <p className="text-[11px] text-cosmos-muted leading-relaxed font-light">
                  Tailored for exhibition laptops at high refresh rates.
                </p>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-1 p-1 rounded-full bg-black/60 border border-white/10 font-mono text-[10px]">
                {(['performance', 'balanced', 'ultra'] as const).map((q) => (
                  <button
                    key={q}
                    onClick={() => setGraphicsQuality(q)}
                    className={`py-1.5 rounded-full capitalize transition ${
                      graphicsQuality === q ? 'bg-cosmos-cyan text-black font-bold' : 'text-cosmos-muted hover:text-white'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
