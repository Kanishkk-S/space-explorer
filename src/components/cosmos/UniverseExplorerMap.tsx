// ============================================================
// SPACE EXPLORER — INTERACTIVE UNIVERSE EXPLORER MAP
// Navigable Hierarchy: Observable Universe → Superclusters → Clusters → Galaxies → Stars → Planets
// ============================================================

import React, { useState, useMemo } from 'react';
import { 
  ALL_CELESTIAL_OBJECTS, 
  PLANETS_DATA 
} from '@/data/celestialData';
import { CelestialObject, CelestialHierarchy } from '@/types/cosmos';
import { AuthManager } from '@/systems/auth/AuthManager';
import { 
  Search, 
  Compass, 
  Bookmark, 
  BookmarkCheck, 
  Info,
  ChevronRight,
  Globe2,
  Sparkles
} from 'lucide-react';

interface UniverseExplorerProps {
  onSelectObject: (obj: CelestialObject) => void;
  onExplorePlanetIn3D: (planetId: string) => void;
}

const HIERARCHY_STEPS: { level: CelestialHierarchy; label: string; count: number }[] = [
  { level: 'universe', label: '1. Cosmic Web & Big Bang', count: 1 },
  { level: 'galaxy_cluster', label: '2. Local Group & Clusters', count: 1 },
  { level: 'galaxy', label: '3. Galaxies', count: 4 },
  { level: 'nebula', label: '4. Nebulae & Nurseries', count: 4 },
  { level: 'star', label: '5. Notable Stars', count: 4 },
  { level: 'exoplanet', label: '6. Exoplanets & Alien Worlds', count: 3 },
  { level: 'planet', label: '7. Solar System Planets', count: 8 },
  { level: 'dwarf_planet', label: '8. Dwarf Planets & Asteroids', count: 3 },
  { level: 'moon', label: '9. Ocean & Volcanic Moons', count: 6 },
  { level: 'extreme_phenomenon', label: '10. Extreme Singularities & Magnetars', count: 3 },
];

