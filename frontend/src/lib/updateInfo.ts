export type UpdateInfo = {
  version: string;
  title: string;
  titleBn: string;
  notes: string[];
  notesBn: string[];
};

export const CURRENT_UPDATE_INFO: UpdateInfo = {
  version: "1.3.5",
  title: "Study RPG v1.3.5",
  titleBn: "Study RPG v1.3.5 আপডেট",
  notes: [
    "Notification permission now prompts inside the APK after login.",
    "Notification bridge is mounted in the dashboard so friend request and message alerts can show.",
    "Friend chat opens as a full-screen Messenger-style screen.",
    "Typing box now stays fixed at the bottom; no page scroll is needed to write a message.",
    "Message list scrolls independently and auto-jumps to the newest message.",
    "Seen double tick is now high-contrast blue in a white pill so it is clearly visible on green bubbles.",
    "Update popup remains connected to the latest GitHub Release."
  ],
  notesBn: [
    "APK login করার পর notification permission prompt ঠিকভাবে দেখাবে।",
    "Dashboard-এর ভিতরে notification bridge mount করা হয়েছে, তাই friend request/message alert show করতে পারবে।",
    "Friend chat এখন full-screen Messenger-style screen হবে।",
    "Typing box নিচে fixed থাকবে; message লেখার জন্য page scroll করতে হবে না।",
    "Message list আলাদা scroll হবে এবং newest message-এ auto jump করবে।",
    "Seen double tick এখন white pill-এর ভিতরে high-contrast blue, তাই green bubble-এর উপর clear দেখা যাবে।",
    "New GitHub Release থাকলে update popup আগের মতোই দেখাবে।"
  ]
};
