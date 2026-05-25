export type UpdateInfo = {
  version: string;
  title: string;
  titleBn: string;
  notes: string[];
  notesBn: string[];
};

export const CURRENT_UPDATE_INFO: UpdateInfo = {
  version: "1.4.3",
  title: "Study RPG v1.4.3",
  titleBn: "Study RPG v1.4.3 আপডেট",
  notes: [
    "Real PDF-based MCQ imported for matched class and subject banks with duplicate cleanup.",
    "Easy, medium and hard MCQ banks are preserved in the existing structure.",
    "Raw MCQ question text is shown without class, group or subject prefixes.",
    "Unmatched subjects and existing written questions remain unchanged.",
    "Android version updated to v1.4.3 for the new APK."
  ],
  notesBn: [
    "Matched class ও subject bank-এ real PDF-based MCQ import করা হয়েছে, duplicate cleanup সহ।",
    "Existing structure অনুযায়ী Easy, Medium, Hard MCQ bank রাখা হয়েছে।",
    "MCQ question text raw রাখা হয়েছে; class/group/subject prefix দেখাবে না।",
    "Unmatched subject এবং existing written questions unchanged রাখা হয়েছে।",
    "New APK-এর জন্য Android version v1.4.3 করা হয়েছে।"
  ]
};
