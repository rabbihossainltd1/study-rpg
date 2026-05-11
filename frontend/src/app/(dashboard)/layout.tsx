"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getUserProfile, updateStreak, createUserProfile } from "@/lib/firebase";
import { useUserStore } from "@/store/useUserStore";
import { Sidebar } from "@/components/layout/Sidebar";
import { LevelUpModal } from "@/components/gamification/LevelUpModal";
import { XpFloatingPopups } from "@/components/gamification/XpFloating";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, setUser, setLoading, isLoading } = useUserStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/login");
        setLoading(false);
        return;
      }
      try {
        let profile = await getUserProfile(firebaseUser.uid);
        if (!profile) {
          profile = await createUserProfile(firebaseUser);
        }
        await updateStreak(firebaseUser.uid);
        setUser(profile);
      } catch (err) {
        console.error("Auth error:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, [router, setUser, setLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4 shadow-neon-primary">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          <p className="text-gray-500 text-sm animate-pulse">Loading your adventure...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      {/* Main content */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 min-h-screen overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {children}
        </div>
      </main>
      <LevelUpModal />
      <XpFloatingPopups />
    </div>
  );
}
