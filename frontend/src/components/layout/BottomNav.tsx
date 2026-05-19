"use client";

import { Home, MessageCircle, Trophy, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { navigate } from "@/lib/navigate";
import { useUserStore } from "@/store/useUserStore";

const ITEMS = [
  { href: "/dashboard", label: "Home", bn: "হোম", icon: Home },
  { href: "/friends", label: "Chat", bn: "চ্যাট", icon: MessageCircle },
  { href: "/leaderboard", label: "Leaderboard", bn: "র‍্যাঙ্ক", icon: Trophy },
  { href: "/profile", label: "Profile", bn: "প্রোফাইল", icon: UserRound },
];

export function BottomNav() {
  const { language } = useUserStore();
  const path = usePathname() || "/dashboard";
  return (
    <nav className="bottom-nav-shell fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t backdrop-blur-xl px-3 pt-2 pb-[max(10px,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-4 gap-2 mx-auto max-w-[420px]">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const active = path === item.href || path.startsWith(`${item.href}/`);
          return (
            <button key={item.href} onClick={() => navigate(item.href)} className="group flex flex-col items-center gap-1 rounded-2xl bg-transparent px-1 py-1.5 text-[10px] font-bold tap-bounce">
              <span className={`flex h-[42px] w-[42px] items-center justify-center rounded-[14px] border transition-all ${active ? "border-primary bg-primary text-black shadow-neon-primary" : "border-transparent bg-white/[0.03] text-gray-500 group-active:border-primary/20"}`}>
                <Icon className="h-5 w-5" strokeWidth={2.3} />
              </span>
              <span className={active ? "text-primary" : "text-gray-500"}>{language === "bn" ? item.bn : item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
