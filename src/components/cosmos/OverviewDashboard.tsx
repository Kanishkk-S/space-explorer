// ============================================================
// SPACE EXPLORER — OVERVIEW DASHBOARD (DRIBBBLE-INSPIRED)
// ============================================================

import React from 'react';
import { AuthManager } from '@/systems/auth/AuthManager';
import { PLANETS_DATA, DEEP_SPACE_OBJECTS } from '@/data/celestialData';
import { 
  Sparkles, 
  Orbit, 
  GraduationCap, 
  Cpu, 
  ArrowRight, 
  Award, 
  ExternalLink
} from 'lucide-react';

interface OverviewDashboardProps {
  onNavigate: (section: 'solar_system' | 'planet_explorer' | 'deep_space' | 'knowledge' | 'academy' | 'discoveries' | 'settings') => void;
  onExplorePlanet: (planetId: string) => void;
  controllerConnected?: boolean;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onNavigate,
  onExplorePlanet,
  controllerConnected = false
}) => {
  const auth = AuthManager.getInstance();
  const student = auth.getCurrentStudent();

  // Planet of the Day (Saturn)
  const planetOfTheDay = PLANETS_DATA[5]; // Saturn

  // Featured Discoveries (Sagittarius A* Black Hole, Orion Nebula, Andromeda)
  const featured = [
    DEEP_SPACE_OBJECTS[4], // Black hole
    DEEP_SPACE_OBJECTS[2], // Orion nebula
    DEEP_SPACE_OBJECTS[1], // Andromeda
  ];

  return (
    <div className="w-full h-full flex flex-col font-sans text-cosmos-text p-6 overflow-y-auto space-y-6">
      {/* Cinematic Hero Section */}
      <section className="relative rounded-3xl overflow-hidden border border-cosmos-border/80 bg-gradient-to-r from-cosmos-card via-cosmos-subdark to-cosmos-dark p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cosmos-blue/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cosmos-violet/15 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cosmos-blue/20 border border-cosmos-blue/40 text-cosmos-cyan text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COSMOS 3D DIGITAL PLANETARIUM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            EXPLORE THE UNIVERSE
          </h1>

          <p className="text-sm sm:text-base text-cosmos-muted leading-relaxed font-sans">
            Your journey through the wonders of space begins here. Examine realistic 3D planetary orbits, inspect distant nebulae, understand general relativity, and chart your discoveries.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('solar_system')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cosmos-blue to-cosmos-violet hover:from-blue-600 hover:to-purple-600 text-white text-xs font-bold tracking-wide flex items-center space-x-2 shadow-cosmos-glow transition"
            >
              <Orbit className="w-4 h-4" />
              <span>LAUNCH 3D SOLAR SYSTEM</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('academy')}
              className="px-5 py-3 rounded-2xl bg-cosmos-subdark/80 hover:bg-cosmos-subdark border border-cosmos-border text-white text-xs font-semibold flex items-center space-x-2 transition"
            >
              <GraduationCap className="w-4 h-4 text-cosmos-cyan" />
              <span>Space Academy Quizzes</span>
            </button>
          </div>
        </div>
      </section>

      {/* Grid: Planet of the Day + Personal Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Planet of the Day Card */}
        <div className="lg:col-span-7 glass-panel rounded-2xl border border-cosmos-border p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                PLANET OF THE DAY
              </span>
              <span className="text-xs font-mono text-cosmos-muted">9.58 AU from Sun</span>
            </div>

            <div className="flex items-baseline space-x-3 mb-2">
              <h3 className="text-2xl font-black text-white">{planetOfTheDay.name}</h3>
              <span className="text-xs text-cosmos-cyan font-mono">{planetOfTheDay.tagline}</span>
            </div>

            <p className="text-xs text-cosmos-muted leading-relaxed line-clamp-3 mb-4">
              {planetOfTheDay.overview}
            </p>

            <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60 text-xs font-mono mb-4">
              <div>
                <span className="text-[10px] text-cosmos-muted block">RINGS SYSTEM</span>
                <span className="text-white font-bold">282,000 km wide</span>
              </div>
              <div>
                <span className="text-[10px] text-cosmos-muted block">MOONS COUNT</span>
                <span className="text-white font-bold">{planetOfTheDay.scientificData?.knownMoonsCount} Known</span>
              </div>
              <div>
                <span className="text-[10px] text-cosmos-muted block">AVG DENSITY</span>
                <span className="text-emerald-400 font-bold">0.687 g/cm³</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => onExplorePlanet(planetOfTheDay.id)}
              className="px-4 py-2 rounded-xl bg-cosmos-blue hover:bg-blue-600 text-white text-xs font-bold flex items-center space-x-2 transition shadow-cosmos-glow"
            >
              <span>EXPLORE {planetOfTheDay.name.toUpperCase()} IN 3D</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <span className="text-[11px] text-cosmos-muted font-mono hidden sm:inline">
              Includes Titan & Enceladus
            </span>
          </div>
        </div>

        {/* Student Progress Overview & Hardware Diagnostics */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          {/* Progress Card */}
          <div className="glass-panel rounded-2xl border border-cosmos-border p-5 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-cosmos-cyan flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-cosmos-cyan" />
                  <span>STUDENT PROGRESS</span>
                </span>
                <span className="text-xs font-mono text-white font-semibold">{student?.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="p-3 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60">
                  <span className="text-[10px] text-cosmos-muted uppercase block">OBJECTS EXPLORED</span>
                  <span className="text-xl font-bold text-white font-mono">{student?.exploredObjects.length || 0}</span>
                </div>
                <div className="p-3 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60">
                  <span className="text-[10px] text-cosmos-muted uppercase block">BOOKMARKS</span>
                  <span className="text-xl font-bold text-amber-400 font-mono">{student?.bookmarks.length || 0}</span>
                </div>
                <div className="p-3 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60">
                  <span className="text-[10px] text-cosmos-muted uppercase block">LESSONS DONE</span>
                  <span className="text-xl font-bold text-cosmos-blue font-mono">{student?.completedLessons.length || 0}</span>
                </div>
                <div className="p-3 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60">
                  <span className="text-[10px] text-cosmos-muted uppercase block">ACHIEVEMENTS</span>
                  <span className="text-xl font-bold text-cosmos-violet font-mono">
                    {student?.achievements.filter(a => a.isUnlocked).length || 0} / {student?.achievements.length || 7}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('discoveries')}
              className="w-full py-2 rounded-xl bg-cosmos-subdark hover:bg-cosmos-card border border-cosmos-border text-xs text-cosmos-text hover:text-white font-semibold transition flex items-center justify-center space-x-1"
            >
              <span>View Full Discovery Archive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Real Controller Status Diagnostic Card */}
          <div className="p-4 rounded-2xl bg-cosmos-card/90 border border-cosmos-border text-xs font-mono flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Cpu className={`w-4 h-4 ${controllerConnected ? 'text-emerald-400 animate-pulse' : 'text-cosmos-muted'}`} />
              <div>
                <span className="text-white font-bold block text-xs">
                  ESP32 CONTROLLER: {controllerConnected ? 'ACTIVE' : 'STANDBY'}
                </span>
                <span className="text-[10px] text-cosmos-muted">
                  {controllerConnected ? 'Telemetry streaming on VSPI & I2C' : 'Ready for Web Serial / Demo Mode'}
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('settings')}
              className="text-cosmos-blue hover:text-cosmos-cyan font-bold transition text-[11px]"
            >
              Config →
            </button>
          </div>
        </div>
      </div>

      {/* Featured Deep Space Discoveries Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-cosmos-violet" />
            <h3 className="text-lg font-bold text-white tracking-wide">Featured Deep Space Phenomena</h3>
          </div>
          <button
            onClick={() => onNavigate('deep_space')}
            className="text-xs font-mono text-cosmos-blue hover:text-cosmos-cyan transition"
          >
            Explore All Phenomena →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.map(obj => (
            <div
              key={obj.id}
              onClick={() => onNavigate('deep_space')}
              className="p-5 rounded-2xl glass-panel border border-cosmos-border hover:border-cosmos-blue transition cursor-pointer flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cosmos-cyan">
                    {obj.category}
                  </span>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: obj.color }} />
                </div>
                <h4 className="font-bold text-white text-base group-hover:text-cosmos-blue transition">
                  {obj.name}
                </h4>
                <p className="text-xs text-cosmos-muted line-clamp-2 mt-1.5 leading-relaxed">
                  {obj.overview}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-cosmos-border/40 flex items-center justify-between text-xs font-mono text-cosmos-muted">
                <span>{obj.scientificData?.distanceFromEarthLy || 'Deep Field'}</span>
                <span className="text-cosmos-cyan group-hover:translate-x-1 transition">Inspect →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
