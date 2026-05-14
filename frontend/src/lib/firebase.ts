import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  EmailAuthProvider,
  linkWithCredential,
  signInWithPopup,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signInWithCredential,
  signOut,
  onAuthStateChanged,
  browserLocalPersistence,
  setPersistence,
  type User as FirebaseUser,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
  Timestamp,
  where,
  addDoc,
} from "firebase/firestore";
import { calculateLevel, calculateXpToNextLevel, getRankFromXp, type User } from "@/types";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAkmsjwK2FQQAcHSKxTFClkwSOi-XIKKTo",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "study-rpg-11352.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "study-rpg-11352",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "study-rpg-11352.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "494377620744",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:494377620744:web:d5bcf7b4a6813445f308bd",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

const AVATARS = ["zap", "fire", "book", "target", "trophy", "gem", "rocket", "brain", "notebook", "star", "bot", "graduation", "sparkles", "shield"];

export const randomAvatar = () => AVATARS[Math.floor(Math.random() * AVATARS.length)];

export function generateStudentId(seed = `${Date.now()}${Math.random()}`) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const numeric = String(hash).padStart(10, "0").slice(-10);
  return numeric.startsWith("0") ? `9${numeric.slice(1)}` : numeric;
}

let persistenceReady: Promise<void> | null = null;
export function ensureAuthPersistence() {
  if (typeof window === "undefined") return Promise.resolve();
  if (!persistenceReady) {
    persistenceReady = setPersistence(auth, browserLocalPersistence).catch(() => undefined) as Promise<void>;
  }
  return persistenceReady;
}

if (typeof window !== "undefined") {
  ensureAuthPersistence().catch(() => undefined);
}

export const isNativeApp = () =>
  typeof window !== "undefined" &&
  ((window as any).Capacitor?.isNativePlatform?.() === true ||
    window.navigator.userAgent.includes("wv"));

export const signInWithGoogle = async () => {
  await ensureAuthPersistence();
  if (isNativeApp()) {
    const { registerPlugin } = await import("@capacitor/core");
    const GoogleSignIn = registerPlugin<{ signIn: (opts: { webClientId: string }) => Promise<{ idToken: string }> }>("GoogleSignIn");
    const result = await GoogleSignIn.signIn({
      webClientId: "494377620744-f12bb0qqre8nhik1hfd7ufjjftnbm7qr.apps.googleusercontent.com"
    });
    const credential = GoogleAuthProvider.credential(result.idToken);
    return signInWithCredential(auth, credential);
  }
  return signInWithPopup(auth, googleProvider);
};

export const getGoogleRedirectResult = async () => {
  await ensureAuthPersistence();
  return getRedirectResult(auth);
};

export const signInEmail = async (email: string, password: string) => {
  await ensureAuthPersistence();
  return signInWithEmailAndPassword(auth, email, password);
};
export const signUpEmail = async (email: string, password: string) => {
  await ensureAuthPersistence();
  return createUserWithEmailAndPassword(auth, email, password);
};
export const signInGuest = async () => {
  await ensureAuthPersistence();
  return signInAnonymously(auth);
};
export const logOut = () => signOut(auth);
export { onAuthStateChanged };

function stripUndefined<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as T;
}

function normalizeUsername(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_.-]/g, "").slice(0, 24);
}

function isNumericStudentId(value: unknown): value is string {
  return typeof value === "string" && /^\d{6,12}$/.test(value);
}

function buildProfilePatch(uid: string, data: Partial<User>) {
  const xp = Math.max(0, Number(data.xp || 0));
  const normalizedLevel = calculateLevel(xp);
  const normalizedRank = getRankFromXp(xp);
  const patch: Partial<User> = {};

  if (!isNumericStudentId(data.studentId)) patch.studentId = generateStudentId(uid);
  if (!data.avatar) patch.avatar = randomAvatar();
  if (!data.username || ["username", "student", "user"].includes(String(data.username).toLowerCase())) {
    const fromName = normalizeUsername(data.displayName || "student");
    patch.username = fromName || `student_${generateStudentId(uid).slice(-5)}`;
  }
  if (!data.level || data.level !== normalizedLevel) patch.level = normalizedLevel;
  if (!data.rank || data.rank !== normalizedRank) patch.rank = normalizedRank;
  if (data.xpToNextLevel === undefined || data.xpToNextLevel < 0) patch.xpToNextLevel = calculateXpToNextLevel(xp);

  return patch;
}

