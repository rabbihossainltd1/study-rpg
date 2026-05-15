import type { Lesson } from "@/types";
import { CURRICULUM_SUBJECTS, type CurriculumSubject } from "@/lib/curriculum";

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
};

const difficultyMeta: Record<WrittenDifficulty, { label: string; xp: number; duration: number }> = {
  easy: { label: "সহজ", xp: 35, duration: 12 },
  medium: { label: "মাঝারি", xp: 55, duration: 18 },
  hard: { label: "কঠিন", xp: 80, duration: 25 },
};

function getSubject(subjectId: string) {
  return CURRICULUM_SUBJECTS.find((s) => s.id === subjectId);
}

function safeTopics(subjectId: string) {
  const subject = getSubject(subjectId);
  return subject?.topics?.length ? subject.topics : [subject?.nameBn || subject?.name || "বিষয়"];
}

function classPrefix(subject?: CurriculumSubject) {
  const levels = subject?.classLevels || [];
  if (levels.includes("Class 6")) return "ক্লাস ৬";
  if (levels.includes("Class 7")) return "ক্লাস ৭";
  if (levels.includes("Class 8")) return "ক্লাস ৮";
  if (levels.includes("Class 9") || levels.includes("Class 10") || levels.includes("SSC")) return "নবম-দশম";
  if (levels.some((level) => level.includes("HSC"))) return "উচ্চমাধ্যমিক";
  if (levels.includes("Admission")) return "ভর্তি প্রস্তুতি";
  if (levels.some((level) => /University|Honours|Degree|Masters/.test(level))) return "বিশ্ববিদ্যালয়";
  return "পাঠ্যসূচি";
}

function categoryOf(subject?: CurriculumSubject) {
  const value = `${subject?.id || ""} ${subject?.name || ""} ${subject?.nameBn || ""}`.toLowerCase();
  if (value.includes("bangla") || value.includes("বাংলা")) return "bangla";
  if (value.includes("english")) return "english";
  if (value.includes("math") || value.includes("গণিত")) return "math";
  if (value.includes("physics") || value.includes("chemistry") || value.includes("biology") || value.includes("science") || value.includes("ict") || value.includes("digital") || value.includes("বিজ্ঞান") || value.includes("প্রযুক্তি") || value.includes("স্বাস্থ্য")) return "science";
  if (value.includes("accounting") || value.includes("finance") || value.includes("business") || value.includes("হিসাব") || value.includes("ফিন্যান্স") || value.includes("ব্যবসায়")) return "business";
  if (value.includes("gk") || value.includes("সাধারণ জ্ঞান")) return "gk";
  return "humanities";
}

type BuiltQuestion = Pick<WrittenQuestion, "question" | "questionBn" | "expectedAnswer" | "keywords">;

function mathNumbers(subjectId: string, chapterOrder: number, serial: number) {
  const seed = Array.from(subjectId).reduce((sum, ch) => sum + ch.charCodeAt(0), 0) + chapterOrder * 13 + serial * 7;
  return {
    a: 6 + (seed % 17),
    b: 3 + (seed % 11),
    c: 2 + (seed % 9),
  };
}

