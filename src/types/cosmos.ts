// ============================================================
// SPACE EXPLORER — UNIVERSE EXTENDED TYPE DEFINITIONS
// ============================================================

export type CelestialHierarchy = 
  | 'universe'
  | 'supercluster'
  | 'galaxy_cluster'
  | 'galaxy_group'
  | 'galaxy'
  | 'nebula'
  | 'star_system'
  | 'star'
  | 'exoplanet'
  | 'planet'
  | 'dwarf_planet'
  | 'moon'
  | 'asteroid_comet'
  | 'extreme_phenomenon';

export type CelestialCategory = 
  | 'solar_system'
  | 'planet' 
  | 'dwarf_planet'
  | 'moon' 
  | 'asteroid'
  | 'comet'
  | 'exoplanet'
  | 'star_system'
  | 'star' 
  | 'constellation'
  | 'nebula' 
  | 'galaxy' 
  | 'galaxy_group'
  | 'galaxy_cluster'
  | 'supercluster'
  | 'black_hole'
  | 'neutron_star'
  | 'pulsar'
  | 'magnetar'
  | 'quasar'
  | 'supernova'
  | 'gamma_ray_burst'
  | 'gravitational_wave'
  | 'cosmic_microwave_background'
  | 'cosmic_web'
  | 'dark_matter'
  | 'dark_energy'
  | 'observable_universe'
  | 'big_bang'
  | 'phenomenon';

export interface CelestialObject {
  id: string;
  name: string;
  category: CelestialCategory;
  hierarchyLevel?: CelestialHierarchy;
  parentObjectId?: string;
  tagline: string;
  overview: string;
  image?: string;
  color: string;
  isConfirmed?: boolean;
  isArtisticRepresentation?: boolean;
  // Scientific parameters
  scientificData?: {
    diameterKm?: number | string;
    distanceFromSunAU?: number | string;
    distanceFromEarthLy?: number | string;
    gravityMps2?: number | string;
    avgTempC?: number | string;
    rotationPeriodHours?: number | string;
    revolutionPeriodDays?: number | string;
    atmosphereComposition?: string[];
    knownMoonsCount?: number;
    parentPlanet?: string;
    hostStar?: string;
    spectralType?: string;
    galaxyType?: string;
    constellation?: string;
    massSolarMasses?: number | string;
    discoveryYear?: number | string;
    discoveryMethod?: string;
    redshiftZ?: number | string;
    energyOutputWatts?: string;
    magneticFieldTesla?: string;
  };
  structure?: string;
  atmosphere?: string;
  surfaceFeatures?: string;
  explorationHistory?: string[];
  interestingFacts: string[];
  moons?: string[];
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface SpaceAcademyQuiz {
  id: string;
  lessonId: string;
  title: string;
  questions: QuizQuestion[];
}

export interface SpaceAcademyLesson {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  objectives: string[];
  content: string[];
  keyTakeaways: string[];
  quiz?: SpaceAcademyQuiz;
}

export interface QuizAttemptRecord {
  quizId: string;
  quizTitle: string;
  date: string;
  score: number;
  totalQuestions: number;
  accuracyPercentage: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
  category: 'exploration' | 'academy' | 'mastery';
}

export interface StudentProfile {
  id: string;
  name: string;
  rfidUid: string; // Normalized uppercase hex
  role: string;
  registeredAt: string;
  lastActive: string;
  bookmarks: string[]; // celestial object IDs
  exploredObjects: string[]; // celestial object IDs
  completedLessons: string[]; // lesson IDs
  quizHistory: QuizAttemptRecord[];
  achievements: Achievement[];
  isDemo?: boolean;
}

// Controller events matching ESP32 firmware
export type ControllerButton = 'select' | 'back' | 'action' | 'pause';

export interface ControllerEvent {
  type: 'rfid_scan' | 'joystick_input' | 'button_press' | 'imu_data' | 'heartbeat' | 'connected' | 'disconnected';
  payload?: any;
}

export interface JoystickPayload {
  x: number; // -1 to 1 (normalized) or raw ADC
  y: number; // -1 to 1
  button: boolean;
}

export interface IMUPayload {
  pitch: number;
  roll: number;
  yaw: number;
}

export interface ControllerState {
  isConnected: boolean;
  connectionType: 'serial' | 'websocket' | 'demo' | 'none';
  rfidReady: boolean;
  joystickActive: boolean;
  imuActive: boolean;
  lastHeartbeat: number;
  log: string[];
}
