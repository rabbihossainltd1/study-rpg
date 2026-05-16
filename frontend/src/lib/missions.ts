import { Mission, Achievement } from "@/types";

export type GeneralKnowledgeQuestion = {
  id: string;
  question: string;
  questionBn: string;
  options: string[];
  answer: number;
  explanation: string;
  sourceId?: string;
};

export const GENERAL_KNOWLEDGE_QUIZZES: GeneralKnowledgeQuestion[] = [];

export function missionDayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function getDailyGKQuestions(_missionId: string, _dayKey = missionDayKey(), _count = 3) {
  return [] as GeneralKnowledgeQuestion[];
}

export const DAILY_MISSIONS: Mission[] = [
  {
    id: "daily-progress-subjects",
    title: "Daily Progress",
    titleBn: "ডেইলি প্রগ্রেস",
    description: "Open official-source subject practice. No unverified question is shown.",
    type: "daily",
    icon: "book",
    xpReward: 0,
    coinReward: 0,
    requirement: 1,
    progress: 0,
    isCompleted: false,
  },
];

export const WEEKLY_MISSIONS: Mission[] = [];

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-login", title: "Welcome Scholar!", titleBn: "স্বাগতম পণ্ডিত!", description: "Log in for the first time", icon: "graduation", rarity: "common", xpReward: 50, isUnlocked: false },
  { id: "first-written-answer", title: "Answer Writer", titleBn: "উত্তর লেখক", description: "Upload your first written answer proof", icon: "book", rarity: "common", xpReward: 100, isUnlocked: false },
  { id: "first-gk-quiz", title: "GK Starter", titleBn: "সাধারণ জ্ঞান শুরু", description: "Complete an approved general knowledge quiz", icon: "help", rarity: "common", xpReward: 100, isUnlocked: false },
  { id: "level-10", title: "Rising Star", titleBn: "উদীয়মান তারা", description: "Reach Level 10", icon: "star", rarity: "rare", xpReward: 500, isUnlocked: false },
  { id: "complete-subject", title: "Subject Master", titleBn: "বিষয় মাস্টার", description: "Complete all approved chapters in a subject", icon: "trophy", rarity: "epic", xpReward: 1500, isUnlocked: false },
];
