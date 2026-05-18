export type UpdateInfo = {
  version: string;
  title: string;
  titleBn: string;
  notes: string[];
  notesBn: string[];
};

export const CURRENT_UPDATE_INFO: UpdateInfo = {
  version: "1.4.2",
  title: "Study RPG v1.4.2",
  titleBn: "Study RPG v1.4.2 আপডেট",
  notes: [
    "Cleaned MCQ and written dataset imported with duplicate removal.",
    "Easy, medium and hard difficulty filtering updated from the supplied dataset.",
    "MCQ wrong options are refreshed and verified with no repeated option inside a question.",
    "A seen message will not show the mini notification popup again after reopening the app.",
    "Unread chats now appear bold in the chat list and return to normal after seen."
  ],
  notesBn: [
    "Duplicate remove করা clean MCQ ও written dataset import করা হয়েছে।",
    "Supplied dataset অনুযায়ী Easy, Medium, Hard difficulty filtering update করা হয়েছে।",
    "প্রতিটা MCQ-এর wrong options refresh ও verify করা হয়েছে, একই question-এর option repeat নেই।",
    "Seen করা message app reopen করলে আবার mini popup দেখাবে না।",
    "Unseen chat list-এ bold থাকবে, seen হলে normal হয়ে যাবে।"
  ]
};
