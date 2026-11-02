// ============================================================
// SPACE EXPLORER — CINEMATIC RFID LOGIN SCREEN (FIRST SCREEN)
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

  // Background animated starfield
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

    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.2 + 0.05
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep space background gradient
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width * 0.8);
      bgGrad.addColorStop(0, '#0a1024');
      bgGrad.addColorStop(1, '#050814');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw and move stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(241, 245, 255, ${star.alpha})`;
        ctx.shadowBlur = star.radius * 4;
        ctx.shadowColor = '#3984FF';
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

  // Handle hardware RFID scans from parent
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
    <div className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center font-sans text-cosmos-text">
      {/* Background Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-cosmos-blue/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-cosmos-violet/10 blur-[130px] pointer-events-none" />

      {/* Top Header & Hardware Badge */}
      <header className="absolute top-8 left-8 right-8 flex items-center justify-between z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cosmos-blue to-cosmos-violet flex items-center justify-center shadow-cosmos-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider text-white">SPACE EXPLORER</h1>
            <p className="text-xs text-cosmos-muted tracking-widest font-mono">COSMOS 3D EXPERIENCE</p>
          </div>
        </div>

        {/* Hardware Status & Controller Connect */}
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-mono backdrop-blur-md ${
            controllerConnected 
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
              : 'bg-cosmos-subdark/80 border-cosmos-border text-cosmos-muted'
          }`}>
            <Cpu className={`w-3.5 h-3.5 ${controllerConnected ? 'text-emerald-400 animate-pulse' : 'text-cosmos-muted'}`} />
            <span>ESP32: {controllerConnected ? 'ONLINE (115200 BAUD)' : 'OFFLINE'}</span>
          </div>

          {!controllerConnected && onConnectHardware && (
            <button
              onClick={onConnectHardware}
              className="px-3.5 py-1.5 rounded-lg border border-cosmos-blue/40 bg-cosmos-blue/15 hover:bg-cosmos-blue/30 text-cosmos-blue text-xs font-medium transition flex items-center space-x-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Connect ESP32 USB</span>
            </button>
          )}

          <button
            onClick={() => setShowAdminModal(true)}
            className="px-3 py-1.5 rounded-lg border border-cosmos-border bg-cosmos-subdark/60 hover:bg-cosmos-subdark text-cosmos-muted hover:text-white text-xs font-medium transition flex items-center space-x-1"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </button>
        </div>
      </header>

      {/* Main RFID Login Center Panel */}
      <main className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center">
        {/* Pulsing RFID Radar Scanner Graphic */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className={`absolute w-44 h-44 rounded-full border border-cosmos-blue/20 ${isScanning ? 'animate-ping' : 'animate-pulse'}`} />
          <div className="absolute w-36 h-36 rounded-full border border-cosmos-violet/30" />
          <div className="absolute w-28 h-28 rounded-full border border-cosmos-cyan/40" />

          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cosmos-card to-cosmos-subdark border border-cosmos-blue/40 flex items-center justify-center shadow-cosmos-glow">
            <Radio className={`w-10 h-10 text-cosmos-blue ${isScanning ? 'animate-bounce text-cosmos-cyan' : ''}`} />
          </div>
        </div>

        {/* Title and Cinematic Prompt */}
        <h2 className="text-3xl font-extrabold tracking-wide text-white mb-2 text-center">
          SCAN YOUR RFID CARD
        </h2>
        <p className="text-sm text-cosmos-muted text-center max-w-sm mb-6 leading-relaxed">
          Place your physical student RFID badge near the reader to begin your journey through the cosmos.
        </p>

        {/* Status Feedback Messages */}
        {errorMessage && (
          <div className="w-full mb-4 px-4 py-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center space-x-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="w-full mb-4 px-4 py-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center space-x-2.5">
            <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Manual UID Entry & Registered Card Quick-Select for Exhibition Backup */}
        <div className="w-full glass-panel p-5 rounded-2xl shadow-xl space-y-4">
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
                className="w-full pl-9 pr-3 py-2.5 bg-cosmos-subdark/90 border border-cosmos-border rounded-xl text-xs font-mono text-white placeholder-cosmos-muted/60 focus:outline-none focus:border-cosmos-blue transition"
              />
            </div>
            <button
              type="submit"
              disabled={isScanning || !manualUid.trim()}
              className="px-4 py-2.5 rounded-xl bg-cosmos-blue hover:bg-blue-600 disabled:opacity-40 text-white text-xs font-semibold flex items-center space-x-1.5 transition shadow-cosmos-glow shrink-0"
            >
              <span>Verify</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick-select chips for verified registered exhibition cards */}
          <div className="pt-2 border-t border-cosmos-border/50">
            <div className="flex items-center justify-between text-[11px] text-cosmos-muted mb-2">
              <span>Verified Exhibition Badges:</span>
              <span className="font-mono text-cosmos-blue">Click to Test</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleAuthenticate('F7 10 A3 85')}
                className="px-2.5 py-1 rounded-lg bg-cosmos-subdark hover:bg-cosmos-blue/20 border border-cosmos-border text-[11px] text-slate-300 font-mono transition"
              >
                Kanishkk (F7 10 A3 85)
              </button>
              <button
                type="button"
                onClick={() => handleAuthenticate('04 A1 B2 C3')}
                className="px-2.5 py-1 rounded-lg bg-cosmos-subdark hover:bg-cosmos-blue/20 border border-cosmos-border text-[11px] text-slate-300 font-mono transition"
              >
                Mateo (04 A1 B2 C3)
              </button>
              <button
                type="button"
                onClick={() => handleAuthenticate('04 D4 E5 F6')}
                className="px-2.5 py-1 rounded-lg bg-cosmos-subdark hover:bg-cosmos-blue/20 border border-cosmos-border text-[11px] text-slate-300 font-mono transition"
              >
                Lucía (04 D4 E5 F6)
              </button>
            </div>
          </div>
        </div>

        {/* Clearly Labelled Demo Mode Action */}
        <div className="mt-6 flex flex-col items-center space-y-2">
          <button
            onClick={handleDemoLogin}
            disabled={isScanning}
            className="px-6 py-2.5 rounded-xl border border-cosmos-violet/50 bg-gradient-to-r from-cosmos-violet/20 to-cosmos-blue/20 hover:from-cosmos-violet/30 hover:to-cosmos-blue/30 text-white text-xs font-semibold tracking-wide flex items-center space-x-2 transition shadow-violet-glow"
          >
            <Sparkles className="w-4 h-4 text-cosmos-violet" />
            <span>ENTER DEMO MODE (NO HARDWARE)</span>
          </button>
          <p className="text-[11px] text-cosmos-muted/80">
            Allows visitors to test all 3D features, planetarium, and quizzes with simulated controls.
          </p>
        </div>
      </main>

      {/* Footer Exhibition Notice */}
      <footer className="absolute bottom-6 text-center text-xs text-cosmos-muted/60 font-mono tracking-wider z-10">
        SPACE EXPLORER DIGITAL PLANETARIUM • COLLEGE EXHIBITION EDITION • 2026
      </footer>

      {/* Admin Management Modal */}
      {showAdminModal && (
        <AdminModal onClose={() => setShowAdminModal(false)} />
      )}
    </div>
  );
};
