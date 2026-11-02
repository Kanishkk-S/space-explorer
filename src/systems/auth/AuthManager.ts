// ============================================================
// SPACE EXPLORER — AUTHENTICATION & STUDENT PROFILE MANAGER
// ============================================================

import { StudentProfile, Achievement, QuizAttemptRecord } from '@/types/cosmos';

export const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_contact',
    title: 'First Contact',
    description: 'Log into SPACE EXPLORER and start your celestial journey.',
    icon: 'Radio',
    isUnlocked: false,
    category: 'exploration'
  },
  {
    id: 'solar_surveyor',
    title: 'Solar Surveyor',
    description: 'Explore all 8 major planets of the Solar System.',
    icon: 'Sun',
    isUnlocked: false,
    category: 'exploration'
  },
  {
    id: 'lunar_enthusiast',
    title: 'Moon Walker',
    description: 'Inspect at least 3 planetary moons.',
    icon: 'Moon',
    isUnlocked: false,
    category: 'exploration'
  },
  {
    id: 'deep_space_voyager',
    title: 'Deep Space Voyager',
    description: 'Discover a black hole, a nebula, and a distant galaxy.',
    icon: 'Compass',
    isUnlocked: false,
    category: 'exploration'
  },
  {
    id: 'academy_initiate',
    title: 'Cadet Graduate',
    description: 'Complete your first Space Academy lesson.',
    icon: 'GraduationCap',
    isUnlocked: false,
    category: 'academy'
  },
  {
    id: 'stellar_scholar',
    title: 'Stellar Scholar',
    description: 'Score 100% on any astronomy quiz.',
    icon: 'Award',
    isUnlocked: false,
    category: 'academy'
  },
  {
    id: 'cosmos_master',
    title: 'Master of the Cosmos',
    description: 'Complete 5 academy lessons and bookmark 8 celestial objects.',
    icon: 'Crown',
    isUnlocked: false,
    category: 'mastery'
  }
];

export function normalizeUID(uid: string): string {
  if (!uid) return '';
  return String(uid)
    .trim()
    .replace(/\b0x/gi, '')
    .replace(/[^0-9A-Fa-f]/g, '')
    .toUpperCase();
}

// Initial registered students including verified physical card for Kanishkk
const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'student-kanishkk',
    name: 'Kanishkk',
    rfidUid: 'F710A385', // Hardware verified card
    role: 'Lead Explorer',
    registeredAt: '2026-09-01',
    lastActive: new Date().toISOString(),
    bookmarks: ['earth', 'saturn', 'andromeda', 'orion_nebula'],
    exploredObjects: ['sun', 'earth', 'mars', 'saturn'],
    completedLessons: ['solar_system_overview', 'black_holes_gravity'],
    quizHistory: [
      {
        quizId: 'quiz_solar_system',
        quizTitle: 'Solar System Fundamentals',
        date: '2026-10-15',
        score: 4,
        totalQuestions: 4,
        accuracyPercentage: 100
      }
    ],
    achievements: DEFAULT_ACHIEVEMENTS.map(a => a.id === 'first_contact' ? { ...a, isUnlocked: true, unlockedAt: '2026-09-01' } : a)
  },
  {
    id: 'student-mateo',
    name: 'Mateo Chen',
    rfidUid: '04A1B2C3',
    role: 'Planetary Researcher',
    registeredAt: '2026-09-10',
    lastActive: '2026-10-20',
    bookmarks: ['mars', 'jupiter', 'titan'],
    exploredObjects: ['mars', 'jupiter'],
    completedLessons: ['planetary_atmospheres'],
    quizHistory: [],
    achievements: DEFAULT_ACHIEVEMENTS.map(a => a.id === 'first_contact' ? { ...a, isUnlocked: true, unlockedAt: '2026-09-10' } : a)
  },
  {
    id: 'student-lucia',
    name: 'Lucía Santos',
    rfidUid: '04D4E5F6',
    role: 'Deep Space Analyst',
    registeredAt: '2026-09-12',
    lastActive: '2026-10-22',
    bookmarks: ['milky_way', 'crab_nebula'],
    exploredObjects: ['sun', 'earth'],
    completedLessons: [],
    quizHistory: [],
    achievements: DEFAULT_ACHIEVEMENTS.map(a => a.id === 'first_contact' ? { ...a, isUnlocked: true, unlockedAt: '2026-09-12' } : a)
  }
];

