
import type { Subject } from "@/types";

export type EducationGroup = "General" | "Science" | "Humanities" | "Business Studies";

export type CurriculumSubject = Omit<Subject, "totalChapters" | "completedChapters" | "progress" | "examTypes"> & {
  classLevels: string[];
  groups: EducationGroup[];
  examTypes: string[];
  topics: string[];
};

const COMMON_6_8 = ["General"] as EducationGroup[];
const ALL_GROUPS = ["General", "Science", "Humanities", "Business Studies"] as EducationGroup[];
const SSC_COMMON = ALL_GROUPS;
const SCIENCE = ["Science"] as EducationGroup[];
const HUMANITIES = ["Humanities"] as EducationGroup[];
const BUSINESS = ["Business Studies"] as EducationGroup[];

const class6 = ["Class 6"];
const class7 = ["Class 7"];
const class8 = ["Class 8"];
const ssc = ["Class 9", "Class 10", "SSC"];
const hsc = ["HSC 1st Year", "HSC 2nd Year", "HSC"];
const admission = ["Admission"];
const university = ["University 1st Year", "University 2nd Year", "University 3rd Year", "University 4th Year", "Degree", "Honours", "Masters"];

function sub(id: string, name: string, nameBn: string, icon: string, color: string, xpReward: number, difficulty: CurriculumSubject["difficulty"], examTypes: string[], classLevels: string[], groups: EducationGroup[], topics: string[]): CurriculumSubject {
  return { id, name, nameBn, icon, color, xpReward, difficulty, examTypes, classLevels, groups, topics };
}

