export type UpdateInfo = {
  version: string;
  title: string;
  titleBn: string;
  notes: string[];
  notesBn: string[];
};

export const CURRENT_UPDATE_INFO: UpdateInfo = {
  version: "1.3.6",
  title: "Study RPG v1.3.6",
  titleBn: "Study RPG v1.3.6 আপডেট",
  notes: [
    "Class 9, Class 10 and SSC are now combined into one shared class option.",
    "SSC common MCQ books now use the same combined subject bank.",
    "Dashboard Rank shortcut is replaced with an MCQ shortcut.",
    "Bottom navigation MCQ tab is replaced with Chat.",
    "Friend list rows now open chat directly; hold a friend row for actions.",
    "Chat header avatar/name opens the student's profile.",
    "Message notification handling is strengthened with local notification channel and polling fallback."
  ],
  notesBn: [
    "Class 9, Class 10 এবং SSC এখন একসাথে combined class option।",
    "SSC common MCQ books একই combined subject bank ব্যবহার করবে।",
    "Dashboard-এর Rank shortcut সরিয়ে MCQ shortcut add করা হয়েছে।",
    "Bottom navigation-এর MCQ tab এখন Chat।",
    "Friend list row tap করলেই chat open হবে; hold করলে actions দেখাবে।",
    "Chat header-এর profile photo/name tap করলে student profile খুলবে।",
    "Message notification আরও strong করা হয়েছে: local notification channel ও polling fallback add করা হয়েছে।"
  ]
};