export const DEMO_STUDENT: StudentProfile = {
  id: 'student-demo',
  name: 'Exhibition Visitor',
  rfidUid: 'DEMO0001',
  role: 'Guest Explorer (Demo Mode)',
  registeredAt: new Date().toISOString().split('T')[0],
  lastActive: new Date().toISOString(),
  bookmarks: ['earth', 'saturn'],
  exploredObjects: ['sun', 'earth'],
  completedLessons: ['solar_system_overview'],
  quizHistory: [],
  achievements: DEFAULT_ACHIEVEMENTS.map(a => a.id === 'first_contact' ? { ...a, isUnlocked: true, unlockedAt: new Date().toISOString() } : a),
  isDemo: true
};

const STORAGE_KEY_STUDENTS = 'space_explorer_students_v1';
const STORAGE_KEY_ACTIVE_SESSION = 'space_explorer_session_v1';

export class AuthManager {
  private static instance: AuthManager;
  private students: Map<string, StudentProfile> = new Map();
  private currentStudent: StudentProfile | null = null;
  private listeners: Set<(student: StudentProfile | null) => void> = new Set();

  private constructor() {
    this.loadStudents();
    this.restoreSession();
  }

  public static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  private loadStudents(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_STUDENTS);
      if (stored) {
        const parsed: StudentProfile[] = JSON.parse(stored);
        this.students.clear();
        parsed.forEach(s => this.students.set(normalizeUID(s.rfidUid), s));
      } else {
        // Initialize with default students
        this.students.clear();
        INITIAL_STUDENTS.forEach(s => this.students.set(normalizeUID(s.rfidUid), s));
        this.saveStudents();
      }
    } catch {
      this.students.clear();
      INITIAL_STUDENTS.forEach(s => this.students.set(normalizeUID(s.rfidUid), s));
    }
  }

  private saveStudents(): void {
    try {
      const list = Array.from(this.students.values()).filter(s => !s.isDemo);
      localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save students to localStorage', e);
    }
  }

  private restoreSession(): void {
    try {
      const session = sessionStorage.getItem(STORAGE_KEY_ACTIVE_SESSION);
      if (session) {
        const profile: StudentProfile = JSON.parse(session);
        this.currentStudent = profile;
      }
    } catch {
      this.currentStudent = null;
    }
  }

  public subscribe(callback: (student: StudentProfile | null) => void): () => void {
    this.listeners.add(callback);
    callback(this.currentStudent);
    return () => this.listeners.delete(callback);
  }

  private notify(): void {
    this.listeners.forEach(cb => cb(this.currentStudent));
  }

  public getCurrentStudent(): StudentProfile | null {
    return this.currentStudent;
  }

  public isAuthenticated(): boolean {
    return this.currentStudent !== null;
  }

  public authenticateByUID(rawUid: string): { success: boolean; student?: StudentProfile; message: string } {
    const norm = normalizeUID(rawUid);
    if (!norm) {
      return { success: false, message: 'Invalid card scan. Empty UID detected.' };
    }

    const student = this.students.get(norm);
    if (student) {
      student.lastActive = new Date().toISOString();
      this.currentStudent = { ...student };
      this.saveStudents();
      try {
        sessionStorage.setItem(STORAGE_KEY_ACTIVE_SESSION, JSON.stringify(this.currentStudent));
      } catch {}
      this.notify();
      return { success: true, student: this.currentStudent, message: `Welcome back, ${student.name}!` };
    }

    return { success: false, message: `Card ${norm} is not registered. Please see exhibition desk.` };
  }

  public loginDemoMode(): StudentProfile {
    const demo = { ...DEMO_STUDENT, lastActive: new Date().toISOString() };
    this.currentStudent = demo;
    try {
      sessionStorage.setItem(STORAGE_KEY_ACTIVE_SESSION, JSON.stringify(demo));
    } catch {}
    this.notify();
    return demo;
  }

  public logout(): void {
    this.currentStudent = null;
    try {
      sessionStorage.removeItem(STORAGE_KEY_ACTIVE_SESSION);
    } catch {}
    this.notify();
  }

  // Profile modifications with isolated student storage
  public toggleBookmark(objectId: string): boolean {
    if (!this.currentStudent) return false;
    const isBookmarked = this.currentStudent.bookmarks.includes(objectId);
    if (isBookmarked) {
      this.currentStudent.bookmarks = this.currentStudent.bookmarks.filter(id => id !== objectId);
    } else {
      this.currentStudent.bookmarks.push(objectId);
    }

    this.checkAchievements();
    this.syncProfile();
    return !isBookmarked;
  }

  public recordExplored(objectId: string): void {
    if (!this.currentStudent) return;
    if (!this.currentStudent.exploredObjects.includes(objectId)) {
      this.currentStudent.exploredObjects.push(objectId);
      this.checkAchievements();
      this.syncProfile();
    }
  }

  public recordLessonCompleted(lessonId: string): void {
    if (!this.currentStudent) return;
    if (!this.currentStudent.completedLessons.includes(lessonId)) {
      this.currentStudent.completedLessons.push(lessonId);
      this.checkAchievements();
      this.syncProfile();
    }
  }

  public recordQuizAttempt(record: QuizAttemptRecord): void {
    if (!this.currentStudent) return;
    this.currentStudent.quizHistory.unshift(record);
    this.checkAchievements();
    this.syncProfile();
  }

  private checkAchievements(): void {
    if (!this.currentStudent) return;
    const s = this.currentStudent;
    const now = new Date().toISOString();

    const unlock = (id: string) => {
      const ach = s.achievements.find(a => a.id === id);
      if (ach && !ach.isUnlocked) {
        ach.isUnlocked = true;
        ach.unlockedAt = now;
      }
    };

    // First contact
    unlock('first_contact');

    // Solar Surveyor (all 8 planets)
    const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
    if (planets.every(p => s.exploredObjects.includes(p))) {
      unlock('solar_surveyor');
    }

    // Lunar enthusiast (3 moons)
    const moons = ['moon', 'phobos', 'deimos', 'io', 'europa', 'ganymede', 'callisto', 'titan', 'enceladus'];
    const exploredMoons = s.exploredObjects.filter(obj => moons.includes(obj));
    if (exploredMoons.length >= 3) {
      unlock('lunar_enthusiast');
    }

    // Cadet graduate
    if (s.completedLessons.length >= 1) {
      unlock('academy_initiate');
    }

    // Stellar scholar
    if (s.quizHistory.some(q => q.accuracyPercentage === 100)) {
      unlock('stellar_scholar');
    }

    // Cosmos master
    if (s.completedLessons.length >= 5 && s.bookmarks.length >= 8) {
      unlock('cosmos_master');
    }
  }

  private syncProfile(): void {
    if (!this.currentStudent) return;
    if (!this.currentStudent.isDemo) {
      const norm = normalizeUID(this.currentStudent.rfidUid);
      this.students.set(norm, { ...this.currentStudent });
      this.saveStudents();
    }
    try {
      sessionStorage.setItem(STORAGE_KEY_ACTIVE_SESSION, JSON.stringify(this.currentStudent));
    } catch {}
    this.notify();
  }

  // Admin capabilities
  public getAllStudents(): StudentProfile[] {
    return Array.from(this.students.values());
  }

  public registerStudent(studentData: { name: string; rfidUid: string; role: string }): { success: boolean; message: string } {
    const norm = normalizeUID(studentData.rfidUid);
    if (!norm) return { success: false, message: 'Invalid RFID UID.' };
    if (!studentData.name.trim()) return { success: false, message: 'Student name is required.' };

    if (this.students.has(norm)) {
      return { success: false, message: `Card UID ${norm} is already registered to ${this.students.get(norm)?.name}.` };
    }

    const newStudent: StudentProfile = {
      id: `student-${Date.now()}`,
      name: studentData.name.trim(),
      rfidUid: norm,
      role: studentData.role.trim() || 'Student Explorer',
      registeredAt: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString(),
      bookmarks: [],
      exploredObjects: [],
      completedLessons: [],
      quizHistory: [],
      achievements: DEFAULT_ACHIEVEMENTS.map(a => ({ ...a }))
    };

    this.students.set(norm, newStudent);
    this.saveStudents();
    return { success: true, message: `Successfully registered student ${newStudent.name} (UID: ${norm})` };
  }

  public deleteStudent(rfidUid: string): boolean {
    const norm = normalizeUID(rfidUid);
    if (this.students.has(norm)) {
      this.students.delete(norm);
      this.saveStudents();
      return true;
    }
    return false;
  }
}
