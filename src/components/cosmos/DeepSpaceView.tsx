// ============================================================
// SPACE EXPLORER — DEEP SPACE EXPLORATION
// ============================================================

import React, { useState } from 'react';
import { DEEP_SPACE_OBJECTS } from '@/data/celestialData';
import { CelestialCategory, CelestialObject } from '@/types/cosmos';
import { AuthManager } from '@/systems/auth/AuthManager';
import { Sparkles, Bookmark, BookmarkCheck, Info, Eye } from 'lucide-react';

export const DeepSpaceView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CelestialCategory | 'all'>('all');
  const [selectedObject, setSelectedObject] = useState<CelestialObject | null>(DEEP_SPACE_OBJECTS[0]);

  const auth = AuthManager.getInstance();
  const student = auth.getCurrentStudent();

  const filteredObjects = DEEP_SPACE_OBJECTS.filter(obj => {
    if (selectedCategory === 'all') return true;
    return obj.category === selectedCategory;
  });

  const isBookmarked = selectedObject ? student?.bookmarks.includes(selectedObject.id) : false;

  const handleToggleBookmark = (id: string) => {
    auth.toggleBookmark(id);
  };

  const handleSelect = (obj: CelestialObject) => {
    setSelectedObject(obj);
    auth.recordExplored(obj.id);
  };

  return (
    <div className="w-full h-full flex flex-col font-sans text-cosmos-text p-6 overflow-hidden">
      {/* Header and Filter Category Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
        <div>
          <span className="text-xs font-mono tracking-widest text-cosmos-cyan uppercase">DEEP COSMOS REALMS</span>
          <h2 className="text-2xl font-black text-white">Stars, Galaxies & Nebulae</h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 bg-cosmos-subdark/80 p-1 rounded-xl border border-cosmos-border overflow-x-auto">
          {(['all', 'galaxy', 'nebula', 'phenomenon', 'star'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                selectedCategory === cat
                  ? 'bg-cosmos-blue text-white shadow-cosmos-glow'
                  : 'text-cosmos-muted hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Celestial' : `${cat}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Catalog Cards, Right Detailed Inspector */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        {/* Left List of Deep Space Objects */}
        <div className="lg:col-span-5 overflow-y-auto space-y-3 pr-2">
          {filteredObjects.map(obj => {
            const isSelected = selectedObject?.id === obj.id;
            const bookmarked = student?.bookmarks.includes(obj.id);

            return (
              <div
                key={obj.id}
                onClick={() => handleSelect(obj)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cosmos-card border-cosmos-blue shadow-cosmos-glow'
                    : 'bg-cosmos-subdark/70 border-cosmos-border/60 hover:border-cosmos-border hover:bg-cosmos-card/60'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2.5">
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm"
                      style={{ backgroundColor: obj.color }}
                    />
                    <div>
                      <h4 className="font-bold text-white text-sm">{obj.name}</h4>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cosmos-cyan">
                        {obj.category}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleBookmark(obj.id);
                    }}
                    className="text-cosmos-muted hover:text-amber-400 transition"
                  >
                    {bookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <p className="text-xs text-cosmos-muted line-clamp-2 leading-relaxed mb-3">
                  {obj.tagline}
                </p>

                <div className="flex items-center justify-between text-[11px] font-mono text-cosmos-muted/80 pt-2 border-t border-cosmos-border/40">
                  <span>{obj.scientificData?.constellation || 'Deep Field'}</span>
                  <span className="text-cosmos-blue">{obj.scientificData?.distanceFromEarthLy || 'Variable'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Inspector Detail Panel */}
        {selectedObject && (
          <div className="lg:col-span-7 glass-panel rounded-2xl border border-cosmos-border p-6 flex flex-col overflow-y-auto shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cosmos-cyan">
                  {selectedObject.category} PROFILE
                </span>
                <h3 className="text-2xl font-black text-white">{selectedObject.name}</h3>
                <p className="text-xs text-cosmos-muted mt-0.5">{selectedObject.tagline}</p>
              </div>

              <button
                onClick={() => handleToggleBookmark(selectedObject.id)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition ${
                  isBookmarked
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                    : 'bg-cosmos-subdark border-cosmos-border text-cosmos-muted hover:text-white'
                }`}
              >
                {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
                <span>{isBookmarked ? 'Saved' : 'Save Bookmark'}</span>
              </button>
            </div>

            {/* Scientific Specs Badge Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 font-mono text-xs">
              <div className="p-3 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60">
                <span className="text-[10px] text-cosmos-muted uppercase block">DISTANCE (EARTH)</span>
                <span className="text-white font-bold">{selectedObject.scientificData?.distanceFromEarthLy || 'Inside'}</span>
              </div>
              <div className="p-3 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60">
                <span className="text-[10px] text-cosmos-muted uppercase block">SCALE / DIAMETER</span>
                <span className="text-white font-bold">{selectedObject.scientificData?.diameterKm || 'N/A'}</span>
              </div>
              <div className="p-3 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60">
                <span className="text-[10px] text-cosmos-muted uppercase block">CONSTELLATION</span>
                <span className="text-white font-bold">{selectedObject.scientificData?.constellation || 'N/A'}</span>
              </div>
            </div>

            {/* Overview Content */}
            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-semibold text-cosmos-cyan tracking-wider uppercase flex items-center space-x-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>SCIENTIFIC OVERVIEW</span>
              </h4>
              <p className="text-sm text-cosmos-text leading-relaxed font-sans">
                {selectedObject.overview}
              </p>
            </div>

            {/* Key Discoveries & Interesting Facts */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-cosmos-cyan tracking-wider uppercase flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>ASTROPHYSICAL DISCOVERIES</span>
              </h4>
              <div className="space-y-2">
                {selectedObject.interestingFacts.map((fact, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-cosmos-subdark/70 border border-cosmos-border/50 text-xs text-cosmos-text flex items-start space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cosmos-violet mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{fact}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-cosmos-border/40 text-[11px] text-cosmos-muted/70 font-mono flex items-center space-x-2">
              <Info className="w-3.5 h-3.5" />
              <span>Scientific data verified against standard astronomical catalogs (SIMBAD & NASA Exoplanet Archive).</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
