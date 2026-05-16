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
  deleteUser,
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
  deleteDoc,
  runTransaction,
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

export async function deleteCurrentAccount(uid: string) {
  await deleteDoc(doc(db, "users", uid)).catch(() => undefined);
  if (auth.currentUser) await deleteUser(auth.currentUser);
}

export { onAuthStateChanged };

function stripUndefined<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as T;
}

function normalizeUsername(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_.-]/g, "").slice(0, 24);
}


export function normalizePublicUsername(value: string) {
  return normalizeUsername(value);
}

export async function isUsernameAvailable(username: string, currentUid?: string) {
  const clean = normalizeUsername(username);
  if (!/^[a-z0-9_.-]{3,24}$/.test(clean)) return false;
  const indexSnap = await getDoc(doc(db, "usernameIndex", clean));
  if (indexSnap.exists()) return Boolean(currentUid && (indexSnap.data() as any).uid === currentUid);
  const existingUsers = await getDocs(query(collection(db, "users"), where("username", "==", clean), limit(1))).catch(() => null);
  if (!existingUsers || existingUsers.empty) return true;
  return Boolean(currentUid && existingUsers.docs[0].id === currentUid);
}

async function reserveUsernameTx(uid: string, username: string) {
  const clean = normalizeUsername(username);
  const indexRef = doc(db, "usernameIndex", clean);
  await runTransaction(db, async (tx) => {
    const existing = await tx.get(indexRef);
    if (existing.exists() && (existing.data() as any).uid !== uid) {
      throw new Error("username-already-used");
    }
    tx.set(indexRef, { uid, username: clean, updatedAt: serverTimestamp() }, { merge: true });
  });
  return clean;
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
  extra?: { username?: string; displayName?: string; examMode?: string; division?: string; zila?: string; district?: string; school?: string; college?: string; className?: string; groupName?: string; thana?: string; avatar?: string; photoURL?: string; studentId?: string; language?: "bn" | "en" }
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
  const reservedUsername = await reserveUsernameTx(firebaseUser.uid, baseName);
  const newUser = stripUndefined({
    uid: firebaseUser.uid,
    studentId: extra?.studentId || generateStudentId(firebaseUser.uid),
    email: firebaseUser.email || "",
    username: reservedUsername || `player_${Date.now()}`,
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
    division: extra?.division || "Dhaka",
    zila: extra?.zila || extra?.district || "Dhaka",
    district: extra?.zila || extra?.district || "Dhaka",
    school: extra?.school || extra?.college || "",
    college: extra?.college || extra?.school || "",
    className: extra?.className || "",
    groupName: extra?.groupName || "General",
    thana: extra?.thana || "",
    examMode: (extra?.examMode || "SSC") as User["examMode"],
    avatar: extra?.avatar || randomAvatar(),
    frame: "default",
    isGuest: firebaseUser.isAnonymous,
    language: extra?.language || "bn",
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

export async function updateUserProfile(uid: string, updates: Partial<Pick<User, "username" | "displayName" | "photoURL" | "division" | "zila" | "district" | "school" | "college" | "className" | "groupName" | "thana" | "examMode" | "avatar" | "language">>) {
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

export type LessonProofMeta = {
  name: string;
  size: number;
  type: string;
  questionId?: string;
  difficulty?: string;
  topic?: string;
  score?: number;
};

export async function markLessonRewardClaimed(uid: string, subjectId: string, lessonId: string, proof?: LessonProofMeta) {
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
    questionId: proof?.questionId,
    proofDifficulty: proof?.difficulty,
    proofTopic: proof?.topic,
    proofScore: proof?.score,
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
      district: data.district || data.zila || "Unknown",
      zila: data.zila || data.district || "Unknown",
      division: data.division || "",
      school: data.school || data.college || "",
      college: data.college || data.school || "",
      className: data.className || "",
      groupName: data.groupName || "General",
      thana: data.thana || "",
    };
  });
}

export async function addCoins(uid: string, amount: number) {
  await updateDoc(doc(db, "users", uid), { coins: increment(amount) });
}


export function missionClaimDayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function missionClaimId(uid: string, missionId: string, dayKey: string) {
  return `${uid}_${dayKey}_${missionId}`.replace(/[^A-Za-z0-9_-]/g, "_").slice(0, 240);
}

export type MissionClaimRecord = {
  id: string;
  userId: string;
  missionId: string;
  dayKey: string;
  xpReward: number;
  coinReward: number;
  score?: number;
};

export async function getMissionClaimsForDay(uid: string, dayKey = missionClaimDayKey()): Promise<MissionClaimRecord[]> {
  if (!uid || uid.startsWith("guest_")) return [];
  const snap = await getDocs(query(collection(db, "missionClaims"), where("userId", "==", uid), where("dayKey", "==", dayKey), limit(30)));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<MissionClaimRecord, "id">) }));
}

