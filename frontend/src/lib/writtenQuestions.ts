import type { Lesson } from "@/types";
import { CURRICULUM_SUBJECTS } from "@/lib/curriculum";

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

function classLabel(subjectId: string) {
  const subject = getSubject(subjectId);
  return (subject?.classLevels || []).join("/")
    .replace(/Class 6/g, "ক্লাস ৬")
    .replace(/Class 7/g, "ক্লাস ৭")
    .replace(/Class 8/g, "ক্লাস ৮")
    .replace(/Class 9/g, "ক্লাস ৯")
    .replace(/Class 10/g, "ক্লাস ১০")
    .replace(/SSC/g, "এসএসসি")
    .replace(/HSC 1st Year/g, "এইচএসসি ১ম বর্ষ")
    .replace(/HSC 2nd Year/g, "এইচএসসি ২য় বর্ষ")
    .replace(/HSC/g, "এইচএসসি")
    .replace(/Admission/g, "ভর্তি")
    .replace(/University/g, "বিশ্ববিদ্যালয়")
    .replace(/Honours/g, "অনার্স")
    .replace(/Masters/g, "মাস্টার্স")
    .replace(/Degree/g, "ডিগ্রি") || "ক্লাস";
}

function categoryOf(subjectId: string, name: string) {
  const value = `${subjectId} ${name}`.toLowerCase();
  if (value.includes("bangla") || name.includes("বাংলা")) return "bangla";
  if (value.includes("english")) return "english";
  if (value.includes("math") || name.includes("গণিত")) return "math";
  if (value.includes("physics") || name.includes("পদার্থ")) return "physics";
  if (value.includes("chemistry") || name.includes("রসায়ন")) return "chemistry";
  if (value.includes("biology") || name.includes("জীব")) return "biology";
  if (value.includes("ict") || value.includes("digital") || name.includes("প্রযুক্তি")) return "ict";
  if (value.includes("accounting") || name.includes("হিসাব")) return "accounting";
  if (value.includes("finance") || value.includes("business") || name.includes("ব্যবসায়") || name.includes("ফিন্যান্স")) return "business";
  if (value.includes("history") || name.includes("ইতিহাস")) return "history";
  if (value.includes("geography") || name.includes("ভূগোল")) return "geography";
  if (value.includes("civics") || name.includes("পৌরনীতি")) return "civics";
  if (value.includes("economics") || name.includes("অর্থনীতি")) return "economics";
  if (value.includes("religion") || name.includes("ধর্ম")) return "religion";
  if (value.includes("health") || name.includes("স্বাস্থ্য")) return "health";
  if (value.includes("gk") || name.includes("সাধারণ জ্ঞান")) return "gk";
  return "general";
}

type WrittenTemplate = { task: string; expected: string; keywords: string[] };

