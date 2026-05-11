"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getUserProfile, updateStreak, createUserProfile } from "@/lib/firebase";
import { useUserStore } from "@/store/useUserStore";
import { Sidebar } from "@/components/layout/Sidebar";
import { LevelUpModal } from "@/components/gamification/LevelUpModal";
import { XpFloatingPopups } from "@/components/gamification/XpFloating";
import { navigate } from "@/lib/navigate";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, setUser, setLoading, isLoading } = useUserStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        navigate("/login");
        setLoading(false);
        return;
      }
      try {
        let profile = await getUserProfile(firebaseUser.uid);
        if (!profile) profile = await createUserProfile(firebaseUser);
        await updateStreak(firebaseUser.uid);
        setUser(profile);
      } catch {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, [setUser, setLoading]);

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#050505" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(57,255,20,0.1)", border: "1px solid rgba(57,255,20,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Loader2 size={32} color="#39FF14" style={{ animation: "spin 1s linear infinite" }} />
          </div>
          <p style={{ color: "#6B7280", fontSize: 14 }}>Loading your adventure...</p>
        </div>
        <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#050505" }}>
      <Sidebar />
      <main style={{ flex: 1, marginLeft: 0, paddingTop: 64, minHeight: "100vh", overflowX: "hidden" }} className="lg:ml-64 lg:pt-0">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 16px" }}>
          {children}
        </div>
      </main>
      <LevelUpModal />
      <XpFloatingPopups />
    </div>
  );
}