export async function createUserProfile(
  firebaseUser: FirebaseUser,
  extra?: { username?: string; displayName?: string; examMode?: string; district?: string; school?: string; college?: string; className?: string; thana?: string; avatar?: string; photoURL?: string; studentId?: string }
) {
  const ref = doc(db, "users", firebaseUser.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const data = snap.data() as User;
    const patch = buildProfilePatch(firebaseUser.uid, data);
    if (Object.keys(patch).length) await updateDoc(ref, stripUndefined({ ...patch, updatedAt: serverTimestamp() })).catch(() => undefined);
    return { ...data, ...patch } as User;
  }

  const baseName = extra?.username || firebaseUser.displayName?.split(" ")[0] || `player_${Date.now()}`;
  const newUser = stripUndefined({
    uid: firebaseUser.uid,
    studentId: extra?.studentId || generateStudentId(firebaseUser.uid),
    email: firebaseUser.email || "",
    username: normalizeUsername(baseName) || `player_${Date.now()}`,
    displayName: extra?.displayName || firebaseUser.displayName || extra?.username || "Student",
    photoURL: extra?.photoURL || firebaseUser.photoURL || "",
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    coins: 50,
    gems: 5,
    rank: "Novice",
    streak: 0,
    maxStreak: 0,
    totalStudyTime: 0,
    achievements: [] as string[],
    badges: [] as string[],
    friends: [] as string[],
    district: extra?.district || "Dhaka",
    school: extra?.school || extra?.college || "",
    college: extra?.college || extra?.school || "",
    className: extra?.className || "",
    thana: extra?.thana || "",
    examMode: (extra?.examMode || "SSC") as User["examMode"],
    avatar: extra?.avatar || randomAvatar(),
    frame: "default",
    isGuest: firebaseUser.isAnonymous,
    language: "bn",
    createdAt: serverTimestamp(),
    lastLoginAt: serverTimestamp(),
  });

  await setDoc(ref, newUser);
  return newUser as unknown as User;
}

export async function getUserProfile(uid: string): Promise<User | null> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const data = snap.data();
  const patch = buildProfilePatch(uid, data as Partial<User>);
  if (Object.keys(patch).length) updateDoc(ref, stripUndefined({ ...patch, updatedAt: serverTimestamp() })).catch(() => undefined);
  return {
    ...data,
    ...patch,
    createdAt: (data.createdAt as Timestamp)?.toDate?.() || new Date(),
    lastLoginAt: (data.lastLoginAt as Timestamp)?.toDate?.() || new Date(),
  } as User;
}

export async function updateUserProfile(uid: string, updates: Partial<Pick<User, "username" | "displayName" | "photoURL" | "district" | "school" | "college" | "className" | "thana" | "examMode" | "avatar" | "language">>) {
  const clean = stripUndefined({ ...updates, username: updates.username ? normalizeUsername(updates.username) : undefined, updatedAt: serverTimestamp() });
  await updateDoc(doc(db, "users", uid), clean);
  return clean;
}


export type ProgressRecord = {
  id: string;
  userId: string;
  subjectId: string;
  itemId: string;
  kind: "lesson" | "quiz";
  rewardClaimed: boolean;
  proofStatus?: "approved" | "pending" | "rejected";
  score?: number;
  difficulty?: string;
};

function progressDocId(uid: string, subjectId: string, itemId: string, kind: "lesson" | "quiz") {
  return `${uid}_${subjectId}_${kind}_${itemId}`.replace(/[^A-Za-z0-9_-]/g, "_").slice(0, 240);
}

export async function getSubjectProgress(uid: string, subjectId: string): Promise<ProgressRecord[]> {
  if (!uid || uid.startsWith("guest_")) return [];
  const snap = await getDocs(query(collection(db, "userProgress"), where("userId", "==", uid), where("subjectId", "==", subjectId), limit(300)));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ProgressRecord, "id">) }));
}

