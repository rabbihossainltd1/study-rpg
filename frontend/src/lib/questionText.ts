const BANGLA_CLASS_PREFIX = /^(?:ষষ্ঠ|সপ্তম|অষ্টম|নবম|দশম|একাদশ|দ্বাদশ)\s+শ্রেণি(?:র)?\s*/i;

function stripQuestionNoise(raw: string) {
  let text = String(raw || "").replace(/\s+/g, " ").trim();

  // Chapter/source labels shown before the actual question.
  text = text
    .replace(/^অধ্যা(?:য়|য়)\s*["'“‘]?[^"'”’]+["'”’]?\s*থেকে\s*MCQ\s*[—–:-]\s*/i, "")
    .replace(/^অধ্যা(?:য়|য়)\s+[^—–:-]+?\s+থেকে\s+MCQ\s*[—–:-]\s*/i, "")
    .replace(/^Chapter\s*["'“‘]?[^"'”’]+["'”’]?\s*(?:থেকে|from)?\s*MCQ\s*[—–:-]\s*/i, "")
    .replace(/^MCQ\s*[—–:-]\s*/i, "")
    .replace(/^প্রশ্ন\s*[—–:-]\s*/i, "");

  // Generated class/subject labels before colon, e.g. "দশম শ্রেণির ... MCQ:".
  text = text.replace(/^(?:ষষ্ঠ|সপ্তম|অষ্টম|নবম|দশম|একাদশ|দ্বাদশ)\s+শ্রেণি(?:র)?\s+[^:：?？]{2,90}?\s*(?:MCQ|কুইজ)\s*[:：]\s*/i, "");
  text = text.replace(/^Class\s*\d+(?:\s*[-/]\s*\d+)?\s+[^:：?？]{2,90}?\s*(?:MCQ|Quiz)\s*[:：]\s*/i, "");

  // Remove simple chapter/context lead-ins so the card shows only the question.
  if (!/^(?:কোন|কি|কী|কেন|কিভাবে|কোথায়|কোথায়)\s+অধ্যা/i.test(text)) {
    text = text.replace(/^(?:Class\s*\d+|ষষ্ঠ|সপ্তম|অষ্টম|নবম|দশম|একাদশ|দ্বাদশ)?\s*[^?？]{1,70}?অধ্যা(?:য়|য়|য়ে|য়ে)\s+/i, "");
  }

  // Admission/Foundation source labels that were generated into a few banks.
  text = text
    .replace(/^ভর্তি\s+প্রস্তুতির\s+দ্রুত\s+যাচাই(?:য়ে|য়ে|য়|য়)?\s*/i, "")
    .replace(/^পরীক্ষাভিত্তিক\s+ধারণা\s+যাচাই\s*[—–-]\s*[^?？]+?\s+অংশে\s*/i, "")
    .replace(/^Admission\s+[^?？:：]+?\s+(?:অংশে|সিলেবাসে|বিষয়ের|বিষয়ের)\s*/i, "")
    .replace(/^HSC\s+[^?？:：]+?\s+(?:অংশে|সিলেবাসে|বিষয়ের|বিষয়ের)\s*/i, "")
    .replace(/^University\s+[^?？:：]+?\s+(?:অংশে|সিলেবাসে|বিষয়ের|বিষয়ের)\s*/i, "");

  // If a generated prefix still contains MCQ before a colon, remove only that prefix.
  text = text.replace(/^[^?？]{2,120}?\bMCQ\b\s*[:：]\s*/i, "");

  // Remove trailing practice/source suffixes after the real question.
  text = text
    .replace(/\s*[—–-]\s*(?:ষষ্ঠ|সপ্তম|অষ্টম|নবম|দশম|একাদশ|দ্বাদশ)\s+শ্রেণি[^?？.!।]*?(?:অনুশীলন|practice)\s*\d+\s*$/i, "")
    .replace(/\s*[—–-]\s*Class\s*\d+[^?？.!।]*?(?:practice|exercise)\s*\d+\s*$/i, "")
    .replace(/\s*[—–-]\s*[^?？.!।]{2,70}?\s*(?:অনুশীলন|practice|exercise)\s*\d+\s*$/i, "");

  // Clean a remaining Bengali class phrase at the very start only when a question remains after it.
  if (BANGLA_CLASS_PREFIX.test(text) && /[?？]$/.test(text)) {
    text = text.replace(BANGLA_CLASS_PREFIX, "").trim();
  }

  return text.trim();
}

export function cleanMcqQuestionText(value?: string) {
  const clean = stripQuestionNoise(value || "");
  return clean || String(value || "").trim();
}
