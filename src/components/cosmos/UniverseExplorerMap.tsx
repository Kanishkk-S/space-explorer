// ============================================================
// SPACE EXPLORER — INTERACTIVE UNIVERSE EXPLORER MAP
// Navigable Hierarchy: Observable Universe → Superclusters → Clusters → Galaxies → Stars → Planets
// ============================================================

import React, { useState, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { 
  ALL_CELESTIAL_OBJECTS, 
  PLANETS_DATA 
} from '@/data/celestialData';
import { CelestialObject } from '@/types/cosmos';
import { AuthManager } from '@/systems/auth/AuthManager';
import { 
  Search, 
  Compass, 
  Bookmark, 
  BookmarkCheck, 
  Info,
  ChevronRight,
  Globe2,
  Sparkles,
  Play,
  ArrowRight
} from 'lucide-react';

interface UniverseExplorerProps {
  onSelectObject: (obj: CelestialObject) => void;
  onExplorePlanetIn3D: (planetId: string) => void;
  autoPlayTransition?: boolean;
}

// 3D Cosmic Web & Galaxy Background Animation
const CosmicWebBackground: React.FC<{
  zoomProgress: number; // 0 (Close Solar System) to 1 (Deep Cosmos)
}> = ({ zoomProgress }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const galaxyRef = useRef<THREE.Points>(null);

  // Generate 4,000 galaxy cluster points forming cosmic web filaments
  const [positions, colors] = useMemo(() => {
    const count = 4000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Filamentary structure using logarithmic spiral + random dispersion
      const angle = Math.random() * Math.PI * 2;
      const radius = 20 + Math.pow(Math.random(), 0.5) * 450;
      const armOffset = Math.sin(angle * 3) * 15;
      
      pos[i * 3] = Math.cos(angle) * (radius + armOffset);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 2] = Math.sin(angle) * (radius + armOffset);

      // Color gradient: Electric cyan, deep violet, starlight white
      const rVal = Math.random();
      if (rVal < 0.4) {
        col[i * 3] = 0.38; col[i * 3 + 1] = 0.9; col[i * 3 + 2] = 0.95; // Cyan
      } else if (rVal < 0.75) {
        col[i * 3] = 0.53; col[i * 3 + 1] = 0.4; col[i * 3 + 2] = 1.0; // Violet
      } else {
        col[i * 3] = 0.95; col[i * 3 + 1] = 0.77; col[i * 3 + 2] = 0.42; // Gold
      }
    }
    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
    }
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += delta * 0.04;
    }
  });

  // Camera depth shifts smoothly with zoomProgress
  const currentZ = 25 + zoomProgress * 180;
  const currentY = 10 + zoomProgress * 60;

  return (
    <>
      <ambientLight intensity={0.5} />
      <Stars radius={400} depth={100} count={9000} factor={4} saturation={0.7} fade speed={1.0} />

      {/* Cosmic Web Filament Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={1.8}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>

      {/* Camera viewpoint hook */}
      <CameraPositioner x={0} y={currentY} z={currentZ} />
    </>
  );
};

