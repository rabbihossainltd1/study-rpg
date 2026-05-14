export interface User {
  uid: string;
  email: string;
  username: string;
  displayName: string;
  photoURL?: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  gems: number;
  rank: Rank;
  streak: number;
  maxStreak: number;
  totalStudyTime: number; // minutes
  achievements: string[];
  badges: string[];
  friends: string[];
  district: string;
  school: string;
  college?: string;
  className?: string;
  thana?: string;
  examMode: "SSC" | "HSC" | "Admission" | "University";
  avatar: string;
  frame: string;
  createdAt: Date;
  lastLoginAt: Date;
  isGuest: boolean;
  language: "bn" | "en";
}

export type Rank =
  | "Novice"
  | "Apprentice"
  | "Scholar"
  | "Expert"
  | "Master"
  | "Grandmaster"
  | "Legend";

export const RANK_THRESHOLDS: Record<Rank, number> = {
  Novice: 0,
  Apprentice: 500,
  Scholar: 2000,
  Expert: 5000,
  Master: 12000,
  Grandmaster: 30000,
  Legend: 80000,
};

export const RANK_COLORS: Record<Rank, string> = {
  Novice: "#9CA3AF",
  Apprentice: "#CD7F32",
  Scholar: "#C0C0C0",
  Expert: "#FFD700",
  Master: "#00F0FF",
  Grandmaster: "#BF5FFF",
  Legend: "#FF003C",
};

export interface Subject {
  id: string;
  name: string;
  nameBn: string;
  icon: string;
  color: string;
  totalChapters: number;
  completedChapters: number;
  progress: number; // 0-100
  xpReward: number;
  difficulty: "easy" | "medium" | "hard";
  examTypes: string[];
}

export interface Chapter {
  id: string;
  subjectId: string;
  title: string;
  titleBn: string;
  description: string;
  order: number;
  isLocked: boolean;
  isCompleted: boolean;
  xpReward: number;
  lessons: Lesson[];
  quiz?: Quiz;
}

export interface Lesson {
  id: string;
  chapterId: string;
  title: string;
  titleBn: string;
  content: string;
  type: "concept" | "video" | "practice" | "quiz";
  duration: number; // minutes
  isCompleted: boolean;
  xpReward: number;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  timeLimit: number; // seconds
  xpReward: number;
  passingScore: number; // percentage
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionBn?: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface Mission {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  type: "daily" | "weekly" | "special";
  icon: string;
  xpReward: number;
  coinReward: number;
  requirement: number;
  progress: number;
  isCompleted: boolean;
  expiresAt?: Date;
}

export interface Achievement {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  xpReward: number;
  isUnlocked: boolean;
  unlockedAt?: Date;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  displayName: string;
  photoURL?: string;
  school?: string;
  college?: string;
  className?: string;
  thana?: string;
  district: string;
  level: number;
  xp: number;
  userRank: Rank;
  streak: number;
  isCurrentUser?: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

export interface FocusSession {
  id: string;
  userId: string;
  duration: number; // minutes
  type: "pomodoro" | "deep" | "short";
  subject?: string;
  xpEarned: number;
  completedAt: Date;
}

export function calculateLevel(totalXp: number): number {
  return Math.floor(Math.sqrt(totalXp / 100)) + 1;
}

export function calculateXpForLevel(level: number): number {
  return (level - 1) ** 2 * 100;
}

export function calculateXpToNextLevel(totalXp: number): number {
  const level = calculateLevel(totalXp);
  return calculateXpForLevel(level + 1) - totalXp;
}

export function getRankFromXp(xp: number): Rank {
  const ranks = Object.entries(RANK_THRESHOLDS).reverse() as [Rank, number][];
  for (const [rank, threshold] of ranks) {
    if (xp >= threshold) return rank;
  }
  return "Novice";
}