const templates: Record<string, Record<WrittenDifficulty, WrittenTemplate[]>> = {
  bangla: {
    easy: [
      { task: "মূলভাব ৫টি বাক্যে লিখে একটি প্রাসঙ্গিক উদাহরণ দাও", expected: "মূলভাব, চরিত্র/ঘটনা, প্রাসঙ্গিক উদাহরণ ও শুদ্ধ বানান থাকবে", keywords: ["মূলভাব", "উদাহরণ", "শুদ্ধ", "বাক্য"] },
      { task: "শব্দার্থ/ব্যাকরণ নিয়ম লিখে ৩টি নিজস্ব বাক্য তৈরি করো", expected: "নিয়ম, শব্দার্থ, নিজস্ব বাক্য ও বানানশুদ্ধ উত্তর থাকবে", keywords: ["নিয়ম", "শব্দার্থ", "বাক্য", "বানান"] },
      { task: "পাঠের দুইটি গুরুত্বপূর্ণ প্রশ্নের সংক্ষিপ্ত উত্তর লিখো", expected: "প্রশ্ন অনুযায়ী সরাসরি উত্তর, মূল পয়েন্ট ও পরিচ্ছন্ন লেখা থাকবে", keywords: ["প্রশ্ন", "উত্তর", "মূল", "পরিচ্ছন্ন"] }
    ],
    medium: [
      { task: "কারণসহ ব্যাখ্যা করো এবং লেখকের বক্তব্যের সাথে মিলিয়ে উত্তর দাও", expected: "কারণ, ব্যাখ্যা, লেখকের বক্তব্য ও উপসংহার থাকবে", keywords: ["কারণ", "ব্যাখ্যা", "লেখক", "উপসংহার"] },
      { task: "ভাবসম্প্রসারণ/সারাংশ লিখে প্রাসঙ্গিক দৃষ্টান্ত দাও", expected: "মূল ভাব, সম্প্রসারণ/সারাংশ, দৃষ্টান্ত ও ভাষার শুদ্ধতা থাকবে", keywords: ["ভাব", "সারাংশ", "দৃষ্টান্ত", "ভাষা"] },
      { task: "উদ্ধৃত অংশ বিশ্লেষণ করে প্রশ্নোত্তর আকারে সাজাও", expected: "উদ্ধৃতি, বিশ্লেষণ, প্রশ্নোত্তর ও যুক্তি থাকবে", keywords: ["উদ্ধৃতি", "বিশ্লেষণ", "যুক্তি", "প্রশ্নোত্তর"] }
    ],
    hard: [
      { task: "সৃজনশীল প্রশ্নের চার অংশ—জ্ঞান, অনুধাবন, প্রয়োগ, উচ্চতর দক্ষতা—সম্পূর্ণ করো", expected: "চার অংশ আলাদা, প্রাসঙ্গিক ব্যাখ্যা, উদাহরণ ও সিদ্ধান্ত থাকবে", keywords: ["জ্ঞান", "অনুধাবন", "প্রয়োগ", "উচ্চতর"] },
      { task: "বোর্ড পরীক্ষার মানে রচনামূলক উত্তর লিখে যুক্তি ও উপসংহার দাও", expected: "ভূমিকা, বিশ্লেষণ, যুক্তি, উদাহরণ ও উপসংহার থাকবে", keywords: ["ভূমিকা", "বিশ্লেষণ", "যুক্তি", "উপসংহার"] },
      { task: "পাঠের বক্তব্যকে বর্তমান জীবনের ঘটনার সাথে তুলনা করে বিশ্লেষণ করো", expected: "তুলনা, প্রেক্ষাপট, বাস্তব উদাহরণ ও মূল্যায়ন থাকবে", keywords: ["তুলনা", "প্রেক্ষাপট", "বাস্তব", "মূল্যায়ন"] }
    ]
  },
  english: {
    easy: [
      { task: "five correct examples with Bangla meaning write করো", expected: "correct rule/example, Bangla meaning and clean sentences থাকবে", keywords: ["rule", "example", "meaning", "sentence"] },
      { task: "given topic থেকে short paragraph outline লিখো", expected: "topic sentence, 3 points and conclusion থাকবে", keywords: ["topic", "points", "conclusion", "paragraph"] },
      { task: "basic grammar item identify করে ৩টি sentence বানাও", expected: "grammar name, correct form and examples থাকবে", keywords: ["grammar", "form", "example", "correct"] }
    ],
    medium: [
      { task: "passage/grammar item বিশ্লেষণ করে answer with reason লিখো", expected: "answer, reason, context and correction থাকবে", keywords: ["answer", "reason", "context", "correction"] },
      { task: "transformation/tense/voice type question solve করে rule explain করো", expected: "rule, transformation, tense/voice accuracy and explanation থাকবে", keywords: ["rule", "tense", "voice", "explanation"] },
      { task: "writing task-এর draft লিখে grammar mistake আলাদা করে দেখাও", expected: "organized draft, grammar accuracy and correction list থাকবে", keywords: ["draft", "grammar", "correction", "organized"] }
    ],
    hard: [
      { task: "board standard writing/grammar answer লিখে explanation দাও", expected: "full answer, grammar accuracy, explanation and final correction থাকবে", keywords: ["board", "grammar", "explanation", "correction"] },
      { task: "complex sentence/passage থেকে inference বের করে justified answer লিখো", expected: "inference, evidence, reason and accurate language থাকবে", keywords: ["inference", "evidence", "reason", "accurate"] },
      { task: "composition-style answer লিখে coherence, vocabulary ও conclusion দেখাও", expected: "coherence, vocabulary, paragraph structure and conclusion থাকবে", keywords: ["coherence", "vocabulary", "structure", "conclusion"] }
    ]
  },
  math: {
    easy: [
      { task: "প্রদত্ত ধারণা দিয়ে একটি মৌলিক অঙ্ক ধাপে ধাপে সমাধান করো", expected: "দেওয়া তথ্য, সূত্র, হিসাবের ধাপ ও চূড়ান্ত উত্তর থাকবে", keywords: ["তথ্য", "সূত্র", "হিসাব", "উত্তর"] },
      { task: "সংজ্ঞা/নিয়ম লিখে ছোট উদাহরণ সমাধান করো", expected: "নিয়ম, উদাহরণ, ধাপ ও ফলাফল থাকবে", keywords: ["নিয়ম", "উদাহরণ", "ধাপ", "ফলাফল"] },
      { task: "চিত্র/সংখ্যা ব্যবহার করে সহজ সমস্যা সমাধান করো", expected: "চিত্র/সংখ্যা, পদ্ধতি, হিসাব ও যাচাই থাকবে", keywords: ["চিত্র", "পদ্ধতি", "হিসাব", "যাচাই"] }
    ],
    medium: [
      { task: "প্রয়োগভিত্তিক সমস্যা তৈরি করে সূত্রসহ সম্পূর্ণ সমাধান করো", expected: "সমস্যার তথ্য, সূত্র নির্বাচন, হিসাব ও যাচাই থাকবে", keywords: ["সমস্যা", "সূত্র", "হিসাব", "যাচাই"] },
      { task: "দুই ধাপের সমীকরণ/জ্যামিতিক সমস্যা সমাধান করো", expected: "ধাপ, যুক্তি, মান বসানো এবং চূড়ান্ত ফল থাকবে", keywords: ["ধাপ", "যুক্তি", "মান", "ফল"] },
      { task: "ভুল সমাধান কোথায় হয়েছে দেখিয়ে সঠিক সমাধান লিখো", expected: "ভুল শনাক্ত, সংশোধন, সঠিক হিসাব ও উত্তর থাকবে", keywords: ["ভুল", "সংশোধন", "হিসাব", "উত্তর"] }
    ],
    hard: [
      { task: "সৃজনশীল/বোর্ড-ধাঁচের সমস্যা সমাধান করে নিয়মের কারণ ব্যাখ্যা করো", expected: "যুক্তিসহ সূত্র, ধারাবাহিক সমাধান, যাচাই ও ফলাফল থাকবে", keywords: ["যুক্তি", "সূত্র", "ধারাবাহিক", "ফলাফল"] },
      { task: "একাধিক ধারণা মিলিয়ে জটিল অঙ্কের প্রমাণ/সমাধান দাও", expected: "ধারণা নির্বাচন, প্রমাণ/সমাধান, ব্যাখ্যা ও সিদ্ধান্ত থাকবে", keywords: ["ধারণা", "প্রমাণ", "ব্যাখ্যা", "সিদ্ধান্ত"] },
      { task: "বোর্ড পরীক্ষার পূর্ণ নম্বরের মতো উপস্থাপন করে final answer দাও", expected: "পরিচ্ছন্ন উপস্থাপন, সব ধাপ, একক/ফলাফল ও যাচাই থাকবে", keywords: ["উপস্থাপন", "ধাপ", "একক", "যাচাই"] }
    ]
  },
  science: {
    easy: [
      { task: "সংজ্ঞা লিখে ২টি উদাহরণ দাও", expected: "সংজ্ঞা, মূল ধারণা, উদাহরণ ও পরিষ্কার উপস্থাপন থাকবে", keywords: ["সংজ্ঞা", "ধারণা", "উদাহরণ", "উত্তর"] },
      { task: "চিত্র/ধারণার অংশগুলো নামসহ লিখো", expected: "লেবেল, কাজ/ধারণা, উদাহরণ ও পরিচ্ছন্ন লেখা থাকবে", keywords: ["লেবেল", "কাজ", "ধারণা", "উদাহরণ"] },
      { task: "ছোট প্রশ্নের উত্তর কারণসহ লিখো", expected: "সরাসরি উত্তর, কারণ ও প্রাসঙ্গিক তথ্য থাকবে", keywords: ["উত্তর", "কারণ", "তথ্য", "প্রাসঙ্গিক"] }
    ],
    medium: [
      { task: "কারণ-ফলাফলসহ একটি গুরুত্বপূর্ণ প্রশ্নের উত্তর লিখো", expected: "মূল কারণ, ফলাফল, তথ্য/সূত্র ও উপসংহার থাকবে", keywords: ["কারণ", "ফলাফল", "তথ্য", "উপসংহার"] },
      { task: "প্রক্রিয়া/পরীক্ষণ ধাপে ধাপে ব্যাখ্যা করো", expected: "ধাপ, পর্যবেক্ষণ, ব্যাখ্যা ও সিদ্ধান্ত থাকবে", keywords: ["ধাপ", "পর্যবেক্ষণ", "ব্যাখ্যা", "সিদ্ধান্ত"] },
      { task: "বাস্তব উদাহরণের সাথে বৈজ্ঞানিক ধারণা মিলিয়ে উত্তর দাও", expected: "বাস্তব উদাহরণ, ধারণা, প্রয়োগ ও উপসংহার থাকবে", keywords: ["বাস্তব", "ধারণা", "প্রয়োগ", "উপসংহার"] }
    ],
    hard: [
      { task: "সৃজনশীল প্রশ্নের চার অংশ—জ্ঞান, অনুধাবন, প্রয়োগ ও উচ্চতর দক্ষতা—সাজাও", expected: "চার অংশের উত্তর, ব্যাখ্যা, প্রয়োগ ও যুক্তিসঙ্গত সিদ্ধান্ত থাকবে", keywords: ["জ্ঞান", "অনুধাবন", "প্রয়োগ", "সিদ্ধান্ত"] },
      { task: "চিত্র/ডেটা বিশ্লেষণ করে কারণ ও ফলাফলসহ সিদ্ধান্ত দাও", expected: "চিত্র/ডেটা, বিশ্লেষণ, কারণ, ফলাফল ও সিদ্ধান্ত থাকবে", keywords: ["চিত্র", "ডেটা", "বিশ্লেষণ", "সিদ্ধান্ত"] },
      { task: "বোর্ড-ধাঁচের দীর্ঘ প্রশ্নের পূর্ণাঙ্গ উত্তর লিখো", expected: "ভূমিকা, মূল ব্যাখ্যা, প্রয়োগ, উদাহরণ ও উপসংহার থাকবে", keywords: ["ভূমিকা", "ব্যাখ্যা", "প্রয়োগ", "উপসংহার"] }
    ]
  },
  general: {
    easy: [
      { task: "৫টি মূল পয়েন্ট লিখে সংক্ষিপ্ত উত্তর দাও", expected: "মূল পয়েন্ট, সংজ্ঞা/পরিচিতি ও পরিষ্কার সংক্ষিপ্ত উত্তর থাকবে", keywords: ["মূল", "পয়েন্ট", "সংজ্ঞা", "উত্তর"] },
      { task: "প্রাথমিক ধারণা লিখে একটি উদাহরণ দাও", expected: "ধারণা, উদাহরণ, কারণ ও ছোট উপসংহার থাকবে", keywords: ["ধারণা", "উদাহরণ", "কারণ", "উপসংহার"] },
      { task: "অধ্যায়ের গুরুত্বপূর্ণ শব্দ/ঘটনা ব্যাখ্যা করো", expected: "শব্দ/ঘটনা, অর্থ, প্রাসঙ্গিক তথ্য ও উত্তর থাকবে", keywords: ["শব্দ", "ঘটনা", "অর্থ", "তথ্য"] }
    ],
    medium: [
      { task: "কারণ-ব্যাখ্যাভিত্তিক প্রশ্নের উত্তর লিখে উদাহরণ দাও", expected: "কারণ, ব্যাখ্যা, উদাহরণ ও বিষয়ভিত্তিক উপসংহার থাকবে", keywords: ["কারণ", "ব্যাখ্যা", "উদাহরণ", "উপসংহার"] },
      { task: "দুইটি ধারণা তুলনা করে সাদৃশ্য-ভিন্নতা লিখো", expected: "তুলনা, সাদৃশ্য, ভিন্নতা ও সিদ্ধান্ত থাকবে", keywords: ["তুলনা", "সাদৃশ্য", "ভিন্নতা", "সিদ্ধান্ত"] },
      { task: "বাস্তব জীবনের উদাহরণ দিয়ে প্রয়োগ ব্যাখ্যা করো", expected: "বাস্তব উদাহরণ, প্রয়োগ, বিশ্লেষণ ও উপসংহার থাকবে", keywords: ["বাস্তব", "প্রয়োগ", "বিশ্লেষণ", "উপসংহার"] }
    ],
    hard: [
      { task: "সৃজনশীল/বিশ্লেষণধর্মী প্রশ্নের উত্তর লিখো; প্রেক্ষাপট, বিশ্লেষণ ও সিদ্ধান্ত আলাদা করো", expected: "প্রেক্ষাপট, বিশ্লেষণ, যুক্তি, উদাহরণ ও সিদ্ধান্ত থাকবে", keywords: ["প্রেক্ষাপট", "বিশ্লেষণ", "যুক্তি", "সিদ্ধান্ত"] },
      { task: "উদ্দীপকভিত্তিক প্রশ্নে তথ্য যাচাই করে পূর্ণাঙ্গ উত্তর দাও", expected: "উদ্দীপক, তথ্য যাচাই, ব্যাখ্যা, উদাহরণ ও সিদ্ধান্ত থাকবে", keywords: ["উদ্দীপক", "তথ্য", "ব্যাখ্যা", "সিদ্ধান্ত"] },
      { task: "বোর্ড মানের দীর্ঘ উত্তর লিখে মূল্যায়ন যোগ করো", expected: "ভূমিকা, মূল আলোচনা, মূল্যায়ন, উদাহরণ ও উপসংহার থাকবে", keywords: ["ভূমিকা", "আলোচনা", "মূল্যায়ন", "উপসংহার"] }
    ]
  }
};