export async function hasRewardBeenClaimed(uid: string, subjectId: string, itemId: string, kind: "lesson" | "quiz") {
  if (!uid || uid.startsWith("guest_")) return false;
  const ref = doc(db, "userProgress", progressDocId(uid, subjectId, itemId, kind));
  const snap = await getDoc(ref);
  return snap.exists() && (snap.data() as ProgressRecord).rewardClaimed === true;
}

export async function markLessonRewardClaimed(uid: string, subjectId: string, lessonId: string, proof?: { name: string; size: number; type: string }) {
  const ref = doc(db, "userProgress", progressDocId(uid, subjectId, lessonId, "lesson"));
  const snap = await getDoc(ref);
  if (snap.exists() && (snap.data() as ProgressRecord).rewardClaimed) return false;
  await setDoc(ref, stripUndefined({
    userId: uid,
    subjectId,
    itemId: lessonId,
    kind: "lesson",
    rewardClaimed: true,
    proofStatus: "approved",
    proofName: proof?.name,
    proofSize: proof?.size,
    proofType: proof?.type,
    updatedAt: serverTimestamp(),
    createdAt: snap.exists() ? undefined : serverTimestamp(),
  }), { merge: true });
  return true;
}

export async function markQuizRewardClaimed(uid: string, subjectId: string, difficulty: string, score: number) {
  const itemId = `quiz_${difficulty}`;
  const ref = doc(db, "userProgress", progressDocId(uid, subjectId, itemId, "quiz"));
  const snap = await getDoc(ref);
  if (snap.exists() && (snap.data() as ProgressRecord).rewardClaimed) return false;
  await setDoc(ref, stripUndefined({
    userId: uid,
    subjectId,
    itemId,
    kind: "quiz",
    difficulty,
    score,
    rewardClaimed: true,
    proofStatus: "approved",
    updatedAt: serverTimestamp(),
    createdAt: snap.exists() ? undefined : serverTimestamp(),
  }), { merge: true });
  return true;
}

export async function bindGuestAccountToEmail(email: string, password: string) {
  if (!auth.currentUser) throw new Error("No active user");
  const credential = EmailAuthProvider.credential(email, password);
  const result = await linkWithCredential(auth.currentUser, credential);
  await updateDoc(doc(db, "users", result.user.uid), { email, isGuest: false, updatedAt: serverTimestamp() }).catch(() => undefined);
  return result;
}

export async function addXp(uid: string, xpAmount: number): Promise<{ leveledUp: boolean; newLevel: number }> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return { leveledUp: false, newLevel: 1 };

  const user = snap.data() as User;
  const oldLevel = user.level;
  const newXp = (user.xp || 0) + xpAmount;
  const newLevel = calculateLevel(newXp);
  const newRank = getRankFromXp(newXp);
  const xpForNext = newLevel ** 2 * 100;

  await updateDoc(ref, { xp: increment(xpAmount), level: newLevel, rank: newRank, xpToNextLevel: xpForNext - newXp, lastLoginAt: serverTimestamp() });
  return { leveledUp: newLevel > oldLevel, newLevel };
}

export async function updateStreak(uid: string): Promise<number> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return 0;

  const user = snap.data() as User;
  const lastLogin = (user.lastLoginAt as unknown as Timestamp)?.toDate?.();
  const now = new Date();
  const diffDays = lastLogin ? Math.floor((now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24)) : 0;

  let newStreak = user.streak || 0;
  if (diffDays === 1) newStreak += 1;
  else if (diffDays > 1) newStreak = 1;

  const maxStreak = Math.max(newStreak, user.maxStreak || 0);
  await updateDoc(ref, { streak: newStreak, maxStreak, lastLoginAt: serverTimestamp() });
  return newStreak;
}

