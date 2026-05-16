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

export const GENERAL_KNOWLEDGE_QUIZZES: GeneralKnowledgeQuestion[] = [{"id":"GK-P2-MCQ-00749","question":"অধ্যায় 'Society' থেকে MCQ — সমাজায়ন কী?","questionBn":"অধ্যায় 'Society' থেকে MCQ — সমাজায়ন কী?","options":["writing budget","chemical bonding","measuring latitude","learning social norms"],"answer":3,"explanation":"learning social norms","sourceId":"user-real-dataset-v133"},{"id":"GK-P2-MCQ-00750","question":"অধ্যায় 'Culture' থেকে MCQ — সংস্কৃতি বলতে কী বোঝায়?","questionBn":"অধ্যায় 'Culture' থেকে MCQ — সংস্কৃতি বলতে কী বোঝায়?","options":["weather cycle","shared way of life","only currency","only building"],"answer":1,"explanation":"shared way of life","sourceId":"user-real-dataset-v133"},{"id":"GK-P2-MCQ-00751","question":"অধ্যায় 'Institution' থেকে MCQ — পরিবার কোন ধরনের সামাজিক প্রতিষ্ঠান?","questionBn":"অধ্যায় 'Institution' থেকে MCQ — পরিবার কোন ধরনের সামাজিক প্রতিষ্ঠান?","options":["primary institution","chemical cell","market price","river basin"],"answer":0,"explanation":"primary institution","sourceId":"user-real-dataset-v133"},{"id":"GK-P2-MCQ-00752","question":"অধ্যায় 'Stratification' থেকে MCQ — সামাজিক স্তরবিন্যাস কী নির্দেশ করে?","questionBn":"অধ্যায় 'Stratification' থেকে MCQ — সামাজিক স্তরবিন্যাস কী নির্দেশ করে?","options":["atomic mass","hierarchical social ranking","digital storage","daily rainfall"],"answer":1,"explanation":"hierarchical social ranking","sourceId":"user-real-dataset-v133"},{"id":"GK-P2-MCQ-00756","question":"অধ্যায় 'Government' থেকে MCQ — রাষ্ট্রবিজ্ঞানের প্রধান আলোচ্য বিষয় কী?","questionBn":"অধ্যায় 'Government' থেকে MCQ — রাষ্ট্রবিজ্ঞানের প্রধান আলোচ্য বিষয় কী?","options":["cell organelle","algebraic curve","state and government","chemical reaction"],"answer":2,"explanation":"state and government","sourceId":"user-real-dataset-v133"},{"id":"GK-P2-MCQ-00757","question":"অধ্যায় 'Democracy' থেকে MCQ — প্রতিনিধিত্বমূলক গণতন্ত্রে জনগণ কী করে?","questionBn":"অধ্যায় 'Democracy' থেকে MCQ — প্রতিনিধিত্বমূলক গণতন্ত্রে জনগণ কী করে?","options":["abolish voting","elect representatives","avoid law","print currency"],"answer":1,"explanation":"elect representatives","sourceId":"user-real-dataset-v133"},{"id":"GK-P2-MCQ-00758","question":"অধ্যায় 'International Relations' থেকে MCQ — কূটনীতি প্রধানত কী রক্ষা করে?","questionBn":"অধ্যায় 'International Relations' থেকে MCQ — কূটনীতি প্রধানত কী রক্ষা করে?","options":["soil moisture","bank ledger","state interests through negotiation","family budget"],"answer":2,"explanation":"state interests through negotiation","sourceId":"user-real-dataset-v133"},{"id":"GK-P2-MCQ-00759","question":"অধ্যায় 'Civic Values' থেকে MCQ — সুশাসনের গুরুত্বপূর্ণ উপাদান কোনটি?","questionBn":"অধ্যায় 'Civic Values' থেকে MCQ — সুশাসনের গুরুত্বপূর্ণ উপাদান কোনটি?","options":["secrecy only","nepotism","accountability","arbitrariness"],"answer":2,"explanation":"accountability","sourceId":"user-real-dataset-v133"},{"id":"GK-P2-MCQ-00760","question":"অধ্যায় 'Civic Values' থেকে MCQ — দুর্নীতি প্রতিরোধে কোনটি জরুরি?","questionBn":"অধ্যায় 'Civic Values' থেকে MCQ — দুর্নীতি প্রতিরোধে কোনটি জরুরি?","options":["hidden decision","unchecked power","transparency","false record"],"answer":2,"explanation":"transparency","sourceId":"user-real-dataset-v133"}];

export function missionDayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  return hash;
}

export function getDailyGKQuestions(missionId: string, dayKey = missionDayKey(), count = 3) {
  if (!GENERAL_KNOWLEDGE_QUIZZES.length || count <= 0) return [] as GeneralKnowledgeQuestion[];
  const safeCount = Math.min(count, GENERAL_KNOWLEDGE_QUIZZES.length);
  const dayStart = hashString(dayKey) % GENERAL_KNOWLEDGE_QUIZZES.length;
  const missionOffset = missionId === "gk-daily-2" ? safeCount : 0;
  const start = (dayStart + missionOffset) % GENERAL_KNOWLEDGE_QUIZZES.length;
  const result: GeneralKnowledgeQuestion[] = [];
  for (let i = 0; i < GENERAL_KNOWLEDGE_QUIZZES.length && result.length < safeCount; i += 1) {
    const item = GENERAL_KNOWLEDGE_QUIZZES[(start + i) % GENERAL_KNOWLEDGE_QUIZZES.length];
    if (!result.some((q) => q.id === item.id)) result.push(item);
  }
  return result;
}

export const DAILY_MISSIONS: Mission[] = [
  {
    id: "daily-progress-subjects",
    title: "Daily Progress",
    titleBn: "ডেইলি প্রগ্রেস",
    description: "Open subjects and complete class-based practice.",
    type: "daily",
    icon: "book",
    xpReward: 0,
    coinReward: 0,
    requirement: 1,
    progress: 0,
    isCompleted: false,
  },
  {
    id: "gk-daily-1",
    title: "General Knowledge Quiz",
    titleBn: "সাধারণ জ্ঞান কুইজ",
    description: "Answer 3 dataset-based general knowledge questions.",
    type: "daily",
    icon: "help",
    xpReward: 70,
    coinReward: 12,
    requirement: 3,
    progress: 0,
    isCompleted: false,
  },
  {
    id: "gk-daily-2",
    title: "Bangladesh Study Quiz",
    titleBn: "বাংলাদেশ স্টাডি কুইজ",
    description: "Practice another set of dataset-based questions.",
    type: "daily",
    icon: "globe",
    xpReward: 90,
    coinReward: 15,
    requirement: 3,
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
