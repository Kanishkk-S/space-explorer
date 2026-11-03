// ============================================================
// SPACE EXPLORER — CINEMATIC PLANETARIUM HUD NAVIGATION
// Modern, non-boxy floating HUD with telemetry status & mobile support
// ============================================================

import React, { useState } from 'react';
import { 
  Orbit, 
  Compass, 
  Sparkles, 
  GraduationCap, 
  Bookmark, 
  Settings, 
  BookOpen, 
  Home, 
  LogOut, 
  Cpu,
  Layers,
  Globe2,
  Menu,
  X
} from 'lucide-react';
import { StudentProfile } from '@/types/cosmos';

export type NavigationSection = 
  | 'overview'
  | 'solar_system'
  | 'planet_explorer'
  | 'universe_map'
  | 'deep_space'
  | 'knowledge'
  | 'academy'
  | 'discoveries'
  | 'settings';

interface PlanetariumNavProps {
  currentSection: NavigationSection;
  onSelectSection: (section: NavigationSection) => void;
  student: StudentProfile | null;
  onLogout: () => void;
  controllerConnected: boolean;
  onConnectHardware: () => void;
}

interface NavItem {
  id: NavigationSection;
  label: string;
  icon: any;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Cosmos', icon: Home },
  { id: 'solar_system', label: '3D Solar System', icon: Orbit, badge: '3D' },
  { id: 'planet_explorer', label: 'Planet Explorer', icon: Globe2 },
  { id: 'universe_map', label: 'Universe Map', icon: Layers, badge: 'Macro' },
  { id: 'deep_space', label: 'Deep Space', icon: Sparkles },
  { id: 'knowledge', label: 'Knowledge', icon: BookOpen },
  { id: 'academy', label: 'Academy', icon: GraduationCap },
  { id: 'discoveries', label: 'Discoveries', icon: Bookmark },
  { id: 'settings', label: 'System', icon: Settings },
];

export const PlanetariumNav: React.FC<PlanetariumNavProps> = ({
  currentSection,
  onSelectSection,
  student,
  onLogout,
  controllerConnected,
  onConnectHardware
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (section: NavigationSection) => {
    onSelectSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-3.5 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Identity / Planetarium Emblem */}
          <div 
            onClick={() => handleNavClick('overview')}
            className="pointer-events-auto cursor-pointer flex items-center space-x-3 group"
          >
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-cosmos-electric via-cosmos-violet to-cosmos-cyan p-px shadow-cyan-glow transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-2xl bg-[#080E1C] flex items-center justify-center">
                <Compass className="w-5 h-5 text-cosmos-cyan group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-extrabold tracking-wider font-display text-cosmos-white flex items-center space-x-2">
                <span>SPACE EXPLORER</span>
                <span className="hidden sm:inline-block text-[9px] font-mono tracking-widest text-cosmos-cyan font-bold bg-cosmos-cyan/15 px-2 py-0.5 rounded-full border border-cosmos-cyan/30">
                  PLANETARIUM
                </span>
              </h1>
              <p className="text-[9px] font-mono tracking-widest text-cosmos-muted uppercase">
                COSMOS 3D EXHIBITION
              </p>
            </div>
          </div>

          {/* Center Floating Glass HUD (Desktop & Tablet L) */}
          <nav className="pointer-events-auto hidden xl:flex items-center space-x-1 px-3 py-1.5 rounded-full hud-panel border border-cosmos-border shadow-2xl backdrop-blur-2xl">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center space-x-1.5 ${
                    isActive
                      ? 'text-cosmos-white bg-gradient-to-r from-cosmos-electric/30 via-cosmos-violet/30 to-cosmos-cyan/20 border border-cosmos-cyan/40 shadow-cyan-glow font-bold'
                      : 'text-cosmos-muted hover:text-cosmos-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cosmos-cyan' : 'text-cosmos-muted'}`} />
                  <span className="tracking-wide">{item.label}</span>
                  {item.badge && (
                    <span className="text-[8px] font-mono font-bold text-cosmos-cyan bg-cosmos-cyan/20 px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Status Capsule: ESP32 Hardware & Student */}
          <div className="pointer-events-auto flex items-center space-x-2 sm:space-x-3">
            {/* ESP32 Hardware Capsule */}
            <button
              onClick={onConnectHardware}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-mono border backdrop-blur-xl transition-all duration-300 shadow-lg ${
                controllerConnected
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-sm'
                  : 'hud-panel text-cosmos-muted hover:text-cosmos-white hover:border-cosmos-electric/40'
              }`}
              title={controllerConnected ? 'ESP32 Controller Connected via Web Serial' : 'Click to pair ESP32 USB controller'}
            >
              <Cpu className={`w-3.5 h-3.5 ${controllerConnected ? 'text-emerald-400 animate-pulse' : 'text-cosmos-muted'}`} />
              <span className="hidden md:inline">ESP32:</span>
              <span className={controllerConnected ? 'text-emerald-400 font-bold' : ''}>
                {controllerConnected ? 'ONLINE' : 'PAIR USB'}
              </span>
            </button>

            {/* Student Profile Capsule */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full hud-panel border border-cosmos-border shadow-lg">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cosmos-electric to-cosmos-violet flex items-center justify-center text-[11px] font-bold text-white shadow-sm shrink-0">
                {student?.name?.charAt(0) || 'E'}
              </div>
              <div className="hidden sm:block text-left">
                <span className="block text-xs font-semibold text-cosmos-white leading-none truncate max-w-[100px]">
                  {student?.name}
                </span>
                <span className="block text-[8px] font-mono text-cosmos-cyan leading-none mt-0.5">
                  {student?.isDemo ? 'DEMO' : student?.role || 'ASTRONOMER'}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="p-1 rounded-full text-cosmos-muted hover:text-red-400 transition ml-0.5"
                title="End Session (Return to RFID Login)"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-full hud-panel border border-cosmos-border text-cosmos-white hover:border-cosmos-cyan/50 transition shadow-lg"
              title="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-cosmos-cyan" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / Tablet Full-Screen Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#03050B]/95 backdrop-blur-2xl flex flex-col p-6 overflow-y-auto animate-fade-in xl:hidden">
          <div className="flex items-center justify-between pb-6 border-b border-cosmos-border/40">
            <div className="flex items-center space-x-2">
              <Compass className="w-5 h-5 text-cosmos-cyan" />
              <span className="font-display font-bold text-white text-base">NAVIGATION DIRECTORY</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full hud-panel border border-cosmos-border text-cosmos-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-6 flex-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`p-4 rounded-2xl border text-left flex items-center space-x-3 transition-all ${
                    isActive
                      ? 'bg-cosmos-electric/25 border-cosmos-cyan text-white shadow-cyan-glow'
                      : 'hud-panel border-cosmos-border/60 text-cosmos-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${isActive ? 'bg-cosmos-cyan text-black' : 'bg-white/5 text-cosmos-cyan'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{item.label}</h4>
                    {item.badge && (
                      <span className="text-[10px] font-mono text-cosmos-cyan uppercase">
                        {item.badge} Mode
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-cosmos-border/40 flex items-center justify-between text-xs font-mono text-cosmos-muted">
            <span>SPACE EXPLORER EXHIBITION HUD</span>
            <button
              onClick={onLogout}
              className="text-red-400 hover:underline flex items-center space-x-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
