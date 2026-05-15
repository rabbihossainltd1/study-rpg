import type { QuizQuestion } from "@/types";
import { CURRICULUM_SUBJECTS, type CurriculumSubject } from "@/lib/curriculum";

export type QuizDifficulty = "easy" | "medium" | "hard";
export type QuizQuestionWithTopic = QuizQuestion & {
  topic: string;
  examModes?: Array<"SSC" | "HSC" | "Admission" | "University">;
};

const DIFFICULTY_BN: Record<QuizDifficulty, string> = {
  easy: "সহজ",
  medium: "মাঝারি",
  hard: "কঠিন",
};

const DIFFICULTY_ACTION: Record<QuizDifficulty, string[]> = {
  easy: ["মূল ধারণা বোঝার জন্য", "সংক্ষিপ্ত উত্তরে", "সঠিক তথ্য শনাক্ত করতে"],
  medium: ["কারণ-ফল বিশ্লেষণে", "প্রয়োগভিত্তিক প্রশ্নে", "দুইটি ধারণা মিলিয়ে"],
  hard: ["সৃজনশীল উদ্দীপকে", "বোর্ড-মানের বিশ্লেষণে", "উচ্চতর দক্ষতার উত্তরে"],
};

const CORRECT_BY_CATEGORY: Record<string, Record<QuizDifficulty, string[]>> = {
  bangla: {
    easy: ["মূল বক্তব্য ও প্রাসঙ্গিক শব্দার্থ", "শুদ্ধ বানান ও বাক্যগঠন", "পাঠের সরাসরি তথ্য"],
    medium: ["কারণ, ব্যাখ্যা ও উদাহরণ", "লেখকের বক্তব্যের সাথে মিল", "উদ্ধৃত অংশের প্রাসঙ্গিক বিশ্লেষণ"],
    hard: ["প্রেক্ষাপট, বিশ্লেষণ ও সিদ্ধান্ত", "সৃজনশীল চার অংশের পূর্ণ উত্তর", "বর্তমান জীবনের সাথে যুক্তিসংগত তুলনা"],
  },
  english: {
    easy: ["correct rule with example", "meaning from context", "simple accurate sentence"],
    medium: ["answer with grammatical reason", "context based correction", "organized paragraph structure"],
    hard: ["coherent argument with evidence", "advanced grammar accuracy", "inference with justified explanation"],
  },
  math: {
    easy: ["সূত্র বসিয়ে ধাপে ধাপে হিসাব", "প্রদত্ত তথ্য থেকে সরল সমাধান", "চিত্র/সংখ্যা দেখে সঠিক ফল"],
    medium: ["দুই ধাপের যুক্তিসংগত সমাধান", "সঠিক সূত্র নির্বাচন ও যাচাই", "ভুল সংশোধনসহ ফলাফল"],
    hard: ["একাধিক ধারণা মিলিয়ে প্রমাণ", "পূর্ণাঙ্গ বোর্ড-স্টাইল সমাধান", "যুক্তি, সূত্র ও যাচাইসহ সিদ্ধান্ত"],
  },
  science: {
    easy: ["সংজ্ঞা, বৈশিষ্ট্য ও উদাহরণ", "চিত্রের অংশ ও কাজ", "কারণসহ ছোট উত্তর"],
    medium: ["প্রক্রিয়া, পর্যবেক্ষণ ও সিদ্ধান্ত", "কারণ-ফল ও বাস্তব উদাহরণ", "তথ্যভিত্তিক ব্যাখ্যা"],
    hard: ["উদ্দীপক বিশ্লেষণ ও প্রয়োগ", "সূত্র/তত্ত্ব দিয়ে পূর্ণাঙ্গ ব্যাখ্যা", "সমালোচনামূলক সিদ্ধান্ত"],
  },
  business: {
    easy: ["মৌলিক সংজ্ঞা ও উদাহরণ", "লেনদেন/ধারণার সঠিক শ্রেণি", "সহজ নিয়ম প্রয়োগ"],
    medium: ["কারণসহ বিশ্লেষণ", "হিসাব/তথ্য মিলিয়ে সিদ্ধান্ত", "বাস্তব ব্যবসায়িক প্রয়োগ"],
    hard: ["কেস স্টাডি বিশ্লেষণ", "পূর্ণাঙ্গ আর্থিক/ব্যবস্থাপনা সিদ্ধান্ত", "ঝুঁকি ও ফলাফল মূল্যায়ন"],
  },
  humanities: {
    easy: ["ঘটনা, স্থান ও সময়ের সঠিক তথ্য", "মূল ধারণার সংক্ষিপ্ত ব্যাখ্যা", "প্রাসঙ্গিক উদাহরণ"],
    medium: ["কারণ-ফল সম্পর্ক", "তুলনা ও ব্যাখ্যা", "তথ্যভিত্তিক মতামত"],
    hard: ["উদ্দীপক বিশ্লেষণ", "ঐতিহাসিক/সামাজিক মূল্যায়ন", "যুক্তিসংগত উপসংহার"],
  },
  gk: {
    easy: ["সঠিক মৌলিক তথ্য", "বাংলাদেশ/বিশ্বের প্রাসঙ্গিক তথ্য", "প্রশ্নের সরাসরি উত্তর"],
    medium: ["ঘটনার কারণ ও প্রভাব", "তথ্য মিলিয়ে সিদ্ধান্ত", "প্রেক্ষাপটসহ উত্তর"],
    hard: ["বিশ্লেষণধর্মী ব্যাখ্যা", "তথ্য যাচাই করে সিদ্ধান্ত", "সাম্প্রতিক প্রেক্ষাপটে মূল্যায়ন"],
  },
};