export const CURRICULUM_SUBJECTS: CurriculumSubject[] = [
  // Class 6
  sub("class6-bangla", "Bangla", "বাংলা", "language", "#FF003C", 95, "medium", ["SSC"], class6, COMMON_6_8, ["গদ্য", "পদ্য", "ব্যাকরণ", "রচনা", "শব্দার্থ", "অনুচ্ছেদ"]),
  sub("class6-english", "English", "ইংরেজি", "book", "#FFD700", 95, "medium", ["SSC"], class6, COMMON_6_8, ["Grammar", "Vocabulary", "Reading", "Writing", "Tense", "Sentence"]),
  sub("class6-math", "Mathematics", "গণিত", "calculator", "#00F0FF", 120, "medium", ["SSC"], class6, COMMON_6_8, ["সংখ্যা", "ভগ্নাংশ", "দশমিক", "জ্যামিতি", "পরিমাপ", "তথ্য"]),
  sub("class6-science", "Science", "বিজ্ঞান", "atom", "#39FF14", 115, "medium", ["SSC"], class6, COMMON_6_8, ["জীবজগৎ", "পদার্থ", "শক্তি", "মাটি", "পানি", "স্বাস্থ্য"]),
  sub("class6-bgs", "Bangladesh and Global Studies", "বাংলাদেশ ও বিশ্বপরিচয়", "globe", "#00F0FF", 100, "easy", ["SSC"], class6, COMMON_6_8, ["বাংলাদেশ", "মুক্তিযুদ্ধ", "সমাজ", "নাগরিকতা", "ভূগোল", "সংস্কৃতি"]),
  sub("class6-digital", "Digital Technology", "ডিজিটাল প্রযুক্তি", "bot", "#BF5FFF", 100, "easy", ["SSC"], class6, COMMON_6_8, ["কম্পিউটার", "ইন্টারনেট", "তথ্য", "নিরাপত্তা", "ডিজিটাল আচরণ", "যোগাযোগ"]),
  sub("class6-religion", "Religion", "ধর্ম শিক্ষা", "school", "#CD7F32", 85, "easy", ["SSC"], class6, COMMON_6_8, ["নৈতিকতা", "ইবাদত", "আদর্শ", "শিষ্টাচার", "মানবতা", "ধর্মীয় জীবন"]),
  sub("class6-health", "Health Protection", "স্বাস্থ্য সুরক্ষা", "shield", "#39FF14", 80, "easy", ["SSC"], class6, COMMON_6_8, ["পুষ্টি", "পরিচ্ছন্নতা", "ব্যায়াম", "নিরাপত্তা", "মানসিক স্বাস্থ্য", "প্রাথমিক চিকিৎসা"]),

  // Class 7
  sub("class7-bangla", "Bangla", "বাংলা", "language", "#FF003C", 95, "medium", ["SSC"], class7, COMMON_6_8, ["সপ্তবর্ণা", "আনন্দপাঠ", "ব্যাকরণ", "ভাবসম্প্রসারণ", "সারাংশ", "চিঠি"]),
  sub("class7-english", "English", "ইংরেজি", "book", "#FFD700", 95, "medium", ["SSC"], class7, COMMON_6_8, ["Grammar", "Dialogue", "Paragraph", "Reading", "Preposition", "Voice"]),
  sub("class7-math", "Mathematics", "গণিত", "calculator", "#00F0FF", 125, "medium", ["SSC"], class7, COMMON_6_8, ["পূর্ণসংখ্যা", "বীজগণিত", "সমীকরণ", "অনুপাত", "জ্যামিতি", "পরিসংখ্যান"]),
  sub("class7-science", "Science", "বিজ্ঞান", "atom", "#39FF14", 115, "medium", ["SSC"], class7, COMMON_6_8, ["কোষ", "উদ্ভিদ", "তাপ", "আলো", "বিদ্যুৎ", "পরিবেশ"]),
  sub("class7-bgs", "Bangladesh and Global Studies", "বাংলাদেশ ও বিশ্বপরিচয়", "globe", "#00F0FF", 100, "easy", ["SSC"], class7, COMMON_6_8, ["রাষ্ট্র", "সংবিধান", "অর্থনীতি", "ভূগোল", "জনসংখ্যা", "দুর্যোগ"]),
  sub("class7-digital", "Digital Technology", "ডিজিটাল প্রযুক্তি", "bot", "#BF5FFF", 100, "easy", ["SSC"], class7, COMMON_6_8, ["ডেটা", "অ্যালগরিদম", "নেটওয়ার্ক", "সাইবার নিরাপত্তা", "ডিজিটাল কনটেন্ট", "সমস্যা সমাধান"]),
  sub("class7-religion", "Religion", "ধর্ম শিক্ষা", "school", "#CD7F32", 85, "easy", ["SSC"], class7, COMMON_6_8, ["আকিদা", "নৈতিকতা", "মানবসেবা", "আদর্শ চরিত্র", "শিষ্টাচার", "ধর্মীয় শিক্ষা"]),

  // Class 8
  sub("class8-bangla", "Bangla", "বাংলা", "language", "#FF003C", 100, "medium", ["SSC"], class8, COMMON_6_8, ["গদ্য", "কবিতা", "নাটক", "ব্যাকরণ", "প্রবন্ধ", "সারাংশ"]),
  sub("class8-english", "English", "ইংরেজি", "book", "#FFD700", 100, "medium", ["SSC"], class8, COMMON_6_8, ["Grammar", "Completing story", "Letter", "Right form", "Narration", "Composition"]),
  sub("class8-math", "Mathematics", "গণিত", "calculator", "#00F0FF", 130, "hard", ["SSC"], class8, COMMON_6_8, ["সূচক", "বীজগণিত", "সমীকরণ", "জ্যামিতি", "ত্রিভুজ", "পরিসংখ্যান"]),
  sub("class8-science", "Science", "বিজ্ঞান", "atom", "#39FF14", 120, "medium", ["SSC"], class8, COMMON_6_8, ["অণুজীব", "রাসায়নিক বিক্রিয়া", "বল", "শক্তি", "বিদ্যুৎ", "পৃথিবী"]),
  sub("class8-bgs", "Bangladesh and Global Studies", "বাংলাদেশ ও বিশ্বপরিচয়", "globe", "#00F0FF", 105, "medium", ["SSC"], class8, COMMON_6_8, ["ঐতিহ্য", "মুক্তিযুদ্ধ", "সংবিধান", "অর্থনীতি", "ভূপ্রকৃতি", "বিশ্বসভ্যতা"]),
  sub("class8-digital", "Digital Technology", "ডিজিটাল প্রযুক্তি", "bot", "#BF5FFF", 105, "easy", ["SSC"], class8, COMMON_6_8, ["প্রোগ্রামিং ধারণা", "ডেটাবেস", "নিরাপত্তা", "ডিজাইন", "কমিউনিকেশন", "ডিজিটাল নাগরিকত্ব"]),

  // SSC / Class 9-10 common + groups
  sub("ssc-bangla", "Bangla", "বাংলা", "language", "#FF003C", 110, "medium", ["SSC"], ssc, SSC_COMMON, ["গদ্য", "কবিতা", "নাটক", "উপন্যাস", "ব্যাকরণ", "রচনা"]),
  sub("ssc-english", "English", "ইংরেজি", "book", "#FFD700", 110, "medium", ["SSC"], ssc, SSC_COMMON, ["Grammar", "Vocabulary", "Passage", "Writing", "Transformation", "Completing Sentence"]),
  sub("ssc-math", "Mathematics", "গণিত", "calculator", "#00F0FF", 150, "hard", ["SSC"], ssc, SSC_COMMON, ["বীজগণিত", "সমীকরণ", "জ্যামিতি", "ত্রিকোণমিতি", "পরিমিতি", "পরিসংখ্যান"]),
  sub("ssc-ict", "ICT", "তথ্য ও যোগাযোগ প্রযুক্তি", "bot", "#BF5FFF", 120, "medium", ["SSC"], ssc, SSC_COMMON, ["কম্পিউটার", "নেটওয়ার্ক", "ডেটা", "HTML", "সাইবার নিরাপত্তা", "প্রোগ্রামিং"]),
  sub("ssc-bgs", "Bangladesh and Global Studies", "বাংলাদেশ ও বিশ্বপরিচয়", "globe", "#00F0FF", 110, "medium", ["SSC"], ssc, SSC_COMMON, ["ভূগোল", "অর্থনীতি", "নাগরিকতা", "ইতিহাস", "মুক্তিযুদ্ধ", "বিশ্বপরিচয়"]),
  sub("ssc-physics", "Physics", "পদার্থবিজ্ঞান", "atom", "#BF5FFF", 145, "hard", ["SSC"], ssc, SCIENCE, ["ভৌত রাশি", "গতি", "বল", "কাজ ও শক্তি", "আলো", "বিদ্যুৎ"]),
  sub("ssc-chemistry", "Chemistry", "রসায়ন", "flask", "#39FF14", 145, "hard", ["SSC"], ssc, SCIENCE, ["পরমাণু", "রাসায়নিক বন্ধন", "মোল", "অম্ল-ক্ষার", "ধাতু", "জৈব রসায়ন"]),
  sub("ssc-biology", "Biology", "জীববিজ্ঞান", "dna", "#FF8C00", 140, "medium", ["SSC"], ssc, SCIENCE, ["কোষ", "টিস্যু", "উদ্ভিদ", "মানবদেহ", "জেনেটিক্স", "পরিবেশ"]),
  sub("ssc-higher-math", "Higher Mathematics", "উচ্চতর গণিত", "calculator", "#00F0FF", 155, "hard", ["SSC"], ssc, SCIENCE, ["সেট", "ফাংশন", "ত্রিকোণমিতি", "স্থানাঙ্ক জ্যামিতি", "ভেক্টর", "সম্ভাবনা"]),
  sub("ssc-accounting", "Accounting", "হিসাববিজ্ঞান", "notebook", "#FFD700", 135, "medium", ["SSC"], ssc, BUSINESS, ["লেনদেন", "জাবেদা", "খতিয়ান", "রেওয়ামিল", "আর্থিক বিবরণী", "ব্যাংক সমন্বয়"]),
  sub("ssc-finance", "Finance and Banking", "ফিন্যান্স ও ব্যাংকিং", "coins", "#FFD700", 130, "medium", ["SSC"], ssc, BUSINESS, ["অর্থায়ন", "সঞ্চয়", "ব্যাংক", "বিনিয়োগ", "বীমা", "মুদ্রা"]),
  sub("ssc-business", "Business Entrepreneurship", "ব্যবসায় উদ্যোগ", "landmark", "#39FF14", 125, "medium", ["SSC"], ssc, BUSINESS, ["উদ্যোক্তা", "ব্যবসায় পরিকল্পনা", "বিপণন", "ব্যবস্থাপনা", "ঝুঁকি", "নৈতিকতা"]),
  sub("ssc-history", "History", "ইতিহাস", "book", "#CD7F32", 125, "medium", ["SSC"], ssc, HUMANITIES, ["প্রাচীন বাংলা", "মধ্যযুগ", "ব্রিটিশ শাসন", "ভাষা আন্দোলন", "মুক্তিযুদ্ধ", "বাংলাদেশ"]),
  sub("ssc-geography", "Geography", "ভূগোল", "map", "#00F0FF", 125, "medium", ["SSC"], ssc, HUMANITIES, ["পৃথিবী", "মানচিত্র", "জলবায়ু", "নদী", "জনসংখ্যা", "সম্পদ"]),
  sub("ssc-civics", "Civics", "পৌরনীতি", "shield", "#BF5FFF", 120, "medium", ["SSC"], ssc, HUMANITIES, ["রাষ্ট্র", "সংবিধান", "নাগরিক", "সরকার", "গণতন্ত্র", "অধিকার"]),
  sub("ssc-economics", "Economics", "অর্থনীতি", "coins", "#39FF14", 130, "medium", ["SSC"], ssc, HUMANITIES, ["চাহিদা", "যোগান", "উৎপাদন", "বাজার", "জাতীয় আয়", "উন্নয়ন"]),

  // HSC common + groups
  sub("hsc-bangla", "Bangla", "বাংলা", "language", "#FF003C", 120, "medium", ["HSC"], hsc, SSC_COMMON, ["সাহিত্যপাঠ", "সহপাঠ", "ব্যাকরণ", "নির্মিতি", "প্রবন্ধ", "সারাংশ"]),
  sub("hsc-english", "English", "ইংরেজি", "book", "#FFD700", 120, "medium", ["HSC"], hsc, SSC_COMMON, ["Text", "Grammar", "Vocabulary", "Writing", "Summary", "Transformation"]),
  sub("hsc-ict", "ICT", "তথ্য ও যোগাযোগ প্রযুক্তি", "bot", "#BF5FFF", 130, "medium", ["HSC"], hsc, SSC_COMMON, ["সংখ্যা পদ্ধতি", "ডিজিটাল ডিভাইস", "ওয়েব ডিজাইন", "প্রোগ্রামিং", "ডেটাবেস", "নেটওয়ার্ক"]),
  sub("hsc-physics", "Physics", "পদার্থবিজ্ঞান", "atom", "#BF5FFF", 155, "hard", ["HSC"], hsc, SCIENCE, ["ভেক্টর", "নিউটনীয় বলবিদ্যা", "তাপগতিবিদ্যা", "তরঙ্গ", "তড়িৎ", "আধুনিক পদার্থ"]),
  sub("hsc-chemistry", "Chemistry", "রসায়ন", "flask", "#39FF14", 155, "hard", ["HSC"], hsc, SCIENCE, ["গুণগত রসায়ন", "রাসায়নিক সাম্য", "তড়িৎ রসায়ন", "জৈব রসায়ন", "পলিমার", "পরিবেশ রসায়ন"]),
  sub("hsc-biology", "Biology", "জীববিজ্ঞান", "dna", "#FF8C00", 150, "medium", ["HSC"], hsc, SCIENCE, ["কোষ", "জিনতত্ত্ব", "উদ্ভিদ শরীরতত্ত্ব", "প্রাণী বৈচিত্র্য", "মানবদেহ", "বাস্তুতন্ত্র"]),
  sub("hsc-higher-math", "Higher Mathematics", "উচ্চতর গণিত", "calculator", "#00F0FF", 160, "hard", ["HSC"], hsc, SCIENCE, ["ম্যাট্রিক্স", "সরলরেখা", "বৃত্ত", "ক্যালকুলাস", "সম্ভাবনা", "স্ট্যাটিক্স"]),
  sub("hsc-accounting", "Accounting", "হিসাববিজ্ঞান", "notebook", "#FFD700", 145, "medium", ["HSC"], hsc, BUSINESS, ["হিসাবের মূলনীতি", "জাবেদা", "অংশীদারি", "কোম্পানি হিসাব", "ব্যয় হিসাব", "বিশ্লেষণ"]),
  sub("hsc-finance", "Finance Banking", "ফিন্যান্স ও ব্যাংকিং", "coins", "#FFD700", 145, "medium", ["HSC"], hsc, BUSINESS, ["অর্থের সময়মূল্য", "ঝুঁকি", "মূলধন বাজেটিং", "ব্যাংকিং", "বীমা", "পুঁজিবাজার"]),
  sub("hsc-business-org", "Business Organization", "ব্যবসায় সংগঠন", "landmark", "#39FF14", 140, "medium", ["HSC"], hsc, BUSINESS, ["ব্যবসায়", "উদ্যোক্তা", "কোম্পানি", "ব্যবস্থাপনা", "বিপণন", "নৈতিকতা"]),
  sub("hsc-economics", "Economics", "অর্থনীতি", "coins", "#39FF14", 145, "medium", ["HSC"], hsc, [...BUSINESS, ...HUMANITIES] as EducationGroup[], ["ব্যষ্টিক", "সমষ্টিক", "চাহিদা", "যোগান", "জাতীয় আয়", "উন্নয়ন"]),
  sub("hsc-history", "History", "ইতিহাস", "book", "#CD7F32", 135, "medium", ["HSC"], hsc, HUMANITIES, ["বাংলার ইতিহাস", "প্রাচীন সভ্যতা", "মধ্যযুগ", "ঔপনিবেশিক শাসন", "ভাষা আন্দোলন", "মুক্তিযুদ্ধ"]),
  sub("hsc-civics", "Civics", "পৌরনীতি ও সুশাসন", "shield", "#BF5FFF", 135, "medium", ["HSC"], hsc, HUMANITIES, ["রাষ্ট্র", "সরকার", "সংবিধান", "গণতন্ত্র", "মানবাধিকার", "সুশাসন"]),
  sub("hsc-logic", "Logic", "যুক্তিবিদ্যা", "brain", "#00F0FF", 130, "medium", ["HSC"], hsc, HUMANITIES, ["ধারণা", "বচন", "অনুমান", "সিলোজিজম", "সত্যক সারণি", "বিতর্ক"]),
  sub("hsc-geography", "Geography", "ভূগোল", "map", "#00F0FF", 135, "medium", ["HSC"], hsc, HUMANITIES, ["ভূপ্রকৃতি", "জলবায়ু", "মানচিত্র", "জনসংখ্যা", "সম্পদ", "পরিবেশ"]),
  sub("hsc-psychology", "Psychology", "মনোবিজ্ঞান", "brain", "#BF5FFF", 130, "medium", ["HSC"], hsc, HUMANITIES, ["আচরণ", "সংবেদন", "শিখন", "স্মৃতি", "ব্যক্তিত্ব", "মানসিক স্বাস্থ্য"]),

  // Admission / University
  sub("admission-gk", "General Knowledge", "সাধারণ জ্ঞান", "globe", "#39FF14", 120, "medium", ["Admission"], admission, ALL_GROUPS, ["বাংলাদেশ", "আন্তর্জাতিক", "ভূগোল", "ইতিহাস", "বিজ্ঞান", "সাম্প্রতিক"]),
  sub("admission-bangla", "Bangla", "বাংলা", "language", "#FF003C", 120, "medium", ["Admission"], admission, ALL_GROUPS, ["ব্যাকরণ", "সাহিত্য", "শব্দার্থ", "বাগধারা", "সমার্থক", "বিপরীত"]),
  sub("admission-english", "English", "English", "book", "#FFD700", 120, "medium", ["Admission"], admission, ALL_GROUPS, ["Grammar", "Vocabulary", "Synonym", "Antonym", "Preposition", "Reading"]),
  sub("admission-math", "Mathematics", "গণিত", "calculator", "#00F0FF", 140, "hard", ["Admission"], admission, ALL_GROUPS, ["Arithmetic", "Algebra", "Geometry", "Trigonometry", "Statistics", "Logic"]),
  sub("university-study", "University Study", "বিশ্ববিদ্যালয় স্টাডি", "graduation", "#BF5FFF", 130, "medium", ["University"], university, ALL_GROUPS, ["Academic English", "ICT", "Research", "Presentation", "Critical Thinking", "Bangladesh Studies"]),
];

export function normalizeGroup(group?: string): EducationGroup {
  if (group === "Science" || group === "Humanities" || group === "Business Studies") return group;
  return "General";
}

export function getCurriculumSubjectsFor(className?: string, groupName?: string) {
  const cls = className || "SSC";
  const group = normalizeGroup(groupName);
  return CURRICULUM_SUBJECTS.filter((s) =>
    s.classLevels.includes(cls) && (s.groups.includes("General") || s.groups.includes(group))
  );
}

export function getExamModeForClass(className?: string): "SSC" | "HSC" | "Admission" | "University" {
  const value = (className || "").toLowerCase();
  if (value.includes("hsc")) return "HSC";
  if (value.includes("admission")) return "Admission";
  if (value.includes("university") || value.includes("honours") || value.includes("degree") || value.includes("masters")) return "University";
  return "SSC";
}
