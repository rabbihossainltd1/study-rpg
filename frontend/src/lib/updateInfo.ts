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
    "Profile, public profile, profile popup and chat UI redesigned with the new Study RPG icon style.",
    "Existing buttons, navigation, friend flow and chat logic are preserved.",
    "Challenge action is replaced with Gift options using Coins, Gems and Gift icons.",
    "Message notifications are hardened so new messages are less likely to be missed.",
    "Light and dark theme support is kept for the redesigned screens."
  ],
  notesBn: [
    "নতুন Study RPG icon style দিয়ে profile, public profile, profile popup ও chat UI redesign করা হয়েছে।",
    "আগের buttons, navigation, friend flow ও chat logic একই রাখা হয়েছে।",
    "Challenge action-এর জায়গায় Coins, Gems ও Gift icon সহ Gift options করা হয়েছে।",
    "নতুন message notification যেন miss না হয় সেই logic harden করা হয়েছে।",
    "Redesigned screen গুলোতে light ও dark theme support রাখা হয়েছে।"
  ]
};
