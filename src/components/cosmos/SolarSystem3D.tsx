// ============================================================
// SPACE EXPLORER — INTERACTIVE 3D PLANETARIUM SOLAR SYSTEM
// Realistic multi-layered planets, textures, rings, and orbital mechanics
// ============================================================

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  ArrowRight, 
  ZoomIn, 
  ZoomOut, 
  Tag, 
  CircleDot,
  Globe2
} from 'lucide-react';
import { PLANETS_DATA } from '@/data/celestialData';
import { getCelestialTexture, getSaturnRingsTexture } from '@/systems/rendering/CelestialTextures';

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
  textureType: string;
  colorFallback: string;
  speed: number;
  tiltDeg: number;
  hasRings?: boolean;
  ringsInner?: number;
  ringsOuter?: number;
  hasClouds?: boolean;
}

const PLANET_CONFIGS: PlanetConfig[] = [
  { id: 'mercury', name: 'Mercury', radius: 0.8, orbitRadius: 11, textureType: 'mercury', colorFallback: '#B0B0B5', speed: 1.6, tiltDeg: 0.03 },
  { id: 'venus', name: 'Venus', radius: 1.15, orbitRadius: 16.5, textureType: 'venus', colorFallback: '#E8C382', speed: 1.17, tiltDeg: 177.3 },
  { id: 'earth', name: 'Earth', radius: 1.25, orbitRadius: 23, textureType: 'earth', colorFallback: '#2E86DE', speed: 1.0, tiltDeg: 23.44, hasClouds: true },
  { id: 'mars', name: 'Mars', radius: 0.95, orbitRadius: 30, textureType: 'mars', colorFallback: '#E05638', speed: 0.8, tiltDeg: 25.19 },
  { id: 'jupiter', name: 'Jupiter', radius: 3.0, orbitRadius: 40, textureType: 'jupiter', colorFallback: '#D4A373', speed: 0.43, tiltDeg: 3.13 },
  { 
    id: 'saturn', 
    name: 'Saturn', 
    radius: 2.5, 
    orbitRadius: 52, 
    textureType: 'saturn', 
    colorFallback: '#E0C588', 
    speed: 0.32, 
    tiltDeg: 26.73, 
    hasRings: true, 
    ringsInner: 3.4, 
    ringsOuter: 6.2 
  },
  { id: 'uranus', name: 'Uranus', radius: 1.7, orbitRadius: 63, textureType: 'uranus', colorFallback: '#7AC5CD', speed: 0.22, tiltDeg: 97.77 },
  { id: 'neptune', name: 'Neptune', radius: 1.6, orbitRadius: 74, textureType: 'neptune', colorFallback: '#4973FF', speed: 0.18, tiltDeg: 28.32 },
];

// Concentric Orbit Track Ring
const OrbitTrack: React.FC<{ radius: number; isSelected: boolean }> = ({ radius, isSelected }) => {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.04, radius + 0.04, 128]} />
      <meshBasicMaterial
        color={isSelected ? '#61E6F2' : '#5B8CFF'}
        side={THREE.DoubleSide}
        transparent
        opacity={isSelected ? 0.6 : 0.16}
      />
    </mesh>
  );
};

// Saturn Photorealistic Rings
const SaturnRingsMesh: React.FC<{ inner: number; outer: number }> = ({ inner, outer }) => {
  const ringTexture = useMemo(() => getSaturnRingsTexture(), []);

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[inner, outer, 96]} />
      <meshStandardMaterial
        map={ringTexture}
        side={THREE.DoubleSide}
        transparent
        opacity={0.92}
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
};

