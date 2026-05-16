import type { Lesson } from "@/types";
import { CURRICULUM_SUBJECTS } from "@/lib/curriculum";
import { VERIFIED_CONTENT_SOURCES, type ExamMode } from "@/lib/quizData";

export type WrittenDifficulty = "easy" | "medium" | "hard";

export type WrittenQuestion = {
  id: string;
  subjectId: string;
  chapterOrder: number;
  difficulty: WrittenDifficulty;
  topic: string;
  question: string;
  questionBn: string;
  expectedAnswer: string;
  keywords: string[];
  xpReward: number;
  duration: number;
  sourceId: string;
  sourceTitle: string;
  sourceUrl: string;
  examModes?: ExamMode[];
};

export const VERIFIED_WRITTEN_QUESTION_BANK: Record<string, WrittenQuestion[]> = Object.fromEntries(
  CURRICULUM_SUBJECTS.map((subject) => [subject.id, [] as WrittenQuestion[]])
);

export const WRITTEN_CONTENT_SOURCES = VERIFIED_CONTENT_SOURCES;

export function getWrittenQuestionsForChapter(subjectId: string, chapterOrder: number, difficulty: WrittenDifficulty, count = 3): WrittenQuestion[] {
  const questions = VERIFIED_WRITTEN_QUESTION_BANK[subjectId] || [];
  return questions
    .filter((question) => question.chapterOrder === chapterOrder && question.difficulty === difficulty)
    .slice(0, Math.max(0, count));
}

export function writtenQuestionToLesson(question: WrittenQuestion): Lesson {
  return {
    id: question.id,
    chapterId: `${question.subjectId}-${question.chapterOrder}`,
    title: `${question.topic} ${question.difficulty} written`,
    titleBn: `${question.topic} লিখিত প্রশ্ন`,
    content: question.questionBn,
    type: "practice",
    duration: question.duration,
    isCompleted: false,
    xpReward: question.xpReward,
  };
}

export function getWrittenQuestionCount(subjectId: string, difficulty?: WrittenDifficulty) {
  const questions = VERIFIED_WRITTEN_QUESTION_BANK[subjectId] || [];
  return difficulty ? questions.filter((question) => question.difficulty === difficulty).length : questions.length;
}
