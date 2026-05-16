export type UpdateInfo = {
  version: string;
  title: string;
  titleBn: string;
  notes: string[];
  notesBn: string[];
};

export const CURRENT_UPDATE_INFO: UpdateInfo = {
  version: "1.3.4",
  title: "Study RPG v1.3.4",
  titleBn: "Study RPG v1.3.4 আপডেট",
  notes: [
    "Android notification permission added for APK users.",
    "Friend request and message notification records are created automatically.",
    "In-app/mobile local notification bridge added for new friend requests and messages.",
    "Message box UI is cleaner and Messenger-style.",
    "Message status now shows single tick for sent, double tick for delivered, and colored double tick for seen.",
    "Friends page now includes a compact Block list button with unblock support.",
    "Update popup now shows release notes when a new GitHub Release is available."
  ],
  notesBn: [
    "APK user-দের জন্য Android notification permission add করা হয়েছে।",
    "Friend request এবং message পাঠালে notification record auto create হবে।",
    "নতুন friend request/message-এর জন্য in-app/mobile local notification bridge add করা হয়েছে।",
    "Message box UI আরও clean এবং Messenger-style করা হয়েছে।",
    "Single tick = sent, double tick = delivered, colored double tick = seen status add করা হয়েছে।",
    "Friends page-এ compact Block list button এবং unblock support add করা হয়েছে।",
    "নতুন GitHub Release থাকলে update popup release notes সহ দেখাবে।"
  ]
};
