"use client";

import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { logOut, searchUsers, sendFriendRequest, cancelFriendRequest, acceptFriendRequest, createChallenge, sendQuickMessage, type PublicUserResult } from "@/lib/firebase";
import { navigate } from "@/lib/navigate";
import { XpBar } from "@/components/ui/XpBar";
import { AppIcon, UserAvatar } from "@/components/ui/AppIcon";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";
import toast from "react-hot-toast";
import { RANK_COLORS } from "@/types";
import {
  LayoutDashboard, BookOpen, Trophy, Bot,
  Target, User, LogOut, Zap, Menu, X, ChevronRight, Users, Search, UserPlus, Coins, Gem, Flame, XCircle, CheckCircle2, Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", labelBn: "ড্যাশবোর্ড", icon: LayoutDashboard },
  { href: "/subjects", label: "Subjects", labelBn: "বিষয়সমূহ", icon: BookOpen },
  { href: "/missions", label: "Missions", labelBn: "মিশন", icon: Target },
  { href: "/leaderboard", label: "Leaderboard", labelBn: "লিডারবোর্ড", icon: Trophy },
  { href: "/ai-assistant", label: "AI Tutor", labelBn: "এআই টিউটর", icon: Bot },
  { href: "/friends", label: "Friends", labelBn: "ফ্রেন্ডস", icon: Users },
  { href: "/profile", label: "Profile", labelBn: "প্রোফাইল", icon: User },
  { href: "/settings", label: "Settings", labelBn: "সেটিংস", icon: Settings },
];


