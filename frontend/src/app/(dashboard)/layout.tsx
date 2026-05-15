"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getUserProfile, updateStreak, createUserProfile, touchUserPresence } from "@/lib/firebase";
import { useUserStore } from "@/store/useUserStore";
import { Sidebar } from "@/components/layout/Sidebar";
import { LevelUpModal } from "@/components/gamification/LevelUpModal";
import { XpFloatingPopups } from "@/components/gamification/XpFloating";
import { navigate } from "@/lib/navigate";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, setUser, setLoading, isLoading } = useUserStore();
  const authChecked = useRef(false);

  useEffect(() => {
    // If we already have a user from Zustand persist, show content immediately
    // and still re-verify in background
    if (user) {
      setLoading(false);
    }

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      authChecked.current = true;

      if (!firebaseUser) {
        // Only redirect if we don't have a cached user already
        // Give a brief grace period for persistence to kick in
        setTimeout(() => {
          if (!useUserStore.getState().user) {
            navigate("/login");
          }
          setLoading(false);
        }, 500);
        return;
      }

      try {
        let profile = await getUserProfile(firebaseUser.uid);
        if (!profile) profile = await createUserProfile(firebaseUser);
        // Fire-and-forget streak update — don't block rendering
        updateStreak(firebaseUser.uid).catch(() => {});
        setUser(profile);
      } catch (err) {
        console.warn("Dashboard auth/profile check failed", err);
        if (!useUserStore.getState().user) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    });

    // Failsafe: if onAuthStateChanged never fires (e.g. network issue in WebView),
    // fall back to cached user or redirect after 5s
    const failsafe = setTimeout(() => {
      if (!authChecked.current) {
        if (!useUserStore.getState().user) {
          navigate("/login");
        }
        setLoading(false);
      }
    }, 5000);

    return () => {
      unsub();
      clearTimeout(failsafe);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps



  useEffect(() => {
    if (!user || user.uid.startsWith("guest_")) return;
    touchUserPresence(user.uid).catch(() => undefined);
    const interval = window.setInterval(() => touchUserPresence(user.uid).catch(() => undefined), 45000);
    const onVisibility = () => {
      if (document.visibilityState === "visible") touchUserPresence(user.uid).catch(() => undefined);
    };
    window.addEventListener("focus", onVisibility);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", onVisibility);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [user?.uid]);

  if (isLoading && !user) {
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
