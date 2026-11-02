// ============================================================
// SPACE EXPLORER — INTERACTIVE 3D SOLAR SYSTEM (THREE.JS / R3F)
// ============================================================

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, Info, Sparkles, ArrowRight } from 'lucide-react';
import { PLANETS_DATA } from '@/data/celestialData';
import { CelestialObject } from '@/types/cosmos';

interface SolarSystem3DProps {
  onSelectPlanet?: (planetId: string) => void;
  selectedPlanetId?: string | null;
  onNavigateToExplorer?: (planetId: string) => void;
}

interface PlanetConfig {
  id: string;
  name: string;
  radius: number;
  orbitRadius: number;
  color: string;
  speed: number;
  tiltDeg: number;
  hasRings?: boolean;
  ringsInner?: number;
  ringsOuter?: number;
  ringsColor?: string;
}

// Visually balanced presentation scale (clearly disclosed as artistic/exhibition scale)
const PLANET_CONFIGS: PlanetConfig[] = [
  { id: 'mercury', name: 'Mercury', radius: 0.7, orbitRadius: 10, color: '#A8A9AD', speed: 1.6, tiltDeg: 0.03 },
  { id: 'venus', name: 'Venus', radius: 1.1, orbitRadius: 15, color: '#E3BB7B', speed: 1.17, tiltDeg: 177.3 },
  { id: 'earth', name: 'Earth', radius: 1.2, orbitRadius: 21, color: '#2B82C9', speed: 1.0, tiltDeg: 23.44 },
  { id: 'mars', name: 'Mars', radius: 0.9, orbitRadius: 27, color: '#E25B38', speed: 0.8, tiltDeg: 25.19 },
  { id: 'jupiter', name: 'Jupiter', radius: 2.8, orbitRadius: 36, color: '#D4A373', speed: 0.43, tiltDeg: 3.13 },
  { 
    id: 'saturn', 
    name: 'Saturn', 
    radius: 2.3, 
    orbitRadius: 46, 
    color: '#E0C588', 
    speed: 0.32, 
    tiltDeg: 26.73, 
    hasRings: true, 
    ringsInner: 3.0, 
    ringsOuter: 5.2, 
    ringsColor: '#CBB282' 
  },
  { id: 'uranus', name: 'Uranus', radius: 1.6, orbitRadius: 56, color: '#7AC5CD', speed: 0.22, tiltDeg: 97.77 },
  { id: 'neptune', name: 'Neptune', radius: 1.5, orbitRadius: 65, color: '#4973FF', speed: 0.18, tiltDeg: 28.32 },
];

// Orbital Path Ring Component
const OrbitRing: React.FC<{ radius: number }> = ({ radius }) => {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.05, radius + 0.05, 96]} />
      <meshBasicMaterial color="#3984FF" side={THREE.DoubleSide} transparent opacity={0.2} />
    </mesh>
  );
};

