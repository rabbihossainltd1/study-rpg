import { Mission, Achievement } from "@/types";

export type GeneralKnowledgeQuestion = {
  id: string;
  question: string;
  questionBn: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const GENERAL_KNOWLEDGE_QUIZZES: GeneralKnowledgeQuestion[] = [
  {
    id: "gk-bd-capital",
    question: "What is the capital city of Bangladesh?",
    questionBn: "বাংলাদেশের রাজধানী কোনটি?",
    options: ["Dhaka", "Chattogram", "Khulna", "Sylhet"],
    answer: 0,
    explanation: "Dhaka is the capital city of Bangladesh.",
  },
  {
    id: "gk-language-day",
    question: "International Mother Language Day is observed on which date?",
    questionBn: "আন্তর্জাতিক মাতৃভাষা দিবস কোন তারিখে পালিত হয়?",
    options: ["16 December", "21 February", "26 March", "14 April"],
    answer: 1,
    explanation: "21 February is observed as International Mother Language Day.",
  },
  {
    id: "gk-largest-planet",
    question: "Which is the largest planet in the Solar System?",
    questionBn: "সৌরজগতের সবচেয়ে বড় গ্রহ কোনটি?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 2,
    explanation: "Jupiter is the largest planet in the Solar System.",
  },
  {
    id: "gk-water-formula",
    question: "What is the chemical formula of water?",
    questionBn: "পানির রাসায়নিক সংকেত কী?",
    options: ["CO₂", "O₂", "NaCl", "H₂O"],
    answer: 3,
    explanation: "Water is made of two hydrogen atoms and one oxygen atom: H₂O.",
  },
  {
    id: "gk-bd-independence",
    question: "Bangladesh Independence Day is observed on which date?",
    questionBn: "বাংলাদেশের স্বাধীনতা দিবস কোন তারিখে?",
    options: ["26 March", "21 February", "16 December", "7 March"],
    answer: 0,
    explanation: "Bangladesh Independence Day is observed on 26 March.",
  },
  {
    id: "gk-computer-brain",
    question: "Which part is commonly called the brain of a computer?",
    questionBn: "কম্পিউটারের মস্তিষ্ক বলা হয় কোন অংশকে?",
    options: ["Monitor", "CPU", "Keyboard", "Mouse"],
    answer: 1,
    explanation: "CPU processes instructions, so it is called the brain of the computer.",
  },
];

export const DAILY_MISSIONS: Mission[] = [
  {
    id: "daily-progress-subjects",
    title: "Daily Progress",
    titleBn: "ডেইলি প্রগ্রেস",
    description: "Open subjects and complete class-based written practice",
    type: "daily",
    icon: "book",
    xpReward: 0,
    coinReward: 0,
    requirement: 1,
    progress: 0,
    isCompleted: false,
  },
  {
    id: "gk-quiz-basic-1",
    title: "General Knowledge Quiz",
    titleBn: "সাধারণ জ্ঞান কুইজ",
    description: "Answer 3 general knowledge questions",
    type: "daily",
    icon: "help",
    xpReward: 70,
    coinReward: 12,
    requirement: 3,
    progress: 0,
    isCompleted: false,
  },
  {
    id: "gk-quiz-basic-2",
    title: "Bangladesh GK Challenge",
    titleBn: "বাংলাদেশ সাধারণ জ্ঞান",
    description: "Practice Bangladesh and science based quick questions",
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
  {
    id: "first-login",
    title: "Welcome Scholar!",
    titleBn: "স্বাগতম পণ্ডিত!",
    description: "Log in for the first time",
    icon: "graduation",
    rarity: "common",
    xpReward: 50,
    isUnlocked: false,
  },
  {
    id: "first-written-answer",
    title: "Answer Writer",
    titleBn: "উত্তর লেখক",
    description: "Upload your first written answer proof",
    icon: "book",
    rarity: "common",
    xpReward: 100,
    isUnlocked: false,
  },
  {
    id: "first-gk-quiz",
    title: "GK Starter",
    titleBn: "সাধারণ জ্ঞান শুরু",
    description: "Complete your first general knowledge quiz",
    icon: "help",
    rarity: "common",
    xpReward: 100,
    isUnlocked: false,
  },
  {
    id: "level-10",
    title: "Rising Star",
    titleBn: "উদীয়মান তারা",
    description: "Reach Level 10",
    icon: "star",
    rarity: "rare",
    xpReward: 500,
    isUnlocked: false,
  },
  {
    id: "complete-subject",
    title: "Subject Master",
    titleBn: "বিষয় মাস্টার",
    description: "Complete all chapters in a subject",
    icon: "trophy",
    rarity: "epic",
    xpReward: 1500,
    isUnlocked: false,
  },
];