export async function getLeaderboard(_type: "global" | "weekly" = "global", count = 50) {
  const q = query(collection(db, "users"), orderBy("xp", "desc"), limit(count));
  const snap = await getDocs(q);
  return snap.docs.map((d, i) => {
    const data = d.data() as User;
    return {
      userId: d.id,
      studentId: isNumericStudentId(data.studentId) ? data.studentId : generateStudentId(d.id),
      leaderboardRank: i + 1,
      rank: i + 1,
      rank_title: data.rank,
      userRank: data.rank,
      username: data.username || data.displayName || "Student",
      displayName: data.displayName || data.username || "Student",
      photoURL: data.photoURL || "",
      avatar: data.avatar || "zap",
      level: data.level || 1,
      xp: data.xp || 0,
      streak: data.streak || 0,
      district: data.district || "Unknown",
      school: data.school || data.college || "",
      college: data.college || data.school || "",
      className: data.className || "",
      thana: data.thana || "",
    };
  });
}

export async function addCoins(uid: string, amount: number) {
  await updateDoc(doc(db, "users", uid), { coins: increment(amount) });
}

export type PublicUserResult = {
  uid: string;
  studentId: string;
  username: string;
  displayName: string;
  photoURL?: string;
  avatar?: string;
  district?: string;
  school?: string;
  college?: string;
  className?: string;
  level?: number;
  xp?: number;
  friendStatus?: "none" | "pending" | "incoming" | "accepted";
  requestId?: string;
};

async function getRelationsForUser(uid: string) {
  const snap = await getDocs(query(collection(db, "friendRequests"), where("participants", "array-contains", uid), limit(100)));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}

export async function searchUsers(term: string, currentUid: string): Promise<PublicUserResult[]> {
  const q = term.trim().toLowerCase();
  if (!q || q.length < 2) return [];
  const usersSnap = await getDocs(query(collection(db, "users"), limit(120)));
  const relations = await getRelationsForUser(currentUid).catch(() => []);

  return usersSnap.docs
    .filter((d) => d.id !== currentUid)
    .map((d) => ({ ...(d.data() as User), uid: d.id }))
    .filter((u) => {
      const hay = [u.studentId, u.username, u.displayName, u.district, u.school, u.college, u.className, u.uid]
        .filter(Boolean).join(" ").toLowerCase();
      return hay.includes(q);
    })
    .slice(0, 12)
    .map((u) => {
      const rel = relations.find((r: any) => r.participants?.includes(u.uid));
      let friendStatus: PublicUserResult["friendStatus"] = "none";
      if (rel?.status === "accepted") friendStatus = "accepted";
      else if (rel?.status === "pending" && rel.from === currentUid) friendStatus = "pending";
      else if (rel?.status === "pending" && rel.to === currentUid) friendStatus = "incoming";
      return {
        uid: u.uid,
        studentId: isNumericStudentId(u.studentId) ? u.studentId : generateStudentId(u.uid),
        username: u.username || "student",
        displayName: u.displayName || u.username || "Student",
        photoURL: u.photoURL || "",
        avatar: u.avatar || "zap",
        district: u.district || "",
        school: u.school || u.college || "",
        college: u.college || u.school || "",
        className: u.className || "",
        level: u.level || 1,
        xp: u.xp || 0,
        friendStatus,
        requestId: rel?.id,
      };
    });
}

export async function getIncomingFriendRequests(uid: string): Promise<PublicUserResult[]> {
  const snap = await getDocs(query(collection(db, "friendRequests"), where("participants", "array-contains", uid), limit(50)));
  const incoming = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })).filter((r: any) => r.to === uid && r.status === "pending");
  const results: PublicUserResult[] = [];
  for (const req of incoming.slice(0, 6)) {
    const userSnap = await getDoc(doc(db, "users", req.from));
    if (userSnap.exists()) {
      const u = { ...(userSnap.data() as User), uid: req.from };
      results.push({
        uid: u.uid,
        studentId: isNumericStudentId(u.studentId) ? u.studentId : generateStudentId(u.uid),
        username: u.username || "student",
        displayName: u.displayName || u.username || "Student",
        photoURL: u.photoURL || "",
        avatar: u.avatar || "zap",
        district: u.district || "",
        school: u.school || u.college || "",
        className: u.className || "",
        level: u.level || 1,
        xp: u.xp || 0,
        friendStatus: "incoming",
        requestId: req.id,
      });
    }
  }
  return results;
}