// Saturn Rings Component
const SaturnRings: React.FC<{ innerRadius: number; outerRadius: number; color: string }> = ({
  innerRadius,
  outerRadius,
  color
}) => {
  const geometry = useMemo(() => {
    const ringGeo = new THREE.RingGeometry(innerRadius, outerRadius, 64);
    // Orient ring horizontally
    ringGeo.rotateX(Math.PI / 2);
    return ringGeo;
  }, [innerRadius, outerRadius]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={color}
        side={THREE.DoubleSide}
        transparent
        opacity={0.78}
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
};

// Planet Mesh Component
const PlanetMesh: React.FC<{
  config: PlanetConfig;
  isPaused: boolean;
  speedMultiplier: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
  hoveredPlanet: string | null;
  setHoveredPlanet: (id: string | null) => void;
}> = ({
  config,
  isPaused,
  speedMultiplier,
  isSelected,
  onSelect,
  hoveredPlanet,
  setHoveredPlanet
}) => {
  const planetGroupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef<number>(Math.random() * Math.PI * 2);

  useFrame((_, delta) => {
    if (!isPaused) {
      // Orbital revolution
      angleRef.current += delta * 0.2 * config.speed * speedMultiplier;
      const x = Math.cos(angleRef.current) * config.orbitRadius;
      const z = Math.sin(angleRef.current) * config.orbitRadius;
      if (planetGroupRef.current) {
        planetGroupRef.current.position.set(x, 0, z);
      }

      // Axial rotation
      if (meshRef.current) {
        meshRef.current.rotation.y += delta * 0.8;
      }
    }
  });

  const isHovered = hoveredPlanet === config.id;

  return (
    <group ref={planetGroupRef}>
      {/* Axial tilt container */}
      <group rotation={[0, 0, THREE.MathUtils.degToRad(config.tiltDeg)]}>
        {/* Planet Sphere */}
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(config.id);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredPlanet(config.id);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHoveredPlanet(null);
            document.body.style.cursor = 'auto';
          }}
        >
          <sphereGeometry args={[config.radius, 48, 48]} />
          <meshStandardMaterial
            color={config.color}
            roughness={0.7}
            metalness={0.15}
            emissive={isSelected ? config.color : '#000000'}
            emissiveIntensity={isSelected ? 0.35 : 0}
          />
        </mesh>

        {/* Saturn Rings if applicable */}
        {config.hasRings && config.ringsInner && config.ringsOuter && (
          <SaturnRings
            innerRadius={config.ringsInner}
            outerRadius={config.ringsOuter}
            color={config.ringsColor || '#CBB282'}
          />
        )}
      </group>

      {/* Selection highlight ring */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[config.radius * 1.35, config.radius * 1.5, 32]} />
          <meshBasicMaterial color="#00E5FF" side={THREE.DoubleSide} transparent opacity={0.9} />
        </mesh>
      )}

      {/* Floating Planet Label */}
      <Billboard position={[0, config.radius + 1.2, 0]}>
        <Text
          fontSize={0.9}
          color={isSelected ? '#00E5FF' : isHovered ? '#F1F5FF' : '#98A7C0'}
          anchorX="center"
          anchorY="middle"
        >
          {config.name}
        </Text>
      </Billboard>
    </group>
  );
};

// Glowing Sun Component
const SunMesh: React.FC<{ onClick: () => void; isSelected?: boolean }> = ({ onClick }) => {
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group>
      {/* Central Sun Body */}
      <mesh
        ref={sunRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <sphereGeometry args={[4.2, 48, 48]} />
        <meshBasicMaterial color="#FFB300" />
      </mesh>

      {/* Atmospheric Coronal Glow Halo */}
      <mesh>
        <sphereGeometry args={[4.7, 32, 32]} />
        <meshBasicMaterial color="#FFA000" transparent opacity={0.25} />
      </mesh>
      <mesh>
        <sphereGeometry args={[5.4, 32, 32]} />
        <meshBasicMaterial color="#FF6F00" transparent opacity={0.12} />
      </mesh>

      {/* Sunlight Omni-directional Point Light */}
      <pointLight color="#FFF8E7" intensity={2.4} distance={300} decay={0.8} />

      <Billboard position={[0, 6.2, 0]}>
        <Text fontSize={1.1} color="#FFD54F" anchorX="center" anchorY="middle">
          The Sun
        </Text>
      </Billboard>
    </group>
  );
};

// Scene Wrapper with Camera Management
const SolarSystemScene: React.FC<{
  isPaused: boolean;
  speedMultiplier: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
  hoveredPlanet: string | null;
  setHoveredPlanet: (id: string | null) => void;
  controlsRef: React.RefObject<any>;
}> = ({
  isPaused,
  speedMultiplier,
  selectedId,
  onSelect,
  hoveredPlanet,
  setHoveredPlanet,
  controlsRef
}) => {
  return (
    <>
      <ambientLight intensity={0.25} />
      <Stars radius={250} depth={80} count={6000} factor={4} saturation={0.5} fade speed={1} />

      <SunMesh onClick={() => onSelect('sun')} isSelected={selectedId === 'sun'} />

      {/* Orbital paths and Planets */}
      {PLANET_CONFIGS.map((p) => (
        <React.Fragment key={p.id}>
          <OrbitRing radius={p.orbitRadius} />
          <PlanetMesh
            config={p}
            isPaused={isPaused}
            speedMultiplier={speedMultiplier}
            isSelected={selectedId === p.id}
            onSelect={onSelect}
            hoveredPlanet={hoveredPlanet}
            setHoveredPlanet={setHoveredPlanet}
          />
        </React.Fragment>
      ))}

      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={8}
        maxDistance={180}
        maxPolarAngle={Math.PI / 2 + 0.1}
      />
    </>
  );
};

