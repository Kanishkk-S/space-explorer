// ============================================================
// SPACE EXPLORER — CINEMATIC OVERVIEW EXPERIENCE
// Full-width planetary visual, expressive typography, editorial storytelling
// ============================================================

import React from 'react';
import { 
  Orbit, 
  GraduationCap, 
  ArrowRight, 
  Layers, 
  Radio, 
  ChevronDown,
  Sparkles,
  Compass,
  Bookmark,
  Award,
  Globe2
} from 'lucide-react';
import { PLANETS_DATA, EXTREME_PHENOMENA, NEBULAE_DATA } from '@/data/celestialData';
import { AuthManager } from '@/systems/auth/AuthManager';

interface CinematicOverviewProps {
  onNavigate: (section: any) => void;
  onExplorePlanet: (planetId: string) => void;
  controllerConnected: boolean;
}

export const CinematicOverview: React.FC<CinematicOverviewProps> = ({
  onNavigate,
  onExplorePlanet,
  controllerConnected
}) => {
  const auth = AuthManager.getInstance();
  const student = auth.getCurrentStudent();

  return (
    <div className="w-full min-h-screen bg-[#03050B] text-cosmos-white font-sans selection:bg-cosmos-cyan selection:text-black">
      {/* 1. CINEMATIC FULL-WIDTH HERO SECTION */}
      <section className="relative w-full min-h-[92vh] flex flex-col items-center justify-center px-6 overflow-hidden pt-24 pb-12">
        {/* Subtle Atmospheric Galactic Ambient Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-b from-cosmos-electric/15 via-cosmos-violet/10 to-transparent blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] rounded-full bg-cosmos-cyan/10 blur-[120px] pointer-events-none" />

        {/* Floating Planet Visual Centerpiece */}
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
          {/* Welcome Badge & Controller Status */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full hud-panel border border-cosmos-border text-cosmos-cyan text-xs font-mono tracking-widest uppercase shadow-xl">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cosmos-cyan" />
            <span>
              WELCOME CADET {student?.name?.toUpperCase() || 'ASTRONOMER'} • {controllerConnected ? 'ESP32 HARDWARE SYNCED' : 'DEMO FLIGHT READY'}
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-cosmos-white to-cosmos-muted/80 leading-[1.05]">
            EXPLORE THE UNIVERSE
          </h1>

          <p className="text-base sm:text-xl text-cosmos-muted max-w-2xl mx-auto font-light leading-relaxed">
            From the nuclear fusion core of our Sun to the supermassive event horizon of Sagittarius A*. Experience the cosmos through real 3D astrophysics, orbital mechanics, and observational science.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            {/* Primary ENTER THE UNIVERSE Action */}
            <button
              onClick={() => onNavigate('universe_map')}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-cosmos-electric via-cosmos-violet to-cosmos-cyan hover:opacity-95 text-white font-semibold text-sm tracking-wider uppercase transition-all duration-300 shadow-cyan-glow flex items-center space-x-3 group"
            >
              <Layers className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Enter The Universe</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Launch 3D Solar System */}
            <button
              onClick={() => onNavigate('solar_system')}
              className="px-8 py-4 rounded-full hud-panel hover:bg-white/10 text-cosmos-white font-medium text-sm tracking-wider uppercase border border-cosmos-border transition-all duration-300 flex items-center space-x-2.5 shadow-xl hover:border-cosmos-cyan/50"
            >
              <Orbit className="w-4 h-4 text-cosmos-cyan" />
              <span>Explore 3D Solar System</span>
            </button>
          </div>

          {/* Cadet Exploration Progress Capsule */}
          {student && (
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
              <div className="px-4 py-2 rounded-2xl bg-black/40 border border-white/5 flex items-center space-x-2 text-cosmos-muted">
                <Compass className="w-3.5 h-3.5 text-cosmos-cyan" />
                <span>Explored: <strong className="text-white">{student.exploredObjects?.length || 0}</strong> bodies</span>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-black/40 border border-white/5 flex items-center space-x-2 text-cosmos-muted">
                <Bookmark className="w-3.5 h-3.5 text-cosmos-gold" />
                <span>Bookmarks: <strong className="text-white">{student.bookmarks?.length || 0}</strong> saved</span>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-black/40 border border-white/5 flex items-center space-x-2 text-cosmos-muted">
                <Award className="w-3.5 h-3.5 text-purple-400" />
                <span>Academy: <strong className="text-white">{student.completedLessons?.length || 0}</strong> lessons passed</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Scroll Cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-cosmos-muted/60 text-xs font-mono tracking-widest pointer-events-none">
          <span>SCROLL TO DISCOVER</span>
          <ChevronDown className="w-4 h-4 animate-bounce mt-1" />
        </div>
      </section>

      {/* 2. DISCOVERY OF THE DAY SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="rounded-3xl hud-panel p-8 sm:p-10 border border-cosmos-border-strong relative overflow-hidden shadow-2xl backdrop-blur-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cosmos-cyan/20 to-transparent rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono tracking-widest text-cosmos-gold font-bold uppercase bg-cosmos-gold/15 px-3 py-1 rounded-full border border-cosmos-gold/30 flex items-center space-x-1.5">
                  <Sparkles className="w-3 h-3 text-cosmos-gold" />
                  <span>DISCOVERY SPOTLIGHT OF THE DAY</span>
                </span>
                <span className="text-[10px] font-mono text-cosmos-cyan uppercase">
                  ASTROPHYSICS ARCHIVE
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black font-display text-white">
                James Webb Unveils Early Cosmic Dawn Galaxies
              </h3>
              <p className="text-sm text-cosmos-muted leading-relaxed font-light">
                Infrared observations from the James Webb Space Telescope (JWST) have confirmed massive, mature galaxies existing merely 350 million years after the Big Bang (redshift z {'>'} 13), prompting astrophysicists to revise classical models of cosmic structure formation.
              </p>
            </div>

            <button
              onClick={() => onNavigate('knowledge')}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center space-x-2 shrink-0 shadow-lg"
            >
              <span>Explore Astrophysical Briefing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. THE SOLAR SYSTEM: EDITORIAL PLANETARY STRIP */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-cosmos-border/40">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-mono tracking-widest text-cosmos-cyan uppercase">
              LEVEL 01 • HELIOSPHERE
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white mt-1">
              The Solar System & Planets
            </h2>
          </div>
          <button
            onClick={() => onNavigate('solar_system')}
            className="mt-4 md:mt-0 text-sm font-mono text-cosmos-cyan hover:text-white transition flex items-center space-x-2 group"
          >
            <span>Open Interactive Orbits (Three.js)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </button>
        </div>

        {/* Horizontal Visual Planet Exploration Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANETS_DATA.slice(0, 4).map((planet) => (
            <div
              key={planet.id}
              onClick={() => onExplorePlanet(planet.id)}
              className="group relative rounded-3xl overflow-hidden hud-panel p-6 border border-cosmos-border hover:border-cosmos-cyan/50 transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[300px] hover:shadow-cyan-glow"
            >
              {/* Planetary Aura Glow */}
              <div 
                className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-[60px] opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: planet.color }}
              />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-cosmos-cyan uppercase">
                    {planet.scientificData?.distanceFromSunAU}
                  </span>
                  <div className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: planet.color }} />
                </div>
                <h3 className="text-2xl font-bold font-display text-white group-hover:text-cosmos-cyan transition">
                  {planet.name}
                </h3>
                <p className="text-xs text-cosmos-muted line-clamp-3 mt-2 leading-relaxed font-light">
                  {planet.tagline}
                </p>
              </div>

              <div className="pt-4 border-t border-cosmos-border/40 flex items-center justify-between text-xs font-mono text-cosmos-muted">
                <span>Dia: {planet.scientificData?.diameterKm}</span>
                <span className="text-cosmos-cyan group-hover:translate-x-1 transition font-bold flex items-center space-x-1">
                  <span>Inspect 3D</span>
                  <Globe2 className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DEEP SPACE: STARS, NEBULAE & RELATIVITY */}
      <section className="w-full bg-gradient-to-b from-[#03050B] via-[#080E1C] to-[#03050B] py-20 border-t border-cosmos-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-xs font-mono tracking-widest text-cosmos-violet uppercase">
              LEVEL 02 • INTERSTELLAR VISTAS
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white mt-1">
              Deep Space, Nebulae & Black Holes
            </h2>
            <p className="text-cosmos-muted text-sm max-w-xl mt-2 font-light">
              Witness the stellar nurseries where stars ignite, and the event horizons of supermassive singularities where spacetime dissolves.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Featured Hero: Sagittarius A* */}
            <div 
              onClick={() => onNavigate('deep_space')}
              className="relative rounded-3xl overflow-hidden hud-panel p-8 border border-cosmos-border hover:border-cosmos-violet/60 transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[360px] group shadow-violet-glow"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-cosmos-violet/20 rounded-full blur-[100px] pointer-events-none" />
              <div>
                <span className="text-[10px] font-mono tracking-widest text-cosmos-cyan uppercase bg-cosmos-cyan/10 px-2.5 py-1 rounded-full border border-cosmos-cyan/30">
                  SUPERMASSIVE SINGULARITY
                </span>
                <h3 className="text-3xl sm:text-4xl font-black font-display text-white mt-4 group-hover:text-cosmos-cyan transition">
                  {EXTREME_PHENOMENA[0].name}
                </h3>
                <p className="text-sm text-cosmos-muted mt-3 leading-relaxed max-w-lg font-light">
                  {EXTREME_PHENOMENA[0].overview}
                </p>
              </div>

              <div className="pt-6 border-t border-cosmos-border/40 flex items-center justify-between text-xs font-mono">
                <span className="text-cosmos-muted">{EXTREME_PHENOMENA[0].scientificData?.distanceFromEarthLy} from Earth</span>
                <span className="text-cosmos-cyan flex items-center space-x-1 group-hover:translate-x-1 transition">
                  <span>Explore Astrophysical Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Featured Hero: Orion Nebula */}
            <div 
              onClick={() => onNavigate('deep_space')}
              className="relative rounded-3xl overflow-hidden hud-panel p-8 border border-cosmos-border hover:border-cosmos-cyan/60 transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[360px] group shadow-cyan-glow"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-cosmos-cyan/15 rounded-full blur-[100px] pointer-events-none" />
              <div>
                <span className="text-[10px] font-mono tracking-widest text-cosmos-violet uppercase bg-cosmos-violet/10 px-2.5 py-1 rounded-full border border-cosmos-violet/30">
                  STELLAR NURSERY
                </span>
                <h3 className="text-3xl sm:text-4xl font-black font-display text-white mt-4 group-hover:text-cosmos-violet transition">
                  {NEBULAE_DATA[0].name}
                </h3>
                <p className="text-sm text-cosmos-muted mt-3 leading-relaxed max-w-lg font-light">
                  {NEBULAE_DATA[0].overview}
                </p>
              </div>

              <div className="pt-6 border-t border-cosmos-border/40 flex items-center justify-between text-xs font-mono">
                <span className="text-cosmos-muted">{NEBULAE_DATA[0].scientificData?.distanceFromEarthLy} in Orion</span>
                <span className="text-cosmos-violet flex items-center space-x-1 group-hover:translate-x-1 transition">
                  <span>Explore Ionization Cloud</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SPACE ACADEMY BANNER */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="rounded-3xl hud-panel p-10 border border-cosmos-border-strong relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-xl space-y-3">
            <span className="text-xs font-mono text-cosmos-gold tracking-widest uppercase font-bold">
              INTERACTIVE ASTRONOMY LEARNING
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold font-display text-white">
              Space Academy & Quizzes
            </h3>
            <p className="text-sm text-cosmos-muted leading-relaxed font-light">
              Test your understanding of celestial mechanics, stellar nucleosynthesis, and cosmological scales with our interactive assessments.
            </p>
          </div>

          <button
            onClick={() => onNavigate('academy')}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cosmos-gold to-amber-500 hover:opacity-90 text-black font-bold text-xs uppercase tracking-wider transition shadow-gold-glow shrink-0 flex items-center space-x-2"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Enter Space Academy</span>
          </button>
        </div>
      </section>
    </div>
  );
};