export async function sendFriendRequest(currentUid: string, targetUid: string) {
  if (!currentUid || !targetUid || currentUid === targetUid) throw new Error("Invalid student");
  const id = [currentUid, targetUid].sort().join("_");
  const payload = {
    from: currentUid,
    to: targetUid,
    participants: [currentUid, targetUid],
    status: "pending",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const ref = doc(db, "friendRequests", id);
  try {
    const snap = await getDoc(ref);
    if (snap.exists()) return { id, ...(snap.data() as any) };
  } catch {
    // Some older rules deny reads for missing request docs. Continue with create.
  }
  await setDoc(ref, payload);
  return { id, ...payload };
}

export async function acceptFriendRequest(requestId: string) {
  await updateDoc(doc(db, "friendRequests", requestId), { status: "accepted", updatedAt: serverTimestamp() });
}

export async function createChallenge(currentUid: string, targetUid: string) {
  return addDoc(collection(db, "challenges"), {
    from: currentUid,
    to: targetUid,
    participants: [currentUid, targetUid],
    status: "pending",
    createdAt: serverTimestamp(),
  });
}

export async function sendQuickMessage(currentUid: string, targetUid: string, content: string) {
  return addDoc(collection(db, "messages"), {
    from: currentUid,
    to: targetUid,
    participants: [currentUid, targetUid],
    content,
    createdAt: serverTimestamp(),
    read: false,
  });
}


export async function getFriendsForUser(uid: string): Promise<PublicUserResult[]> {
  const snap = await getDocs(query(collection(db, "friendRequests"), where("participants", "array-contains", uid), limit(100)));
  const accepted = snap.docs
    .map((d) => ({ id: d.id, ...(d.data() as any) }))
    .filter((r: any) => r.status === "accepted" && Array.isArray(r.participants));

  const friends: PublicUserResult[] = [];
  for (const rel of accepted) {
    const otherUid = rel.participants.find((id: string) => id !== uid);
    if (!otherUid) continue;
    const userSnap = await getDoc(doc(db, "users", otherUid));
    if (!userSnap.exists()) continue;
    const u = { ...(userSnap.data() as User), uid: otherUid };
    friends.push({
      uid: u.uid,
      studentId: isNumericStudentId(u.studentId) ? u.studentId : generateStudentId(u.uid),
      username: u.username || "student",
      displayName: u.displayName || u.username || "Student",
      photoURL: u.photoURL || "",
      avatar: u.avatar || "zap",
      district: u.district || "",
      school: u.school || u.college || "",
      college: u.college || u.school || "",
      className: u.className || "",
      level: u.level || 1,
      xp: u.xp || 0,
      friendStatus: "accepted",
      requestId: rel.id,
    });
  }
  return friends;
}

export type FriendMessage = {
  id: string;
  from: string;
  to: string;
  content: string;
  createdAt?: Timestamp;
};

export async function getMessagesWithFriend(currentUid: string, targetUid: string): Promise<FriendMessage[]> {
  const snap = await getDocs(query(collection(db, "messages"), where("participants", "array-contains", currentUid), limit(80)));
  return snap.docs
    .map((d) => ({ id: d.id, ...(d.data() as any) } as FriendMessage & { participants?: string[] }))
    .filter((m) => Array.isArray(m.participants) && m.participants.includes(targetUid))
    .sort((a, b) => {
      const ta = (a.createdAt as Timestamp | undefined)?.toMillis?.() || 0;
      const tb = (b.createdAt as Timestamp | undefined)?.toMillis?.() || 0;
      return ta - tb;
    });
}

export function createLocalGuestProfile(options?: { username?: string }): import("@/types").User {
  const username = options?.username || `Guest_${Math.floor(Math.random() * 9999)}`;
  return {
    uid: `guest_${Date.now()}`,
    studentId: generateStudentId(username),
    email: "",
    username,
    displayName: username,
    photoURL: "",
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    coins: 50,
    gems: 5,
    rank: "Novice",
    streak: 0,
    maxStreak: 0,
    totalStudyTime: 0,
    achievements: [],
    badges: [],
    friends: [],
    district: "Dhaka",
    school: "",
    college: "",
    className: "",
    thana: "",
    examMode: "SSC",
    avatar: randomAvatar(),
    frame: "default",
    isGuest: true,
    language: "bn",
    createdAt: new Date(),
    lastLoginAt: new Date(),
  };
}