export const SolarSystem3D: React.FC<SolarSystem3DProps> = ({
  onSelectPlanet,
  selectedPlanetId: controlledSelectedId,
  onNavigateToExplorer
}) => {
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>('earth');
  const [isPaused, setIsPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const controlsRef = useRef<any>(null);

  const selectedId = controlledSelectedId !== undefined ? controlledSelectedId : internalSelectedId;

  const handleSelectPlanet = (id: string) => {
    setInternalSelectedId(id);
    onSelectPlanet?.(id);

    // Smooth camera refocus toward the planet's general orbital distance
    if (controlsRef.current) {
      const conf = PLANET_CONFIGS.find((p) => p.id === id);
      if (conf) {
        controlsRef.current.target.set(0, 0, 0);
      }
    }
  };

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const selectedData: CelestialObject | undefined = useMemo(() => {
    if (!selectedId) return undefined;
    if (selectedId === 'sun') {
      return {
        id: 'sun',
        name: 'The Sun (Sol)',
        category: 'star',
        tagline: 'The Stellar Hearth of our Solar System',
        color: '#FFB300',
        overview: 'The Sun is a G-type main-sequence star (G2V) comprising 99.86% of the mass of the entire Solar System. Inside its core, thermonuclear fusion converts 600 million tons of hydrogen into helium every second.',
        scientificData: {
          diameterKm: '1,392,700 km (109 Earths)',
          distanceFromSunAU: '0.00 AU',
          avgTempC: '5,500°C (Surface) / 15,000,000°C (Core)',
          rotationPeriodHours: '25 to 35 days (Differential)',
          atmosphereComposition: ['Hydrogen 73.4%', 'Helium 25.0%', 'Oxygen 0.8%']
        },
        interestingFacts: [
          'About 1.3 million Earths could fit inside the Sun.',
          'Photons created in the core take over 100,000 years to reach the surface through radiative diffusion.',
          'Sunspots are temporary phenomena caused by intense magnetic field concentrations.'
        ]
      };
    }
    return PLANETS_DATA.find((p) => p.id === selectedId);
  }, [selectedId]);

  return (
    <div className="relative w-full h-full min-h-[580px] bg-cosmos-dark rounded-2xl overflow-hidden border border-cosmos-border shadow-2xl flex flex-col">
      {/* 3D Canvas Viewport */}
      <div className="relative flex-1 w-full h-full">
        <Canvas
          camera={{ position: [0, 42, 68], fov: 48 }}
          gl={{ antialias: true, alpha: false }}
          onPointerMissed={() => setInternalSelectedId(null)}
        >
          <SolarSystemScene
            isPaused={isPaused}
            speedMultiplier={speedMultiplier}
            selectedId={selectedId}
            onSelect={handleSelectPlanet}
            hoveredPlanet={hoveredPlanet}
            setHoveredPlanet={setHoveredPlanet}
            controlsRef={controlsRef}
          />
        </Canvas>

        {/* Top Controls Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center space-x-2 pointer-events-auto bg-cosmos-subdark/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-cosmos-border text-xs text-cosmos-text">
            <Sparkles className="w-4 h-4 text-cosmos-cyan" />
            <span className="font-semibold tracking-wide">3D LIVE ORBITS</span>
            <span className="text-cosmos-muted">|</span>
            <span className="font-mono text-cosmos-blue">
              {isPaused ? 'ORBITS PAUSED' : `${speedMultiplier}x VELOCITY`}
            </span>
          </div>

          {/* Play/Pause, Speed, Camera Reset */}
          <div className="flex items-center space-x-2 pointer-events-auto bg-cosmos-subdark/80 backdrop-blur-md p-1 rounded-xl border border-cosmos-border">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-lg hover:bg-cosmos-card text-cosmos-text transition"
              title={isPaused ? 'Resume Orbits' : 'Pause Orbits'}
            >
              {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4 text-cosmos-blue" />}
            </button>

            {/* Velocity Steppers */}
            <button
              onClick={() => setSpeedMultiplier((prev) => (prev >= 4 ? 0.5 : prev * 2))}
              className="px-2.5 py-1 text-xs font-mono rounded-lg hover:bg-cosmos-card text-cosmos-text transition"
              title="Cycle Orbital Speed"
            >
              {speedMultiplier}x
            </button>

            <button
              onClick={handleResetCamera}
              className="p-2 rounded-lg hover:bg-cosmos-card text-cosmos-muted hover:text-white transition"
              title="Reset Camera View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Left Planet Selector List */}
        <div className="absolute bottom-4 left-4 pointer-events-auto z-10 hidden sm:flex items-center space-x-1.5 p-1.5 rounded-2xl bg-cosmos-subdark/85 backdrop-blur-md border border-cosmos-border max-w-xl overflow-x-auto">
          <button
            onClick={() => handleSelectPlanet('sun')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
              selectedId === 'sun'
                ? 'bg-amber-500/30 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-cosmos-muted hover:text-white'
            }`}
          >
            Sun
          </button>
          {PLANET_CONFIGS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectPlanet(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition shrink-0 ${
                selectedId === p.id
                  ? 'bg-cosmos-blue/30 text-cosmos-cyan border border-cosmos-blue/40 shadow-sm'
                  : 'text-cosmos-muted hover:text-white'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Selected Planet Floating Card */}
        {selectedData && (
          <div className="absolute top-16 right-4 w-80 pointer-events-auto z-10 glass-panel p-4 rounded-2xl border border-cosmos-border shadow-2xl animate-fadeIn">
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-cosmos-cyan uppercase">
                  {selectedData.category}
                </span>
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <span>{selectedData.name}</span>
                </h3>
              </div>
              <div
                className="w-4 h-4 rounded-full border border-white/40 shadow-sm mt-1"
                style={{ backgroundColor: selectedData.color }}
              />
            </div>

            <p className="text-xs text-cosmos-muted mb-3 line-clamp-3 leading-relaxed">
              {selectedData.overview}
            </p>

            {/* Quick Scientific Metrics */}
            <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-cosmos-subdark/70 border border-cosmos-border/40 text-[11px] font-mono mb-3">
              <div>
                <span className="text-cosmos-muted/80 block text-[9px]">DIAMETER</span>
                <span className="text-white font-medium">{selectedData.scientificData?.diameterKm || 'N/A'}</span>
              </div>
              <div>
                <span className="text-cosmos-muted/80 block text-[9px]">DISTANCE</span>
                <span className="text-white font-medium">{selectedData.scientificData?.distanceFromSunAU || 'N/A'}</span>
              </div>
              <div>
                <span className="text-cosmos-muted/80 block text-[9px]">GRAVITY</span>
                <span className="text-white font-medium">{selectedData.scientificData?.gravityMps2 || 'N/A'}</span>
              </div>
              <div>
                <span className="text-cosmos-muted/80 block text-[9px]">AVG TEMP</span>
                <span className="text-white font-medium">{selectedData.scientificData?.avgTempC || 'N/A'}</span>
              </div>
            </div>

            {/* Explore Planet CTA */}
            {selectedData.category === 'planet' && onNavigateToExplorer && (
              <button
                onClick={() => onNavigateToExplorer(selectedData.id)}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-cosmos-blue to-cosmos-violet hover:from-blue-600 hover:to-purple-600 text-white text-xs font-semibold flex items-center justify-center space-x-2 transition shadow-cosmos-glow"
              >
                <span>EXPLORE {selectedData.name.toUpperCase()}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Scientific Scale Disclaimer Badge */}
        <div className="absolute bottom-3 right-4 pointer-events-none z-10 text-[10px] text-cosmos-muted/60 font-mono tracking-wider flex items-center space-x-1.5">
          <Info className="w-3 h-3 text-cosmos-muted/60" />
          <span>Note: Planetary distances and sizes are adapted for college exhibition viewing.</span>
        </div>
      </div>
    </div>
  );
};
