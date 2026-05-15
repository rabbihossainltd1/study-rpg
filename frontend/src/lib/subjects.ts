import type { Chapter, Subject, User } from "@/types";
import { CURRICULUM_SUBJECTS, getCurriculumSubjectsFor } from "@/lib/curriculum";
import { QUIZ_TOPICS, getQuizCount } from "@/lib/quizData";

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
    totalChapters: Math.max(1, QUIZ_TOPICS[subject.id]?.length || subject.topics.length || 1),
    completedChapters: 0,
    progress: 0,
  };
}

export const SUBJECTS: Subject[] = CURRICULUM_SUBJECTS.map(toSubject);
export const ALL_SUBJECTS = SUBJECTS;

export function getSubjectsForUser(user?: Pick<User, "className" | "groupName" | "examMode"> | null): Subject[] {
  if (!user?.className) return SUBJECTS.filter((s) => s.classLevels?.includes("SSC"));
  return getCurriculumSubjectsFor(user.className, user.groupName).map(toSubject);
}

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
    description: `${subject.nameBn || subject.name} অধ্যায়ভিত্তিক কনসেপ্ট, প্র্যাকটিস ও MCQ`,
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