function buildBanglaQuestion(level: string, subjectName: string, topic: string, difficulty: WrittenDifficulty, serial: number): BuiltQuestion {
  const easy = [
    `${level} ${subjectName}: '${topic}' পাঠের মূল বক্তব্য নিজের ভাষায় ৫-৬ বাক্যে লিখো।`,
    `${level} ${subjectName}: '${topic}' পাঠ থেকে ৪টি গুরুত্বপূর্ণ শব্দের অর্থ লিখে প্রতিটি দিয়ে বাক্য তৈরি করো।`,
    `${level} ${subjectName}: '${topic}' অংশের চরিত্র/ঘটনা সম্পর্কে সংক্ষিপ্ত প্রশ্নোত্তর লেখো।`,
  ];
  const medium = [
    `${level} ${subjectName}: '${topic}' পাঠে লেখকের বক্তব্য কারণসহ ব্যাখ্যা করো।`,
    `${level} ${subjectName}: '${topic}' অংশের একটি উদ্ধৃতি ধরে ভাবসম্প্রসারণ বা সারাংশ লিখো।`,
    `${level} ${subjectName}: '${topic}' পাঠের ঘটনার সাথে বাস্তব জীবনের একটি মিল দেখাও।`,
  ];
  const hard = [
    `${level} ${subjectName}: '${topic}' পাঠের আলোকে সৃজনশীল প্রশ্নের জ্ঞান, অনুধাবন, প্রয়োগ ও উচ্চতর দক্ষতা অংশের উত্তর লিখো।`,
    `${level} ${subjectName}: '${topic}' পাঠের মূল শিক্ষা বিশ্লেষণ করে যুক্তিসহ পূর্ণাঙ্গ রচনামূলক উত্তর দাও।`,
    `${level} ${subjectName}: '${topic}' পাঠের বক্তব্য বর্তমান সমাজের একটি ঘটনার সাথে তুলনা করে মূল্যায়ন করো।`,
  ];
  const pool = difficulty === "easy" ? easy : difficulty === "medium" ? medium : hard;
  return {
    question: pool[(serial - 1) % pool.length],
    questionBn: pool[(serial - 1) % pool.length],
    expectedAnswer: "মূল বক্তব্য, প্রাসঙ্গিক উদাহরণ, যুক্তি ও শুদ্ধ বানান থাকবে।",
    keywords: ["মূল বক্তব্য", "উদাহরণ", "ব্যাখ্যা", "উপসংহার"],
  };
}

function buildEnglishQuestion(level: string, subjectName: string, topic: string, difficulty: WrittenDifficulty, serial: number): BuiltQuestion {
  const easy = [
    `${level} ${subjectName}: Write 5 correct sentences using the rule or vocabulary from '${topic}'.`,
    `${level} ${subjectName}: Read the '${topic}' item and write the Bangla meaning with two examples.`,
    `${level} ${subjectName}: Identify the basic grammar point from '${topic}' and make three short sentences.`,
  ];
  const medium = [
    `${level} ${subjectName}: Solve a '${topic}' grammar/writing question and explain the rule with reasons.`,
    `${level} ${subjectName}: Write a short paragraph outline from '${topic}' with topic sentence, points and conclusion.`,
    `${level} ${subjectName}: Correct the mistakes in a '${topic}' style answer and write the reason for each correction.`,
  ];
  const hard = [
    `${level} ${subjectName}: Write a board-standard answer on '${topic}' with clear structure and grammatical accuracy.`,
    `${level} ${subjectName}: Analyze a complex '${topic}' item and justify the answer with evidence.`,
    `${level} ${subjectName}: Complete a composition-style task from '${topic}' using coherence, vocabulary and conclusion.`,
  ];
  const pool = difficulty === "easy" ? easy : difficulty === "medium" ? medium : hard;
  return {
    question: pool[(serial - 1) % pool.length],
    questionBn: pool[(serial - 1) % pool.length],
    expectedAnswer: "Correct grammar, relevant examples, organized structure and conclusion should be present.",
    keywords: ["rule", "example", "reason", "conclusion"],
  };
}

