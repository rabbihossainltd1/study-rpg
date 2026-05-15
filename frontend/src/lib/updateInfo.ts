export type UpdateInfo = {
  version: string;
  title: string;
  titleBn: string;
  notes: string[];
  notesBn: string[];
};

export const CURRENT_UPDATE_INFO: UpdateInfo = {
  version: "1.3.1",
  title: "Study RPG v1.3.1",
  titleBn: "Study RPG v1.3.1 আপডেট",
  notes: [
    "Class and group based subjects now show written exam questions instead of subject MCQ tasks.",
    "Easy, Medium and Hard written question banks are separated for every class and subject.",
    "Students must solve the shown question in a notebook and upload a clear answer photo for reward verification.",
    "Leaderboard profiles now support a View Profile action with basic info for non-friends and full info for friends.",
    "Settings page is cleaner: student ID info is hidden behind an edit button and update check is compact at the bottom.",
    "Removed inactive study-time, lesson, streak and perfect-score mission tasks.",
    "Mission Daily Progress opens Subjects directly, and General Knowledge quiz missions were added."
  ],
  notesBn: [
    "ক্লাস ও গ্রুপ অনুযায়ী বিষয়গুলোতে MCQ task এর বদলে লিখিত পরীক্ষার প্রশ্ন দেখাবে।",
    "প্রতি ক্লাস ও বিষয়ে Easy, Medium, Hard লিখিত প্রশ্ন আলাদা করা হয়েছে।",
    "দেওয়া প্রশ্ন খাতায় সমাধান করে পরিষ্কার উত্তরসহ ছবি upload করলে reward verification হবে।",
    "Leaderboard profile-এ View Profile action যোগ হয়েছে; non-friend basic info, friend full info দেখতে পাবে।",
    "Settings page পরিষ্কার করা হয়েছে: student ID info edit button-এর ভিতরে থাকবে, update check নিচে compact থাকবে।",
    "Study-time, lesson, streak ও perfect-score related inactive mission task remove করা হয়েছে।",
    "Mission Daily Progress click করলে Subjects open হবে, আর General Knowledge quiz mission যোগ হয়েছে।"
  ]
};
