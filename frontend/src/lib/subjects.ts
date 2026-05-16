import type { Chapter, Subject, User } from "@/types";
import { CURRICULUM_SUBJECTS, getCurriculumSubjectsFor } from "@/lib/curriculum";
import { QUIZ_TOPICS, getQuizCount } from "@/lib/quizData";
import { WRITTEN_TOPICS, getWrittenQuestionCount } from "@/lib/writtenQuestions";

function toSubject(subject: typeof CURRICULUM_SUBJECTS[number]): Subject {
  return {
    id: subject.id,
    name: subject.name,
    nameBn: subject.nameBn,
    icon: subject.icon,
    color: subject.color,
    xpReward: subject.xpReward,
    difficulty: subject.difficulty,
    examTypes: subject.examTypes,
    classLevels: subject.classLevels,
    groups: subject.groups,
    totalChapters: Math.max(1, WRITTEN_TOPICS[subject.id]?.length || QUIZ_TOPICS[subject.id]?.length || subject.topics.length || 1),
    completedChapters: 0,
    progress: 0,
  };
}

export const SUBJECTS: Subject[] = CURRICULUM_SUBJECTS.map(toSubject);
export const ALL_SUBJECTS = SUBJECTS;

function hasDatasetContent(subject: Subject): boolean {
  return getQuizCount(subject.id) > 0 || getWrittenQuestionCount(subject.id) > 0;
}

export function getSubjectsForUser(user?: Pick<User, "className" | "groupName" | "examMode"> | null): Subject[] {
  const list = !user?.className ? SUBJECTS.filter((s) => s.classLevels?.includes("SSC")) : getCurriculumSubjectsFor(user.className, user.groupName).map(toSubject);
  const withContent = list.filter(hasDatasetContent);
  return withContent.length ? withContent : list;
}

const makeId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\u0980-\u09FF]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32) || "chapter";

function createChapterQuestion(subject: Subject, topic: string, index: number, step: number) {
  const label = subject.nameBn || subject.name;
  if (subject.id.includes("math") || label.includes("গণিত")) {
    const a = 8 + index + step;
    const b = 3 + ((index + step) % 7);
    return `${label}: ${topic} থেকে ${a} × ${b} সমস্যাটি ধাপে ধাপে সমাধান করো।`;
  }
  if (subject.id.includes("english")) return `${label}: ${topic} থেকে একটি grammar/vocabulary প্রশ্ন লিখে সঠিক উত্তর ব্যাখ্যাসহ দাও।`;
  if (subject.id.includes("physics") || label.includes("পদার্থ")) return `${label}: ${topic} অধ্যায়ের একটি রাশি-একক বা সূত্রভিত্তিক সমস্যা সমাধান করো।`;
  if (subject.id.includes("chemistry") || label.includes("রসায়ন")) return `${label}: ${topic} অধ্যায়ের একটি বিক্রিয়া/সংকেত/ধারণা ব্যাখ্যা করে প্রশ্ন সমাধান করো।`;
  if (subject.id.includes("biology") || label.includes("জীব")) return `${label}: ${topic} থেকে একটি চিত্র/ধারণা ব্যাখ্যা করে প্রশ্নের উত্তর লিখো।`;
  return `${label}: ${topic} অধ্যায় থেকে একটি গুরুত্বপূর্ণ প্রশ্ন নিজের খাতায় সমাধান করো।`;
}

function createChapters(subject: Subject): Chapter[] {
  const topics = WRITTEN_TOPICS[subject.id]?.length ? WRITTEN_TOPICS[subject.id] : (QUIZ_TOPICS[subject.id] || [subject.name]);
  return topics.map((topic, index) => ({
    id: `${subject.id}-${makeId(topic)}-${index + 1}`,
    subjectId: subject.id,
    title: topic,
    titleBn: topic,
    description: `${subject.nameBn || subject.name} অধ্যায়ভিত্তিক প্রশ্ন সমাধান ও MCQ`,
    order: index + 1,
    isLocked: false,
    isCompleted: false,
    xpReward: subject.xpReward,
    lessons: [
      {
        id: `${subject.id}-${index + 1}-solve-1`,
        chapterId: `${subject.id}-${makeId(topic)}-${index + 1}`,
        title: `${topic} Written Task 1`,
        titleBn: `${topic} প্রশ্ন সমাধান ১`,
        content: createChapterQuestion(subject, topic, index, 1),
        type: "practice",
        duration: 12,
        isCompleted: false,
        xpReward: Math.max(15, Math.round(subject.xpReward * 0.25)),
      },
      {
        id: `${subject.id}-${index + 1}-solve-2`,
        chapterId: `${subject.id}-${makeId(topic)}-${index + 1}`,
        title: `${topic} Written Task 2`,
        titleBn: `${topic} প্রশ্ন সমাধান ২`,
        content: createChapterQuestion(subject, topic, index, 2),
        type: "practice",
        duration: 18,
        isCompleted: false,
        xpReward: Math.max(20, Math.round(subject.xpReward * 0.35)),
      },
      {
        id: `${subject.id}-${index + 1}-quiz`,
        chapterId: `${subject.id}-${makeId(topic)}-${index + 1}`,
        title: `${topic} Quiz`,
        titleBn: `${topic} MCQ`,
        content: `${subject.nameBn || subject.name}: ${topic} থেকে MCQ solve করো।`,
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