function HeaderSearch() {
  const { user } = useUserStore();
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<PublicUserResult[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [selected, setSelected] = useState<PublicUserResult | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  useBodyScrollLock(Boolean(selected));

  useEffect(() => {
    if (!user || user.uid.startsWith("guest_")) return;
    const timer = setTimeout(async () => {
      const q = term.trim();
      if (q.length < 2) {
        setResults([]);
        return;
      }
      try {
        setResults(await searchUsers(q, user.uid));
      } catch {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [term, user]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const updateStatus = (uid: string, friendStatus: PublicUserResult["friendStatus"]) => {
    setResults((items) => items.map((i) => i.uid === uid ? { ...i, friendStatus } : i));
  };

  const add = async (target: PublicUserResult) => {
    if (!user || user.uid.startsWith("guest_")) return toast.error("Login required");
    setBusy(target.uid);
    try {
      await sendFriendRequest(user.uid, target.uid);
      updateStatus(target.uid, "pending");
      toast.success("Friend request sent");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Request failed");
    } finally {
      setBusy(null);
    }
  };

  const cancel = async (target: PublicUserResult) => {
    if (!user) return;
    setBusy(target.uid);
    try {
      await cancelFriendRequest(user.uid, target.uid);
      updateStatus(target.uid, "none");
      toast.success("Request cancelled");
    } catch {
      toast.error("Cancel failed");
    } finally {
      setBusy(null);
    }
  };

  const accept = async (target: PublicUserResult) => {
    if (!target.requestId) return;
    setBusy(target.uid);
    try {
      await acceptFriendRequest(target.requestId);
      updateStatus(target.uid, "accepted");
      toast.success("Friend added");
    } catch {
      toast.error("Accept failed");
    } finally {
      setBusy(null);
    }
  };

  const ActionButton = ({ person }: { person: PublicUserResult }) => {
    if (person.friendStatus === "accepted") return <div style={{ display: "flex", gap: 5 }}><button onClick={() => { navigate(`/friends?chat=${person.uid}`); setResults([]); }} style={{ border: "1px solid rgba(0,240,255,.3)", background: "rgba(0,240,255,.12)", color: "#00F0FF", borderRadius: 10, padding: "7px 8px", fontWeight: 900, fontSize: 10 }}>Msg</button><button onClick={() => { createChallenge(user!.uid, person.uid).then(() => toast.success("Challenge sent")); }} style={{ border: "1px solid rgba(255,215,0,.3)", background: "rgba(255,215,0,.12)", color: "#FFD700", borderRadius: 10, padding: "7px 8px", fontWeight: 900, fontSize: 10 }}>Challenge</button></div>;
    if (person.friendStatus === "pending") return <button onClick={() => cancel(person)} disabled={busy === person.uid} style={{ border: "1px solid rgba(255,215,0,.3)", background: "rgba(255,215,0,.12)", color: "#FFD700", borderRadius: 10, padding: "7px 9px", fontWeight: 900, fontSize: 11, display: "inline-flex", alignItems: "center", gap: 4 }}><XCircle size={13} />Cancel</button>;
    if (person.friendStatus === "incoming") return <button onClick={() => accept(person)} disabled={busy === person.uid} style={{ border: 0, background: "#00F0FF", color: "#000", borderRadius: 10, padding: "7px 9px", fontWeight: 900, fontSize: 11, display: "inline-flex", alignItems: "center", gap: 4 }}><CheckCircle2 size={13} />Accept</button>;
    if (person.friendStatus === "blocked_by_me") return <span style={{ color: "#EF4444", fontSize: 10, fontWeight: 900 }}>Blocked</span>;
    if (person.friendStatus === "blocked_me") return <span style={{ color: "#6B7280", fontSize: 10, fontWeight: 900 }}>Unavailable</span>;
    return <button onClick={() => add(person)} disabled={busy === person.uid} style={{ border: 0, background: "#39FF14", color: "#000", borderRadius: 10, padding: "7px 9px", fontWeight: 900, fontSize: 11, display: "inline-flex", alignItems: "center", gap: 4 }}><UserPlus size={13} />Add</button>;
  };

  return (
    <div ref={boxRef} style={{ flex: 1, maxWidth: 260, position: "relative", margin: "0 8px" }}>
      <Search size={14} color="#6B7280" style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", zIndex: 2 }} />
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search ID/name"
        className="app-input" style={{ width: "100%", border: "1px solid var(--app-border)", background: "var(--app-input)", color: "var(--app-text)", borderRadius: 13, padding: "9px 10px 9px 32px", fontSize: 12, outline: "none" }}
      />
      {results.length > 0 && (
        <div style={{ position: "absolute", top: 44, left: -42, right: -70, background: "var(--app-surface-strong)", border: "1px solid rgba(57,255,20,.22)", borderRadius: 16, padding: 8, boxShadow: "0 20px 50px rgba(0,0,0,.5)", zIndex: 80 }}>
          {results.slice(0, 4).map((person) => (
            <div key={person.uid} style={{ display: "flex", alignItems: "center", gap: 8, padding: 8, borderRadius: 12, background: "var(--app-surface-soft)", marginBottom: 6 }}>
              <UserAvatar photoURL={person.photoURL} avatar={person.avatar} name={person.displayName} sizeClass="w-9 h-9" iconClassName="w-4 h-4" />
              <button type="button" onClick={() => { setSelected(person); setResults([]); }} style={{ flex: 1, minWidth: 0, background: "transparent", border: 0, textAlign: "left", padding: 0, cursor: "pointer" }}>
                <p style={{ margin: 0, color: "var(--app-text)", fontSize: 12, fontWeight: 800, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{person.displayName}</p>
                <p style={{ margin: 0, color: "#6B7280", fontSize: 10, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>@{person.username} · {person.district || ""}</p>
              </button>
              <ActionButton person={person} />
            </div>
          ))}
        </div>
      )}
      {selected && (
        <div className="modal-backdrop fixed inset-0 z-[300] flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="glass-card w-full max-w-[330px] p-4" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}><b style={{ color: "var(--app-text)" }}>View Profile</b><button onClick={() => setSelected(null)} style={{ background: "transparent", border: 0, color: "#9CA3AF", fontSize: 22 }}>×</button></div>
            <div style={{ textAlign: "center" }}><UserAvatar photoURL={selected.photoURL} avatar={selected.avatar} name={selected.displayName} sizeClass="w-16 h-16 mx-auto" iconClassName="w-8 h-8" /><h3 style={{ color: "var(--app-text)", fontWeight: 900, margin: "10px 0 2px" }}>{selected.displayName}</h3><p style={{ color: "#6B7280", fontSize: 12, margin: 0 }}>{selected.school || selected.college || "School not added"}</p><p style={{ color: "#6B7280", fontSize: 12, margin: 0 }}>{selected.district || "District not added"}</p></div>
            {selected.friendStatus === "accepted" && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14 }}><Button variant="secondary" onClick={() => { navigate(`/friends?chat=${selected.uid}`); setSelected(null); }}>Message</Button><Button variant="gold" onClick={() => createChallenge(user!.uid, selected.uid).then(() => toast.success("Challenge sent"))}>Challenge</Button></div>}
            {selected.friendStatus !== "accepted" && selected.friendStatus !== "pending" && <Button className="w-full mt-3" onClick={() => add(selected)}>Add Friend</Button>}
            {selected.friendStatus === "pending" && <Button className="w-full mt-3" variant="gold" onClick={() => cancel(selected)}>Cancel Request</Button>}
          </div>
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const { user, language, reset } = useUserStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const rankColor = user ? RANK_COLORS[user.rank] : "#39FF14";
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  const handleLogout = async () => {
    await logOut().catch(() => {});
    reset();
    navigate("/login");
  };

  const SidebarContent = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Logo */}
      <div style={{ padding: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <button onClick={() => { navigate("/dashboard"); setMobileOpen(false); }}
          style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer", width: "100%" }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(57,255,20,0.1)", border: "1px solid rgba(57,255,20,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={20} color="#39FF14" />
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontWeight: 900, color: "var(--app-text)", fontSize: 17, margin: 0, lineHeight: 1 }}>Study RPG</p>
            <p style={{ fontSize: 11, color: "#6B7280", margin: 0 }}>Level Up Learning</p>
          </div>
        </button>
      </div>

      {/* User Card */}
      {user && (
        <div style={{ padding: "16px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <UserAvatar photoURL={user.photoURL} avatar={user.avatar} name={user.displayName} sizeClass="w-10 h-10" iconClassName="w-5 h-5" borderColor={rankColor} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 700, color: "var(--app-text)", fontSize: 13, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.displayName || user.username}</p>
              <p style={{ fontSize: 11, color: "#9CA3AF", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>@{user.username} · ID {user.studentId || "—"}</p>
              <p style={{ fontSize: 11, color: rankColor, margin: 0 }}>{user.rank}</p>
            </div>
          </div>
          <XpBar currentXp={user.xp} totalXp={user.xp} level={user.level} rank={user.rank} compact />
        </div>
      )}

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: "12px", overflowY: "auto" }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href || currentPath.startsWith(item.href + "/");
          return (
            <button key={item.href} onClick={() => { navigate(item.href); setMobileOpen(false); }}
              className="tap-bounce"
              style={{
                display: "flex", alignItems: "center", gap: 12, width: "100%",
                padding: "10px 12px", borderRadius: 12, marginBottom: 4,
                background: isActive ? "rgba(57,255,20,0.08)" : "transparent",
                border: isActive ? "1px solid rgba(57,255,20,0.2)" : "1px solid transparent",
                color: isActive ? "#39FF14" : "#9CA3AF",
                fontSize: 13, fontWeight: 500, cursor: "pointer", textAlign: "left"
              }}>
              <Icon size={18} color={isActive ? "#39FF14" : "#6B7280"} style={{ flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{language === "bn" ? item.labelBn : item.label}</span>
              {isActive && <ChevronRight size={14} color="#39FF14" />}
            </button>
          );
        })}
      </nav>

      {/* Stats + Logout */}
      {user && (
        <div style={{ padding: "12px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "10px", display: "flex", justifyContent: "space-around", marginBottom: 8 }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#FFD700", margin: 0, display: "inline-flex", alignItems: "center", gap: 3 }}><Coins size={13} />{user.coins}</p>
              <p style={{ fontSize: 10, color: "#6B7280", margin: 0 }}>Coins</p>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.05)" }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#BF5FFF", margin: 0, display: "inline-flex", alignItems: "center", gap: 3 }}><Gem size={13} />{user.gems}</p>
              <p style={{ fontSize: 10, color: "#6B7280", margin: 0 }}>Gems</p>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.05)" }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#FB923C", margin: 0, display: "inline-flex", alignItems: "center", gap: 3 }}><Flame size={13} />{user.streak}</p>
              <p style={{ fontSize: 10, color: "#6B7280", margin: 0 }}>Streak</p>
            </div>
          </div>
          <button onClick={handleLogout} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "8px 12px",
            borderRadius: 10, background: "none", border: "none", color: "#6B7280", fontSize: 13, cursor: "pointer"
          }}>
            <LogOut size={15} />
            {language === "bn" ? "লগ আউট" : "Log Out"}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside style={{
        display: "none", width: 256, background: "var(--app-surface-strong)", borderRight: "1px solid var(--app-border)",
        position: "fixed", left: 0, top: 0, height: "100vh", zIndex: 40, flexDirection: "column"
      }} className="lg:flex sidebar-panel">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
        background: "var(--app-surface-strong)", borderBottom: "1px solid var(--app-border)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)"
      }} className="lg:hidden mobile-app-header">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setMobileOpen(true)} className="tap-bounce" style={{ padding: 8, borderRadius: 12, background: "var(--app-surface-soft)", border: "1px solid var(--app-border)", cursor: "pointer" }}>
              <Menu size={21} color="var(--app-text)" />
            </button>
            <button onClick={() => navigate("/dashboard")} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer" }}>
              <Zap size={22} color="#39FF14" />
            </button>
          </div>
          <HeaderSearch />
          {user && (
            <div style={{ display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#39FF14" }}>LV.{user.level}</span>
              <span style={{ fontSize: 12, color: "#FFD700", display: "inline-flex", alignItems: "center", gap: 2 }}><Coins size={12} />{user.coins}</span>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div onClick={() => setMobileOpen(false)} className="animate-fade-in" style={{ position: "fixed", inset: 0, background: "var(--app-overlay)", zIndex: 50 }} />
          <aside className="animate-drawer-in sidebar-panel" style={{
            position: "fixed", left: 0, top: 0, height: "100vh", width: 280, zIndex: 51,
            background: "var(--app-surface-strong)", borderRight: "1px solid var(--app-border)", boxShadow: "20px 0 60px var(--app-shadow)"
          }}>
            <button onClick={() => setMobileOpen(false)} className="tap-bounce" style={{ position: "absolute", top: 16, right: 16, padding: 6, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "none", cursor: "pointer" }}>
              <X size={18} color="var(--app-text)" />
            </button>
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}
