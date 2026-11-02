// ============================================================
// SPACE EXPLORER — PLANET EXPLORER & MOONS
// ============================================================

import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { PLANETS_DATA, MOONS_DATA } from '@/data/celestialData';
import { AuthManager } from '@/systems/auth/AuthManager';
import { 
  Bookmark, 
  BookmarkCheck, 
  ArrowLeft, 
  Compass, 
  Layers, 
  Wind, 
  Moon as MoonIcon, 
  History, 
  Lightbulb, 
  Sparkles,
  Thermometer,
  Gauge,
  Orbit
} from 'lucide-react';

interface PlanetExplorerProps {
  initialPlanetId?: string;
  onBackToSolarSystem: () => void;
  onSelectCelestialObject?: (id: string) => void;
}

// 3D Single Planet Rotating Sphere
const SinglePlanetMesh: React.FC<{
  color: string;
  tiltDeg: number;
  hasRings?: boolean;
  ringsInner?: number;
  ringsOuter?: number;
}> = ({ color, tiltDeg, hasRings, ringsInner = 2.4, ringsOuter = 4.2 }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.45;
    }
  });

  const ringsGeometry = useMemo(() => {
    if (!hasRings) return null;
    const ring = new THREE.RingGeometry(ringsInner, ringsOuter, 64);
    ring.rotateX(Math.PI / 2);
    return ring;
  }, [hasRings, ringsInner, ringsOuter]);

  return (
    <group rotation={[0, 0, THREE.MathUtils.degToRad(tiltDeg)]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshStandardMaterial
          color={color}
          roughness={0.65}
          metalness={0.2}
          bumpScale={0.05}
        />
      </mesh>

      {/* Atmospheric Faint Glow */}
      <mesh>
        <sphereGeometry args={[2.28, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} />
      </mesh>

      {/* Saturn Rings */}
      {hasRings && ringsGeometry && (
        <mesh geometry={ringsGeometry}>
          <meshStandardMaterial
            color="#CBB282"
            side={THREE.DoubleSide}
            transparent
            opacity={0.8}
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
  const [activeTab, setActiveTab] = useState<'overview' | 'structure' | 'atmosphere' | 'moons' | 'history' | 'facts'>('overview');
  
  const auth = AuthManager.getInstance();
  const student = auth.getCurrentStudent();

  const planet = useMemo(() => {
    return PLANETS_DATA.find(p => p.id === selectedPlanetId) || PLANETS_DATA[2]; // Default Earth
  }, [selectedPlanetId]);

  // Record this planet as explored in student's profile
  React.useEffect(() => {
    if (planet) {
      auth.recordExplored(planet.id);
    }
  }, [planet]);

  const isBookmarked = student?.bookmarks.includes(planet.id) || false;

  const handleToggleBookmark = () => {
    auth.toggleBookmark(planet.id);
  };

  // Associated moons
  const planetMoons = useMemo(() => {
    return MOONS_DATA.filter(m => m.scientificData?.parentPlanet?.toLowerCase() === planet.name.toLowerCase());
  }, [planet]);

  return (
    <div className="w-full h-full flex flex-col font-sans text-cosmos-text overflow-hidden">
      {/* Top Breadcrumb & Planet Selector Bar */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-cosmos-border/60 bg-cosmos-subdark/60 backdrop-blur-md shrink-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBackToSolarSystem}
            className="p-2 rounded-xl border border-cosmos-border bg-cosmos-card/80 hover:bg-cosmos-card text-cosmos-muted hover:text-white transition flex items-center space-x-1.5 text-xs font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Solar System</span>
          </button>

          <div className="h-5 w-px bg-cosmos-border" />

          {/* Planet Switcher Chips */}
          <div className="flex items-center space-x-1 overflow-x-auto py-1">
            {PLANETS_DATA.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPlanetId(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition flex items-center space-x-1.5 ${
                  selectedPlanetId === p.id
                    ? 'bg-cosmos-blue text-white shadow-cosmos-glow'
                    : 'text-cosmos-muted hover:text-white hover:bg-cosmos-card'
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                <span>{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bookmark CTA */}
        <button
          onClick={handleToggleBookmark}
          className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center space-x-2 transition ${
            isBookmarked
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
              : 'bg-cosmos-card border-cosmos-border text-cosmos-muted hover:text-white'
          }`}
        >
          {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
          <span>{isBookmarked ? 'BOOKMARKED' : 'BOOKMARK OBJECT'}</span>
        </button>
      </header>

      {/* Main Exploration Split View */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 overflow-hidden">
        {/* Left Column: Interactive 3D Planet Stage */}
        <div className="lg:col-span-5 h-[360px] lg:h-full relative rounded-2xl overflow-hidden border border-cosmos-border bg-gradient-to-b from-cosmos-card/80 to-cosmos-dark shadow-2xl flex flex-col">
          <div className="absolute top-4 left-4 z-10">
            <span className="text-[10px] font-mono tracking-widest text-cosmos-cyan uppercase">3D PLANETARY MODEL</span>
            <h2 className="text-2xl font-black text-white">{planet.name}</h2>
            <p className="text-xs text-cosmos-muted">{planet.tagline}</p>
          </div>

          <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
            <ambientLight intensity={0.35} />
            <pointLight position={[10, 10, 10]} intensity={1.8} color="#FFF8E7" />
            <Stars radius={100} depth={40} count={3000} factor={3} saturation={0.4} fade />
            <SinglePlanetMesh
              color={planet.color}
              tiltDeg={planet.id === 'venus' ? 177 : planet.id === 'uranus' ? 98 : 24}
              hasRings={planet.id === 'saturn'}
            />
            <OrbitControls enableZoom={true} enablePan={false} minDistance={3.5} maxDistance={14} />
          </Canvas>

          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-cosmos-muted font-mono pointer-events-none">
            <span>DRAG TO ROTATE • SCROLL TO ZOOM</span>
            <span className="text-cosmos-cyan">REAL-TIME SHADING</span>
          </div>
        </div>

        {/* Right Column: Tabbed Scientific Knowledge & Moons */}
        <div className="lg:col-span-7 flex flex-col overflow-hidden glass-panel rounded-2xl border border-cosmos-border p-6 shadow-2xl">
          {/* Scientific Quick Spec Ribbons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="p-3 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60">
              <div className="flex items-center space-x-1.5 text-cosmos-cyan text-xs mb-1">
                <Compass className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono uppercase">DIAMETER</span>
              </div>
              <span className="text-sm font-bold text-white font-mono">{planet.scientificData?.diameterKm}</span>
            </div>

            <div className="p-3 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60">
              <div className="flex items-center space-x-1.5 text-cosmos-blue text-xs mb-1">
                <Orbit className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono uppercase">DISTANCE</span>
              </div>
              <span className="text-sm font-bold text-white font-mono">{planet.scientificData?.distanceFromSunAU}</span>
            </div>

            <div className="p-3 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60">
              <div className="flex items-center space-x-1.5 text-amber-400 text-xs mb-1">
                <Thermometer className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono uppercase">AVG TEMP</span>
              </div>
              <span className="text-sm font-bold text-white font-mono">{planet.scientificData?.avgTempC}</span>
            </div>

            <div className="p-3 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60">
              <div className="flex items-center space-x-1.5 text-cosmos-violet text-xs mb-1">
                <Gauge className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono uppercase">GRAVITY</span>
              </div>
              <span className="text-sm font-bold text-white font-mono">{planet.scientificData?.gravityMps2}</span>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex items-center space-x-2 border-b border-cosmos-border pb-3 mb-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 shrink-0 ${
                activeTab === 'overview' ? 'bg-cosmos-blue text-white' : 'text-cosmos-muted hover:text-white'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('structure')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 shrink-0 ${
                activeTab === 'structure' ? 'bg-cosmos-blue text-white' : 'text-cosmos-muted hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Structure</span>
            </button>
            <button
              onClick={() => setActiveTab('atmosphere')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 shrink-0 ${
                activeTab === 'atmosphere' ? 'bg-cosmos-blue text-white' : 'text-cosmos-muted hover:text-white'
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Atmosphere</span>
            </button>
            <button
              onClick={() => setActiveTab('moons')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 shrink-0 ${
                activeTab === 'moons' ? 'bg-cosmos-blue text-white' : 'text-cosmos-muted hover:text-white'
              }`}
            >
              <MoonIcon className="w-3.5 h-3.5" />
              <span>Moons ({planet.scientificData?.knownMoonsCount || 0})</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 shrink-0 ${
                activeTab === 'history' ? 'bg-cosmos-blue text-white' : 'text-cosmos-muted hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Exploration</span>
            </button>
            <button
              onClick={() => setActiveTab('facts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 shrink-0 ${
                activeTab === 'facts' ? 'bg-cosmos-blue text-white' : 'text-cosmos-muted hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interesting Facts</span>
            </button>
          </div>

          {/* Tab Content Display (Scrollable) */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <p className="text-sm text-cosmos-text leading-relaxed font-sans">{planet.overview}</p>
                <div className="p-4 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60 space-y-2">
                  <h4 className="text-xs font-semibold text-cosmos-cyan tracking-wider uppercase">Rotational Dynamics</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-cosmos-muted block">Sidereal Rotation Period:</span>
                      <span className="font-mono text-white">{planet.scientificData?.rotationPeriodHours}</span>
                    </div>
                    <div>
                      <span className="text-cosmos-muted block">Orbital Revolution (Year):</span>
                      <span className="font-mono text-white">{planet.scientificData?.revolutionPeriodDays}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'structure' && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-cosmos-cyan tracking-wider uppercase">Internal Geophysics</h4>
                <p className="text-sm text-cosmos-text leading-relaxed">{planet.structure || 'Internal structure profile being computed by planetary geological models.'}</p>
              </div>
            )}

            {activeTab === 'atmosphere' && (
              <div className="space-y-4">
                <p className="text-sm text-cosmos-text leading-relaxed">{planet.atmosphere || 'Atmospheric analysis underway.'}</p>
                {planet.scientificData?.atmosphereComposition && (
                  <div className="p-4 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60">
                    <h5 className="text-xs font-semibold text-cosmos-cyan mb-2">CHEMICAL COMPOSITION</h5>
                    <div className="flex flex-wrap gap-2">
                      {planet.scientificData.atmosphereComposition.map((gas, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-cosmos-card border border-cosmos-border text-xs font-mono text-cosmos-text">
                          {gas}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'moons' && (
              <div className="space-y-3">
                <p className="text-xs text-cosmos-muted">
                  Known confirmed natural satellites: <span className="font-bold text-white">{planet.scientificData?.knownMoonsCount || 0}</span>
                </p>
                {planetMoons.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {planetMoons.map(moon => (
                      <div key={moon.id} className="p-3.5 rounded-xl bg-cosmos-subdark/80 border border-cosmos-border/60 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-bold text-white text-xs">{moon.name}</h5>
                            <span className="text-[10px] font-mono text-cosmos-cyan">{moon.scientificData?.diameterKm}</span>
                          </div>
                          <p className="text-[11px] text-cosmos-muted line-clamp-2 leading-normal mb-2">{moon.overview}</p>
                        </div>
                        <button
                          onClick={() => onSelectCelestialObject?.(moon.id)}
                          className="text-[11px] font-semibold text-cosmos-blue hover:text-cosmos-cyan transition text-left"
                        >
                          View Moon Details →
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-cosmos-subdark/40 border border-dashed border-cosmos-border text-center text-xs text-cosmos-muted">
                    No major spherical moons documented for this planetary body.
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-cosmos-cyan tracking-wider uppercase">Key Astronomical Missions</h4>
                <div className="space-y-2">
                  {planet.explorationHistory && planet.explorationHistory.length > 0 ? (
                    planet.explorationHistory.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-cosmos-subdark/70 border border-cosmos-border/50 text-xs text-cosmos-text flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cosmos-blue mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-cosmos-muted">Mission chronology currently cataloging.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'facts' && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-cosmos-cyan tracking-wider uppercase">Astronomical Highlights</h4>
                <div className="space-y-2">
                  {planet.interestingFacts.map((fact, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-cosmos-subdark/70 border border-cosmos-border/50 text-xs text-cosmos-text flex items-start space-x-2.5">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{fact}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