function buildMathQuestion(level: string, subjectName: string, topic: string, difficulty: WrittenDifficulty, serial: number, subjectId: string, chapterOrder: number): BuiltQuestion {
  const { a, b, c } = mathNumbers(subjectId, chapterOrder, serial);
  const easy = [
    `${level} ${subjectName}: '${topic}' অধ্যায়ের নিয়ম ব্যবহার করে ${a} ও ${b} সংখ্যার একটি মৌলিক সমস্যা ধাপে ধাপে সমাধান করো।`,
    `${level} ${subjectName}: '${topic}' থেকে একটি সূত্র লিখে ${a + b} এর উপর সহজ উদাহরণ সমাধান করো।`,
    `${level} ${subjectName}: '${topic}' ধারণা দিয়ে ${a} : ${b} অনুপাত/মান নির্ণয় করো।`,
  ];
  const medium = [
    `${level} ${subjectName}: '${topic}' অধ্যায় থেকে দুই ধাপের সমস্যা তৈরি করে সূত্রসহ সম্পূর্ণ সমাধান করো।`,
    `${level} ${subjectName}: '${topic}' ব্যবহার করে ${a}x + ${b} = ${a * c + b} সমীকরণটি সমাধান করো।`,
    `${level} ${subjectName}: '${topic}' সম্পর্কিত একটি ভুল সমাধান দেখিয়ে সঠিক পদ্ধতি লিখো।`,
  ];
  const hard = [
    `${level} ${subjectName}: '${topic}' অধ্যায়ের একাধিক ধারণা মিলিয়ে বোর্ড-ধাঁচের একটি জটিল সমস্যা সমাধান করো।`,
    `${level} ${subjectName}: '${topic}' থেকে প্রমাণ/উপপাদ্য/সূত্রের ব্যবহার দেখিয়ে পূর্ণাঙ্গ উত্তর লিখো।`,
    `${level} ${subjectName}: '${topic}' সমস্যার সমাধানে সূত্র নির্বাচন, হিসাব, যাচাই ও চূড়ান্ত সিদ্ধান্ত আলাদা করে দেখাও।`,
  ];
  const pool = difficulty === "easy" ? easy : difficulty === "medium" ? medium : hard;
  return {
    question: pool[(serial - 1) % pool.length],
    questionBn: pool[(serial - 1) % pool.length],
    expectedAnswer: "দেওয়া তথ্য, সূত্র, ধারাবাহিক হিসাব, যাচাই ও চূড়ান্ত ফল থাকবে।",
    keywords: ["তথ্য", "সূত্র", "হিসাব", "যাচাই"],
  };
}

function buildScienceQuestion(level: string, subjectName: string, topic: string, difficulty: WrittenDifficulty, serial: number): BuiltQuestion {
  const easy = [
    `${level} ${subjectName}: '${topic}' অধ্যায়ের একটি গুরুত্বপূর্ণ সংজ্ঞা লিখে ২টি উদাহরণ দাও।`,
    `${level} ${subjectName}: '${topic}' ধারণার অংশগুলো নামসহ লিখে কাজ ব্যাখ্যা করো।`,
    `${level} ${subjectName}: '${topic}' থেকে একটি ছোট প্রশ্নের উত্তর কারণসহ লিখো।`,
  ];
  const medium = [
    `${level} ${subjectName}: '${topic}' অধ্যায়ের একটি প্রক্রিয়া ধাপে ধাপে ব্যাখ্যা করো।`,
    `${level} ${subjectName}: '${topic}' বিষয়ে কারণ-ফলাফলসহ একটি গুরুত্বপূর্ণ প্রশ্নের উত্তর লিখো।`,
    `${level} ${subjectName}: '${topic}' ধারণাকে বাস্তব উদাহরণের সাথে মিলিয়ে ব্যাখ্যা করো।`,
  ];
  const hard = [
    `${level} ${subjectName}: '${topic}' অধ্যায়ের উদ্দীপকভিত্তিক প্রশ্নে তথ্য বিশ্লেষণ করে পূর্ণাঙ্গ উত্তর দাও।`,
    `${level} ${subjectName}: '${topic}' থেকে সূত্র/চিত্র/তত্ত্ব ব্যবহার করে বোর্ড-মানের উত্তর লিখো।`,
    `${level} ${subjectName}: '${topic}' বিষয়ের প্রয়োগ, সীমাবদ্ধতা ও সিদ্ধান্ত বিশ্লেষণ করো।`,
  ];
  const pool = difficulty === "easy" ? easy : difficulty === "medium" ? medium : hard;
  return {
    question: pool[(serial - 1) % pool.length],
    questionBn: pool[(serial - 1) % pool.length],
    expectedAnswer: "সংজ্ঞা/তথ্য, কারণ, প্রক্রিয়া/চিত্র, উদাহরণ ও উপসংহার থাকবে।",
    keywords: ["সংজ্ঞা", "কারণ", "প্রক্রিয়া", "উদাহরণ"],
  };
}

