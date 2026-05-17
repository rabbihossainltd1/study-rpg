export type UpdateInfo = {
  version: string;
  title: string;
  titleBn: string;
  notes: string[];
  notesBn: string[];
};

export const CURRENT_UPDATE_INFO: UpdateInfo = {
  version: "1.3.9",
  title: "Study RPG v1.3.9",
  titleBn: "Study RPG v1.3.9 আপডেট",
  notes: [
    "MCQ questions now hide generated class and subject labels everywhere.",
    "Chat opens incoming messages instantly and suppresses mini popups while the same chat is open.",
    "Android notification permission and local alert flow have been strengthened.",
    "Update downloads now open in the device browser so APK files can download properly.",
    "Chat screen UI is cleaner with compact bubbles and a simple three-dot menu.",
    "Profile stats now shows only Coins and Gems cards."
  ],
  notesBn: [
    "সব class ও subject-এর MCQ-তে generated class/subject label hide করা হয়েছে।",
    "Chat open থাকলে incoming message আগে chat box-এ আসবে, mini popup আসবে না।",
    "Android notification permission ও local alert flow আরও strong করা হয়েছে।",
    "Update download এখন device default browser-এ open হবে।",
    "Chat screen compact bubble ও clean 3-dot menu দিয়ে সাজানো হয়েছে।",
    "Profile stats-এ এখন শুধু Coins ও Gems card থাকবে।"
  ]
};
