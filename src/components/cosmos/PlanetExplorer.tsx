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
  Globe2
} from 'lucide-react';

interface PlanetExplorerProps {
  initialPlanetId?: string;
  onBackToSolarSystem: () => void;
  onSelectCelestialObject?: (id: string) => void;
}

// 3D Photorealistic Single Planet Globe
const PhotorealisticGlobe: React.FC<{
  planetId: string;
  color: string;
  tiltDeg: number;
  hasRings?: boolean;
}> = ({ planetId, color, tiltDeg, hasRings }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Load procedural textures
  const texture = useMemo(() => {
    if (planetId === 'earth') return getCelestialTexture('earth');
    if (planetId === 'mars') return getCelestialTexture('mars');
    if (planetId === 'jupiter') return getCelestialTexture('jupiter');
    if (planetId === 'saturn') return getCelestialTexture('saturn');
    return getCelestialTexture('generic');
  }, [planetId]);

  const cloudTexture = useMemo(() => {
    return planetId === 'earth' ? getCelestialTexture('earth_clouds') : null;
  }, [planetId]);

  const ringsTexture = useMemo(() => {
    return hasRings ? getSaturnRingsTexture() : null;
  }, [hasRings]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.32; // Clouds rotate slightly faster
    }
  });

  return (
    <group rotation={[0, 0, THREE.MathUtils.degToRad(tiltDeg)]}>
      {/* Planetary Surface Globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          color={color}
          roughness={planetId === 'earth' ? 0.45 : 0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Earth Cloud Layer with Transparency */}
      {planetId === 'earth' && cloudTexture && (
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[2.535, 64, 64]} />
          <meshStandardMaterial
            map={cloudTexture}
            transparent
            opacity={0.85}
            blending={THREE.NormalBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Atmospheric Rim Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.62, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Saturn Photorealistic Rings */}
      {hasRings && ringsTexture && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.6, 6.6, 96]} />
          <meshStandardMaterial
            map={ringsTexture}
            side={THREE.DoubleSide}
            transparent
            opacity={0.92}
            roughness={0.5}
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
  
  const auth = AuthManager.getInstance();
  const student = auth.getCurrentStudent();

  const planet = useMemo(() => {
    return PLANETS_DATA.find(p => p.id === selectedPlanetId) || PLANETS_DATA[2];
  }, [selectedPlanetId]);

  // Record exploration in student history
  React.useEffect(() => {
    if (planet) {
      auth.recordExplored(planet.id);
    }
  }, [planet]);

  const isBookmarked = student?.bookmarks.includes(planet.id) || false;

  const handleToggleBookmark = () => {
    auth.toggleBookmark(planet.id);
  };

  const planetMoons = useMemo(() => {
    return MOONS_DATA.filter(m => m.parentObjectId === planet.id);
  }, [planet]);

  return (
    <div className="relative w-full h-[calc(100vh-80px)] bg-[#03050B] text-cosmos-white flex overflow-hidden">
      {/* 1. LEFT & CENTER FULL 3D INTERACTIVE GLOBE VIEWPORT */}
      <div className="relative flex-1 h-full">
        {/* Top Floating Breadcrumb & Planet Selector */}
        <div className="absolute top-6 left-6 z-20 flex items-center space-x-3 pointer-events-auto">
          <button
            onClick={onBackToSolarSystem}
            className="hud-panel px-4 py-2 rounded-full border border-cosmos-border text-xs font-mono text-cosmos-muted hover:text-white transition flex items-center space-x-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>HELIOSPHERE MAP</span>
          </button>

          {/* Quick Planet Pills */}
          <div className="hidden md:flex items-center space-x-1.5 hud-panel px-3 py-1.5 rounded-full border border-cosmos-border">
            {PLANETS_DATA.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPlanetId(p.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
                  selectedPlanetId === p.id
                    ? 'bg-cosmos-cyan/20 text-cosmos-cyan border border-cosmos-cyan/50 font-bold'
                    : 'text-cosmos-muted hover:text-white'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Canvas */}
        <Canvas camera={{ position: [0, 0, 7.5], fov: 42 }}>
          <ambientLight intensity={0.35} />
          <pointLight position={[12, 10, 10]} intensity={2.2} color="#FFF8E7" />
          <Stars radius={120} depth={50} count={5000} factor={3} saturation={0.5} fade />
          <PhotorealisticGlobe
            planetId={planet.id}
            color={planet.color}
            tiltDeg={planet.id === 'venus' ? 177 : planet.id === 'uranus' ? 98 : 24}
            hasRings={planet.id === 'saturn'}
          />
          <OrbitControls enableZoom={true} enablePan={false} minDistance={4.2} maxDistance={16} />
        </Canvas>

        {/* Bottom Ambient HUD Cue */}
        <div className="absolute bottom-6 left-6 z-20 pointer-events-none text-[11px] font-mono text-cosmos-muted/60 tracking-widest flex items-center space-x-2">
          <Globe2 className="w-4 h-4 text-cosmos-cyan" />
          <span>DRAG GLOBE TO ROTATE • WHEEL TO ZOOM SURFACES</span>
        </div>
      </div>

      {/* 2. RIGHT CONTEXTUAL SCIENTIFIC TELEMETRY PANEL */}
      <div className="w-[420px] h-full hud-panel border-l border-cosmos-border flex flex-col z-20 overflow-hidden shadow-2xl">
        {/* Panel Header */}
        <div className="p-6 border-b border-cosmos-border/50 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-widest text-cosmos-cyan uppercase">
              SECTOR: SOLAR SYSTEM
            </span>
            <button
              onClick={handleToggleBookmark}
              className={`p-2 rounded-full border transition ${
                isBookmarked
                  ? 'bg-cosmos-gold/20 border-cosmos-gold/50 text-cosmos-gold'
                  : 'border-cosmos-border text-cosmos-muted hover:text-white'
              }`}
              title={isBookmarked ? 'Remove Bookmark' : 'Add to My Discoveries'}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>

          <h2 className="text-3xl font-black font-display text-white">
            {planet.name}
          </h2>
          <p className="text-xs text-cosmos-muted leading-relaxed">
            {planet.tagline}
          </p>
        </div>

        {/* Scientific Metric Badges */}
        <div className="grid grid-cols-2 gap-2 p-6 pb-2 text-[11px] font-mono">
          <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
            <span className="text-[9px] text-cosmos-muted uppercase block">EQUATORIAL DIAMETER</span>
            <span className="text-white font-bold">{planet.scientificData?.diameterKm}</span>
          </div>
          <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
            <span className="text-[9px] text-cosmos-muted uppercase block">ORBITAL RADIUS</span>
            <span className="text-white font-bold">{planet.scientificData?.distanceFromSunAU}</span>
          </div>
          <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
            <span className="text-[9px] text-cosmos-muted uppercase block">SURFACE GRAVITY</span>
            <span className="text-white font-bold">{planet.scientificData?.gravityMps2}</span>
          </div>
          <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
            <span className="text-[9px] text-cosmos-muted uppercase block">MEAN TEMPERATURE</span>
            <span className="text-white font-bold">{planet.scientificData?.avgTempC}</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 flex items-center space-x-2 border-b border-cosmos-border/40 pb-2 overflow-x-auto">
          {(['overview', 'structure', 'atmosphere', 'surface', 'moons', 'history'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono capitalize transition-all duration-300 shrink-0 ${
                activeTab === tab
                  ? 'bg-cosmos-cyan/20 text-cosmos-cyan font-bold border border-cosmos-cyan/40'
                  : 'text-cosmos-muted hover:text-white'
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
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                <span className="text-[10px] font-mono text-cosmos-cyan uppercase tracking-widest block">
                  ORBITAL PERIOD (YEAR)
                </span>
                <span className="text-white font-bold font-mono">
                  {planet.scientificData?.revolutionPeriodDays}
                </span>
              </div>
            </div>
          )}

          {activeTab === 'structure' && (
            <div className="space-y-3">
              <h4 className="font-mono text-cosmos-cyan uppercase tracking-wider text-xs">
                CORE & MANTLE COMPOSITION
              </h4>
              <p className="text-cosmos-white font-light leading-relaxed">
                {planet.structure}
              </p>
            </div>
          )}

          {activeTab === 'atmosphere' && (
            <div className="space-y-4">
              <h4 className="font-mono text-cosmos-cyan uppercase tracking-wider text-xs">
                ATMOSPHERIC COMPOSITION & DYNAMICS
              </h4>
              <p className="text-cosmos-white font-light leading-relaxed">
                {planet.atmosphere}
              </p>
              {planet.scientificData?.atmosphereComposition && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {planet.scientificData.atmosphereComposition.map((gas, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-cosmos-white">
                      {gas}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'surface' && (
            <div className="space-y-3">
              <h4 className="font-mono text-cosmos-cyan uppercase tracking-wider text-xs">
                SURFACE FEATURES & TOPOGRAPHY
              </h4>
              <p className="text-cosmos-white font-light leading-relaxed">
                {planet.surfaceFeatures || 'Topographical radar scan profiles currently processing.'}
              </p>
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
                      className="p-3 rounded-2xl bg-black/40 border border-white/5 hover:border-cosmos-cyan/40 transition cursor-pointer flex items-center justify-between group"
                    >
                      <div>
                        <h5 className="font-bold text-white text-xs group-hover:text-cosmos-cyan transition">
                          {moon.name}
                        </h5>
                        <span className="text-[10px] font-mono text-cosmos-muted">{moon.tagline}</span>
                      </div>
                      <span className="text-cosmos-cyan font-mono text-xs group-hover:translate-x-1 transition">
                        Inspect →
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-cosmos-muted font-mono">
                  No major spherical natural satellites orbit this body.
                </p>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-3">
              <h4 className="font-mono text-cosmos-cyan uppercase tracking-wider text-xs">
                CHRONOLOGY OF ROBOTIC MISSIONS
              </h4>
              <div className="space-y-2">
                {planet.explorationHistory?.map((mission, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-black/40 border border-white/5 text-xs text-cosmos-white">
                    {mission}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
