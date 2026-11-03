// ============================================================
// SPACE EXPLORER — DEEP SPACE IMMERSIVE VISTAS
// Nebulae, Galaxies, Supermassive Black Holes & Stellar Giants
// ============================================================

import React, { useState } from 'react';
import { NEBULAE_DATA, GALAXIES_DATA, EXTREME_PHENOMENA, STARS_DATA } from '@/data/celestialData';
import { CelestialObject } from '@/types/cosmos';
import { AuthManager } from '@/systems/auth/AuthManager';
import { Sparkles, Bookmark, BookmarkCheck, Info, Eye } from 'lucide-react';

export const DeepSpaceView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'nebula' | 'galaxy' | 'phenomenon' | 'star'>('all');
  
  const allDeepSpace: CelestialObject[] = [
    ...NEBULAE_DATA,
    ...GALAXIES_DATA,
    ...EXTREME_PHENOMENA,
    ...STARS_DATA
  ];

  const [selectedObject, setSelectedObject] = useState<CelestialObject>(EXTREME_PHENOMENA[0]);

  const auth = AuthManager.getInstance();
  const student = auth.getCurrentStudent();

  const filteredObjects = allDeepSpace.filter(obj => {
    if (selectedCategory === 'all') return true;
    return obj.category === selectedCategory;
  });

  const isBookmarked = student?.bookmarks.includes(selectedObject.id) || false;

  const handleToggleBookmark = (id: string) => {
    auth.toggleBookmark(id);
  };

  const handleSelect = (obj: CelestialObject) => {
    setSelectedObject(obj);
    auth.recordExplored(obj.id);
  };

  return (
    <div className="w-full h-[calc(100vh-80px)] bg-[#03050B] text-cosmos-white flex overflow-hidden">
      {/* 1. LEFT CELESTIAL PHENOMENA CATALOGUE */}
      <div className="w-[380px] h-full hud-panel border-r border-cosmos-border flex flex-col z-20 shrink-0">
        <div className="p-6 border-b border-cosmos-border/40 space-y-3">
          <span className="text-[10px] font-mono tracking-widest text-cosmos-violet uppercase block">
            INTERSTELLAR OBSERVATIONS
          </span>
          <h3 className="text-xl font-bold font-display text-white">
            Deep Space Phenomena
          </h3>
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(['all', 'nebula', 'galaxy', 'phenomenon', 'star'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-mono capitalize transition ${
                  selectedCategory === cat
                    ? 'bg-cosmos-violet text-white font-bold shadow-violet-glow'
                    : 'text-cosmos-muted hover:text-white bg-white/5'
                }`}
              >
                {cat === 'all' ? 'All Realms' : `${cat}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredObjects.map(obj => {
            const isSelected = selectedObject.id === obj.id;
            const bookmarked = student?.bookmarks.includes(obj.id);

            return (
              <div
                key={obj.id}
                onClick={() => handleSelect(obj)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-r from-cosmos-violet/30 to-cosmos-electric/20 border-cosmos-violet/60 shadow-violet-glow'
                    : 'bg-black/30 border-white/5 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: obj.color }} />
                    <h4 className="font-bold text-white text-sm group-hover:text-cosmos-cyan transition">
                      {obj.name}
                    </h4>
                  </div>
                  {bookmarked && <BookmarkCheck className="w-3.5 h-3.5 text-cosmos-gold shrink-0" />}
                </div>

                <p className="text-xs text-cosmos-muted line-clamp-2 leading-relaxed mt-1">
                  {obj.tagline}
                </p>

                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-cosmos-muted">
                  <span>{obj.scientificData?.constellation || 'Deep Field'}</span>
                  <span className="text-cosmos-cyan">{obj.scientificData?.distanceFromEarthLy || 'Variable'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. RIGHT DETAILED IMMERSIVE EXPERIENCE */}
      <div className="flex-1 h-full p-8 overflow-y-auto space-y-6">
        {/* Full-width Panoramic Banner */}
        <div className="rounded-3xl hud-panel p-8 border border-cosmos-border-strong relative overflow-hidden shadow-2xl">
          <div 
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-25 pointer-events-none"
            style={{ backgroundColor: selectedObject.color }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-cosmos-violet tracking-widest uppercase bg-cosmos-violet/10 px-3 py-1 rounded-full border border-cosmos-violet/30">
                {selectedObject.category.toUpperCase()} • DEEP FIELD OBSERVATORY
              </span>
              <h2 className="text-4xl sm:text-5xl font-black font-display text-white mt-2">
                {selectedObject.name}
              </h2>
              <p className="text-base text-cosmos-muted max-w-xl font-light">
                {selectedObject.tagline}
              </p>
            </div>

            <button
              onClick={() => handleToggleBookmark(selectedObject.id)}
              className={`px-5 py-2.5 rounded-full border text-xs font-mono font-bold tracking-wider transition flex items-center space-x-2 shrink-0 ${
                isBookmarked
                  ? 'bg-cosmos-gold/20 border-cosmos-gold text-cosmos-gold'
                  : 'hud-panel border-cosmos-border text-cosmos-muted hover:text-white'
              }`}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              <span>{isBookmarked ? 'BOOKMARKED' : 'ADD TO MY DISCOVERIES'}</span>
            </button>
          </div>

          {/* Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-cosmos-border/40 font-mono text-xs">
            <div>
              <span className="text-[10px] text-cosmos-muted uppercase block">DISTANCE (EARTH)</span>
              <span className="text-white font-bold">{selectedObject.scientificData?.distanceFromEarthLy || 'Inside'}</span>
            </div>
            <div>
              <span className="text-[10px] text-cosmos-muted uppercase block">DIAMETER / SPAN</span>
              <span className="text-white font-bold">{selectedObject.scientificData?.diameterKm || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[10px] text-cosmos-muted uppercase block">CONSTELLATION</span>
              <span className="text-white font-bold">{selectedObject.scientificData?.constellation || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[10px] text-cosmos-muted uppercase block">MASS ESTIMATION</span>
              <span className="text-cosmos-cyan font-bold">{selectedObject.scientificData?.massSolarMasses || 'Variable'}</span>
            </div>
          </div>
        </div>

        {/* Narrative & Discoveries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl hud-panel p-6 border border-cosmos-border space-y-4">
            <h3 className="font-mono text-xs text-cosmos-cyan uppercase tracking-wider flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>OBSERVATIONAL ANALYSIS</span>
            </h3>
            <p className="text-sm text-cosmos-white font-light leading-relaxed">
              {selectedObject.overview}
            </p>
          </div>

          <div className="rounded-3xl hud-panel p-6 border border-cosmos-border space-y-4">
            <h3 className="font-mono text-xs text-cosmos-violet uppercase tracking-wider flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-cosmos-violet" />
              <span>ASTROPHYSICAL SIGNIFICANCE</span>
            </h3>
            <div className="space-y-3">
              {selectedObject.interestingFacts.map((fact, i) => (
                <div key={i} className="p-3 rounded-2xl bg-black/40 border border-white/5 text-xs text-cosmos-muted flex items-start space-x-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cosmos-violet shrink-0 mt-1.5" />
                  <span className="leading-relaxed">{fact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-[11px] font-mono text-cosmos-muted/60 flex items-center space-x-2 pt-2">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Observational spectroscopy and radio interferometry data verified via NASA Astrophysics Data System.</span>
        </div>
      </div>
    </div>
  );
};
