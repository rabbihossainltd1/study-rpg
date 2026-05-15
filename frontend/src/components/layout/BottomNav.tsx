"use client";

import { Home, ListChecks, Trophy, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { navigate } from "@/lib/navigate";
import { useUserStore } from "@/store/useUserStore";

const ITEMS = [
  { href: "/dashboard", label: "Home", bn: "হোম", icon: Home },
  { href: "/subjects", label: "Questions", bn: "প্রশ্ন", icon: ListChecks },
  { href: "/leaderboard", label: "Leaderboard", bn: "র‍্যাঙ্ক", icon: Trophy },
  { href: "/profile", label: "Profile", bn: "প্রোফাইল", icon: UserRound },
];

export function BottomNav() {
  const { language } = useUserStore();
  const path = usePathname() || "/dashboard";
  return (
    <nav className="bottom-nav-shell fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t backdrop-blur-xl px-3 pt-2 pb-[max(10px,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-4 gap-2">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const active = path === item.href || path.startsWith(`${item.href}/`);
          return (
            <button key={item.href} onClick={() => navigate(item.href)} className={`rounded-2xl py-2 flex flex-col items-center gap-1 text-[11px] font-bold tap-bounce ${active ? "bg-primary text-black shadow-neon-primary" : "text-gray-500 bg-white/[0.03]"}`}>
              <Icon className="w-5 h-5" />
              <span>{language === "bn" ? item.bn : item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
