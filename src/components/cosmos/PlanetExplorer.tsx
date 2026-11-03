// ============================================================
// SPACE EXPLORER — REALISTIC 3D PLANET EXPLORER & GLOBE
// Photorealistic Earth, clouds, atmosphere, continents & moons
// ============================================================

import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { PLANETS_DATA, MOONS_DATA } from '@/data/celestialData';
import { AuthManager } from '@/systems/auth/AuthManager';
import { getCelestialTexture, getSaturnRingsTexture } from '@/systems/rendering/CelestialTextures';
import { 
  Bookmark, 
  BookmarkCheck, 
  ArrowLeft, 
  Globe2, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2,
  Play,
  Pause,
  Compass,
  Layers,
  Sparkles
} from 'lucide-react';

interface PlanetExplorerProps {
  initialPlanetId?: string;
  onBackToSolarSystem: () => void;
  onSelectCelestialObject?: (id: string) => void;
}

// 3D Photorealistic Single Planet Globe
const PhotorealisticGlobe: React.FC<{
  planetId: string;
  tiltDeg: number;
  hasRings?: boolean;
  isPaused: boolean;
}> = ({ planetId, tiltDeg, hasRings, isPaused }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  // Load high-resolution procedural textures
  const texture = useMemo(() => {
    if (planetId === 'earth') return getCelestialTexture('earth');
    if (planetId === 'mars') return getCelestialTexture('mars');
    if (planetId === 'jupiter') return getCelestialTexture('jupiter');
    if (planetId === 'saturn') return getCelestialTexture('saturn');
    if (planetId === 'venus') return getCelestialTexture('venus');
    if (planetId === 'mercury') return getCelestialTexture('mercury');
    if (planetId === 'uranus') return getCelestialTexture('uranus');
    if (planetId === 'neptune') return getCelestialTexture('neptune');
    return getCelestialTexture('generic');
  }, [planetId]);

  const cloudTexture = useMemo(() => {
    return planetId === 'earth' ? getCelestialTexture('earth_clouds') : null;
  }, [planetId]);

  const ringsTexture = useMemo(() => {
    return hasRings ? getSaturnRingsTexture() : null;
  }, [hasRings]);

  useFrame((_, delta) => {
    if (!isPaused) {
      if (meshRef.current) {
        meshRef.current.rotation.y += delta * 0.15;
      }
      if (cloudsRef.current) {
        cloudsRef.current.rotation.y += delta * 0.22; // Clouds rotate with differential atmospheric drift
      }
    }
  });

  return (
    <group rotation={[0, 0, THREE.MathUtils.degToRad(tiltDeg)]}>
      {/* Planetary Surface Globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          color="#ffffff"
          roughness={planetId === 'earth' ? 0.35 : 0.65}
          metalness={0.04}
        />
      </mesh>

      {/* Earth Cloud Layer with Realistic Normal Blending & Transparency */}
      {planetId === 'earth' && cloudTexture && (
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[2.535, 64, 64]} />
          <meshStandardMaterial
            map={cloudTexture}
            transparent
            opacity={0.88}
            blending={THREE.NormalBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Atmospheric Rim Ozone Airglow */}
      <mesh>
        <sphereGeometry args={[2.62, 48, 48]} />
        <meshBasicMaterial
          color={planetId === 'earth' ? '#3984FF' : planetId === 'venus' ? '#F5C56A' : planetId === 'mars' ? '#E05638' : '#5B8CFF'}
          transparent
          opacity={0.16}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Saturn Concentric Translucent Rings */}
      {hasRings && ringsTexture && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.5, 6.8, 128]} />
          <meshStandardMaterial
            map={ringsTexture}
            side={THREE.DoubleSide}
            transparent
            opacity={0.94}
            roughness={0.5}
            metalness={0.08}
          />
        </mesh>
      )}
    </group>
  );
};

