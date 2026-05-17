export type UpdateInfo = {
  version: string;
  title: string;
  titleBn: string;
  notes: string[];
  notesBn: string[];
};

export const CURRENT_UPDATE_INFO: UpdateInfo = {
  version: "1.4.0",
  title: "Study RPG v1.4.0",
  titleBn: "Study RPG v1.4.0 আপডেট",
  notes: [
    "Chat delete and mute/unmute now persist locally and show faster.",
    "Friend list loads from local cache first and sorts latest message on top.",
    "Profile coins and gems cards now include proper icons.",
    "Rank journey has professional Bronze, Silver, Gold, Platinum and Titanium style milestones.",
    "Theme and language preferences are saved with the user profile.",
    "Search now opens public profiles directly and shows class-wise subject results."
  ],
  notesBn: [
    "Chat delete ও mute/unmute এখন local save থাকে এবং দ্রুত load হয়।",
    "Friend list আগে local cache থেকে load হবে এবং latest message top-এ থাকবে।",
    "Profile coins ও gems card-এ proper icon add করা হয়েছে।",
    "Rank journey Bronze, Silver, Gold, Platinum, Titanium style milestone দিয়ে professional করা হয়েছে।",
    "Theme ও language preference user profile-এ save থাকবে।",
    "Search থেকে public profile direct open হবে এবং class-wise subject result দেখাবে।"
  ]
};