function templateGroup(category: string) {
  if (["physics", "chemistry", "biology", "ict", "health"].includes(category)) return templates.science;
  if (["business", "accounting", "history", "geography", "civics", "economics", "religion", "gk"].includes(category)) return templates.general;
  return templates[category] || templates.general;
}

function buildQuestion(subjectId: string, topic: string, difficulty: WrittenDifficulty, serial: number): Omit<WrittenQuestion, "id" | "subjectId" | "chapterOrder" | "topic" | "difficulty" | "xpReward" | "duration"> {
  const subject = getSubject(subjectId);
  const subjectName = subject?.nameBn || subject?.name || "বিষয়";
  const category = categoryOf(subjectId, subjectName);
  const group = templateGroup(category);
  const tmpl = group[difficulty][(serial - 1) % group[difficulty].length];
  const label = difficultyMeta[difficulty].label;
  const cls = classLabel(subjectId);
  const prefix = `${cls} · ${subjectName} · ${topic} · ${subjectId}`;
  const questionBn = `${prefix}: ${label} লিখিত প্রশ্ন ${serial} — ${tmpl.task}।`;
  return {
    question: questionBn,
    questionBn,
    expectedAnswer: tmpl.expected,
    keywords: tmpl.keywords,
  };
}

export function getWrittenQuestionsForChapter(subjectId: string, chapterOrder: number, difficulty: WrittenDifficulty, count = 3): WrittenQuestion[] {
  const subject = getSubject(subjectId);
  const topics = safeTopics(subjectId);
  const topic = topics[Math.max(0, (chapterOrder - 1) % topics.length)] || subject?.nameBn || "বিষয়";
  const meta = difficultyMeta[difficulty];
  return Array.from({ length: count }, (_, idx) => {
    const serial = idx + 1;
    const core = buildQuestion(subjectId, topic, difficulty, serial);
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
    content: `${question.questionBn}\n\nসঠিক উত্তরের গাইড: ${question.expectedAnswer}`,
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
