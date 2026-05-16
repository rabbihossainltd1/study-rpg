export type UpdateInfo = {
  version: string;
  title: string;
  titleBn: string;
  notes: string[];
  notesBn: string[];
};

export const CURRENT_UPDATE_INFO: UpdateInfo = {
  version: "1.3.8",
  title: "Study RPG v1.3.8",
  titleBn: "Study RPG v1.3.8 আপডেট",
  notes: [
    "MCQ practice now shows only clean question text across all classes and subjects.",
    "Quiz and mission reward claim buttons are guarded so the same reward cannot be collected repeatedly.",
    "Notification permission request has been strengthened for Android install/open flow.",
    "Creator profile now shows an App Verified blue badge.",
    "Chat header menu is cleaner and uses a professional profile action instead of the old three-dot chat menu."
  ],
  notesBn: [
    "সব class ও subject-এর MCQ practice-এ এখন শুধু clean প্রশ্ন দেখাবে।",
    "Quiz ও mission reward claim guard করা হয়েছে, তাই একই reward বারবার collect হবে না।",
    "Android app install/open করার পর notification permission request আরও strong করা হয়েছে।",
    "Creator profile-এ App Verified blue badge add করা হয়েছে।",
    "Chat header clean করা হয়েছে; পুরোনো 3-dot chat menu বাদ দিয়ে professional profile action রাখা হয়েছে।"
  ]
};
