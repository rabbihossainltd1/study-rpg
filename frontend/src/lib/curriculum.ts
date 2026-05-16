
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
const university = ["University General"];
const university1 = ["University 1st Year"];
const university2 = ["University 2nd Year"];
const university3 = ["University 3rd Year"];
const university4 = ["University 4th Year"];
const degree = ["Degree"];
const honours = ["Honours"];
const masters = ["Masters"];

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
  // Imported dataset subjects
  sub("admission-accounting", "Accounting", "হিসাববিজ্ঞান", "notebook", "#FFD700", 135, "medium", ["Admission"], admission, BUSINESS, ["Accounting Equation","Accounting Basics","Double Entry","Journal","Ledger","Trial Balance","Financial Statements","Depreciation"]),
  sub("admission-biology", "Biology", "জীববিজ্ঞান", "dna", "#FF8C00", 140, "medium", ["Admission"], admission, SCIENCE, ["Cell Biology","Biomolecule","Cell Division","Physiology","Transport","Plant Physiology","Human Physiology","Genetics"]),
  sub("admission-business-org", "Business Organization", "ব্যবসায় সংগঠন", "landmark", "#39FF14", 130, "medium", ["Admission"], admission, BUSINESS, ["Forms of Business","Partnership","Company","Cooperative","Entrepreneurship","Ethics","CSR","E-commerce"]),
  sub("admission-chemistry", "Chemistry", "রসায়ন", "flask", "#39FF14", 145, "hard", ["Admission"], admission, SCIENCE, ["Atomic Structure","Mole Concept","Periodic Table","Bonding","Acid-Base","Solution","Thermochemistry","Equilibrium"]),
  sub("admission-civics", "Civics", "পৌরনীতি", "shield", "#BF5FFF", 120, "medium", ["Admission"], admission, HUMANITIES, ["State","Constitution","Democracy","Rights","Government","Judiciary","Citizenship","Election"]),
  sub("admission-economics", "Economics", "অর্থনীতি", "coins", "#39FF14", 130, "medium", ["Admission"], admission, HUMANITIES, ["Basic Economics","Demand","Supply","Market","Elasticity","National Income","Macro Economics","Public Finance"]),
  sub("admission-ethics", "Ethics", "নৈতিক শিক্ষা", "school", "#CD7F32", 120, "easy", ["Admission"], admission, HUMANITIES, ["Civic Values"]),
  sub("admission-finance", "Finance", "ফিন্যান্স", "coins", "#FFD700", 130, "medium", ["Admission"], admission, BUSINESS, ["Time Value","Interest","Investment","Risk","Portfolio","Working Capital","Banking","Insurance"]),
  sub("admission-geography", "Geography", "ভূগোল", "map", "#00F0FF", 125, "medium", ["Admission"], admission, HUMANITIES, ["Earth","Climate","Geomorphology","Disaster","Population","Technology"]),
  sub("admission-higher-math", "Higher Mathematics", "উচ্চতর গণিত", "calculator", "#00F0FF", 150, "hard", ["Admission"], admission, SCIENCE, ["Algebra","Trigonometry","Calculus","Vector","Matrix","Complex Number","Coordinate Geometry"]),
  sub("admission-history", "History", "ইতিহাস", "book", "#CD7F32", 125, "medium", ["Admission"], admission, HUMANITIES, ["Bangladesh History","World History"]),
  sub("admission-ict", "ICT", "তথ্য ও যোগাযোগ প্রযুক্তি", "bot", "#BF5FFF", 120, "medium", ["Admission"], admission, SCIENCE, ["Computer Basics","Programming","Database","Networking","Web","Security","Logic","Cloud"]),
  sub("admission-logic", "Logic", "যুক্তিবিদ্যা", "brain", "#00F0FF", 130, "medium", ["Admission"], admission, HUMANITIES, ["Logic Basics","Reasoning","Syllogism","Fallacy","Truth Table"]),
  sub("admission-management", "Management", "ব্যবস্থাপনা", "landmark", "#39FF14", 135, "medium", ["Admission"], admission, BUSINESS, ["Management Process","Staffing","Directing","Controlling","Leadership","Motivation","Communication","Decision Making"]),
  sub("admission-marketing", "Marketing", "বিপণন", "coins", "#FFD700", 130, "medium", ["Admission"], admission, BUSINESS, ["Marketing Mix","Segmentation","Targeting","Positioning","Branding","Research","Consumer Behavior","Promotion"]),
  sub("admission-physics", "Physics", "পদার্থবিজ্ঞান", "atom", "#BF5FFF", 145, "hard", ["Admission"], admission, SCIENCE, ["Mechanics","Heat","Wave","Optics","Electricity","Magnetism","Modern Physics"]),
  sub("admission-political-science", "Political Science", "রাষ্ট্রবিজ্ঞান", "shield", "#BF5FFF", 130, "medium", ["Admission"], admission, HUMANITIES, ["Democracy"]),
  sub("admission-psychology", "Psychology", "মনোবিজ্ঞান", "brain", "#BF5FFF", 130, "medium", ["Admission"], admission, HUMANITIES, ["Learning","Memory","Motivation"]),
  sub("admission-sociology", "Sociology", "সমাজবিজ্ঞান", "globe", "#00F0FF", 130, "medium", ["Admission"], admission, HUMANITIES, ["Society","Institution"]),
  sub("admission-statistics", "Statistics", "পরিসংখ্যান", "calculator", "#00F0FF", 135, "medium", ["Admission"], admission, BUSINESS, ["Central Tendency","Dispersion","Correlation","Regression","Probability","Sampling","Index Number","Time Series"]),

  // Missing MCQ addon subjects - dataset mapping only
  sub("admission-social-work", "Social Work", "সমাজকর্ম", "users", "#00F0FF", 125, "medium", ["Admission"], admission, ALL_GROUPS, ["Social Work Methods and Welfare"]),
  sub("class6-agriculture", "Agriculture Studies", "কৃষিশিক্ষা", "trees", "#39FF14", 90, "easy", ["SSC"], class6, COMMON_6_8, ["অঙ্কুরোদ্গম", "আগাছা", "আবহাওয়া", "কম্পোস্ট", "কৃষির ধারণা", "গবাদিপশু", "পরিবেশবান্ধব কৃষি", "পোকামাকড়", "পোলট্রি", "ফসল পর্যায়", "ফসল সংগ্রহ", "বাড়ির বাগান", "বীজ", "মাটি", "মৎস্য", "সংরক্ষণ", "সার", "সেচ"]),
  sub("class6-arabic", "Illustrated Arabic", "সচিত্র আরবি পাঠ", "language", "#FFD700", 85, "easy", ["SSC"], class6, COMMON_6_8, ["আদব ও শুভেচ্ছা", "আরবি বর্ণমালা", "ছোট বাক্য", "শব্দগঠন", "সংখ্যা", "স্বরচিহ্ন"]),
  sub("class6-arts-crafts", "Arts and Crafts", "চারু ও কারুকলা", "sparkles", "#BF5FFF", 85, "easy", ["SSC"], class6, COMMON_6_8, ["উপকরণ", "নকশা", "পরিবেশ ও সৃজনশীলতা", "রং", "রেখা ও আকৃতি", "লোকশিল্প"]),
  sub("class6-buddhist", "Buddhist Religion", "বৌদ্ধধর্ম শিক্ষা", "school", "#CD7F32", 85, "easy", ["SSC"], class6, COMMON_6_8, ["অষ্টাঙ্গিক মার্গ", "উৎসব ও করুণা", "চার আর্যসত্য", "ত্রিরত্ন", "পঞ্চশীল", "বুদ্ধের জীবন"]),
  sub("class6-christian", "Christian Religion", "খ্রীষ্টধর্ম শিক্ষা", "school", "#CD7F32", 85, "easy", ["SSC"], class6, COMMON_6_8, ["ঈশ্বর ও সৃষ্টি", "উৎসব", "খ্রিষ্টীয় নৈতিকতা", "প্রার্থনা ও উপাসনা", "বাইবেল", "যিশু খ্রিষ্ট"]),
  sub("class6-ethnic-language", "Ethnic Language and Culture", "ক্ষুদ্র নৃগোষ্ঠীর ভাষা ও সংস্কৃতি", "language", "#FFD700", 85, "easy", ["SSC"], class6, COMMON_6_8, ["উৎসব", "জীবনযাপন", "পোশাক ও অলংকার", "ভাষা সংরক্ষণ", "লোককথা", "সংস্কৃতির প্রতি সম্মান"]),
  sub("class6-hindu", "Hindu Religion", "হিন্দুধর্ম শিক্ষা", "school", "#CD7F32", 85, "easy", ["SSC"], class6, COMMON_6_8, ["ঈশ্বর ও সৃষ্টি", "ধর্মীয় গ্রন্থ", "নৈতিক শিক্ষা", "পূজা-পার্বণ", "মহাপুরুষ", "সমাজ ও পরিবেশ"]),
  sub("class6-home-science", "Home Science", "গার্হস্থ্যবিজ্ঞান", "school", "#FF8C00", 90, "easy", ["SSC"], class6, COMMON_6_8, ["খাদ্য ও পুষ্টি", "পরিবার ও গৃহপরিচালনা", "পোশাক ও পরিচর্যা", "শিশুযত্ন ও নিরাপত্তা", "সম্পদ সংরক্ষণ", "স্বাস্থ্য ও পরিচ্ছন্নতা"]),
  sub("class6-islam", "Islam Education", "ইসলাম শিক্ষা", "school", "#CD7F32", 85, "easy", ["SSC"], class6, COMMON_6_8, ["আখলাক", "ইবাদত", "ইসলামি ইতিহাস", "ঈমান ও আকিদা", "কুরআন ও হাদিস", "সামাজিক জীবন"]),
  sub("class6-music", "Music", "সংগীত", "volumeOff", "#BF5FFF", 85, "easy", ["SSC"], class6, COMMON_6_8, ["গান ও ছন্দ", "জাতীয় ও লোকসংগীত", "বাদ্যযন্ত্র", "লয় ও তাল", "সুর ও রাগ", "স্বর"]),
  sub("class6-pali", "Pali", "পালি", "language", "#FFD700", 85, "easy", ["SSC"], class6, COMMON_6_8, ["অনুবাদ", "ক্রিয়া", "ধর্মীয় শব্দ", "নামপদ", "নৈতিক বাণী", "পালি বর্ণ ও উচ্চারণ"]),
  sub("class6-sanskrit", "Sanskrit", "সংস্কৃত", "language", "#FFD700", 85, "easy", ["SSC"], class6, COMMON_6_8, ["অনুবাদ", "ক্রিয়ারূপ", "বর্ণমালা", "শব্দরূপ", "শ্লোকপাঠ", "স্বর ও উচ্চারণ"]),
  sub("class7-agriculture", "Agriculture Studies", "কৃষিশিক্ষা", "trees", "#39FF14", 90, "easy", ["SSC"], class7, COMMON_6_8, ["অঙ্কুরোদ্গম", "আগাছা", "আবহাওয়া", "কম্পোস্ট", "কৃষির ধারণা", "গবাদিপশু", "পরিবেশবান্ধব কৃষি", "পোকামাকড়", "পোলট্রি", "ফসল পর্যায়", "ফসল সংগ্রহ", "বাড়ির বাগান", "বীজ", "মাটি", "মৎস্য", "সংরক্ষণ", "সার", "সেচ"]),
  sub("class7-arabic", "Easy Arabic", "সহজ আরবি পাঠ", "language", "#FFD700", 85, "easy", ["SSC"], class7, COMMON_6_8, ["আদব ও শুভেচ্ছা", "আরবি বর্ণমালা", "ছোট বাক্য", "শব্দগঠন", "সংখ্যা", "স্বরচিহ্ন"]),
  sub("class7-arts-crafts", "Arts and Crafts", "চারু ও কারুকলা", "sparkles", "#BF5FFF", 85, "easy", ["SSC"], class7, COMMON_6_8, ["উপকরণ", "নকশা", "পরিবেশ ও সৃজনশীলতা", "রং", "রেখা ও আকৃতি", "লোকশিল্প"]),
  sub("class7-buddhist", "Buddhist Religion", "বৌদ্ধধর্ম শিক্ষা", "school", "#CD7F32", 85, "easy", ["SSC"], class7, COMMON_6_8, ["অষ্টাঙ্গিক মার্গ", "উৎসব ও করুণা", "চার আর্যসত্য", "ত্রিরত্ন", "পঞ্চশীল", "বুদ্ধের জীবন"]),
  sub("class7-christian", "Christian Religion", "খ্রীষ্টধর্ম শিক্ষা", "school", "#CD7F32", 85, "easy", ["SSC"], class7, COMMON_6_8, ["ঈশ্বর ও সৃষ্টি", "উৎসব", "খ্রিষ্টীয় নৈতিকতা", "প্রার্থনা ও উপাসনা", "বাইবেল", "যিশু খ্রিষ্ট"]),
  sub("class7-ethnic-language", "Ethnic Language and Culture", "ক্ষুদ্র নৃগোষ্ঠীর ভাষা ও সংস্কৃতি", "language", "#FFD700", 85, "easy", ["SSC"], class7, COMMON_6_8, ["উৎসব", "জীবনযাপন", "পোশাক ও অলংকার", "ভাষা সংরক্ষণ", "লোককথা", "সংস্কৃতির প্রতি সম্মান"]),
  sub("class7-health", "Health and Physical Education", "শারীরিক শিক্ষা ও স্বাস্থ্য", "shield", "#39FF14", 85, "easy", ["SSC"], class7, COMMON_6_8, ["আঘাত প্রতিরোধ", "খেলাধুলা", "খেলার নিয়ম", "দলগত খেলা", "দেহভঙ্গি", "নিরাপত্তা", "নিরাপদ পানি", "পুষ্টি", "প্রাথমিক চিকিৎসা", "বিশ্রাম", "ব্যক্তিগত পরিচ্ছন্নতা", "মানসিক স্বাস্থ্য", "রোগ প্রতিরোধ", "শরীরচর্চা", "শারীরিক সক্ষমতা", "স্বাস্থ্য মূল্যায়ন", "স্বাস্থ্যবিধি"]),
  sub("class7-hindu", "Hindu Religion", "হিন্দুধর্ম শিক্ষা", "school", "#CD7F32", 85, "easy", ["SSC"], class7, COMMON_6_8, ["ঈশ্বর ও সৃষ্টি", "ধর্মীয় গ্রন্থ", "নৈতিক শিক্ষা", "পূজা-পার্বণ", "মহাপুরুষ", "সমাজ ও পরিবেশ"]),
  sub("class7-home-science", "Home Science", "গার্হস্থ্যবিজ্ঞান", "school", "#FF8C00", 90, "easy", ["SSC"], class7, COMMON_6_8, ["খাদ্য ও পুষ্টি", "পরিবার ও গৃহপরিচালনা", "পোশাক ও পরিচর্যা", "শিশুযত্ন ও নিরাপত্তা", "সম্পদ সংরক্ষণ", "স্বাস্থ্য ও পরিচ্ছন্নতা"]),
  sub("class7-islam", "Islam Education", "ইসলাম শিক্ষা", "school", "#CD7F32", 85, "easy", ["SSC"], class7, COMMON_6_8, ["আখলাক", "ইবাদত", "ইসলামি ইতিহাস", "ঈমান ও আকিদা", "কুরআন ও হাদিস", "সামাজিক জীবন"]),
  sub("class7-music", "Music", "সংগীত", "volumeOff", "#BF5FFF", 85, "easy", ["SSC"], class7, COMMON_6_8, ["গান ও ছন্দ", "জাতীয় ও লোকসংগীত", "বাদ্যযন্ত্র", "লয় ও তাল", "সুর ও রাগ", "স্বর"]),
  sub("class7-pali", "Pali", "পালি", "language", "#FFD700", 85, "easy", ["SSC"], class7, COMMON_6_8, ["অনুবাদ", "ক্রিয়া", "ধর্মীয় শব্দ", "নামপদ", "নৈতিক বাণী", "পালি বর্ণ ও উচ্চারণ"]),
  sub("class7-sanskrit", "Sanskrit", "সংস্কৃত", "language", "#FFD700", 85, "easy", ["SSC"], class7, COMMON_6_8, ["অনুবাদ", "ক্রিয়ারূপ", "বর্ণমালা", "শব্দরূপ", "শ্লোকপাঠ", "স্বর ও উচ্চারণ"]),
  sub("class8-agriculture", "Agriculture Studies", "কৃষিশিক্ষা", "trees", "#39FF14", 90, "easy", ["SSC"], class8, COMMON_6_8, ["কৃষির ধারণা", "ফসল উৎপাদন", "উদ্ভিদ সুরক্ষা", "গবাদিপশু ও হাঁস-মুরগি", "মৎস্যচাষ", "পরিবেশবান্ধব কৃষি"]),
  sub("class8-arabic", "Easy Arabic", "সহজ আরবি পাঠ", "language", "#FFD700", 85, "easy", ["SSC"], class8, COMMON_6_8, ["আরবি বর্ণ", "উচ্চারণ", "শব্দার্থ", "বাক্যগঠন", "পাঠ অনুশীলন", "লিখন অনুশীলন"]),
  sub("class8-arts-crafts", "Arts and Crafts", "চারু ও কারুকলা", "sparkles", "#BF5FFF", 85, "easy", ["SSC"], class8, COMMON_6_8, ["রং ও রেখা", "আকৃতি ও নকশা", "লোকশিল্প", "হস্তশিল্প", "চিত্ররচনা", "শিল্প মূল্যায়ন"]),
  sub("class8-buddhist", "Buddhist Religion", "বৌদ্ধধর্ম শিক্ষা", "school", "#CD7F32", 85, "easy", ["SSC"], class8, COMMON_6_8, ["বুদ্ধ ও ধর্ম", "চার আর্যসত্য", "অষ্টাঙ্গিক মার্গ", "নৈতিকতা", "ধ্যান", "উৎসব"]),
  sub("class8-christian", "Christian Religion", "খ্রীষ্টধর্ম শিক্ষা", "school", "#CD7F32", 85, "easy", ["SSC"], class8, COMMON_6_8, ["বিশ্বাস", "বাইবেল", "প্রার্থনা ও উপাসনা", "নৈতিক শিক্ষা", "উৎসব", "সেবা ও সমাজ"]),
  sub("class8-health", "Health and Physical Education", "শারীরিক শিক্ষা ও স্বাস্থ্য", "shield", "#39FF14", 85, "easy", ["SSC"], class8, COMMON_6_8, ["শারীরিক সক্ষমতা", "খেলা ও কৌশল", "স্বাস্থ্যবিধি", "পুষ্টি", "প্রাথমিক চিকিৎসা", "মানসিক স্বাস্থ্য"]),
  sub("class8-hindu", "Hindu Religion", "হিন্দুধর্ম শিক্ষা", "school", "#CD7F32", 85, "easy", ["SSC"], class8, COMMON_6_8, ["ধর্ম ও নৈতিকতা", "উপাসনা", "শাস্ত্র", "দেবদেবী ও আদর্শ", "উৎসব", "সমাজ ও মূল্যবোধ"]),
  sub("class8-home-science", "Home Science", "গার্হস্থ্যবিজ্ঞান", "school", "#FF8C00", 90, "easy", ["SSC"], class8, COMMON_6_8, ["পরিবার ও গৃহব্যবস্থাপনা", "খাদ্য ও পুষ্টি", "পোশাক ও পরিচ্ছদ", "শিশু ও প্রবীণ যত্ন", "গৃহ নিরাপত্তা", "সম্পদ ব্যবস্থাপনা"]),
  sub("class8-islam", "Islam Education", "ইসলাম শিক্ষা", "school", "#CD7F32", 85, "easy", ["SSC"], class8, COMMON_6_8, ["আকাইদ", "ইবাদত", "আখলাক", "কুরআন ও হাদিস", "সীরাত", "সমাজনীতি"]),
  sub("class8-music", "Music", "সংগীত", "volumeOff", "#BF5FFF", 85, "easy", ["SSC"], class8, COMMON_6_8, ["সুর ও তাল", "কণ্ঠসঙ্গীত", "লোকসংগীত", "বাদ্যযন্ত্র", "দেশাত্মবোধক গান", "সংগীতচর্চা"]),
  sub("class8-pali", "Pali", "পালি", "language", "#FFD700", 85, "easy", ["SSC"], class8, COMMON_6_8, ["বর্ণ ও উচ্চারণ", "শব্দার্থ", "ব্যাকরণ", "পাঠ", "ত্রিপিটক", "নৈতিক শিক্ষা"]),
  sub("class8-sanskrit", "Sanskrit", "সংস্কৃত", "language", "#FFD700", 85, "easy", ["SSC"], class8, COMMON_6_8, ["বর্ণপরিচয়", "শব্দরূপ", "ধাতু ও ক্রিয়া", "বাক্যরচনা", "পাঠ ও অর্থ", "সাহিত্য ও সংস্কৃতি"]),
  sub("hsc-islamic-history", "Islamic History and Culture", "ইসলামের ইতিহাস ও সংস্কৃতি", "book", "#CD7F32", 130, "medium", ["HSC"], hsc, HUMANITIES, ["খিলাফত", "মুসলিম সভ্যতা", "সংস্কৃতি ও সমাজ"]),
  sub("hsc-social-work", "Social Work", "সমাজকর্ম", "users", "#00F0FF", 130, "medium", ["HSC"], hsc, HUMANITIES, ["সমাজকর্মের পরিচয়", "ব্যক্তি ও দলীয় সমাজকর্ম", "সামাজিক সেবা"]),
  sub("ssc-agriculture", "Agriculture Studies", "কৃষিশিক্ষা", "trees", "#39FF14", 115, "medium", ["SSC"], ssc, SSC_COMMON, ["মাটি ও ফসল", "বীজ ও চারা", "সেচ ও নিষ্কাশন", "সার ব্যবস্থাপনা", "রোগ-পোকা ব্যবস্থাপনা", "ফসল চাষ", "পশুপালন", "পোলট্রি", "মৎস্য", "কৃষিযন্ত্র", "সংরক্ষণ", "কৃষি বিপণন", "পরিবেশবান্ধব কৃষি"]),
  sub("ssc-arabic", "Arabic", "আরবি", "language", "#FFD700", 105, "easy", ["SSC"], ssc, SSC_COMMON, ["আরবি ভাষা"]),
  sub("ssc-arts-crafts", "Arts and Crafts", "চারু ও কারুকলা", "sparkles", "#BF5FFF", 105, "easy", ["SSC"], ssc, SSC_COMMON, ["চিত্রকলার উপাদান", "রং", "বুনট", "কম্পোজিশন", "লোকশিল্প", "পোস্টার", "মাটির কাজ", "নকশা", "পার্সপেকটিভ", "আলো-ছায়া", "প্যাটার্ন", "লিপিকলা", "ভাস্কর্য", "ছাপচিত্র", "প্রদর্শনী", "ঐতিহ্য", "কারুশিল্প"]),
  sub("ssc-buddhist", "Buddhist Religion", "বৌদ্ধধর্ম শিক্ষা", "school", "#CD7F32", 105, "easy", ["SSC"], ssc, SSC_COMMON, ["বুদ্ধের শিক্ষা"]),
  sub("ssc-career", "Career Education", "ক্যারিয়ার শিক্ষা", "target", "#BF5FFF", 105, "easy", ["SSC"], ssc, SSC_COMMON, ["আত্মপরিচয়", "ক্যারিয়ার পরিকল্পনা", "দক্ষতা উন্নয়ন", "শ্রমের মর্যাদা", "উদ্যোক্তা", "কর্মশৃঙ্খলা", "যোগাযোগ", "দলগত কাজ", "সময় ব্যবস্থাপনা", "চাকরি প্রস্তুতি", "ডিজিটাল দক্ষতা", "সমস্যা সমাধান", "নৈতিকতা", "আজীবন শিক্ষা", "স্থানীয় কর্মসংস্থান", "কারিগরি শিক্ষা", "নিরাপত্তা"]),
  sub("ssc-christian", "Christian Religion", "খ্রীষ্টধর্ম শিক্ষা", "school", "#CD7F32", 105, "easy", ["SSC"], ssc, SSC_COMMON, ["খ্রিষ্টীয় নৈতিকতা"]),
  sub("ssc-hindu", "Hindu Religion", "হিন্দুধর্ম শিক্ষা", "school", "#CD7F32", 105, "easy", ["SSC"], ssc, SSC_COMMON, ["ধর্ম ও নৈতিকতা"]),
  sub("ssc-home-science", "Home Science", "গার্হস্থ্যবিজ্ঞান", "school", "#FF8C00", 110, "medium", ["SSC"], ssc, SSC_COMMON, ["পরিবার ও সম্পদ", "খাদ্য ও পুষ্টি", "খাদ্য সংরক্ষণ", "পোশাক", "শিশু পরিচর্যা", "প্রাথমিক চিকিৎসা", "পারিবারিক বাজেট", "স্বাস্থ্যবিধি", "ভোক্তা শিক্ষা", "রান্নাঘর নিরাপত্তা", "গৃহপরিবেশ", "সেলাই", "খাদ্য নিরাপত্তা", "বৃদ্ধ পরিচর্যা", "শক্তি সাশ্রয়", "বর্জ্য ব্যবস্থাপনা"]),
  sub("ssc-islam", "Islam Education", "ইসলাম শিক্ষা", "school", "#CD7F32", 105, "easy", ["SSC"], ssc, SSC_COMMON, ["আকাইদ ও ইবাদত"]),
  sub("ssc-music", "Music", "সংগীত", "volumeOff", "#BF5FFF", 105, "easy", ["SSC"], ssc, SSC_COMMON, ["সংগীত শিক্ষা"]),
  sub("ssc-pali", "Pali", "পালি", "language", "#FFD700", 105, "easy", ["SSC"], ssc, SSC_COMMON, ["পালি ভাষা"]),
  sub("ssc-physical-education", "Physical Education, Health Science and Sports", "শারীরিক শিক্ষা, স্বাস্থ্যবিজ্ঞান ও খেলাধুলা", "shield", "#39FF14", 105, "easy", ["SSC"], ssc, SSC_COMMON, ["ব্যায়াম", "পুষ্টি", "স্বাস্থ্যবিধি", "প্রাথমিক চিকিৎসা", "দলগত খেলা", "খেলার নিয়ম", "ফুটবল", "ক্রিকেট", "অ্যাথলেটিকস", "দেশীয় খেলা", "জলনিরাপত্তা", "দেহভঙ্গি", "মানসিক স্বাস্থ্য", "বিশ্রাম", "আঘাত প্রতিরোধ", "খেলার নীতি"]),
  sub("ssc-sanskrit", "Sanskrit", "সংস্কৃত", "language", "#FFD700", 105, "easy", ["SSC"], ssc, SSC_COMMON, ["সংস্কৃত ভাষা"]),
  sub("ssc-science", "General Science", "বিজ্ঞান", "atom", "#39FF14", 125, "medium", ["SSC"], ssc, SSC_COMMON, ["জীবন ও পরিবেশ", "পদার্থ ও শক্তি", "রসায়ন ও পদার্থ", "পৃথিবী ও মহাবিশ্ব", "স্বাস্থ্য ও জীবপ্রযুক্তি", "প্রাকৃতিক সম্পদ"]),
  sub("class6-life-livelihood", "Life & Livelihood", "জীবন ও জীবিকা", "briefcase", "#39FF14", 100, "easy", ["SSC"], class6, COMMON_6_8, ["অর্থনৈতিক জীবন","কর্মজীবন","উদ্যোগ","বাজার","নৈতিকতা","ব্যবসা","সামাজিক অর্থনীতি","প্রযুক্তি"]),
  sub("class7-life-livelihood", "Life & Livelihood", "জীবন ও জীবিকা", "briefcase", "#39FF14", 100, "easy", ["SSC"], class7, COMMON_6_8, ["অর্থনৈতিক জীবন","কর্মজীবন","উদ্যোগ","বাজার","নৈতিকতা","ব্যবসা","সামাজিক অর্থনীতি","প্রযুক্তি"]),
  sub("class8-life-livelihood", "Life & Livelihood", "জীবন ও জীবিকা", "briefcase", "#39FF14", 100, "easy", ["SSC"], class8, COMMON_6_8, ["বাজার","নৈতিকতা","কর্মজীবন","উদ্যোগ","ব্যবসা","অর্থনৈতিক জীবন","সামাজিক অর্থনীতি","প্রযুক্তি"]),
  sub("hsc-ethics", "Ethics", "নৈতিক শিক্ষা", "school", "#CD7F32", 120, "easy", ["HSC"], hsc, HUMANITIES, ["Civic Values"]),
  sub("hsc-management", "Management", "ব্যবস্থাপনা", "landmark", "#39FF14", 135, "medium", ["HSC"], hsc, BUSINESS, ["ব্যবসায় সংগঠন","ব্যবস্থাপনা","Management Process","Staffing","Directing","Controlling","Leadership","Motivation"]),
  sub("hsc-marketing", "Marketing", "বিপণন", "coins", "#FFD700", 130, "medium", ["HSC"], hsc, BUSINESS, ["মার্কেটিং","Marketing Mix","Segmentation","Targeting","Positioning","Branding","Research","Consumer Behavior"]),
  sub("hsc-political-science", "Political Science", "রাষ্ট্রবিজ্ঞান", "shield", "#BF5FFF", 130, "medium", ["HSC"], hsc, HUMANITIES, ["Government","Democracy","International Relations"]),
  sub("hsc-production", "Production Management", "উৎপাদন ব্যবস্থাপনা", "notebook", "#FFD700", 130, "medium", ["HSC"], hsc, BUSINESS, ["উৎপাদন"]),
  sub("hsc-sociology", "Sociology", "সমাজবিজ্ঞান", "globe", "#00F0FF", 130, "medium", ["HSC"], hsc, HUMANITIES, ["সমাজ","Society","Culture","Institution","Stratification"]),
  sub("hsc-statistics", "Statistics", "পরিসংখ্যান", "calculator", "#00F0FF", 135, "medium", ["HSC"], hsc, BUSINESS, ["পরিসংখ্যান","Central Tendency","Dispersion","Correlation","Regression","Probability","Sampling","Index Number"]),
  sub("university-accounting", "Accounting", "হিসাববিজ্ঞান", "notebook", "#FFD700", 135, "medium", ["University"], university, BUSINESS, ["Accounting Equation","Accounting Basics","Double Entry","Journal","Ledger","Trial Balance","Financial Statements","Depreciation"]),
  sub("university-biology", "Biology", "জীববিজ্ঞান", "dna", "#FF8C00", 140, "medium", ["University"], university, SCIENCE, ["Cell Biology","Biomolecule","Cell Division","Physiology","Transport","Plant Physiology","Human Physiology","Genetics"]),
  sub("university-business-org", "Business Organization", "ব্যবসায় সংগঠন", "landmark", "#39FF14", 130, "medium", ["University"], university, BUSINESS, ["Forms of Business","Partnership","Company","Cooperative","Entrepreneurship","Ethics","CSR","E-commerce"]),
  sub("university-chemistry", "Chemistry", "রসায়ন", "flask", "#39FF14", 145, "hard", ["University"], university, SCIENCE, ["Atomic Structure","Mole Concept","Periodic Table","Bonding","Acid-Base","Solution","Thermochemistry","Equilibrium"]),
  sub("university-civics", "Civics", "পৌরনীতি", "shield", "#BF5FFF", 120, "medium", ["University"], university, HUMANITIES, ["State","Constitution","Democracy","Rights","Government","Judiciary","Citizenship","Election"]),
  sub("university-economics", "Economics", "অর্থনীতি", "coins", "#39FF14", 130, "medium", ["University"], university, HUMANITIES, ["Basic Economics","Demand","Supply","Market","Elasticity","National Income","Macro Economics","Public Finance"]),
  sub("university-ethics", "Ethics", "নৈতিক শিক্ষা", "school", "#CD7F32", 120, "easy", ["University"], university, HUMANITIES, ["Civic Values"]),
  sub("university-finance", "Finance", "ফিন্যান্স", "coins", "#FFD700", 130, "medium", ["University"], university, BUSINESS, ["Time Value","Interest","Investment","Risk","Portfolio","Working Capital","Banking","Insurance"]),
  sub("university-geography", "Geography", "ভূগোল", "map", "#00F0FF", 125, "medium", ["University"], university, HUMANITIES, ["Earth","Climate","Geomorphology","Disaster","Population","Technology"]),
  sub("university-higher-math", "Higher Mathematics", "উচ্চতর গণিত", "calculator", "#00F0FF", 150, "hard", ["University"], university, SCIENCE, ["Algebra","Trigonometry","Calculus","Vector","Matrix","Complex Number","Coordinate Geometry"]),
  sub("university-history", "History", "ইতিহাস", "book", "#CD7F32", 125, "medium", ["University"], university, HUMANITIES, ["Bangladesh History","World History"]),
  sub("university-ict", "ICT", "তথ্য ও যোগাযোগ প্রযুক্তি", "bot", "#BF5FFF", 120, "medium", ["University"], university, SCIENCE, ["Computer Basics","Programming","Database","Networking","Web","Security","Logic","Cloud"]),
  sub("university-logic", "Logic", "যুক্তিবিদ্যা", "brain", "#00F0FF", 130, "medium", ["University"], university, HUMANITIES, ["Logic Basics","Reasoning","Syllogism","Fallacy","Truth Table"]),
  sub("university-management", "Management", "ব্যবস্থাপনা", "landmark", "#39FF14", 135, "medium", ["University"], university, BUSINESS, ["Management Process","Staffing","Directing","Controlling","Leadership","Motivation","Communication","Decision Making"]),
  sub("university-marketing", "Marketing", "বিপণন", "coins", "#FFD700", 130, "medium", ["University"], university, BUSINESS, ["Marketing Mix","Segmentation","Targeting","Positioning","Branding","Research","Consumer Behavior","Promotion"]),
  sub("university-physics", "Physics", "পদার্থবিজ্ঞান", "atom", "#BF5FFF", 145, "hard", ["University"], university, SCIENCE, ["Mechanics","Heat","Wave","Optics","Electricity","Magnetism","Modern Physics"]),
  sub("university-political-science", "Political Science", "রাষ্ট্রবিজ্ঞান", "shield", "#BF5FFF", 130, "medium", ["University"], university, HUMANITIES, ["Government","Democracy","International Relations"]),
  sub("university-psychology", "Psychology", "মনোবিজ্ঞান", "brain", "#BF5FFF", 130, "medium", ["University"], university, HUMANITIES, ["Learning","Memory","Motivation"]),
  sub("university-sociology", "Sociology", "সমাজবিজ্ঞান", "globe", "#00F0FF", 130, "medium", ["University"], university, HUMANITIES, ["Society","Culture","Institution","Stratification"]),
  sub("university-statistics", "Statistics", "পরিসংখ্যান", "calculator", "#00F0FF", 135, "medium", ["University"], university, BUSINESS, ["Central Tendency","Dispersion","Correlation","Regression","Probability","Sampling","Index Number","Time Series"]),

  // Higher Education class-specific dataset subjects
  sub("university-1st-bangla", "Bangla", "বাংলা", "language", "#FF003C", 120, "medium", ["University"], university1, ALL_GROUPS, ["ভাষা ও ব্যাকরণ", "বাংলা ভাষার ইতিহাস", "শব্দতত্ত্ব", "রূপতত্ত্ব", "বাক্যতত্ত্ব", "অলংকার", "কবিতা পাঠ", "গদ্য পাঠ", "নাটক", "উপন্যাস", "রবীন্দ্র সাহিত্য", "নজরুল সাহিত্য"]),
  sub("university-1st-english", "English", "English", "book", "#FFD700", 120, "medium", ["University"], university1, ALL_GROUPS, ["Grammar", "Syntax", "Vocabulary", "Writing Skills", "Composition", "Poetry", "Drama", "Fiction", "Literary Criticism", "Linguistics", "Morphology", "Semantics"]),
  sub("university-1st-ethics", "Ethics", "নৈতিক শিক্ষা", "school", "#CD7F32", 120, "easy", ["University"], university1, ALL_GROUPS, ["নৈতিকতার ধারণা", "মূল্যবোধ", "মানবিকতা", "ব্যক্তিগত নৈতিকতা", "পারিবারিক নৈতিকতা", "সামাজিক নৈতিকতা", "পেশাগত নৈতিকতা", "নাগরিক নৈতিকতা", "মানবাধিকার", "পরিবেশ নৈতিকতা", "ডিজিটাল নৈতিকতা", "দুর্নীতি বিরোধী নৈতিকতা"]),
  sub("university-1st-political-science", "Political Science", "রাষ্ট্রবিজ্ঞান", "shield", "#BF5FFF", 130, "medium", ["University"], university1, ALL_GROUPS, ["রাষ্ট্রের ধারণা", "সার্বভৌমত্ব", "সরকার", "সংবিধান", "গণতন্ত্র", "নির্বাচন", "রাজনৈতিক দল", "ক্ষমতার বিভাজন", "রাজনৈতিক চিন্তা", "বাংলাদেশের রাজনীতি", "স্থানীয় সরকার", "আন্তর্জাতিক সম্পর্ক"]),
  sub("university-1st-psychology", "Psychology", "মনোবিজ্ঞান", "brain", "#BF5FFF", 130, "medium", ["University"], university1, ALL_GROUPS, ["মনোবিজ্ঞানের পরিচয়", "জৈবিক ভিত্তি", "সংবেদন", "প্রত্যক্ষণ", "শিক্ষণ", "স্মৃতি", "চিন্তা", "বুদ্ধি", "ব্যক্তিত্ব", "বিকাশ", "সামাজিক মনোবিজ্ঞান", "প্রেষণা"]),
  sub("university-1st-sociology", "Sociology", "সমাজবিজ্ঞান", "globe", "#00F0FF", 130, "medium", ["University"], university1, ALL_GROUPS, ["সমাজবিজ্ঞানের পরিচয়", "সমাজ", "সংস্কৃতি", "সামাজিকীকরণ", "সামাজিক প্রতিষ্ঠান", "ধর্ম", "শিক্ষা", "অর্থনীতি ও সমাজ", "সামাজিক স্তরবিন্যাস", "লিঙ্গ ও সমাজ", "গ্রামীণ সমাজ", "নগর সমাজ"]),
  sub("university-2nd-bangla", "Bangla", "বাংলা", "language", "#FF003C", 120, "medium", ["University"], university2, ALL_GROUPS, ["রূপতত্ত্ব", "বাক্যতত্ত্ব", "অলংকার", "কবিতা পাঠ", "গদ্য পাঠ", "নাটক", "উপন্যাস", "রবীন্দ্র সাহিত্য", "নজরুল সাহিত্য", "লোকসাহিত্য", "ছন্দ", "সাহিত্য সমালোচনা"]),
  sub("university-2nd-english", "English", "English", "book", "#FFD700", 120, "medium", ["University"], university2, ALL_GROUPS, ["Vocabulary", "Writing Skills", "Composition", "Poetry", "Drama", "Fiction", "Literary Criticism", "Linguistics", "Morphology", "Semantics", "Pragmatics", "ELT"]),
  sub("university-2nd-ethics", "Ethics", "নৈতিক শিক্ষা", "school", "#CD7F32", 120, "easy", ["University"], university2, ALL_GROUPS, ["ব্যক্তিগত নৈতিকতা", "পারিবারিক নৈতিকতা", "সামাজিক নৈতিকতা", "পেশাগত নৈতিকতা", "নাগরিক নৈতিকতা", "মানবাধিকার", "পরিবেশ নৈতিকতা", "ডিজিটাল নৈতিকতা", "দুর্নীতি বিরোধী নৈতিকতা", "ধর্ম ও নৈতিকতা", "নৈতিক সিদ্ধান্ত", "শান্তি ও সহনশীলতা"]),
  sub("university-2nd-political-science", "Political Science", "রাষ্ট্রবিজ্ঞান", "shield", "#BF5FFF", 130, "medium", ["University"], university2, ALL_GROUPS, ["সংবিধান", "গণতন্ত্র", "নির্বাচন", "রাজনৈতিক দল", "ক্ষমতার বিভাজন", "রাজনৈতিক চিন্তা", "বাংলাদেশের রাজনীতি", "স্থানীয় সরকার", "আন্তর্জাতিক সম্পর্ক", "পররাষ্ট্রনীতি", "রাজনৈতিক অর্থনীতি", "জনপ্রশাসন"]),
  sub("university-2nd-psychology", "Psychology", "মনোবিজ্ঞান", "brain", "#BF5FFF", 130, "medium", ["University"], university2, ALL_GROUPS, ["প্রত্যক্ষণ", "শিক্ষণ", "স্মৃতি", "চিন্তা", "বুদ্ধি", "ব্যক্তিত্ব", "বিকাশ", "সামাজিক মনোবিজ্ঞান", "প্রেষণা", "আবেগ", "অস্বাভাবিক মনোবিজ্ঞান", "পরামর্শ মনোবিজ্ঞান"]),
  sub("university-2nd-sociology", "Sociology", "সমাজবিজ্ঞান", "globe", "#00F0FF", 130, "medium", ["University"], university2, ALL_GROUPS, ["সামাজিকীকরণ", "সামাজিক প্রতিষ্ঠান", "ধর্ম", "শিক্ষা", "অর্থনীতি ও সমাজ", "সামাজিক স্তরবিন্যাস", "লিঙ্গ ও সমাজ", "গ্রামীণ সমাজ", "নগর সমাজ", "সামাজিক পরিবর্তন", "বিশ্বায়ন", "সামাজিক সমস্যা"]),
  sub("university-3rd-bangla", "Bangla", "বাংলা", "language", "#FF003C", 120, "medium", ["University"], university3, ALL_GROUPS, ["কবিতা পাঠ", "গদ্য পাঠ", "নাটক", "উপন্যাস", "রবীন্দ্র সাহিত্য", "নজরুল সাহিত্য", "লোকসাহিত্য", "ছন্দ", "সাহিত্য সমালোচনা", "ভাষাবিজ্ঞান", "প্রাচীন সাহিত্য", "আধুনিক সাহিত্য"]),
  sub("university-3rd-english", "English", "English", "book", "#FFD700", 120, "medium", ["University"], university3, ALL_GROUPS, ["Poetry", "Drama", "Fiction", "Literary Criticism", "Linguistics", "Morphology", "Semantics", "Pragmatics", "ELT", "Research Writing", "Postcolonial Literature", "Rhetoric"]),
  sub("university-3rd-ethics", "Ethics", "নৈতিক শিক্ষা", "school", "#CD7F32", 120, "easy", ["University"], university3, ALL_GROUPS, ["পেশাগত নৈতিকতা", "নাগরিক নৈতিকতা", "মানবাধিকার", "পরিবেশ নৈতিকতা", "ডিজিটাল নৈতিকতা", "দুর্নীতি বিরোধী নৈতিকতা", "ধর্ম ও নৈতিকতা", "নৈতিক সিদ্ধান্ত", "শান্তি ও সহনশীলতা", "নেতৃত্ব নৈতিকতা", "গবেষণা নৈতিকতা", "আন্তর্জাতিক নৈতিকতা"]),
  sub("university-3rd-political-science", "Political Science", "রাষ্ট্রবিজ্ঞান", "shield", "#BF5FFF", 130, "medium", ["University"], university3, ALL_GROUPS, ["রাজনৈতিক দল", "ক্ষমতার বিভাজন", "রাজনৈতিক চিন্তা", "বাংলাদেশের রাজনীতি", "স্থানীয় সরকার", "আন্তর্জাতিক সম্পর্ক", "পররাষ্ট্রনীতি", "রাজনৈতিক অর্থনীতি", "জনপ্রশাসন", "জননীতি", "গবেষণা পদ্ধতি", "তুলনামূলক রাজনীতি"]),
  sub("university-3rd-psychology", "Psychology", "মনোবিজ্ঞান", "brain", "#BF5FFF", 130, "medium", ["University"], university3, ALL_GROUPS, ["চিন্তা", "বুদ্ধি", "ব্যক্তিত্ব", "বিকাশ", "সামাজিক মনোবিজ্ঞান", "প্রেষণা", "আবেগ", "অস্বাভাবিক মনোবিজ্ঞান", "পরামর্শ মনোবিজ্ঞান", "স্বাস্থ্য মনোবিজ্ঞান", "গবেষণা পদ্ধতি", "পরিসংখ্যান"]),
  sub("university-3rd-sociology", "Sociology", "সমাজবিজ্ঞান", "globe", "#00F0FF", 130, "medium", ["University"], university3, ALL_GROUPS, ["শিক্ষা", "অর্থনীতি ও সমাজ", "সামাজিক স্তরবিন্যাস", "লিঙ্গ ও সমাজ", "গ্রামীণ সমাজ", "নগর সমাজ", "সামাজিক পরিবর্তন", "বিশ্বায়ন", "সামাজিক সমস্যা", "অপরাধ ও বিচ্যুতি", "বাংলাদেশ সমাজ", "গবেষণা পদ্ধতি"]),
  sub("university-4th-bangla", "Bangla", "বাংলা", "language", "#FF003C", 120, "medium", ["University"], university4, ALL_GROUPS, ["উপন্যাস", "রবীন্দ্র সাহিত্য", "নজরুল সাহিত্য", "লোকসাহিত্য", "ছন্দ", "সাহিত্য সমালোচনা", "ভাষাবিজ্ঞান", "প্রাচীন সাহিত্য", "আধুনিক সাহিত্য", "বানান ও শুদ্ধ ভাষা", "অনুবাদ", "ভাষা ও ব্যাকরণ"]),
  sub("university-4th-english", "English", "English", "book", "#FFD700", 120, "medium", ["University"], university4, ALL_GROUPS, ["Fiction", "Literary Criticism", "Linguistics", "Morphology", "Semantics", "Pragmatics", "ELT", "Research Writing", "Postcolonial Literature", "Rhetoric", "Translation", "Grammar"]),
  sub("university-4th-ethics", "Ethics", "নৈতিক শিক্ষা", "school", "#CD7F32", 120, "easy", ["University"], university4, ALL_GROUPS, ["পরিবেশ নৈতিকতা", "ডিজিটাল নৈতিকতা", "দুর্নীতি বিরোধী নৈতিকতা", "ধর্ম ও নৈতিকতা", "নৈতিক সিদ্ধান্ত", "শান্তি ও সহনশীলতা", "নেতৃত্ব নৈতিকতা", "গবেষণা নৈতিকতা", "আন্তর্জাতিক নৈতিকতা", "লিঙ্গ নৈতিকতা", "অর্থনৈতিক নৈতিকতা", "নৈতিকতার ধারণা"]),
  sub("university-4th-political-science", "Political Science", "রাষ্ট্রবিজ্ঞান", "shield", "#BF5FFF", 130, "medium", ["University"], university4, ALL_GROUPS, ["বাংলাদেশের রাজনীতি", "স্থানীয় সরকার", "আন্তর্জাতিক সম্পর্ক", "পররাষ্ট্রনীতি", "রাজনৈতিক অর্থনীতি", "জনপ্রশাসন", "জননীতি", "গবেষণা পদ্ধতি", "তুলনামূলক রাজনীতি", "মানবাধিকার রাজনীতি", "রাজনৈতিক উন্নয়ন", "রাষ্ট্রের ধারণা"]),
  sub("university-4th-psychology", "Psychology", "মনোবিজ্ঞান", "brain", "#BF5FFF", 130, "medium", ["University"], university4, ALL_GROUPS, ["বিকাশ", "সামাজিক মনোবিজ্ঞান", "প্রেষণা", "আবেগ", "অস্বাভাবিক মনোবিজ্ঞান", "পরামর্শ মনোবিজ্ঞান", "স্বাস্থ্য মনোবিজ্ঞান", "গবেষণা পদ্ধতি", "পরিসংখ্যান", "শিল্প-সংগঠন মনোবিজ্ঞান", "শিক্ষা মনোবিজ্ঞান", "মনোবিজ্ঞানের পরিচয়"]),
  sub("university-4th-sociology", "Sociology", "সমাজবিজ্ঞান", "globe", "#00F0FF", 130, "medium", ["University"], university4, ALL_GROUPS, ["লিঙ্গ ও সমাজ", "গ্রামীণ সমাজ", "নগর সমাজ", "সামাজিক পরিবর্তন", "বিশ্বায়ন", "সামাজিক সমস্যা", "অপরাধ ও বিচ্যুতি", "বাংলাদেশ সমাজ", "গবেষণা পদ্ধতি", "সমাজতাত্ত্বিক তত্ত্ব", "উন্নয়ন সমাজবিজ্ঞান", "সমাজবিজ্ঞানের পরিচয়"]),
  sub("degree-bangla", "Bangla", "বাংলা", "language", "#FF003C", 120, "medium", ["University"], degree, ALL_GROUPS, ["বাংলা ভাষার ইতিহাস", "শব্দতত্ত্ব", "রূপতত্ত্ব", "বাক্যতত্ত্ব", "অলংকার", "কবিতা পাঠ", "গদ্য পাঠ", "নাটক", "উপন্যাস", "রবীন্দ্র সাহিত্য", "নজরুল সাহিত্য", "লোকসাহিত্য"]),
  sub("degree-english", "English", "English", "book", "#FFD700", 120, "medium", ["University"], degree, ALL_GROUPS, ["Grammar", "Syntax", "Vocabulary", "Writing Skills", "Composition", "Poetry", "Drama", "Fiction", "Literary Criticism", "Linguistics", "Morphology", "Semantics"]),
  sub("degree-ethics", "Ethics", "নৈতিক শিক্ষা", "school", "#CD7F32", 120, "easy", ["University"], degree, ALL_GROUPS, ["মূল্যবোধ", "মানবিকতা", "ব্যক্তিগত নৈতিকতা", "পারিবারিক নৈতিকতা", "সামাজিক নৈতিকতা", "পেশাগত নৈতিকতা", "নাগরিক নৈতিকতা", "মানবাধিকার", "পরিবেশ নৈতিকতা", "ডিজিটাল নৈতিকতা", "দুর্নীতি বিরোধী নৈতিকতা", "ধর্ম ও নৈতিকতা"]),
  sub("degree-political-science", "Political Science", "রাষ্ট্রবিজ্ঞান", "shield", "#BF5FFF", 130, "medium", ["University"], degree, ALL_GROUPS, ["সার্বভৌমত্ব", "সরকার", "সংবিধান", "গণতন্ত্র", "নির্বাচন", "রাজনৈতিক দল", "ক্ষমতার বিভাজন", "রাজনৈতিক চিন্তা", "বাংলাদেশের রাজনীতি", "স্থানীয় সরকার", "আন্তর্জাতিক সম্পর্ক", "পররাষ্ট্রনীতি"]),
  sub("degree-psychology", "Psychology", "মনোবিজ্ঞান", "brain", "#BF5FFF", 130, "medium", ["University"], degree, ALL_GROUPS, ["জৈবিক ভিত্তি", "সংবেদন", "প্রত্যক্ষণ", "শিক্ষণ", "স্মৃতি", "চিন্তা", "বুদ্ধি", "ব্যক্তিত্ব", "বিকাশ", "সামাজিক মনোবিজ্ঞান", "প্রেষণা", "আবেগ"]),
  sub("degree-sociology", "Sociology", "সমাজবিজ্ঞান", "globe", "#00F0FF", 130, "medium", ["University"], degree, ALL_GROUPS, ["সমাজ", "সংস্কৃতি", "সামাজিকীকরণ", "সামাজিক প্রতিষ্ঠান", "ধর্ম", "শিক্ষা", "অর্থনীতি ও সমাজ", "সামাজিক স্তরবিন্যাস", "লিঙ্গ ও সমাজ", "গ্রামীণ সমাজ", "নগর সমাজ", "সামাজিক পরিবর্তন"]),
  sub("honours-bangla", "Bangla", "বাংলা", "language", "#FF003C", 120, "medium", ["University"], honours, ALL_GROUPS, ["বাক্যতত্ত্ব", "অলংকার", "কবিতা পাঠ", "গদ্য পাঠ", "নাটক", "উপন্যাস", "রবীন্দ্র সাহিত্য", "নজরুল সাহিত্য", "লোকসাহিত্য", "ছন্দ", "সাহিত্য সমালোচনা", "ভাষাবিজ্ঞান"]),
  sub("honours-english", "English", "English", "book", "#FFD700", 120, "medium", ["University"], honours, ALL_GROUPS, ["Writing Skills", "Composition", "Poetry", "Drama", "Fiction", "Literary Criticism", "Linguistics", "Morphology", "Semantics", "Pragmatics", "ELT", "Research Writing"]),
  sub("honours-ethics", "Ethics", "নৈতিক শিক্ষা", "school", "#CD7F32", 120, "easy", ["University"], honours, ALL_GROUPS, ["পারিবারিক নৈতিকতা", "সামাজিক নৈতিকতা", "পেশাগত নৈতিকতা", "নাগরিক নৈতিকতা", "মানবাধিকার", "পরিবেশ নৈতিকতা", "ডিজিটাল নৈতিকতা", "দুর্নীতি বিরোধী নৈতিকতা", "ধর্ম ও নৈতিকতা", "নৈতিক সিদ্ধান্ত", "শান্তি ও সহনশীলতা", "নেতৃত্ব নৈতিকতা"]),
  sub("honours-political-science", "Political Science", "রাষ্ট্রবিজ্ঞান", "shield", "#BF5FFF", 130, "medium", ["University"], honours, ALL_GROUPS, ["গণতন্ত্র", "নির্বাচন", "রাজনৈতিক দল", "ক্ষমতার বিভাজন", "রাজনৈতিক চিন্তা", "বাংলাদেশের রাজনীতি", "স্থানীয় সরকার", "আন্তর্জাতিক সম্পর্ক", "পররাষ্ট্রনীতি", "রাজনৈতিক অর্থনীতি", "জনপ্রশাসন", "জননীতি"]),
  sub("honours-psychology", "Psychology", "মনোবিজ্ঞান", "brain", "#BF5FFF", 130, "medium", ["University"], honours, ALL_GROUPS, ["শিক্ষণ", "স্মৃতি", "চিন্তা", "বুদ্ধি", "ব্যক্তিত্ব", "বিকাশ", "সামাজিক মনোবিজ্ঞান", "প্রেষণা", "আবেগ", "অস্বাভাবিক মনোবিজ্ঞান", "পরামর্শ মনোবিজ্ঞান", "স্বাস্থ্য মনোবিজ্ঞান"]),
  sub("honours-sociology", "Sociology", "সমাজবিজ্ঞান", "globe", "#00F0FF", 130, "medium", ["University"], honours, ALL_GROUPS, ["সামাজিক প্রতিষ্ঠান", "ধর্ম", "শিক্ষা", "অর্থনীতি ও সমাজ", "সামাজিক স্তরবিন্যাস", "লিঙ্গ ও সমাজ", "গ্রামীণ সমাজ", "নগর সমাজ", "সামাজিক পরিবর্তন", "বিশ্বায়ন", "সামাজিক সমস্যা", "অপরাধ ও বিচ্যুতি"]),
  sub("masters-bangla", "Bangla", "বাংলা", "language", "#FF003C", 120, "medium", ["University"], masters, ALL_GROUPS, ["নাটক", "উপন্যাস", "রবীন্দ্র সাহিত্য", "নজরুল সাহিত্য", "লোকসাহিত্য", "ছন্দ", "সাহিত্য সমালোচনা", "ভাষাবিজ্ঞান", "প্রাচীন সাহিত্য", "আধুনিক সাহিত্য", "বানান ও শুদ্ধ ভাষা", "অনুবাদ"]),
  sub("masters-english", "English", "English", "book", "#FFD700", 120, "medium", ["University"], masters, ALL_GROUPS, ["Drama", "Fiction", "Literary Criticism", "Linguistics", "Morphology", "Semantics", "Pragmatics", "ELT", "Research Writing", "Postcolonial Literature", "Rhetoric", "Translation"]),
  sub("masters-ethics", "Ethics", "নৈতিক শিক্ষা", "school", "#CD7F32", 120, "easy", ["University"], masters, ALL_GROUPS, ["মানবাধিকার", "পরিবেশ নৈতিকতা", "ডিজিটাল নৈতিকতা", "দুর্নীতি বিরোধী নৈতিকতা", "ধর্ম ও নৈতিকতা", "নৈতিক সিদ্ধান্ত", "শান্তি ও সহনশীলতা", "নেতৃত্ব নৈতিকতা", "গবেষণা নৈতিকতা", "আন্তর্জাতিক নৈতিকতা", "লিঙ্গ নৈতিকতা", "অর্থনৈতিক নৈতিকতা"]),
  sub("masters-political-science", "Political Science", "রাষ্ট্রবিজ্ঞান", "shield", "#BF5FFF", 130, "medium", ["University"], masters, ALL_GROUPS, ["রাজনৈতিক চিন্তা", "বাংলাদেশের রাজনীতি", "স্থানীয় সরকার", "আন্তর্জাতিক সম্পর্ক", "পররাষ্ট্রনীতি", "রাজনৈতিক অর্থনীতি", "জনপ্রশাসন", "জননীতি", "গবেষণা পদ্ধতি", "তুলনামূলক রাজনীতি", "মানবাধিকার রাজনীতি", "রাজনৈতিক উন্নয়ন"]),
  sub("masters-psychology", "Psychology", "মনোবিজ্ঞান", "brain", "#BF5FFF", 130, "medium", ["University"], masters, ALL_GROUPS, ["ব্যক্তিত্ব", "বিকাশ", "সামাজিক মনোবিজ্ঞান", "প্রেষণা", "আবেগ", "অস্বাভাবিক মনোবিজ্ঞান", "পরামর্শ মনোবিজ্ঞান", "স্বাস্থ্য মনোবিজ্ঞান", "গবেষণা পদ্ধতি", "পরিসংখ্যান", "শিল্প-সংগঠন মনোবিজ্ঞান", "শিক্ষা মনোবিজ্ঞান"]),
  sub("masters-sociology", "Sociology", "সমাজবিজ্ঞান", "globe", "#00F0FF", 130, "medium", ["University"], masters, ALL_GROUPS, ["সামাজিক স্তরবিন্যাস", "লিঙ্গ ও সমাজ", "গ্রামীণ সমাজ", "নগর সমাজ", "সামাজিক পরিবর্তন", "বিশ্বায়ন", "সামাজিক সমস্যা", "অপরাধ ও বিচ্যুতি", "বাংলাদেশ সমাজ", "গবেষণা পদ্ধতি", "সমাজতাত্ত্বিক তত্ত্ব", "উন্নয়ন সমাজবিজ্ঞান"]),

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
