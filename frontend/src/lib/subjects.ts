import type { Chapter, Subject } from "@/types";
import { QUIZ_TOPICS, getQuizCount } from "@/lib/quizData";

const SUBJECT_BASE: Array<Omit<Subject, "totalChapters" | "completedChapters" | "progress">> = [
  {
    id: "math",
    name: "Mathematics",
    nameBn: "গণিত",
    icon: "📐",
    color: "#00F0FF",
    xpReward: 150,
    difficulty: "hard",
    examTypes: ["SSC", "HSC", "Admission"],
  },
  {
    id: "physics",
    name: "Physics",
    nameBn: "পদার্থবিজ্ঞান",
    icon: "⚛️",
    color: "#BF5FFF",
    xpReward: 140,
    difficulty: "hard",
    examTypes: ["SSC", "HSC", "Admission"],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    nameBn: "রসায়ন",
    icon: "🧪",
    color: "#39FF14",
    xpReward: 140,
    difficulty: "hard",
    examTypes: ["SSC", "HSC", "Admission"],
  },
  {
    id: "biology",
    name: "Biology",
    nameBn: "জীববিজ্ঞান",
    icon: "🧬",
    color: "#FF8C00",
    xpReward: 130,
    difficulty: "medium",
    examTypes: ["SSC", "HSC", "Admission"],
  },
  {
    id: "english",
    name: "English",
    nameBn: "ইংরেজি",
    icon: "📖",
    color: "#FFD700",
    xpReward: 100,
    difficulty: "medium",
    examTypes: ["SSC", "HSC", "Admission", "University"],
  },
  {
    id: "bangla",
    name: "Bangla",
    nameBn: "বাংলা",
    icon: "🅱️",
    color: "#FF003C",
    xpReward: 100,
    difficulty: "medium",
    examTypes: ["SSC", "HSC"],
  },
  {
    id: "ict",
    name: "ICT",
    nameBn: "তথ্য ও যোগাযোগ প্রযুক্তি",
    icon: "💻",
    color: "#00F0FF",
    xpReward: 120,
    difficulty: "medium",
    examTypes: ["SSC", "HSC"],
  },
  {
    id: "gk",
    name: "General Knowledge",
    nameBn: "সাধারণ জ্ঞান",
    icon: "🌍",
    color: "#39FF14",
    xpReward: 80,
    difficulty: "easy",
    examTypes: ["Admission", "University"],
  },
];

export const SUBJECTS: Subject[] = SUBJECT_BASE.map((subject) => ({
  ...subject,
  totalChapters: Math.max(1, QUIZ_TOPICS[subject.id]?.length || 1),
  completedChapters: 0,
  progress: 0,
}));

const makeId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\u0980-\u09FF]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32) || "chapter";

function createChapters(subject: Subject): Chapter[] {
  const topics = QUIZ_TOPICS[subject.id] || [subject.name];
  return topics.map((topic, index) => ({
    id: `${subject.id}-${makeId(topic)}-${index + 1}`,
    subjectId: subject.id,
    title: topic,
    titleBn: topic,
    description: `${subject.name} ${topic} concept, practice and quiz set`,
    order: index + 1,
    isLocked: false,
    isCompleted: false,
    xpReward: subject.xpReward,
    lessons: [
      {
        id: `${subject.id}-${index + 1}-concept`,
        chapterId: `${subject.id}-${makeId(topic)}-${index + 1}`,
        title: `${topic} Concept`,
        titleBn: `${topic} কনসেপ্ট`,
        content: "",
        type: "concept",
        duration: 12,
        isCompleted: false,
        xpReward: Math.max(15, Math.round(subject.xpReward * 0.25)),
      },
      {
        id: `${subject.id}-${index + 1}-practice`,
        chapterId: `${subject.id}-${makeId(topic)}-${index + 1}`,
        title: `${topic} Practice`,
        titleBn: `${topic} অনুশীলন`,
        content: "",
        type: "practice",
        duration: 18,
        isCompleted: false,
        xpReward: Math.max(20, Math.round(subject.xpReward * 0.35)),
      },
      {
        id: `${subject.id}-${index + 1}-quiz`,
        chapterId: `${subject.id}-${makeId(topic)}-${index + 1}`,
        title: `${topic} Quiz`,
        titleBn: `${topic} কুইজ`,
        content: "",
        type: "quiz",
        duration: 10,
        isCompleted: false,
        xpReward: Math.max(25, Math.round(subject.xpReward * 0.4)),
      },
    ],
  }));
}

export const CHAPTERS: Record<string, Chapter[]> = Object.fromEntries(
  SUBJECTS.map((subject) => [subject.id, createChapters(subject)])
);

export const QUIZ_STATS = SUBJECTS.map((subject) => ({
  subjectId: subject.id,
  total: getQuizCount(subject.id),
  easy: getQuizCount(subject.id, "easy"),
  medium: getQuizCount(subject.id, "medium"),
  hard: getQuizCount(subject.id, "hard"),
}));
