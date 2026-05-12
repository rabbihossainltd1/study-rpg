"use client";
import { useUserStore } from "@/store/useUserStore";
import { Zap } from "lucide-react";
import { useEffect } from "react";

export function LevelUpModal() {
  const { levelUpData, clearLevelUp } = useUserStore();

  useEffect(() => {
    if (levelUpData) {
      const t = setTimeout(() => clearLevelUp(), 3000);
      return () => clearTimeout(t);
    }
  }, [levelUpData, clearLevelUp]);

  if (!levelUpData) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0,0,0,0.8)",
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none"
      }}
    >
      <div style={{
        background: "rgba(18,18,18,0.98)",
        border: "2px solid #39FF14",
        borderRadius: 24, padding: "40px 32px",
        textAlign: "center",
        boxShadow: "0 0 60px rgba(57,255,20,0.4)"
      }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>⚡</div>
        <p style={{ fontSize: 14, color: "#39FF14", fontWeight: 700, letterSpacing: 3, marginBottom: 8 }}>LEVEL UP!</p>
        <p style={{ fontSize: 48, fontWeight: 900, color: "#fff", marginBottom: 8 }}>
          Level {levelUpData.newLevel}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <Zap size={16} color="#39FF14" />
          <span style={{ color: "#39FF14", fontWeight: 700 }}>Keep it up!</span>
        </div>
      </div>
    </div>
  );
}
