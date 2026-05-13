"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";

export default function DashboardPage() {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (!user) {
      setUser({
        id: "guest-local",
        username: "Guest Student",
        email: "",
        avatar: "",
        level: 1,
        xp: 0,
        coins: 0,
        streak: 0,
        rank: "Bronze",
        examMode: "SSC",
        language: "bn",
        totalStudyTime: 0,
      } as any);
    }
  }, [user, setUser]);

  return (
    <div style={{ padding: 20, color: "white" }}>
      <h1>Dashboard Loaded</h1>
      <p>Guest/Login route working.</p>
    </div>
  );
}
