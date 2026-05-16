export type UpdateInfo = {
  version: string;
  title: string;
  titleBn: string;
  notes: string[];
  notesBn: string[];
};

export const CURRENT_UPDATE_INFO: UpdateInfo = {
  version: "1.3.7",
  title: "Study RPG v1.3.7",
  titleBn: "Study RPG v1.3.7 আপডেট",
  notes: [
    "Reward claim now has a safe fallback so completed quizzes do not get stuck.",
    "Written question cards are cleaner and show the question only across subjects.",
    "Friends inbox is cleaner: hold a friend row for actions and tap outside to close menus.",
    "Class 8 Life & Livelihood MCQ and written gaps are filled with unique easy, medium and hard questions.",
    "Update popup is now mandatory when a newer version is released.",
    "Profile stats are simplified; oversized level/time cards are removed.",
    "Android back navigation restores the previous page scroll position.",
    "Notification permission request is strengthened for installed apps.",
    "Leaderboard podium and rank highlights are upgraded."
  ],
  notesBn: [
    "Reward claim stuck হলে safe fallback দিয়ে reward collect হবে।",
    "লিখিত প্রশ্ন card এখন clean, সব subject/class-এ শুধু প্রশ্ন দেখাবে।",
    "Friends inbox clean করা হয়েছে: friend row hold করলে actions, blank জায়গায় tap করলে menu hide।",
    "Class 8 জীবন ও জীবিকা subject-এর MCQ ও written gap unique easy, medium, hard questions দিয়ে fill করা হয়েছে।",
    "New version release হলে update popup mandatory থাকবে।",
    "Profile stats simple করা হয়েছে; বড় level/time cards remove করা হয়েছে।",
    "Android back button previous page-এর old scroll position restore করবে।",
    "Installed app-এ notification permission request আরও strong করা হয়েছে।",
    "Leaderboard podium ও rank highlights upgrade করা হয়েছে।"
  ]
};