const CameraPositioner: React.FC<{ x: number; y: number; z: number }> = ({ x, y, z }) => {
  useFrame(({ camera }) => {
    camera.position.lerp(new THREE.Vector3(x, y, z), 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
};

// 3D Mini Celestial Hologram for Selected Entity
const CelestialEntityPreview: React.FC<{ color: string; isPlanet: boolean }> = ({ color, isPlanet }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.35;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial
        color={color}
        roughness={isPlanet ? 0.4 : 0.8}
        metalness={0.2}
        wireframe={!isPlanet}
      />
    </mesh>
  );
};

// Cosmic categories list
const COSMIC_CATEGORIES = [
  { id: 'all', label: 'All Cosmos' },
  { id: 'solar_system', label: 'Solar System' },
  { id: 'planet', label: 'Planets' },
  { id: 'dwarf_planet', label: 'Dwarf Planets' },
  { id: 'moon', label: 'Moons' },
  { id: 'asteroid', label: 'Asteroids' },
  { id: 'comet', label: 'Comets' },
  { id: 'exoplanet', label: 'Exoplanets' },
  { id: 'star_system', label: 'Star Systems' },
  { id: 'star', label: 'Stars' },
  { id: 'constellation', label: 'Constellations' },
  { id: 'nebula', label: 'Nebulae' },
  { id: 'galaxy', label: 'Galaxies' },
  { id: 'galaxy_group', label: 'Galaxy Groups' },
  { id: 'galaxy_cluster', label: 'Galaxy Clusters' },
  { id: 'supercluster', label: 'Superclusters' },
  { id: 'black_hole', label: 'Black Holes' },
  { id: 'pulsar', label: 'Pulsars & Neutron Stars' },
  { id: 'magnetar', label: 'Magnetars' },
  { id: 'quasar', label: 'Quasars' },
  { id: 'supernova', label: 'Supernovae' },
  { id: 'gamma_ray_burst', label: 'Gamma-Ray Bursts' },
  { id: 'gravitational_wave', label: 'Gravitational Waves' },
  { id: 'cosmic_microwave_background', label: 'CMB Afterglow' },
  { id: 'cosmic_web', label: 'Cosmic Web' },
  { id: 'dark_matter', label: 'Dark Matter' },
  { id: 'dark_energy', label: 'Dark Energy' },
  { id: 'observable_universe', label: 'Observable Universe' },
  { id: 'big_bang', label: 'Big Bang' },
];

export const UniverseExplorerMap: React.FC<UniverseExplorerProps> = ({
  onSelectObject,
  onExplorePlanetIn3D
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedObject, setSelectedObject] = useState<CelestialObject>(PLANETS_DATA[2]); // Earth
  const [zoomLevel, setZoomLevel] = useState<number>(1); // 0 (Close) to 1 (Macro Universe)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [transitionScaleName, setTransitionScaleName] = useState<string>('Observable Universe (93 Billion Light-Years)');

  const auth = AuthManager.getInstance();
  const student = auth.getCurrentStudent();

  // Filter objects by search and category
  const filteredObjects = useMemo(() => {
    return ALL_CELESTIAL_OBJECTS.filter((obj) => {
      const matchSearch = obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          obj.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          obj.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'all' || obj.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, selectedCategory]);

  const isBookmarked = student?.bookmarks.includes(selectedObject.id) || false;

  const handleToggleBookmark = (id: string) => {
    auth.toggleBookmark(id);
  };

  const handleSelect = (obj: CelestialObject) => {
    setSelectedObject(obj);
    auth.recordExplored(obj.id);
    onSelectObject(obj);
  };

  // Cinematic Zoom Out Animation Sequence
  const playCinematicZoomOut = () => {
    setIsTransitioning(true);
    setZoomLevel(0);
    const scaleStages = [
      { progress: 0.1, label: '1 AU — Heliosphere & Inner Planets' },
      { progress: 0.3, label: '1,000 AU — Oort Cloud & Interstellar Boundary' },
      { progress: 0.5, label: '4.3 Light-Years — Alpha Centauri Local Neighborhood' },
      { progress: 0.7, label: '100,000 Light-Years — Milky Way Galactic Disc' },
      { progress: 0.85, label: '10 Million Light-Years — Local Group of Galaxies' },
      { progress: 1.0, label: '93 Billion Light-Years — Observable Universe Horizon' }
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < scaleStages.length) {
        setZoomLevel(scaleStages[step].progress);
        setTransitionScaleName(scaleStages[step].label);
        step++;
      } else {
        clearInterval(interval);
        setIsTransitioning(false);
      }
    }, 450);
  };

  return (
    <div className="relative w-full h-[calc(100vh-80px)] bg-[#03050B] text-cosmos-white flex flex-col lg:flex-row overflow-hidden select-none">
      {/* 3D Cosmic Background Canvas */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Canvas gl={{ antialias: true, alpha: true }}>
          <CosmicWebBackground zoomProgress={zoomLevel} />
        </Canvas>
      </div>

      {/* Cinematic Transition Overlay Banner */}
      {isTransitioning && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40 hud-panel px-6 py-3 rounded-full border border-cosmos-cyan shadow-cyan-glow flex items-center space-x-3 animate-pulse">
          <Sparkles className="w-4 h-4 text-cosmos-cyan animate-spin" />
          <span className="text-xs font-mono tracking-widest text-cosmos-cyan font-bold uppercase">
            SCALE: {transitionScaleName}
          </span>
        </div>
      )}

      {/* 1. LEFT SEARCH & CATEGORY HIERARCHY TREE */}
      <div className="relative z-10 w-full lg:w-[400px] h-[45vh] lg:h-full hud-panel border-b lg:border-b-0 lg:border-r border-cosmos-border flex flex-col shadow-2xl shrink-0 backdrop-blur-xl">
        {/* Search Header */}
        <div className="p-5 border-b border-cosmos-border/40 space-y-3 shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-widest text-cosmos-cyan uppercase block font-bold">
              OBSERVABLE UNIVERSE CATALOGUE
            </span>
            <button
              onClick={playCinematicZoomOut}
              className="text-[11px] font-mono text-cosmos-cyan hover:text-white transition flex items-center space-x-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10"
              title="Replay 3D Cosmic Zoom"
            >
              <Play className="w-3 h-3 text-cosmos-cyan" />
              <span>Cosmic Zoom</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-cosmos-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search planets, stars, black holes, nebulae..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-black/60 border border-cosmos-border text-xs text-white placeholder-cosmos-muted font-mono focus:outline-none focus:border-cosmos-cyan transition shadow-inner"
            />
          </div>
        </div>

        {/* Scrollable Category Filter Pills */}
        <div className="px-5 py-2.5 border-b border-cosmos-border/30 overflow-x-auto flex items-center space-x-1.5 shrink-0">
          {COSMIC_CATEGORIES.map((cat) => {
            const count = cat.id === 'all' 
              ? ALL_CELESTIAL_OBJECTS.length 
              : ALL_CELESTIAL_OBJECTS.filter(o => o.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 shrink-0 flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-cosmos-cyan text-black font-bold shadow-cyan-glow'
                    : 'text-cosmos-muted hover:text-white bg-white/5 hover:bg-white/10'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-black text-white' : 'bg-white/10 text-cosmos-muted'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Celestial Objects List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredObjects.length > 0 ? (
            filteredObjects.map((obj) => {
              const isSelected = selectedObject.id === obj.id;
              const bookmarked = student?.bookmarks.includes(obj.id);

              return (
                <div
                  key={obj.id}
                  onClick={() => handleSelect(obj)}
                  className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? 'bg-gradient-to-r from-cosmos-electric/30 to-cosmos-cyan/20 border-cosmos-cyan/50 shadow-cyan-glow'
                      : 'bg-black/40 border-white/5 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div
                      className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: obj.color }}
                    />
                    <div className="truncate">
                      <h4 className="font-bold text-xs text-white group-hover:text-cosmos-cyan transition truncate">
                        {obj.name}
                      </h4>
                      <span className="text-[10px] font-mono text-cosmos-muted uppercase">
                        {obj.category.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    {bookmarked && <BookmarkCheck className="w-3.5 h-3.5 text-cosmos-gold" />}
                    <ChevronRight className="w-4 h-4 text-cosmos-muted group-hover:text-cosmos-cyan group-hover:translate-x-0.5 transition" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-6 text-center text-xs font-mono text-cosmos-muted">
              No celestial entities match your search query.
            </div>
          )}
        </div>
      </div>

      {/* 2. RIGHT OBJECT SCIENTIFIC & VISUAL PRESENTATION */}
      <div className="relative z-10 flex-1 h-[55vh] lg:h-full p-6 lg:p-8 overflow-y-auto space-y-6 backdrop-blur-sm">
        {/* Breadcrumb Path */}
        <div className="flex items-center space-x-2 text-xs font-mono text-cosmos-cyan">
          <span>Observable Universe</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="capitalize">{selectedObject.category.replace(/_/g, ' ')}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white font-bold">{selectedObject.name}</span>
        </div>

        {/* Selected Entity Showcase Card */}
        <div className="rounded-3xl hud-panel p-6 sm:p-8 border border-cosmos-border relative overflow-hidden shadow-2xl backdrop-blur-2xl">
          <div 
            className="absolute -top-12 -right-12 w-80 h-80 rounded-full blur-[110px] opacity-35 pointer-events-none"
            style={{ backgroundColor: selectedObject.color }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-cosmos-cyan tracking-widest uppercase font-bold">
                {selectedObject.category.replace(/_/g, ' ').toUpperCase()} • ASTRONOMICAL DOSSIER
              </span>
              <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
                {selectedObject.name}
              </h2>
              <p className="text-sm sm:text-base text-cosmos-muted max-w-xl font-light leading-relaxed">
                {selectedObject.tagline}
              </p>
            </div>

            <button
              onClick={() => handleToggleBookmark(selectedObject.id)}
              className={`px-5 py-2.5 rounded-full border text-xs font-mono font-bold tracking-wider transition-all duration-300 flex items-center space-x-2 shrink-0 ${
                isBookmarked
                  ? 'bg-cosmos-gold/20 border-cosmos-gold text-cosmos-gold shadow-sm'
                  : 'hud-panel border-cosmos-border text-cosmos-muted hover:text-white hover:border-white/30'
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

        {/* Detailed Scientific Narrative & 3D Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Scientific Overview */}
          <div className="rounded-3xl hud-panel p-6 border border-cosmos-border space-y-4">
            <h3 className="font-mono text-xs text-cosmos-cyan uppercase tracking-wider flex items-center space-x-2 font-bold">
              <Compass className="w-4 h-4" />
              <span>ASTROPHYSICAL OVERVIEW</span>
            </h3>
            <p className="text-sm text-cosmos-white font-light leading-relaxed">
              {selectedObject.overview}
            </p>

            {selectedObject.structure && (
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
                <span className="text-[10px] font-mono text-cosmos-muted uppercase block">INTERNAL STRUCTURE</span>
                <p className="text-xs text-cosmos-white/90 font-light leading-relaxed">
                  {selectedObject.structure}
                </p>
              </div>
            )}

            {selectedObject.category === 'planet' && (
              <button
                onClick={() => onExplorePlanetIn3D(selectedObject.id)}
                className="w-full py-3 rounded-full bg-gradient-to-r from-cosmos-electric via-cosmos-violet to-cosmos-cyan text-white text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-cyan-glow flex items-center justify-center space-x-2 group hover:opacity-95"
              >
                <Globe2 className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                <span>Launch Interactive 3D Globe Inspector</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
            )}
          </div>

          {/* Right Column: Discoveries & Interactive Hologram Preview */}
          <div className="rounded-3xl hud-panel p-6 border border-cosmos-border space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-mono text-xs text-cosmos-gold uppercase tracking-wider flex items-center space-x-2 font-bold">
                <Sparkles className="w-4 h-4 text-cosmos-gold" />
                <span>KEY OBSERVATIONAL DISCOVERIES</span>
              </h3>
              <div className="space-y-2.5">
                {selectedObject.interestingFacts.map((fact, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-black/40 border border-white/5 text-xs text-cosmos-white/90 flex items-start space-x-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cosmos-gold shrink-0 mt-1.5" />
                    <span className="leading-relaxed font-light">{fact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D Hologram Preview Sphere */}
            <div className="h-32 rounded-2xl bg-black/50 border border-white/10 relative overflow-hidden flex items-center justify-center">
              <div className="absolute top-2 left-3 text-[9px] font-mono text-cosmos-cyan uppercase tracking-widest">
                3D SPECTRAL HOLOGRAM
              </div>
              <Canvas camera={{ position: [0, 0, 3.8] }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[3, 3, 3]} intensity={1.5} />
                <CelestialEntityPreview 
                  color={selectedObject.color} 
                  isPlanet={selectedObject.category === 'planet'} 
                />
              </Canvas>
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
