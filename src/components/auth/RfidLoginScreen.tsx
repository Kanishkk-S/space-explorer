// ============================================================
// SPACE EXPLORER — CINEMATIC FULL-SCREEN RFID AUTHENTICATION
// High-tech planetarium radar, glowing pulse, hardware connection HUD
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import { AuthManager } from '@/systems/auth/AuthManager';
import { Radio, Cpu, ShieldCheck, Sparkles, AlertCircle, ArrowRight, UserCheck, Key, RefreshCw } from 'lucide-react';
import { AdminModal } from './AdminModal';

interface RfidLoginScreenProps {
  onLoginSuccess: () => void;
  controllerConnected?: boolean;
  onConnectHardware?: () => void;
  lastScannedUid?: string | null;
}

export const RfidLoginScreen: React.FC<RfidLoginScreenProps> = ({
  onLoginSuccess,
  controllerConnected = false,
  onConnectHardware,
  lastScannedUid
}) => {
  const auth = AuthManager.getInstance();
  const [manualUid, setManualUid] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Background animated deep space starfield
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.2,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.25 + 0.05
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deepest black to midnight navy gradient
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 40, width / 2, height / 2, width * 0.8);
      bgGrad.addColorStop(0, '#080E1C');
      bgGrad.addColorStop(1, '#03050B');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 246, 255, ${star.alpha})`;
        ctx.shadowBlur = star.radius * 5;
        ctx.shadowColor = '#5B8CFF';
        ctx.fill();

        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle hardware RFID scans from ESP32
  useEffect(() => {
    if (lastScannedUid) {
      handleAuthenticate(lastScannedUid);
    }
  }, [lastScannedUid]);

  const handleAuthenticate = (uidToTest: string) => {
    setIsScanning(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    setTimeout(() => {
      const res = auth.authenticateByUID(uidToTest);
      setIsScanning(false);
      if (res.success) {
        setSuccessMessage(res.message);
        setTimeout(() => {
          onLoginSuccess();
        }, 900);
      } else {
        setErrorMessage(res.message);
      }
    }, 450);
  };

  const handleDemoLogin = () => {
    setIsScanning(true);
    setTimeout(() => {
      auth.loginDemoMode();
      setSuccessMessage('Entering SPACE EXPLORER Demo Mode...');
      setTimeout(() => {
        onLoginSuccess();
      }, 600);
    }, 300);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center font-sans text-cosmos-white">
      {/* Background Starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Atmospheric Galactic Glows */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-cosmos-electric/15 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-cosmos-cyan/10 blur-[150px] pointer-events-none" />

      {/* Top Header & Hardware Diagnostics Capsule */}
      <header className="absolute top-8 left-8 right-8 flex items-center justify-between z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cosmos-electric via-cosmos-violet to-cosmos-cyan flex items-center justify-center shadow-cyan-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-wider font-display text-white">SPACE EXPLORER</h1>
            <p className="text-[10px] text-cosmos-cyan tracking-widest font-mono">DIGITAL PLANETARIUM</p>
          </div>
        </div>

        {/* Hardware Status Capsule */}
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-mono border backdrop-blur-xl ${
            controllerConnected 
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 shadow-sm' 
              : 'hud-panel text-cosmos-muted'
          }`}>
            <Cpu className={`w-3.5 h-3.5 ${controllerConnected ? 'text-emerald-400 animate-pulse' : 'text-cosmos-muted'}`} />
            <span>ESP32: {controllerConnected ? 'ONLINE (115200 BAUD)' : 'OFFLINE'}</span>
          </div>

          {!controllerConnected && onConnectHardware && (
            <button
              onClick={onConnectHardware}
              className="px-4 py-1.5 rounded-full border border-cosmos-cyan/40 bg-cosmos-cyan/15 hover:bg-cosmos-cyan/30 text-cosmos-cyan text-xs font-mono font-medium transition flex items-center space-x-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Connect ESP32 USB</span>
            </button>
          )}

          <button
            onClick={() => setShowAdminModal(true)}
            className="px-4 py-1.5 rounded-full hud-panel border border-cosmos-border hover:border-white/30 text-cosmos-muted hover:text-white text-xs font-medium transition flex items-center space-x-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </button>
        </div>
      </header>

      {/* Main RFID Radar Center Stage */}
      <main className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center">
        {/* Pulsing Concentric Radar Rings */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className={`absolute w-52 h-52 rounded-full border border-cosmos-electric/20 ${isScanning ? 'animate-ping' : 'animate-pulse'}`} />
          <div className="absolute w-40 h-40 rounded-full border border-cosmos-violet/30" />
          <div className="absolute w-28 h-28 rounded-full border border-cosmos-cyan/40" />

          <div className="w-20 h-20 rounded-3xl hud-panel-glow flex items-center justify-center shadow-cyan-glow">
            <Radio className={`w-9 h-9 text-cosmos-cyan ${isScanning ? 'animate-bounce text-white' : ''}`} />
          </div>
        </div>

        {/* Heading & Cinematic Prompt */}
        <h2 className="text-3xl sm:text-4xl font-black font-display tracking-wide text-white mb-2 text-center">
          SCAN YOUR RFID CARD
        </h2>
        <p className="text-xs sm:text-sm text-cosmos-muted text-center max-w-sm mb-6 leading-relaxed">
          Place your student badge near the RC522 reader to authenticate your session and unlock the cosmos.
        </p>

        {/* Status Feedback Alerts */}
        {errorMessage && (
          <div className="w-full mb-4 px-4 py-3 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center space-x-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="w-full mb-4 px-4 py-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center space-x-2.5">
            <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Manual Fallback & Simulation Card Entry */}
        <div className="w-full hud-panel p-6 rounded-3xl border border-cosmos-border shadow-2xl space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (manualUid) handleAuthenticate(manualUid);
            }}
            className="flex items-center space-x-2"
          >
            <div className="relative flex-1">
              <Key className="w-4 h-4 text-cosmos-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="RFID UID (e.g. F7 10 A3 85)"
                value={manualUid}
                onChange={(e) => setManualUid(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-black/60 border border-cosmos-border rounded-full text-xs font-mono text-white placeholder-cosmos-muted focus:outline-none focus:border-cosmos-cyan transition"
              />
            </div>
            <button
              type="submit"
              disabled={isScanning || !manualUid.trim()}
              className="px-5 py-2.5 rounded-full bg-cosmos-electric hover:bg-blue-600 disabled:opacity-40 text-white text-xs font-semibold flex items-center space-x-1.5 transition shadow-cyan-glow shrink-0"
            >
              <span>Verify</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick-test verified registered student badges */}
          <div className="pt-3 border-t border-cosmos-border/40">
            <div className="flex items-center justify-between text-[11px] text-cosmos-muted mb-2 font-mono">
              <span>Verified Exhibition Badges:</span>
              <span className="text-cosmos-cyan">Click to test</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleAuthenticate('F7 10 A3 85')}
                className="px-3 py-1 rounded-full hud-panel hover:border-cosmos-cyan border border-cosmos-border text-[11px] text-white font-mono transition"
              >
                Kanishkk (F7 10 A3 85)
              </button>
              <button
                type="button"
                onClick={() => handleAuthenticate('04 A1 B2 C3')}
                className="px-3 py-1 rounded-full hud-panel hover:border-cosmos-cyan border border-cosmos-border text-[11px] text-white font-mono transition"
              >
                Mateo (04 A1 B2 C3)
              </button>
              <button
                type="button"
                onClick={() => handleAuthenticate('04 D4 E5 F6')}
                className="px-3 py-1 rounded-full hud-panel hover:border-cosmos-cyan border border-cosmos-border text-[11px] text-white font-mono transition"
              >
                Lucía (04 D4 E5 F6)
              </button>
            </div>
          </div>
        </div>

        {/* Demo Mode Action Capsule */}
        <div className="mt-6 flex flex-col items-center space-y-2">
          <button
            onClick={handleDemoLogin}
            disabled={isScanning}
            className="px-6 py-2.5 rounded-full border border-cosmos-violet/60 bg-gradient-to-r from-cosmos-violet/25 to-cosmos-electric/25 hover:from-cosmos-violet/35 hover:to-cosmos-electric/35 text-white text-xs font-semibold tracking-wider transition shadow-violet-glow flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-cosmos-cyan" />
            <span>ENTER DEMO MODE (SIMULATE HARDWARE)</span>
          </button>
          <p className="text-[11px] text-cosmos-muted/80 font-mono">
            Full keyboard, mouse & simulated sensor controls enabled.
          </p>
        </div>
      </main>

      {/* Footer Exhibition Attribution */}
      <footer className="absolute bottom-6 text-center text-xs text-cosmos-muted/60 font-mono tracking-widest z-10">
        SPACE EXPLORER DIGITAL PLANETARIUM • COLLEGE EXHIBITION 2026
      </footer>

      {showAdminModal && (
        <AdminModal onClose={() => setShowAdminModal(false)} />
      )}
    </div>
  );
};
