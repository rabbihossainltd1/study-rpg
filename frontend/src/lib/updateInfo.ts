export type UpdateInfo = {
  version: string;
  title: string;
  titleBn: string;
  notes: string[];
  notesBn: string[];
};

export const CURRENT_UPDATE_INFO: UpdateInfo = {
  version: "1.3.3",
  title: "Study RPG v1.3.3",
  titleBn: "Study RPG v1.3.3 আপডেট",
  notes: [
    "Public profile now has Add Friend / Cancel Request actions.",
    "Friends page rules and friend request permissions were fixed.",
    "MCQ Easy, Medium and Hard banks now use separated question and option patterns.",
    "Mission GK questions rotate daily and no longer reuse the same set in every mission.",
    "Mission rewards can be collected once per day only, then reset after 24 hours.",
    "Firestore rules TXT file is included for the new friend and mission claim flow."
  ],
  notesBn: [
    "Public profile-এ Add Friend / Cancel Request action add করা হয়েছে।",
    "Friends page load এবং friend request permission rules fix করা হয়েছে।",
    "MCQ Easy, Medium, Hard এখন আলাদা question এবং option pattern ব্যবহার করবে।",
    "Mission GK questions প্রতিদিন rotate হবে এবং সব mission-এ একই set থাকবে না।",
    "Mission reward দিনে একবারই collect করা যাবে, 24 hours পরে নতুন daily task আসবে।",
    "নতুন friend ও mission claim flow-এর জন্য Firestore rules TXT file ZIP-এর ভিতরে দেওয়া হয়েছে।"
  ]
};