const DISTRACTORS = [
  "অপ্রাসঙ্গিক তথ্য মুখস্থ করা",
  "প্রশ্ন না পড়ে অনুমান করা",
  "কারণ ছাড়া সিদ্ধান্ত দেওয়া",
  "বিষয়ের বাইরে উত্তর লেখা",
  "শুধু পৃষ্ঠা সংখ্যা মনে রাখা",
  "উদাহরণ বাদ দিয়ে অসম্পূর্ণ উত্তর",
  "নিয়ম না মেনে এলোমেলো লেখা",
  "ভুল তথ্যকে চূড়ান্ত উত্তর ধরা",
];

function classPrefix(subject: CurriculumSubject) {
  const levels = subject.classLevels || [];
  if (levels.includes("Class 6")) return "ক্লাস ৬";
  if (levels.includes("Class 7")) return "ক্লাস ৭";
  if (levels.includes("Class 8")) return "ক্লাস ৮";
  if (levels.includes("Class 9") || levels.includes("Class 10") || levels.includes("SSC")) return "নবম-দশম";
  if (levels.some((level) => level.includes("HSC"))) return "উচ্চমাধ্যমিক";
  if (levels.includes("Admission")) return "ভর্তি প্রস্তুতি";
  if (levels.some((level) => /University|Honours|Degree|Masters/.test(level))) return "বিশ্ববিদ্যালয়";
  return "পাঠ্যসূচি";
}

function examMode(subject: CurriculumSubject): "SSC" | "HSC" | "Admission" | "University" {
  const joined = `${subject.classLevels.join(" ")} ${subject.examTypes.join(" ")}`.toLowerCase();
  if (joined.includes("hsc")) return "HSC";
  if (joined.includes("admission")) return "Admission";
  if (joined.includes("university") || joined.includes("honours") || joined.includes("degree") || joined.includes("masters")) return "University";
  return "SSC";
}

function categoryOf(subject: CurriculumSubject) {
  const value = `${subject.id} ${subject.name} ${subject.nameBn}`.toLowerCase();
  if (value.includes("bangla") || subject.nameBn.includes("বাংলা")) return "bangla";
  if (value.includes("english")) return "english";
  if (value.includes("math") || subject.nameBn.includes("গণিত")) return "math";
  if (value.includes("physics") || value.includes("chemistry") || value.includes("biology") || value.includes("science") || value.includes("ict") || value.includes("digital") || subject.nameBn.includes("বিজ্ঞান") || subject.nameBn.includes("প্রযুক্তি") || subject.nameBn.includes("স্বাস্থ্য")) return "science";
  if (value.includes("accounting") || value.includes("finance") || value.includes("business") || subject.nameBn.includes("হিসাব") || subject.nameBn.includes("ফিন্যান্স") || subject.nameBn.includes("ব্যবসায়")) return "business";
  if (value.includes("gk") || subject.nameBn.includes("সাধারণ জ্ঞান")) return "gk";
  if (value.includes("history") || value.includes("geography") || value.includes("civics") || value.includes("economics") || value.includes("logic") || value.includes("psychology") || subject.nameBn.includes("ইতিহাস") || subject.nameBn.includes("ভূগোল") || subject.nameBn.includes("পৌরনীতি") || subject.nameBn.includes("অর্থনীতি") || subject.nameBn.includes("যুক্তিবিদ্যা") || subject.nameBn.includes("মনোবিজ্ঞান") || subject.nameBn.includes("ধর্ম")) return "humanities";
  return "humanities";
}