export const UniverseExplorerMap: React.FC<UniverseExplorerProps> = ({
  onSelectObject,
  onExplorePlanetIn3D
}) => {
  const [activeLevel, setActiveLevel] = useState<CelestialHierarchy | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedObject, setSelectedObject] = useState<CelestialObject>(PLANETS_DATA[2]); // Default Earth

  const auth = AuthManager.getInstance();
  const student = auth.getCurrentStudent();

  const filteredObjects = useMemo(() => {
    return ALL_CELESTIAL_OBJECTS.filter((obj) => {
      const matchSearch = obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          obj.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      const matchHierarchy = activeLevel === 'all' || obj.hierarchyLevel === activeLevel;
      return matchSearch && matchHierarchy;
    });
  }, [searchQuery, activeLevel]);

  const isBookmarked = student?.bookmarks.includes(selectedObject.id) || false;

  const handleToggleBookmark = (id: string) => {
    auth.toggleBookmark(id);
  };

  const handleSelect = (obj: CelestialObject) => {
    setSelectedObject(obj);
    auth.recordExplored(obj.id);
    onSelectObject(obj);
  };

  return (
    <div className="w-full h-[calc(100vh-80px)] bg-[#03050B] text-cosmos-white flex overflow-hidden">
      {/* 1. LEFT HIERARCHY TREE & SEARCH COLUMN */}
      <div className="w-[380px] h-full hud-panel border-r border-cosmos-border flex flex-col z-20 shrink-0">
        {/* Search Input Header */}
        <div className="p-6 border-b border-cosmos-border/40 space-y-3">
          <span className="text-[10px] font-mono tracking-widest text-cosmos-cyan uppercase block">
            UNIVERSE MACRO CATALOGUE
          </span>
          <div className="relative">
            <Search className="w-4 h-4 text-cosmos-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search planets, stars, black holes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-black/60 border border-cosmos-border text-xs text-white placeholder-cosmos-muted font-mono focus:outline-none focus:border-cosmos-cyan transition"
            />
          </div>
        </div>

        {/* Hierarchy Filter Stepper Pills */}
        <div className="p-4 border-b border-cosmos-border/30 overflow-x-auto flex space-x-2 shrink-0">
          <button
            onClick={() => setActiveLevel('all')}
            className={`px-3 py-1 rounded-full text-xs font-mono transition shrink-0 ${
              activeLevel === 'all'
                ? 'bg-cosmos-cyan text-black font-bold'
                : 'text-cosmos-muted hover:text-white bg-white/5'
            }`}
          >
            All Scales ({ALL_CELESTIAL_OBJECTS.length})
          </button>
          {HIERARCHY_STEPS.map((step) => (
            <button
              key={step.level}
              onClick={() => setActiveLevel(step.level)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition shrink-0 ${
                activeLevel === step.level
                  ? 'bg-cosmos-cyan text-black font-bold'
                  : 'text-cosmos-muted hover:text-white bg-white/5'
              }`}
            >
              {step.label}
            </button>
          ))}
        </div>

        {/* Scrollable Celestial Objects List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredObjects.map((obj) => {
            const isSelected = selectedObject.id === obj.id;
            const bookmarked = student?.bookmarks.includes(obj.id);

            return (
              <div
                key={obj.id}
                onClick={() => handleSelect(obj)}
                className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between group ${
                  isSelected
                    ? 'bg-gradient-to-r from-cosmos-electric/30 to-cosmos-cyan/20 border-cosmos-cyan/50 shadow-cyan-glow'
                    : 'bg-black/30 border-white/5 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div
                    className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: obj.color }}
                  />
                  <div className="truncate">
                    <h4 className="font-bold text-xs text-white group-hover:text-cosmos-cyan transition truncate">
                      {obj.name}
                    </h4>
                    <span className="text-[10px] font-mono text-cosmos-muted uppercase">
                      {obj.category.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {bookmarked && <BookmarkCheck className="w-3.5 h-3.5 text-cosmos-gold" />}
                  <ChevronRight className="w-4 h-4 text-cosmos-muted group-hover:text-cosmos-cyan group-hover:translate-x-0.5 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. RIGHT OBJECT SCIENTIFIC & VISUAL PRESENTATION */}
      <div className="flex-1 h-full p-8 overflow-y-auto space-y-6">
        {/* Macro Scale Breadcrumb Path */}
        <div className="flex items-center space-x-2 text-xs font-mono text-cosmos-cyan">
          <span>Observable Universe</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>{selectedObject.hierarchyLevel?.toUpperCase() || 'CELESTIAL ENTITY'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white font-bold">{selectedObject.name}</span>
        </div>

        {/* Selected Object Banner Card */}
        <div className="rounded-3xl hud-panel p-8 border border-cosmos-border-strong relative overflow-hidden shadow-2xl">
          <div 
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[110px] opacity-30 pointer-events-none"
            style={{ backgroundColor: selectedObject.color }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-cosmos-cyan tracking-widest uppercase">
                {selectedObject.category.toUpperCase()} • SCIENTIFIC PROFILE
              </span>
              <h2 className="text-4xl sm:text-5xl font-black font-display text-white">
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

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-cosmos-border/40 font-mono text-xs">
            {selectedObject.scientificData?.distanceFromEarthLy && (
              <div>
                <span className="text-[10px] text-cosmos-muted uppercase block">DISTANCE (EARTH)</span>
                <span className="text-white font-bold">{selectedObject.scientificData.distanceFromEarthLy}</span>
              </div>
            )}
            {selectedObject.scientificData?.distanceFromSunAU && (
              <div>
                <span className="text-[10px] text-cosmos-muted uppercase block">DISTANCE (SUN)</span>
                <span className="text-white font-bold">{selectedObject.scientificData.distanceFromSunAU}</span>
              </div>
            )}
            {selectedObject.scientificData?.diameterKm && (
              <div>
                <span className="text-[10px] text-cosmos-muted uppercase block">DIAMETER</span>
                <span className="text-white font-bold">{selectedObject.scientificData.diameterKm}</span>
              </div>
            )}
            {selectedObject.scientificData?.constellation && (
              <div>
                <span className="text-[10px] text-cosmos-muted uppercase block">CONSTELLATION</span>
                <span className="text-white font-bold">{selectedObject.scientificData.constellation}</span>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Scientific Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl hud-panel p-6 border border-cosmos-border space-y-4">
            <h3 className="font-mono text-xs text-cosmos-cyan uppercase tracking-wider flex items-center space-x-2">
              <Compass className="w-4 h-4" />
              <span>ASTROPHYSICAL OVERVIEW</span>
            </h3>
            <p className="text-sm text-cosmos-white font-light leading-relaxed">
              {selectedObject.overview}
            </p>

            {selectedObject.category === 'planet' && (
              <button
                onClick={() => onExplorePlanetIn3D(selectedObject.id)}
                className="w-full py-3 rounded-full bg-gradient-to-r from-cosmos-electric to-cosmos-cyan text-white text-xs font-bold uppercase tracking-wider transition shadow-cyan-glow flex items-center justify-center space-x-2"
              >
                <Globe2 className="w-4 h-4" />
                <span>Launch Interactive 3D Globe Inspector</span>
              </button>
            )}
          </div>

          <div className="rounded-3xl hud-panel p-6 border border-cosmos-border space-y-4">
            <h3 className="font-mono text-xs text-cosmos-gold uppercase tracking-wider flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>KEY OBSERVATIONAL DISCOVERIES</span>
            </h3>
            <div className="space-y-3">
              {selectedObject.interestingFacts.map((fact, i) => (
                <div key={i} className="p-3 rounded-2xl bg-black/40 border border-white/5 text-xs text-cosmos-muted flex items-start space-x-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cosmos-gold shrink-0 mt-1.5" />
                  <span className="leading-relaxed">{fact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer on Spatial Scales */}
        <div className="text-[11px] font-mono text-cosmos-muted/60 flex items-center space-x-2 pt-2">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Macro cosmological hierarchy is structured for college exhibition education; distances reflect verified astronomical metrics.</span>
        </div>
      </div>
    </div>
  );
};
