import type { QuizQuestion } from "@/types";
import { CURRICULUM_SUBJECTS } from "@/lib/curriculum";

export type QuizDifficulty = "easy" | "medium" | "hard";
export type ExamMode = "SSC" | "HSC" | "Admission" | "University";

export type VerifiedContentSource = {
  id: string;
  title: string;
  authority: "NCTB" | "Education Board";
  url: string;
  note: string;
};

export type QuizQuestionWithTopic = QuizQuestion & {
  topic: string;
  sourceId: string;
  sourceTitle: string;
  sourceUrl: string;
  examModes?: ExamMode[];
};

export const VERIFIED_CONTENT_SOURCES: VerifiedContentSource[] = [
  {
    id: "nctb-textbook-list-2025",
    title: "২০২৫ শিক্ষাবর্ষের পাঠ্যপুস্তকের তালিকা",
    authority: "NCTB",
    url: "https://nctb.portal.gov.bd/pages/static-pages/6922df2c933eb65569e20586",
    note: "Official textbook index only. No book text is copied into the app without an approved import file.",
  },
  {
    id: "nctb-class-9-10-2025",
    title: "২০২৫ শিক্ষাবর্ষের নবম-দশম শ্রেণির পাঠ্যপুস্তক",
    authority: "NCTB",
    url: "https://nctb.portal.gov.bd/pages/static-pages/6922e0c0933eb65569e28767",
    note: "Used as official source reference. Question text must be imported from an approved dataset.",
  },
  {
    id: "nctb-english-sample-questions",
    title: "ইংরেজি নমুনা প্রশ্ন ও নির্দেশিকা",
    authority: "NCTB",
    url: "https://nctb.gov.bd/pages/static-pages/6922decf933eb65569e1d87d",
    note: "Official sample-question reference. No verbatim sample questions are bundled here.",
  },
  {
    id: "dhaka-board-ssc-corner",
    title: "SSC Corner — Dhaka Education Board",
    authority: "Education Board",
    url: "https://dhakaeducationboard.gov.bd/index.php/site/product/ssccorner",
    note: "Official board notices/question-structure reference. App data requires approved import content.",
  },
];

const EMPTY_BANK: Record<string, QuizQuestionWithTopic[]> = Object.fromEntries(
  CURRICULUM_SUBJECTS.map((subject) => [subject.id, [] as QuizQuestionWithTopic[]])
);

export const QUIZ_BY_SUBJECT: Record<string, QuizQuestionWithTopic[]> = EMPTY_BANK;

export const QUIZ_TOPICS: Record<string, string[]> = Object.fromEntries(
  CURRICULUM_SUBJECTS.map((subject) => [subject.id, subject.topics?.length ? subject.topics : [subject.nameBn || subject.name]])
);

export function getQuestionsForSubject(subjectId: string, difficulty?: QuizDifficulty) {
  const questions = QUIZ_BY_SUBJECT[subjectId] || [];
  return difficulty ? questions.filter((question) => question.difficulty === difficulty) : questions;
}

export function getSubjectQuizQuestions(
  subjectId: string,
  difficulty: QuizDifficulty = "easy",
  count = 10,
  examModeFilter?: ExamMode
) {
  const filtered = getQuestionsForSubject(subjectId, difficulty).filter((question) =>
    !examModeFilter || !question.examModes?.length || question.examModes.includes(examModeFilter)
  );
  return filtered.slice(0, Math.max(0, count));
}

export function getQuizCount(subjectId: string, difficulty?: QuizDifficulty) {
  return getQuestionsForSubject(subjectId, difficulty).length;
}