function shuffleOptions(correct: string, serial: number) {
  const wrong: string[] = [];
  for (let i = 0; wrong.length < 3 && i < DISTRACTORS.length * 2; i += 1) {
    const candidate = DISTRACTORS[(serial + i) % DISTRACTORS.length];
    if (candidate !== correct && !wrong.includes(candidate)) wrong.push(candidate);
  }
  const options = [correct, ...wrong.slice(0, 3)];
  const correctAnswer = serial % 4;
  const [first] = options.splice(0, 1);
  options.splice(correctAnswer, 0, first);
  return { options, correctAnswer };
}

function questionStem(subject: CurriculumSubject, category: string, topic: string, difficulty: QuizDifficulty, serial: number) {
  const prefix = `${classPrefix(subject)} ${subject.nameBn}`;
  const action = DIFFICULTY_ACTION[difficulty][serial % DIFFICULTY_ACTION[difficulty].length];
  const round = ["প্রথম অনুশীলনে", "দ্বিতীয় অনুশীলনে", "তৃতীয় অনুশীলনে"][(serial - 1) % 3];
  if (category === "math") {
    if (difficulty === "easy") return `${prefix}: ${round} '${topic}' অধ্যায়ে সহজ সমস্যার সমাধানে প্রথমে কোনটি করা উচিত?`;
    if (difficulty === "medium") return `${prefix}: ${round} '${topic}' অধ্যায়ে ${action} কোন পদ্ধতিটি বেশি নির্ভরযোগ্য?`;
    return `${prefix}: ${round} '${topic}' অধ্যায়ের জটিল সমস্যায় পূর্ণ নম্বর পেতে কোন অংশটি অবশ্যই থাকবে?`;
  }
  if (category === "english") {
    if (difficulty === "easy") return `${prefix}: ${round} In '${topic}', which answer shows the basic rule correctly?`;
    if (difficulty === "medium") return `${prefix}: ${round} In a '${topic}' question, which response includes the correct reason?`;
    return `${prefix}: ${round} For advanced '${topic}' practice, which response is most complete?`;
  }
  if (category === "bangla") {
    if (difficulty === "easy") return `${prefix}: ${round} '${topic}' পাঠ বুঝতে কোন বিষয়টি আগে দেখা উচিত?`;
    if (difficulty === "medium") return `${prefix}: ${round} '${topic}' পাঠের ব্যাখ্যামূলক প্রশ্নে কোন উত্তরটি ভালো?`;
    return `${prefix}: ${round} '${topic}' পাঠের সৃজনশীল উত্তরে কোন বৈশিষ্ট্যটি জরুরি?`;
  }
  if (category === "science") {
    if (difficulty === "easy") return `${prefix}: ${round} '${topic}' অধ্যায়ে মৌলিক ধারণা বোঝাতে কোনটি সঠিক?`;
    if (difficulty === "medium") return `${prefix}: ${round} '${topic}' অধ্যায়ে কারণ-ফল ব্যাখ্যায় কোন উত্তরটি গ্রহণযোগ্য?`;
    return `${prefix}: ${round} '${topic}' অধ্যায়ের উদ্দীপকভিত্তিক প্রশ্নে কোন উত্তরটি পূর্ণাঙ্গ?`;
  }
  if (category === "business") {
    if (difficulty === "easy") return `${prefix}: ${round} '${topic}' বিষয়ে মৌলিক ধারণা যাচাইয়ে কোনটি সঠিক?`;
    if (difficulty === "medium") return `${prefix}: ${round} '${topic}' বিষয়ে হিসাব/তথ্য বিশ্লেষণে কোনটি দরকার?`;
    return `${prefix}: ${round} '${topic}' বিষয়ে কেস স্টাডি সমাধানে কোন উত্তরটি শক্তিশালী?`;
  }
  if (category === "gk") {
    if (difficulty === "easy") return `${prefix}: ${round} '${topic}' অংশে সাধারণ তথ্য যাচাইয়ের সঠিক পদ্ধতি কোনটি?`;
    if (difficulty === "medium") return `${prefix}: ${round} '${topic}' বিষয়ে কারণ ও প্রেক্ষাপট বুঝতে কোনটি দরকার?`;
    return `${prefix}: ${round} '${topic}' বিষয়ে বিশ্লেষণধর্মী উত্তরে কোনটি থাকতে হবে?`;
  }
  if (difficulty === "easy") return `${prefix}: ${round} '${topic}' অধ্যায়ে মূল তথ্য বোঝাতে কোনটি সঠিক?`;
  if (difficulty === "medium") return `${prefix}: ${round} '${topic}' অধ্যায়ে ${action} কোন উত্তরটি গ্রহণযোগ্য?`;
  return `${prefix}: ${round} '${topic}' অধ্যায়ে উচ্চতর বিশ্লেষণের জন্য কোনটি জরুরি?`;
}

