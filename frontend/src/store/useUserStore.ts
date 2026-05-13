import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, Mission, Achievement } from "@/types";

interface XpPopup {
  id: string;
  amount: number;
  x: number;
  y: number;
}

interface UserStore {
  user: User | null;
  isLoading: boolean;
  showLevelUpModal: boolean;
  newLevel: number;
  xpPopups: XpPopup[];
  language: "bn" | "en";
  missions: Mission[];
  achievements: Achievement[];

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setLanguage: (lang: "bn" | "en") => void;

  triggerLevelUp: (level: number) => void;
  dismissLevelUp: () => void;

  addXpPopup: (amount: number, x?: number, y?: number) => void;
  removeXpPopup: (id: string) => void;

  setMissions: (missions: Mission[]) => void;
  completeMission: (missionId: string) => void;

  setAchievements: (achievements: Achievement[]) => void;
  unlockAchievement: (achievementId: string) => void;

  updateUserStats: (xp: number, coins: number, level: number) => void;
  reset: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: true,
      showLevelUpModal: false,
      newLevel: 1,
      xpPopups: [],
      language: "bn",
      missions: [],
      achievements: [],

      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setLanguage: (language) => set({ language }),

      triggerLevelUp: (level) =>
        set({ showLevelUpModal: true, newLevel: level }),
      dismissLevelUp: () => set({ showLevelUpModal: false }),

      addXpPopup: (amount, x = 50, y = 50) => {
        const id = `xp-${Date.now()}-${Math.random()}`;
        set((s) => ({ xpPopups: [...s.xpPopups, { id, amount, x, y }] }));
        setTimeout(() => get().removeXpPopup(id), 2000);
      },

      removeXpPopup: (id) =>
        set((s) => ({ xpPopups: s.xpPopups.filter((p) => p.id !== id) })),

      setMissions: (missions) => set({ missions }),

      completeMission: (missionId) =>
        set((s) => ({
          missions: s.missions.map((m) =>
            m.id === missionId ? { ...m, isCompleted: true, progress: m.requirement } : m
          ),
        })),

      setAchievements: (achievements) => set({ achievements }),

      unlockAchievement: (achievementId) =>
        set((s) => ({
          achievements: s.achievements.map((a) =>
            a.id === achievementId ? { ...a, isUnlocked: true, unlockedAt: new Date() } : a
          ),
        })),

      updateUserStats: (xp, coins, level) =>
        set((s) => ({
          user: s.user
            ? { ...s.user, xp, coins, level }
            : null,
        })),

      reset: () =>
        set({
          user: null,
          showLevelUpModal: false,
          xpPopups: [],
          missions: [],
          achievements: [],
        }),
    }),
    {
      name: "study-rpg-user",
      partialize: (state) => ({ user: state.user, language: state.language }),
    }
  )
);
