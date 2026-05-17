export type UpdateInfo = {
  version: string;
  title: string;
  titleBn: string;
  notes: string[];
  notesBn: string[];
};

export const CURRENT_UPDATE_INFO: UpdateInfo = {
  version: "1.4.1",
  title: "Study RPG v1.4.1",
  titleBn: "Study RPG v1.4.1 আপডেট",
  notes: [
    "Leaderboard and profile load from local cache first for faster opening.",
    "Mute/unmute now updates instantly and removes the mute icon correctly.",
    "Rank journey next rank now uses Bronze, Silver, Gold, Platinum and Titanium labels.",
    "Rank journey icons are brighter and more professional.",
    "Message notification fallback improved for open app and active sessions."
  ],
  notesBn: [
    "Leaderboard ও profile আগে local cache থেকে load হবে, তাই দ্রুত open হবে।",
    "Mute/unmute এখন সাথে সাথে update হবে এবং mute icon ঠিকভাবে remove হবে।",
    "Rank journey-এর next rank এখন Bronze, Silver, Gold, Platinum, Titanium label দেখাবে।",
    "Rank journey icon আরও highlighted ও professional করা হয়েছে।",
    "Message notification open app/active session-এর জন্য আরও strong করা হয়েছে।"
  ]
};