function createQuestion(subject: CurriculumSubject, topic: string, difficulty: QuizDifficulty, serial: number, topicIndex: number): QuizQuestionWithTopic {
  const category = categoryOf(subject);
  const correctPool = CORRECT_BY_CATEGORY[category] || CORRECT_BY_CATEGORY.humanities;
  const correct = correctPool[difficulty][(serial + topicIndex) % correctPool[difficulty].length];
  const { options, correctAnswer } = shuffleOptions(correct, serial + topicIndex);
  const questionBn = questionStem(subject, category, topic, difficulty, serial);
  return {
    id: `${subject.id}-${difficulty}-${topicIndex + 1}-${serial}`,
    question: questionBn,
    questionBn,
    options,
    correctAnswer,
    explanation: `'${topic}' অধ্যায়ে ${DIFFICULTY_BN[difficulty]} স্তরের সঠিক উত্তর: ${correct}।`,
    difficulty,
    topic,
    examModes: [examMode(subject)],
  };
}

function createSubjectQuestions(subject: CurriculumSubject): QuizQuestionWithTopic[] {
  const topics = subject.topics?.length ? subject.topics : [subject.nameBn || subject.name];
  const questions: QuizQuestionWithTopic[] = [];
  for (const difficulty of ["easy", "medium", "hard"] as QuizDifficulty[]) {
    topics.forEach((topic, topicIndex) => {
      for (let serial = 1; serial <= 3; serial += 1) {
        questions.push(createQuestion(subject, topic, difficulty, serial, topicIndex));
      }
    });
  }
  return questions;
}

export const QUIZ_BY_SUBJECT: Record<string, QuizQuestionWithTopic[]> = Object.fromEntries(
  CURRICULUM_SUBJECTS.map((subject) => [subject.id, createSubjectQuestions(subject)])
);

export const QUIZ_TOPICS: Record<string, string[]> = Object.fromEntries(
  CURRICULUM_SUBJECTS.map((subject) => [subject.id, subject.topics?.length ? subject.topics : [subject.nameBn || subject.name]])
);

export function getQuestionsForSubject(subjectId: string, difficulty?: QuizDifficulty) {
  const questions = QUIZ_BY_SUBJECT[subjectId] || [];
  return difficulty ? questions.filter((q) => q.difficulty === difficulty) : questions;
}

export function getSubjectQuizQuestions(
  subjectId: string,
  difficulty: QuizDifficulty = "easy",
  count = 10,
  examModeFilter?: "SSC" | "HSC" | "Admission" | "University"
) {
  const filtered = getQuestionsForSubject(subjectId, difficulty).filter((q) =>
    !examModeFilter || !q.examModes?.length || q.examModes.includes(examModeFilter)
  );

  if (!filtered.length) return [];
  const safeCount = Math.max(1, Math.min(count, filtered.length));
  const daySeed = Math.floor(Date.now() / 86400000);
  const offset = daySeed % filtered.length;
  return [...filtered.slice(offset), ...filtered.slice(0, offset)].slice(0, safeCount);
}

export function getQuizCount(subjectId: string, difficulty?: QuizDifficulty) {
  return getQuestionsForSubject(subjectId, difficulty).length;
}