// Realistic Textured Planet Mesh
const PlanetBody: React.FC<{
  config: PlanetConfig;
  isPaused: boolean;
  speedMultiplier: number;
  isSelected: boolean;
  showLabels: boolean;
  onSelect: (id: string) => void;
  hoveredPlanet: string | null;
  setHoveredPlanet: (id: string | null) => void;
}> = ({
  config,
  isPaused,
  speedMultiplier,
  isSelected,
  showLabels,
  onSelect,
  hoveredPlanet,
  setHoveredPlanet
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef<number>(Math.random() * Math.PI * 2);

  const texture = useMemo(() => getCelestialTexture(config.textureType), [config.textureType]);
  const cloudTexture = useMemo(() => config.hasClouds ? getCelestialTexture('earth_clouds') : null, [config.hasClouds]);

  useFrame((_, delta) => {
    if (!isPaused) {
      // Orbital revolution around Sun
      angleRef.current += delta * 0.18 * config.speed * speedMultiplier;
      const x = Math.cos(angleRef.current) * config.orbitRadius;
      const z = Math.sin(angleRef.current) * config.orbitRadius;
      if (groupRef.current) {
        groupRef.current.position.set(x, 0, z);
      }

      // Axial rotation
      if (sphereRef.current) {
        sphereRef.current.rotation.y += delta * 0.5;
      }

      // Cloud drift
      if (cloudRef.current) {
        cloudRef.current.rotation.y += delta * 0.65;
      }
    }
  });

  const isHovered = hoveredPlanet === config.id;

  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, THREE.MathUtils.degToRad(config.tiltDeg)]}>
        {/* Planet Surface Sphere */}
        <mesh
          ref={sphereRef}
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
          <sphereGeometry args={[config.radius, 64, 64]} />
          <meshStandardMaterial
            map={texture}
            color="#ffffff"
            roughness={0.55}
            metalness={0.06}
          />
        </mesh>

        {/* Earth Atmospheric Clouds Layer */}
        {config.hasClouds && cloudTexture && (
          <mesh ref={cloudRef}>
            <sphereGeometry args={[config.radius * 1.025, 48, 48]} />
            <meshStandardMaterial
              map={cloudTexture}
              transparent
              opacity={0.8}
              blending={THREE.NormalBlending}
              depthWrite={false}
            />
          </mesh>
        )}

        {/* Atmospheric Blue Rim Glow */}
        <mesh>
          <sphereGeometry args={[config.radius * 1.04, 32, 32]} />
          <meshBasicMaterial
            color={config.colorFallback}
            transparent
            opacity={0.14}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Saturn Ring System */}
        {config.hasRings && config.ringsInner && config.ringsOuter && (
          <SaturnRingsMesh inner={config.ringsInner} outer={config.ringsOuter} />
        )}
      </group>

      {/* Target Focus HUD Ring */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[config.radius * 1.45, config.radius * 1.6, 48]} />
          <meshBasicMaterial color="#61E6F2" side={THREE.DoubleSide} transparent opacity={0.85} />
        </mesh>
      )}

      {/* Billboard Floating HUD Label */}
      {showLabels && (
        <Billboard position={[0, config.radius + 1.4, 0]}>
          <Text
            fontSize={0.9}
            color={isSelected ? '#61E6F2' : isHovered ? '#FFFFFF' : '#A4B0C8'}
            anchorX="center"
            anchorY="middle"
          >
            {config.name}
          </Text>
        </Billboard>
      )}
    </group>
  );
};

