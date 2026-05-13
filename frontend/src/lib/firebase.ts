import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
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
} from "firebase/firestore";
import { calculateLevel, getRankFromXp, type User } from "@/types";

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

if (typeof window !== "undefined") {
  setPersistence(auth, browserLocalPersistence).catch(() => {});
}

export const isNativeApp = () =>
  typeof window !== "undefined" &&
  ((window as any).Capacitor?.isNativePlatform?.() === true ||
    window.navigator.userAgent.includes("wv"));

function withTimeout<T>(promise: Promise<T>, ms = 8000, message = "Request timed out") {
  return Promise.race<T>([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => reject(new Error(message)), ms);
    }),
  ]);
}

export function createLocalGuestProfile(extra?: { username?: string; examMode?: string; district?: string }): User {
  const now = new Date();
  const id = `guest_${Date.now()}_${Math.floor(Math.random() * 9999)}`;
  return {
    uid: id,
    email: "",
    username: extra?.username || `Guest_${Math.floor(Math.random() * 9999)}`,
    displayName: "Guest Student",
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
    district: extra?.district || "Dhaka",
    school: "",
    examMode: (extra?.examMode || "SSC") as User["examMode"],
    avatar: "default",
    frame: "default",
    isGuest: true,
    language: "bn",
    createdAt: now,
    lastLoginAt: now,
  };
}

export const signInWithGoogle = async () => {
  if (isNativeApp()) {
    throw new Error("Google login is not available inside this APK yet. Use email or guest login.");
  }
  return withTimeout(signInWithPopup(auth, googleProvider), 12000, "Google sign-in timeout");
};

export const signInEmail = (email: string, password: string) =>
  withTimeout(signInWithEmailAndPassword(auth, email, password), 12000, "Email login timeout");
export const signUpEmail = (email: string, password: string) =>
  withTimeout(createUserWithEmailAndPassword(auth, email, password), 12000, "Signup timeout");
export const signInGuest = () =>
  withTimeout(signInAnonymously(auth), 9000, "Guest login timeout");
export const logOut = () => signOut(auth);
export { onAuthStateChanged };

function stripUndefined<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as T;
}

export async function createUserProfile(
  firebaseUser: FirebaseUser,
  extra?: { username?: string; examMode?: string; district?: string }
) {
  const ref = doc(db, "users", firebaseUser.uid);

  const fallbackUser = stripUndefined({
    uid: firebaseUser.uid,
    email: firebaseUser.email || "",
    username: extra?.username || firebaseUser.displayName?.split(" ")[0] || `player_${Date.now()}`,
    displayName: firebaseUser.displayName || (firebaseUser.isAnonymous ? "Guest Student" : "Student"),
    photoURL: firebaseUser.photoURL || "",
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
    school: "",
    examMode: (extra?.examMode || "SSC") as User["examMode"],
    avatar: "default",
    frame: "default",
    isGuest: firebaseUser.isAnonymous,
    language: "bn",
    createdAt: new Date(),
    lastLoginAt: new Date(),
  }) as unknown as User;

  try {
    const snap = await withTimeout(getDoc(ref), 8000, "Profile read timeout");
    if (snap.exists()) {
      const data = snap.data();
      return {
        ...data,
        createdAt: (data.createdAt as Timestamp)?.toDate?.() || new Date(),
        lastLoginAt: (data.lastLoginAt as Timestamp)?.toDate?.() || new Date(),
      } as User;
    }
  } catch (err) {
    console.warn("Profile read failed, using local profile", err);
  }

  try {
    await withTimeout(setDoc(ref, {
      ...fallbackUser,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
    }), 8000, "Profile save timeout");
  } catch (err) {
    console.warn("Profile save failed, continuing with local profile", err);
  }

  return fallbackUser;
}

export async function getUserProfile(uid: string): Promise<User | null> {
  try {
    const snap = await withTimeout(getDoc(doc(db, "users", uid)), 8000, "Profile read timeout");
    if (!snap.exists()) return null;
    const data = snap.data();
    return {
      ...data,
      createdAt: (data.createdAt as Timestamp)?.toDate?.() || new Date(),
      lastLoginAt: (data.lastLoginAt as Timestamp)?.toDate?.() || new Date(),
    } as User;
  } catch (err) {
    console.warn("getUserProfile failed", err);
    return null;
  }
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
  const xpForNext = newLevel ** 2 * 100;

  await updateDoc(ref, { xp: increment(xpAmount), level: newLevel, rank: newRank, xpToNextLevel: xpForNext - newXp, lastLoginAt: serverTimestamp() });
  return { leveledUp: newLevel > oldLevel, newLevel };
}

export async function updateStreak(uid: string): Promise<number> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return 0;

  const user = snap.data() as User;
  const lastLogin = (user.lastLoginAt as unknown as Timestamp)?.toDate();
  const now = new Date();
  const diffDays = lastLogin ? Math.floor((now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24)) : 0;

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
