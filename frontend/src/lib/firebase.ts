import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
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
} from "firebase/firestore";
import { calculateLevel, getRankFromXp, type User } from "@/types";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

const isNativeApp = () =>
  typeof window !== "undefined" &&
  (window.navigator.userAgent.includes("wv") ||
    (window as any).Capacitor?.isNativePlatform?.() === true);

export const signInWithGoogle = () => {
  if (isNativeApp()) {
    return signInWithRedirect(auth, googleProvider);
  }
  return signInWithPopup(auth, googleProvider);
};

export { getRedirectResult };
export const signInEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);
export const signUpEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);
export const signInGuest = () => signInAnonymously(auth);
export const logOut = () => signOut(auth);
export { onAuthStateChanged };

export async function createUserProfile(
  firebaseUser: FirebaseUser,
  extra?: { username?: string; examMode?: string; district?: string }
) {
  const ref = doc(db, "users", firebaseUser.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data() as User;

  const newUser: Partial<User> = {
    uid: firebaseUser.uid,
    email: firebaseUser.email || "",
    username: extra?.username || firebaseUser.displayName?.split(" ")[0] || `player_${Date.now()}`,
    displayName: firebaseUser.displayName || "Student",
    photoURL: firebaseUser.photoURL || undefined,
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
    district: extra?.district || "Dhaka",
    school: "",
    examMode: (extra?.examMode as User["examMode"]) || "SSC",
    avatar: "default",
    frame: "default",
    isGuest: firebaseUser.isAnonymous,
    language: "bn",
  };

  await setDoc(ref, { ...newUser, createdAt: serverTimestamp(), lastLoginAt: serverTimestamp() });
  return newUser as User;
}

export async function getUserProfile(uid: string): Promise<User | null> {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    ...data,
    createdAt: (data.createdAt as Timestamp)?.toDate() || new Date(),
    lastLoginAt: (data.lastLoginAt as Timestamp)?.toDate() || new Date(),
  } as User;
}

export async function addXp(uid: string, xpAmount: number): Promise<{ leveledUp: boolean; newLevel: number }> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return { leveledUp: false, newLevel: 1 };

  const user = snap.data() as User;
  const oldLevel = user.level;
  const newXp = user.xp + xpAmount;
  const newLevel = calculateLevel(newXp);
  const newRank = getRankFromXp(newXp);
  const xpForNext = (newLevel ** 2) * 100;

  await updateDoc(ref, {
    xp: increment(xpAmount),
    level: newLevel,
    rank: newRank,
    xpToNextLevel: xpForNext - newXp,
    lastLoginAt: serverTimestamp(),
  });

  return { leveledUp: newLevel > oldLevel, newLevel };
}

export async function updateStreak(uid: string): Promise<number> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return 0;

  const user = snap.data() as User;
  const lastLogin = (user.lastLoginAt as unknown as Timestamp)?.toDate();
  const now = new Date();
  const diffDays = lastLogin
    ? Math.floor((now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  let newStreak = user.streak;
  if (diffDays === 1) newStreak += 1;
  else if (diffDays > 1) newStreak = 1;

  const maxStreak = Math.max(newStreak, user.maxStreak || 0);
  await updateDoc(ref, { streak: newStreak, maxStreak, lastLoginAt: serverTimestamp() });
  return newStreak;
}

export async function getLeaderboard(_type: "global" | "weekly" = "global", count = 50) {
  const q = query(collection(db, "users"), orderBy("xp", "desc"), limit(count));
  const snap = await getDocs(q);
  return snap.docs.map((d, i) => ({ ...d.data(), rank: i + 1, userId: d.id }));
}

export async function addCoins(uid: string, amount: number) {
  await updateDoc(doc(db, "users", uid), { coins: increment(amount) });
}