// Grand Textured Sun Body & Corona
const GrandSun: React.FC<{ onClick: () => void; isSelected: boolean }> = ({ onClick }) => {
  const sunTexture = useMemo(() => getCelestialTexture('sun'), []);
  const sunMeshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (sunMeshRef.current) {
      sunMeshRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group>
      {/* Central Solar Sphere */}
      <mesh
        ref={sunMeshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <sphereGeometry args={[4.4, 64, 64]} />
        <meshBasicMaterial map={sunTexture} color="#FFB300" />
      </mesh>

      {/* Inner Coronal Halo */}
      <mesh>
        <sphereGeometry args={[4.9, 32, 32]} />
        <meshBasicMaterial color="#FFA000" transparent opacity={0.32} side={THREE.BackSide} />
      </mesh>

      {/* Outermost Atmospheric Plasma Glow */}
      <mesh>
        <sphereGeometry args={[5.8, 32, 32]} />
        <meshBasicMaterial color="#FF6F00" transparent opacity={0.16} side={THREE.BackSide} />
      </mesh>

      {/* Omnidirectional Solar Light */}
      <pointLight color="#FFF8E7" intensity={3.5} distance={500} decay={0.4} />

      <Billboard position={[0, 6.4, 0]}>
        <Text fontSize={1.1} color="#F5C56A" anchorX="center" anchorY="middle">
          The Sun (Sol)
        </Text>
      </Billboard>
    </group>
  );
};

// Camera Focus Controller
const CameraFocusController: React.FC<{
  targetRadius: number | null;
  controlsRef: React.RefObject<any>;
}> = ({ targetRadius, controlsRef }) => {
  useFrame(() => {
    if (targetRadius !== null && controlsRef.current) {
      const controls = controlsRef.current;
      const targetPos = new THREE.Vector3(targetRadius, 0, 0);
      controls.target.lerp(targetPos, 0.04);
      controls.update();
    }
  });
  return null;
};

export const SolarSystem3D: React.FC<SolarSystem3DProps> = ({
  onSelectPlanet,
  selectedPlanetId: controlledId,
  onNavigateToExplorer
}) => {
  const [internalId, setInternalId] = useState<string | null>('earth');
  const [isPaused, setIsPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  const [showOrbits, setShowOrbits] = useState(true);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const controlsRef = useRef<any>(null);

  const selectedId = controlledId !== undefined ? controlledId : internalId;

  const handleSelect = (id: string) => {
    setInternalId(id);
    onSelectPlanet?.(id);
  };

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      controlsRef.current.target.set(0, 0, 0);
      const cam = controlsRef.current.object as THREE.PerspectiveCamera;
      if (cam) {
        cam.position.set(0, 48, 76);
      }
      controlsRef.current.update();
    }
  };

  const handleZoom = (delta: number) => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object as THREE.PerspectiveCamera;
      if (camera) {
        camera.position.z = Math.max(15, Math.min(220, camera.position.z + delta));
        camera.position.y = Math.max(10, Math.min(120, camera.position.y + delta * 0.6));
        controlsRef.current.update();
      }
    }
  };

  const selectedData = useMemo(() => {
    if (!selectedId) return undefined;
    return PLANETS_DATA.find((p) => p.id === selectedId);
  }, [selectedId]);

  const selectedConfig = useMemo(() => {
    return PLANET_CONFIGS.find((p) => p.id === selectedId);
  }, [selectedId]);

  return (
    <div className="relative w-full h-[calc(100vh-80px)] bg-[#03050B] overflow-hidden select-none">
      {/* 3D Canvas Viewport */}
      <Canvas
        camera={{ position: [0, 48, 76], fov: 46 }}
        gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping }}
        onPointerMissed={() => setInternalId(null)}
      >
        <ambientLight intensity={0.55} />
        <Stars radius={300} depth={90} count={8000} factor={4} saturation={0.6} fade speed={0.8} />

        <GrandSun onClick={() => handleSelect('sun')} isSelected={selectedId === 'sun'} />

        {PLANET_CONFIGS.map((p) => (
          <React.Fragment key={p.id}>
            {showOrbits && (
              <OrbitTrack radius={p.orbitRadius} isSelected={selectedId === p.id} />
            )}
            <PlanetBody
              config={p}
              isPaused={isPaused}
              speedMultiplier={speedMultiplier}
              isSelected={selectedId === p.id}
              showLabels={showLabels}
              onSelect={handleSelect}
              hoveredPlanet={hoveredPlanet}
              setHoveredPlanet={setHoveredPlanet}
            />
          </React.Fragment>
        ))}

        <CameraFocusController 
          targetRadius={selectedConfig ? selectedConfig.orbitRadius * 0.6 : null} 
          controlsRef={controlsRef} 
        />

        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={12}
          maxDistance={220}
          maxPolarAngle={Math.PI / 2 + 0.12}
          dampingFactor={0.06}
          enableDamping={true}
        />
      </Canvas>

      {/* Floating Planetarium Telemetry HUD */}
      <div className="absolute top-5 left-5 flex flex-wrap items-center gap-2.5 z-20 pointer-events-none">
        <div className="pointer-events-auto hud-panel px-4 py-2 rounded-full border border-cosmos-border flex items-center space-x-3 shadow-2xl">
          <Sparkles className="w-4 h-4 text-cosmos-cyan" />
          <span className="text-xs font-mono tracking-widest text-cosmos-white uppercase font-bold">
            HELIOCENTRIC ORBITS
          </span>
          <span className="text-cosmos-muted font-mono">|</span>
          <span className="text-xs font-mono text-cosmos-cyan">
            {isPaused ? 'MOTION FROZEN' : `${speedMultiplier}x VELOCITY`}
          </span>
        </div>

        {/* Orbit Controls Ribbon */}
        <div className="pointer-events-auto hud-panel p-1 rounded-full border border-cosmos-border flex items-center space-x-1 shadow-2xl">
          {/* Pause / Play */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 rounded-full hover:bg-white/10 text-cosmos-white transition"
            title={isPaused ? 'Resume Orbits (Spacebar)' : 'Pause Orbits'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-cosmos-cyan" />}
          </button>

          {/* Speed Stepper */}
          <button
            onClick={() => setSpeedMultiplier((prev) => (prev >= 4 ? 0.5 : prev * 2))}
            className="px-3 py-1 text-xs font-mono text-cosmos-white hover:bg-white/10 rounded-full transition font-bold"
            title="Adjust Orbital Velocity"
          >
            {speedMultiplier}x
          </button>

          {/* Zoom In */}
          <button
            onClick={() => handleZoom(-12)}
            className="p-2 rounded-full hover:bg-white/10 text-cosmos-white transition"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          {/* Zoom Out */}
          <button
            onClick={() => handleZoom(12)}
            className="p-2 rounded-full hover:bg-white/10 text-cosmos-white transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          {/* Toggle Labels */}
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`p-2 rounded-full transition ${showLabels ? 'text-cosmos-cyan bg-white/10' : 'text-cosmos-muted hover:text-white'}`}
            title={showLabels ? 'Hide Celestial Labels' : 'Show Celestial Labels'}
          >
            <Tag className="w-3.5 h-3.5" />
          </button>

          {/* Toggle Orbits */}
          <button
            onClick={() => setShowOrbits(!showOrbits)}
            className={`p-2 rounded-full transition ${showOrbits ? 'text-cosmos-cyan bg-white/10' : 'text-cosmos-muted hover:text-white'}`}
            title={showOrbits ? 'Hide Orbit Tracks' : 'Show Orbit Tracks'}
          >
            <CircleDot className="w-3.5 h-3.5" />
          </button>

          {/* Reset Camera */}
          <button
            onClick={handleResetCamera}
            className="p-2 rounded-full hover:bg-white/10 text-cosmos-muted hover:text-white transition"
            title="Reset Camera to Heliocentric Origin"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Floating Horizontal Planet Selector */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-auto hud-panel px-3 py-2 rounded-full border border-cosmos-border flex items-center space-x-1 shadow-2xl overflow-x-auto max-w-[94vw]">
        {PLANET_CONFIGS.map((p) => (
          <button
            key={p.id}
            onClick={() => handleSelect(p.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 flex items-center space-x-2 shrink-0 ${
              selectedId === p.id
                ? 'bg-gradient-to-r from-cosmos-electric/40 to-cosmos-cyan/30 text-white border border-cosmos-cyan/50 shadow-cyan-glow'
                : 'text-cosmos-muted hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.colorFallback }} />
            <span>{p.name}</span>
          </button>
        ))}
      </div>

      {/* Right Floating Compact Contextual Planet Profile Card */}
      {selectedData && (
        <div className="absolute top-20 right-5 z-20 w-84 hud-panel p-5 rounded-3xl border border-cosmos-border shadow-2xl backdrop-blur-2xl space-y-3 pointer-events-auto animate-fade-in max-w-[calc(100vw-2.5rem)]">
          <div className="flex items-center justify-between border-b border-cosmos-border/50 pb-2">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-cosmos-cyan uppercase">
                TARGET BODY
              </span>
              <h3 className="text-xl font-black font-display text-white">
                {selectedData.name}
              </h3>
            </div>
            <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: selectedData.color }} />
          </div>

          <p className="text-xs text-cosmos-muted leading-relaxed font-light line-clamp-3">
            {selectedData.tagline}
          </p>

          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
            <div className="p-2 rounded-xl bg-black/40 border border-white/5">
              <span className="text-cosmos-muted block">DIAMETER</span>
              <span className="text-white font-bold">{selectedData.scientificData?.diameterKm}</span>
            </div>
            <div className="p-2 rounded-xl bg-black/40 border border-white/5">
              <span className="text-cosmos-muted block">DISTANCE</span>
              <span className="text-white font-bold">{selectedData.scientificData?.distanceFromSunAU}</span>
            </div>
            <div className="p-2 rounded-xl bg-black/40 border border-white/5">
              <span className="text-cosmos-muted block">GRAVITY</span>
              <span className="text-white font-bold">{selectedData.scientificData?.gravityMps2}</span>
            </div>
            <div className="p-2 rounded-xl bg-black/40 border border-white/5">
              <span className="text-cosmos-muted block">TEMP</span>
              <span className="text-white font-bold">{selectedData.scientificData?.avgTempC}</span>
            </div>
          </div>

          {selectedData.category === 'planet' && (
            <button
              onClick={() => onNavigateToExplorer?.(selectedData.id)}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-cosmos-electric via-cosmos-violet to-cosmos-cyan text-white text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-cyan-glow flex items-center justify-center space-x-2 group hover:opacity-95"
            >
              <Globe2 className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
              <span>Inspect in 3D Planet Explorer</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