export const PlanetExplorer: React.FC<PlanetExplorerProps> = ({
  initialPlanetId = 'earth',
  onBackToSolarSystem,
  onSelectCelestialObject
}) => {
  const [selectedPlanetId, setSelectedPlanetId] = useState(initialPlanetId);
  const [activeTab, setActiveTab] = useState<'overview' | 'structure' | 'atmosphere' | 'surface' | 'moons' | 'history'>('overview');
  const [isPaused, setIsPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const controlsRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const auth = AuthManager.getInstance();
  const student = auth.getCurrentStudent();

  const planet = useMemo(() => {
    return PLANETS_DATA.find(p => p.id === selectedPlanetId) || PLANETS_DATA[2];
  }, [selectedPlanetId]);

  // Record exploration in student portfolio
  React.useEffect(() => {
    if (planet) {
      auth.recordExplored(planet.id);
    }
  }, [planet]);

  const isBookmarked = student?.bookmarks.includes(planet.id) || false;

  const handleToggleBookmark = () => {
    auth.toggleBookmark(planet.id);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 2000);
  };

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleZoom = (delta: number) => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object as THREE.PerspectiveCamera;
      if (camera) {
        camera.position.z = Math.max(3.8, Math.min(15, camera.position.z + delta));
        controlsRef.current.update();
      }
    }
  };

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const planetMoons = useMemo(() => {
    return MOONS_DATA.filter(m => m.parentObjectId === planet.id);
  }, [planet]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[calc(100vh-80px)] bg-[#03050B] text-cosmos-white flex flex-col lg:flex-row overflow-hidden select-none"
    >
      {/* 1. LEFT & CENTER 3D INTERACTIVE GLOBE VIEWPORT */}
      <div className="relative flex-1 h-full min-h-[50vh] overflow-hidden">
        {/* Top Floating Breadcrumb & Planet Selector */}
        <div className="absolute top-5 left-5 right-5 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          <div className="flex items-center space-x-2 pointer-events-auto">
            <button
              onClick={onBackToSolarSystem}
              className="hud-panel px-4 py-2 rounded-full border border-cosmos-border text-xs font-mono text-cosmos-muted hover:text-white transition flex items-center space-x-2 shadow-xl hover:border-cosmos-cyan/50"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>HELIOSPHERE MAP</span>
            </button>

            {/* Quick Planet Navigation Pills */}
            <div className="hidden sm:flex items-center space-x-1 hud-panel p-1 rounded-full border border-cosmos-border shadow-xl">
              {PLANETS_DATA.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlanetId(p.id)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
                    selectedPlanetId === p.id
                      ? 'bg-cosmos-cyan/20 text-cosmos-cyan border border-cosmos-cyan/50 font-bold shadow-cyan-glow'
                      : 'text-cosmos-muted hover:text-white'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Top Right Viewport Controls */}
          <div className="flex items-center space-x-1.5 pointer-events-auto hud-panel p-1 rounded-full border border-cosmos-border shadow-xl">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-full hover:bg-white/10 text-cosmos-white transition"
              title={isPaused ? 'Resume Rotation' : 'Pause Rotation'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-cosmos-cyan" />}
            </button>
            <button
              onClick={() => handleZoom(-1.5)}
              className="p-2 rounded-full hover:bg-white/10 text-cosmos-white transition"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleZoom(1.5)}
              className="p-2 rounded-full hover:bg-white/10 text-cosmos-white transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetCamera}
              className="p-2 rounded-full hover:bg-white/10 text-cosmos-muted hover:text-white transition"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleToggleFullscreen}
              className="p-2 rounded-full hover:bg-white/10 text-cosmos-muted hover:text-white transition"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen Mode'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-cosmos-cyan" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* 3D Canvas with Realistic Directional Sunlight & Starfield */}
        <Canvas 
          camera={{ position: [0, 0, 7.2], fov: 42 }}
          gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping }}
        >
          {/* Ambient space illumination so dark side is visible with subtle airglow */}
          <ambientLight intensity={0.65} />

          {/* Primary Solar Directional Light (Sunlight) */}
          <directionalLight position={[10, 6, 8]} intensity={2.8} color="#FFFFFF" />

          {/* Soft cosmic diffuse fill light from deep space */}
          <directionalLight position={[-10, -6, -8]} intensity={0.35} color="#3984FF" />

          <Stars radius={140} depth={60} count={6000} factor={3.5} saturation={0.6} fade speed={0.6} />

          <PhotorealisticGlobe
            planetId={planet.id}
            tiltDeg={planet.id === 'venus' ? 177 : planet.id === 'uranus' ? 98 : planet.id === 'saturn' ? 26.7 : 23.4}
            hasRings={planet.id === 'saturn'}
            isPaused={isPaused}
          />

          <OrbitControls 
            ref={controlsRef}
            enableZoom={true} 
            enablePan={false} 
            minDistance={3.8} 
            maxDistance={15} 
            dampingFactor={0.06}
            enableDamping={true}
          />
        </Canvas>

        {/* Bottom Ambient HUD Cue */}
        <div className="absolute bottom-5 left-5 z-20 pointer-events-none text-[11px] font-mono text-cosmos-muted/70 tracking-widest flex items-center space-x-2">
          <Globe2 className="w-4 h-4 text-cosmos-cyan animate-spin-slow" />
          <span>DRAG GLOBE TO ROTATE • WHEEL TO ZOOM • TRUE COLOR SPECTRAL SHADER</span>
        </div>

        {/* Toast Alert */}
        {showSuccessToast && (
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30 hud-panel px-4 py-2 rounded-full border border-cosmos-gold/50 text-cosmos-gold text-xs font-mono shadow-2xl flex items-center space-x-2">
            <BookmarkCheck className="w-4 h-4" />
            <span>{isBookmarked ? 'Added to My Discoveries Portfolio' : 'Removed from Bookmarks'}</span>
          </div>
        )}
      </div>

      {/* 2. RIGHT SCIENTIFIC TELEMETRY & MULTI-TAB ARCHIVE */}
      <div className="w-full lg:w-[440px] h-[50vh] lg:h-full hud-panel border-t lg:border-t-0 lg:border-l border-cosmos-border flex flex-col z-20 overflow-hidden shadow-2xl shrink-0">
        {/* Panel Header */}
        <div className="p-6 border-b border-cosmos-border/50 space-y-2 shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-widest text-cosmos-cyan uppercase flex items-center space-x-1.5">
              <Compass className="w-3 h-3" />
              <span>SECTOR: SOLAR SYSTEM • {planet.scientificData?.parentPlanet || 'SOL'}</span>
            </span>
            <button
              onClick={handleToggleBookmark}
              className={`p-2 rounded-full border transition-all duration-300 ${
                isBookmarked
                  ? 'bg-cosmos-gold/20 border-cosmos-gold text-cosmos-gold shadow-sm'
                  : 'border-cosmos-border text-cosmos-muted hover:text-white hover:border-white/30'
              }`}
              title={isBookmarked ? 'Remove Bookmark' : 'Add to My Discoveries'}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-baseline space-x-3">
            <h2 className="text-3xl font-black font-display text-white tracking-tight">
              {planet.name}
            </h2>
            <span className="text-xs font-mono text-cosmos-cyan font-bold uppercase">
              {planet.category}
            </span>
          </div>
          <p className="text-xs text-cosmos-muted leading-relaxed font-light">
            {planet.tagline}
          </p>
        </div>

        {/* Primary Scientific Metrics Ribbon */}
        <div className="grid grid-cols-2 gap-2 p-5 pb-2 text-[11px] font-mono shrink-0">
          <div className="p-2.5 rounded-2xl bg-black/40 border border-white/5">
            <span className="text-[9px] text-cosmos-muted uppercase block">EQUATORIAL DIAMETER</span>
            <span className="text-white font-bold">{planet.scientificData?.diameterKm}</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-black/40 border border-white/5">
            <span className="text-[9px] text-cosmos-muted uppercase block">DISTANCE (SUN)</span>
            <span className="text-white font-bold">{planet.scientificData?.distanceFromSunAU}</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-black/40 border border-white/5">
            <span className="text-[9px] text-cosmos-muted uppercase block">SURFACE GRAVITY</span>
            <span className="text-white font-bold">{planet.scientificData?.gravityMps2}</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-black/40 border border-white/5">
            <span className="text-[9px] text-cosmos-muted uppercase block">MEAN TEMPERATURE</span>
            <span className="text-white font-bold">{planet.scientificData?.avgTempC}</span>
          </div>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="px-5 flex items-center space-x-1.5 border-b border-cosmos-border/40 pb-2 overflow-x-auto shrink-0">
          {(['overview', 'structure', 'atmosphere', 'surface', 'moons', 'history'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono capitalize transition-all duration-300 shrink-0 ${
                activeTab === tab
                  ? 'bg-cosmos-cyan/20 text-cosmos-cyan font-bold border border-cosmos-cyan/40 shadow-cyan-glow'
                  : 'text-cosmos-muted hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Scrollable Editorial Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 text-xs font-sans leading-relaxed text-cosmos-muted">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <p className="text-sm text-cosmos-white font-light leading-relaxed">
                {planet.overview}
              </p>
              
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[9px] font-mono text-cosmos-cyan uppercase tracking-widest block">
                    AXIAL ROTATION (DAY)
                  </span>
                  <span className="text-white font-bold font-mono text-xs">
                    {planet.scientificData?.rotationPeriodHours}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[9px] font-mono text-cosmos-cyan uppercase tracking-widest block">
                    ORBITAL PERIOD (YEAR)
                  </span>
                  <span className="text-white font-bold font-mono text-xs">
                    {planet.scientificData?.revolutionPeriodDays}
                  </span>
                </div>
              </div>

              {/* Interesting Astronomical Facts */}
              <div className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-2">
                <span className="text-[10px] font-mono text-cosmos-gold uppercase tracking-widest flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cosmos-gold" />
                  <span>PROMINENT OBSERVATIONAL FACTS</span>
                </span>
                <ul className="space-y-2 text-xs text-cosmos-white/90 font-light">
                  {planet.interestingFacts.slice(0, 3).map((fact, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cosmos-cyan shrink-0 mt-1.5" />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'structure' && (
            <div className="space-y-4">
              <h4 className="font-mono text-cosmos-cyan uppercase tracking-wider text-xs flex items-center space-x-2">
                <Layers className="w-3.5 h-3.5" />
                <span>INTERNAL STRATIGRAPHY & CORE</span>
              </h4>
              <p className="text-sm text-cosmos-white font-light leading-relaxed">
                {planet.structure || 'Core, mantle, and crustal strata modeled from gravitational and seismic telemetry.'}
              </p>
              
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                <span className="text-[10px] font-mono text-cosmos-muted uppercase block">CORE DYNAMICS</span>
                <p className="text-xs text-cosmos-white font-light">
                  {planet.id === 'earth' 
                    ? 'Dense metallic iron-nickel inner core (solid, 5,400°C) surrounded by a convective liquid outer core that powers Earth’s protective magnetosphere via geodynamo action.'
                    : planet.id === 'jupiter' || planet.id === 'saturn'
                    ? 'Enormous central rocky/icy core shrouded by liquid metallic hydrogen at extreme pressures exceeding 4 million atmospheres.'
                    : 'Dense metallic silicate core under planetary compressive equilibrium.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'atmosphere' && (
            <div className="space-y-4">
              <h4 className="font-mono text-cosmos-cyan uppercase tracking-wider text-xs">
                ATMOSPHERIC COMPOSITION & DYNAMICS
              </h4>
              <p className="text-sm text-cosmos-white font-light leading-relaxed">
                {planet.atmosphere || 'Atmospheric spectrometry reveals complex gas stratigraphy.'}
              </p>

              {planet.scientificData?.atmosphereComposition && (
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-mono text-cosmos-muted uppercase tracking-wider block">
                    PRINCIPAL CHEMICAL CONSTITUENTS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {planet.scientificData.atmosphereComposition.map((gas, i) => (
                      <span 
                        key={i} 
                        className="px-3.5 py-1.5 rounded-xl bg-cosmos-electric/15 border border-cosmos-electric/30 font-mono text-xs text-cosmos-white font-medium"
                      >
                        {gas}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'surface' && (
            <div className="space-y-4">
              <h4 className="font-mono text-cosmos-cyan uppercase tracking-wider text-xs">
                SURFACE FEATURES & TOPOGRAPHY
              </h4>
              <p className="text-sm text-cosmos-white font-light leading-relaxed">
                {planet.surfaceFeatures || 'Topographical radar scan profiles currently mapped.'}
              </p>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                <span className="text-[10px] font-mono text-cosmos-cyan uppercase tracking-widest block">
                  GEOLOGICAL ACTIVITY
                </span>
                <p className="text-xs text-cosmos-white font-light">
                  {planet.id === 'earth'
                    ? 'Active continental plate tectonics, oceanic spreading ridges, subduction zones, and active volcanism.'
                    : planet.id === 'mars'
                    ? 'Extinct shield volcanoes including Olympus Mons (21.9 km high) and Valles Marineris canyon system (4,000 km long).'
                    : planet.id === 'venus'
                    ? 'Resurfaced volcanic plains with over 1,600 major volcanoes, pancake domes, and extensive lava channels.'
                    : 'Dynamic fluid atmosphere without a solid physical boundary.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'moons' && (
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-cosmos-cyan uppercase tracking-widest block">
                NATURAL SATELLITES ({planet.scientificData?.knownMoonsCount || 0} CONFIRMED)
              </span>
              {planetMoons.length > 0 ? (
                <div className="space-y-2">
                  {planetMoons.map((moon) => (
                    <div
                      key={moon.id}
                      onClick={() => onSelectCelestialObject?.(moon.id)}
                      className="p-3.5 rounded-2xl bg-black/40 border border-white/5 hover:border-cosmos-cyan/40 transition-all duration-300 cursor-pointer flex items-center justify-between group hover:shadow-cyan-glow"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: moon.color }} />
                        <div>
                          <h5 className="font-bold text-white text-xs group-hover:text-cosmos-cyan transition">
                            {moon.name}
                          </h5>
                          <span className="text-[10px] font-mono text-cosmos-muted">{moon.tagline}</span>
                        </div>
                      </div>
                      <span className="text-cosmos-cyan font-mono text-xs group-hover:translate-x-1 transition font-bold">
                        Inspect →
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-black/30 border border-white/5 text-xs text-cosmos-muted font-mono">
                  No major spherical natural satellites orbit this body.
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-3">
              <h4 className="font-mono text-cosmos-cyan uppercase tracking-wider text-xs">
                CHRONOLOGY OF ROBOTIC & CREWED EXPLORATION
              </h4>
              <div className="space-y-2">
                {planet.explorationHistory && planet.explorationHistory.length > 0 ? (
                  planet.explorationHistory.map((mission, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-black/40 border border-white/5 text-xs text-cosmos-white flex items-start space-x-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cosmos-electric shrink-0 mt-1.5" />
                      <span className="leading-relaxed font-light">{mission}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-cosmos-muted font-mono">Historical mission telemetry compiling.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
