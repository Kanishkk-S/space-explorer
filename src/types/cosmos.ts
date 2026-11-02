// ============================================================
// SPACE EXPLORER — COSMOS 3D EXPERIENCE: CORE TYPE DEFINITIONS
// ============================================================

export type CelestialCategory = 
  | 'planet' 
  | 'moon' 
  | 'star' 
  | 'galaxy' 
  | 'nebula' 
  | 'phenomenon';

export interface CelestialObject {
  id: string;
  name: string;
  category: CelestialCategory;
  tagline: string;
  overview: string;
  image?: string;
  color: string;
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
    spectralType?: string;
    galaxyType?: string;
    constellation?: string;
  };
  structure?: string;
  atmosphere?: string;
  explorationHistory?: string[];
  interestingFacts: string[];
  moons?: string[];
  isArtisticRepresentation?: boolean;
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
