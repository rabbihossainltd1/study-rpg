export type UpdateInfo = {
  version: string;
  title: string;
  titleBn: string;
  notes: string[];
  notesBn: string[];
};

export const CURRENT_UPDATE_INFO: UpdateInfo = {
  version: "1.3.2",
  title: "Study RPG v1.3.2",
  titleBn: "Study RPG v1.3.2 আপডেট",
  notes: [
    "Bottom navigation keeps the MCQ button like before.",
    "Subject pages now include both class-wise MCQ and written questions.",
    "Written questions are cleaner, subject-specific and separated by Easy, Medium and Hard.",
    "Students must solve written questions in a notebook and upload solved proof for XP.",
    "Leaderboard View Profile now opens a working profile page with friend-based full/basic information.",
    "Question banks were regenerated to avoid repeated SSC/HSC prefix text and duplicate exact questions.",
    "Firebase rules text file is included for deployment reference."
  ],
  notesBn: [
    "Bottom navigation-এ আগের মতো MCQ button রাখা হয়েছে।",
    "Subject page-এ এখন class-wise MCQ এবং লিখিত প্রশ্ন দুইটাই থাকবে।",
    "লিখিত প্রশ্নগুলো clean, subject-specific এবং Easy, Medium, Hard অনুযায়ী আলাদা করা হয়েছে।",
    "লিখিত প্রশ্ন খাতায় solve করে solved proof upload করলে XP verification হবে।",
    "Leaderboard View Profile এখন working profile page open করবে; friend হলে full info, না হলে basic info।",
    "Repeated SSC/HSC prefix text ও exact duplicate question এড়াতে question bank regenerate করা হয়েছে।",
    "Firebase rules deployment reference হিসেবে TXT file ZIP-এর ভিতরে দেওয়া হয়েছে।"
  ]
};