function buildGeneralQuestion(level: string, subjectName: string, topic: string, difficulty: WrittenDifficulty, serial: number): BuiltQuestion {
  const easy = [
    `${level} ${subjectName}: '${topic}' অধ্যায়ের মূল ধারণা সংক্ষেপে লিখে একটি উদাহরণ দাও।`,
    `${level} ${subjectName}: '${topic}' থেকে ৪টি গুরুত্বপূর্ণ তথ্য লিখো।`,
    `${level} ${subjectName}: '${topic}' বিষয়ে ছোট প্রশ্নের সরাসরি উত্তর লিখো।`,
  ];
  const medium = [
    `${level} ${subjectName}: '${topic}' বিষয়ে কারণ-ব্যাখ্যাসহ উত্তর লিখে উদাহরণ দাও।`,
    `${level} ${subjectName}: '${topic}' অধ্যায়ের দুইটি ধারণা তুলনা করে সাদৃশ্য-ভিন্নতা লেখো।`,
    `${level} ${subjectName}: '${topic}' ধারণার বাস্তব প্রয়োগ ব্যাখ্যা করো।`,
  ];
  const hard = [
    `${level} ${subjectName}: '${topic}' নিয়ে উদ্দীপকভিত্তিক বিশ্লেষণধর্মী উত্তর লিখো।`,
    `${level} ${subjectName}: '${topic}' অধ্যায়ের তথ্য যাচাই করে পূর্ণাঙ্গ সিদ্ধান্ত দাও।`,
    `${level} ${subjectName}: '${topic}' বিষয়ের গুরুত্ব, সমস্যা ও সমাধান মূল্যায়ন করো।`,
  ];
  const pool = difficulty === "easy" ? easy : difficulty === "medium" ? medium : hard;
  return {
    question: pool[(serial - 1) % pool.length],
    questionBn: pool[(serial - 1) % pool.length],
    expectedAnswer: "মূল তথ্য, কারণ, উদাহরণ, বিশ্লেষণ ও উপসংহার থাকবে।",
    keywords: ["তথ্য", "কারণ", "উদাহরণ", "উপসংহার"],
  };
}

function buildQuestion(subjectId: string, topic: string, difficulty: WrittenDifficulty, serial: number, chapterOrder: number): BuiltQuestion {
  const subject = getSubject(subjectId);
  const subjectName = subject?.nameBn || subject?.name || "বিষয়";
  const level = classPrefix(subject);
  const category = categoryOf(subject);
  if (category === "bangla") return buildBanglaQuestion(level, subjectName, topic, difficulty, serial);
  if (category === "english") return buildEnglishQuestion(level, subjectName, topic, difficulty, serial);
  if (category === "math") return buildMathQuestion(level, subjectName, topic, difficulty, serial, subjectId, chapterOrder);
  if (category === "science") return buildScienceQuestion(level, subjectName, topic, difficulty, serial);
  return buildGeneralQuestion(level, subjectName, topic, difficulty, serial);
}

export function getWrittenQuestionsForChapter(subjectId: string, chapterOrder: number, difficulty: WrittenDifficulty, count = 3): WrittenQuestion[] {
  const subject = getSubject(subjectId);
  const topics = safeTopics(subjectId);
  const topic = topics[Math.max(0, (chapterOrder - 1) % topics.length)] || subject?.nameBn || "বিষয়";
  const meta = difficultyMeta[difficulty];
  return Array.from({ length: count }, (_, idx) => {
    const serial = idx + 1;
    const core = buildQuestion(subjectId, topic, difficulty, serial, chapterOrder);
    return {
      id: `${subjectId}-${chapterOrder}-${difficulty}-written-${serial}`,
      subjectId,
      chapterOrder,
      difficulty,
      topic,
      xpReward: meta.xp + idx * 5,
      duration: meta.duration + idx * 3,
      ...core,
    };
  });
}

export function writtenQuestionToLesson(question: WrittenQuestion): Lesson {
  return {
    id: question.id,
    chapterId: `${question.subjectId}-${question.chapterOrder}`,
    title: `${question.topic} ${question.difficulty} written ${question.id.split("-").pop()}`,
    titleBn: `${question.topic} ${difficultyMeta[question.difficulty].label} লিখিত প্রশ্ন`,
    content: question.questionBn,
    type: "practice",
    duration: question.duration,
    isCompleted: false,
    xpReward: question.xpReward,
  };
}

export function getWrittenQuestionCount(subjectId: string, difficulty?: WrittenDifficulty) {
  const topics = safeTopics(subjectId);
  const perChapter = 3;
  if (difficulty) return topics.length * perChapter;
  return topics.length * perChapter * 3;
}