export async function claimDailyMissionReward(uid: string, missionId: string, xpAmount: number, coinAmount: number, score = 0, dayKey = missionClaimDayKey()) {
  if (!uid || uid.startsWith("guest_")) return { claimed: true, leveledUp: false, newLevel: 1 };
  const claimRef = doc(db, "missionClaims", missionClaimId(uid, missionId, dayKey));
  const userRef = doc(db, "users", uid);

  return runTransaction(db, async (tx) => {
    const [claimSnap, userSnap] = await Promise.all([tx.get(claimRef), tx.get(userRef)]);
    if (claimSnap.exists()) {
      const userData = userSnap.exists() ? (userSnap.data() as User) : null;
      return { claimed: false, leveledUp: false, newLevel: userData?.level || 1 };
    }
    if (!userSnap.exists()) throw new Error("User profile not found");
    const userData = userSnap.data() as User;
    const oldLevel = userData.level || 1;
    const nextXp = (userData.xp || 0) + xpAmount;
    const nextLevel = calculateLevel(nextXp);
    const nextRank = getRankFromXp(nextXp);
    const xpForNext = nextLevel ** 2 * 100;

    tx.set(claimRef, stripUndefined({
      userId: uid,
      missionId,
      dayKey,
      xpReward: xpAmount,
      coinReward: coinAmount,
      score,
      createdAt: serverTimestamp(),
    }));
    tx.update(userRef, {
      xp: increment(xpAmount),
      coins: increment(coinAmount),
      level: nextLevel,
      rank: nextRank,
      xpToNextLevel: Math.max(0, xpForNext - nextXp),
      lastLoginAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { claimed: true, leveledUp: nextLevel > oldLevel, newLevel: nextLevel };
  });
}

export type FriendStatus = "none" | "pending" | "incoming" | "accepted" | "blocked_by_me" | "blocked_me";

export type PublicUserResult = {
  uid: string;
  studentId: string;
  username: string;
  displayName: string;
  photoURL?: string;
  avatar?: string;
  division?: string;
  zila?: string;
  district?: string;
  school?: string;
  college?: string;
  className?: string;
  groupName?: string;
  thana?: string;
  level?: number;
  xp?: number;
  friendStatus?: FriendStatus;
  requestId?: string;
  lastActiveAt?: Date | Timestamp | null;
  blockedBy?: string;
};

export type FriendRelationState = {
  id: string;
  status: FriendStatus;
  rawStatus?: string;
  from?: string;
  to?: string;
  blockedBy?: string;
};

function relationId(a: string, b: string) {
  return [a, b].sort().join("_");
}

function timestampToDate(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  const maybe = value as { toDate?: () => Date; seconds?: number };
  if (typeof maybe.toDate === "function") return maybe.toDate();
  if (typeof maybe.seconds === "number") return new Date(maybe.seconds * 1000);
  return null;
}

function mapRelationStatus(rel: any, currentUid: string): FriendStatus {
  if (!rel) return "none";
  if (rel.status === "accepted") return "accepted";
  if (rel.status === "pending" && rel.from === currentUid) return "pending";
  if (rel.status === "pending" && rel.to === currentUid) return "incoming";
  if (rel.status === "blocked") return rel.blockedBy === currentUid ? "blocked_by_me" : "blocked_me";
  return "none";
}

async function getRelationsForUser(uid: string) {
  const relationMap = new Map<string, any>();
  const queries = [
    query(collection(db, "friendRequests"), where("participants", "array-contains", uid), limit(150)),
    query(collection(db, "friendRequests"), where("from", "==", uid), limit(150)),
    query(collection(db, "friendRequests"), where("to", "==", uid), limit(150)),
  ];

  const snaps = await Promise.allSettled(queries.map((q) => getDocs(q)));
  snaps.forEach((result) => {
    if (result.status !== "fulfilled") return;
    result.value.docs.forEach((d) => {
      const data = { id: d.id, ...(d.data() as any) };
      const hasUidInParticipants = Array.isArray(data.participants) && data.participants.includes(uid);
      if (data.from === uid || data.to === uid || hasUidInParticipants) relationMap.set(d.id, data);
    });
  });

  return Array.from(relationMap.values());
}

async function getRelation(currentUid: string, targetUid: string) {
  const ref = doc(db, "friendRequests", relationId(currentUid, targetUid));
  const snap = await getDoc(ref).catch(() => null);
  if (!snap || !snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as any) };
}

function toPublicUser(u: User & { uid: string }, relation?: any, currentUid?: string): PublicUserResult {
  return {
    uid: u.uid,
    studentId: isNumericStudentId(u.studentId) ? u.studentId : generateStudentId(u.uid),
    username: u.username || "student",
    displayName: u.displayName || u.username || "Student",
    photoURL: u.photoURL || "",
    avatar: u.avatar || "zap",
    division: u.division || "",
    zila: u.zila || u.district || "",
    district: u.district || u.zila || "",
    school: u.school || u.college || "",
    college: u.college || u.school || "",
    className: u.className || "",
    groupName: u.groupName || "General",
    thana: u.thana || "",
    level: u.level || 1,
    xp: u.xp || 0,
    friendStatus: currentUid ? mapRelationStatus(relation, currentUid) : "none",
    requestId: relation?.id,
    blockedBy: relation?.blockedBy,
    lastActiveAt: timestampToDate((u as any).lastActiveAt || (u as any).lastLoginAt),
  };
}

export async function touchUserPresence(uid: string) {
  if (!uid || uid.startsWith("guest_")) return;
  await updateDoc(doc(db, "users", uid), { lastActiveAt: serverTimestamp(), updatedAt: serverTimestamp() }).catch(() => undefined);
}

export async function searchUsers(term: string, currentUid: string): Promise<PublicUserResult[]> {
  const q = term.trim().toLowerCase();
  if (!q || q.length < 2) return [];
  const usersSnap = await getDocs(query(collection(db, "users"), limit(160)));
  const relations = await getRelationsForUser(currentUid).catch(() => []);

  return usersSnap.docs
    .filter((d) => d.id !== currentUid)
    .map((d) => ({ ...(d.data() as User), uid: d.id }))
    .filter((u) => {
      const hay = [u.studentId, u.username, u.displayName, u.division, u.zila, u.district, u.school, u.college, u.className, u.groupName, u.thana, u.uid]
        .filter(Boolean).join(" ").toLowerCase();
      return hay.includes(q);
    })
    .slice(0, 14)
    .map((u) => {
      const rel = relations.find((r: any) => Array.isArray(r.participants) && r.participants.includes(u.uid));
      return toPublicUser(u, rel, currentUid);
    });
}

export async function getFriendRelationState(currentUid: string, targetUid: string): Promise<FriendRelationState> {
  const rel = await getRelation(currentUid, targetUid);
  return {
    id: relationId(currentUid, targetUid),
    status: mapRelationStatus(rel, currentUid),
    rawStatus: rel?.status,
    from: rel?.from,
    to: rel?.to,
    blockedBy: rel?.blockedBy,
  };
}

export async function getIncomingFriendRequests(uid: string): Promise<PublicUserResult[]> {
  const incoming = (await getRelationsForUser(uid))
    .filter((r: any) => r.to === uid && r.status === "pending");
  const results: PublicUserResult[] = [];
  for (const req of incoming.slice(0, 12)) {
    const userSnap = await getDoc(doc(db, "users", req.from));
    if (userSnap.exists()) results.push(toPublicUser({ ...(userSnap.data() as User), uid: req.from }, req, uid));
  }
  return results;
}

export async function sendFriendRequest(currentUid: string, targetUid: string) {
  if (!currentUid || !targetUid || currentUid === targetUid) throw new Error("Invalid student");
  const id = relationId(currentUid, targetUid);
  const ref = doc(db, "friendRequests", id);
  const existing = await getDoc(ref).catch(() => null);

  if (existing?.exists()) {
    const data = existing.data() as any;
    if (data.status === "blocked") throw new Error(data.blockedBy === currentUid ? "You blocked this student" : "This student is unavailable");
    if (data.status === "accepted" || data.status === "pending") return { id, ...data };
  }

  const existingData = existing?.exists() ? (existing.data() as any) : null;
  const payload = {
    from: currentUid,
    to: targetUid,
    participants: Array.isArray(existingData?.participants) ? existingData.participants : [currentUid, targetUid],
    status: "pending",
    blockedBy: null,
    createdAt: existingData?.createdAt || serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  await setDoc(ref, payload, { merge: true });
  return { id, ...payload };
}

export async function cancelFriendRequest(currentUid: string, targetUid: string) {
  const id = relationId(currentUid, targetUid);
  const rel = await getRelation(currentUid, targetUid);
  if (!rel || rel.status !== "pending" || rel.from !== currentUid) throw new Error("No outgoing request");
  await updateDoc(doc(db, "friendRequests", id), { status: "cancelled", cancelledBy: currentUid, updatedAt: serverTimestamp() });
}

export async function acceptFriendRequest(requestId: string) {
  await updateDoc(doc(db, "friendRequests", requestId), { status: "accepted", updatedAt: serverTimestamp() });
}

export async function unfriendUser(currentUid: string, targetUid: string) {
  const id = relationId(currentUid, targetUid);
  await updateDoc(doc(db, "friendRequests", id), { status: "unfriended", actionBy: currentUid, updatedAt: serverTimestamp() });
}

export async function blockUser(currentUid: string, targetUid: string) {
  const id = relationId(currentUid, targetUid);
  const rel = await getRelation(currentUid, targetUid);
  const payload = rel
    ? { status: "blocked", blockedBy: currentUid, updatedAt: serverTimestamp() }
    : { from: currentUid, to: targetUid, participants: [currentUid, targetUid], status: "blocked", blockedBy: currentUid, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
  await setDoc(doc(db, "friendRequests", id), payload, { merge: true });
}

export async function unblockUser(currentUid: string, targetUid: string) {
  const id = relationId(currentUid, targetUid);
  const rel = await getRelation(currentUid, targetUid);
  if (!rel || rel.status !== "blocked" || rel.blockedBy !== currentUid) throw new Error("No block found");
  await updateDoc(doc(db, "friendRequests", id), { status: "unfriended", blockedBy: null, actionBy: currentUid, updatedAt: serverTimestamp() });
}

export async function createChallenge(currentUid: string, targetUid: string) {
  const rel = await getRelation(currentUid, targetUid);
  if (mapRelationStatus(rel, currentUid) !== "accepted") throw new Error("Only friends can be challenged");
  return addDoc(collection(db, "challenges"), {
    from: currentUid,
    to: targetUid,
    participants: [currentUid, targetUid],
    status: "pending",
    createdAt: serverTimestamp(),
  });
}

export async function sendQuickMessage(currentUid: string, targetUid: string, content: string) {
  const rel = await getRelation(currentUid, targetUid);
  if (mapRelationStatus(rel, currentUid) !== "accepted") throw new Error("Only friends can message");
  return addDoc(collection(db, "messages"), {
    from: currentUid,
    to: targetUid,
    participants: [currentUid, targetUid],
    content,
    createdAt: serverTimestamp(),
    read: false,
    readAt: null,
  });
}

export async function getFriendsForUser(uid: string): Promise<PublicUserResult[]> {
  const accepted = (await getRelationsForUser(uid))
    .filter((r: any) => r.status === "accepted" && (r.from === uid || r.to === uid || (Array.isArray(r.participants) && r.participants.includes(uid))));

  const seen = new Set<string>();
  const friends: PublicUserResult[] = [];
  for (const rel of accepted) {
    const otherUid = rel.from === uid
      ? rel.to
      : rel.to === uid
        ? rel.from
        : Array.isArray(rel.participants)
          ? rel.participants.find((id: string) => id !== uid)
          : "";
    if (!otherUid || seen.has(otherUid)) continue;
    seen.add(otherUid);
    const userSnap = await getDoc(doc(db, "users", otherUid));
    if (!userSnap.exists()) continue;
    friends.push(toPublicUser({ ...(userSnap.data() as User), uid: otherUid }, rel, uid));
  }
  return friends;
}

export type FriendMessage = {
  id: string;
  from: string;
  to: string;
  content: string;
  createdAt?: Timestamp;
  read?: boolean;
  readAt?: Timestamp | null;
  participants?: string[];
};

export async function getMessagesWithFriend(currentUid: string, targetUid: string): Promise<FriendMessage[]> {
  const snap = await getDocs(query(collection(db, "messages"), where("participants", "array-contains", currentUid), limit(120)));
  return snap.docs
    .map((d) => ({ id: d.id, ...(d.data() as any) } as FriendMessage))
    .filter((m) => Array.isArray(m.participants) && m.participants.includes(targetUid))
    .sort((a, b) => {
      const ta = (a.createdAt as Timestamp | undefined)?.toMillis?.() || 0;
      const tb = (b.createdAt as Timestamp | undefined)?.toMillis?.() || 0;
      return ta - tb;
    });
}

export async function markMessagesRead(currentUid: string, targetUid: string) {
  const messages = await getMessagesWithFriend(currentUid, targetUid);
  const unread = messages.filter((m) => m.to === currentUid && m.from === targetUid && !m.read);
  await Promise.all(unread.slice(0, 50).map((m) => updateDoc(doc(db, "messages", m.id), { read: true, readAt: serverTimestamp() }).catch(() => undefined)));
}

export function createLocalGuestProfile(options?: { username?: string; language?: "bn" | "en" }): import("@/types").User {
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
    division: "Dhaka",
    zila: "Dhaka",
    district: "Dhaka",
    school: "",
    college: "",
    className: "SSC",
    groupName: "General",
    thana: "Dhaka Sadar",
    examMode: "SSC",
    avatar: randomAvatar(),
    frame: "default",
    isGuest: true,
    language: options?.language || "bn",
    createdAt: new Date(),
    lastLoginAt: new Date(),
  };
}
