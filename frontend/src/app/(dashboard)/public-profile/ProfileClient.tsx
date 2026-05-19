"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { navigate } from "@/lib/navigate";
import { useUserStore } from "@/store/useUserStore";
import { cancelFriendRequest, getFriendRelationState, getUserProfile, sendFriendRequest, type FriendStatus } from "@/lib/firebase";
import { normalizeClassName } from "@/lib/bdAddress";
import { Button } from "@/components/ui/Button";
import { UserAvatar, VerifiedBadge } from "@/components/ui/AppIcon";
import { RANK_COLORS, type Rank, type User } from "@/types";
import { isVerifiedUser } from "@/lib/verified";
import { ArrowLeft, Building2, Coins, Flame, Gem, Gift, GraduationCap, MapPin, MessageCircle, School, Shield, Trophy, UserPlus, UserRound, XCircle, Zap } from "lucide-react";
import toast from "react-hot-toast";

function InfoCard({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="sr-info-row">
      <div className="sr-info-icon">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="sr-info-label">{label}</p>
        <p className="sr-info-value">{value || "Not added"}</p>
      </div>
    </div>
  );
}

function GiftOptions({ onClose, name }: { onClose: () => void; name: string }) {
  const options = [
    { label: "Coins", icon: <Coins className="w-5 h-5" />, color: "#f5a623" },
    { label: "Gems", icon: <Gem className="w-5 h-5" />, color: "#a855f7" },
    { label: "Gift", icon: <Gift className="w-5 h-5" />, color: "#00d4b4" },
  ];
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="sr-sheet max-w-[390px] rounded-[28px] border border-[var(--app-border)] p-5" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto mb-4 h-1 w-9 rounded-full bg-white/15" />
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="font-['Syne',Inter,sans-serif] text-sm font-black uppercase tracking-[0.12em] text-[var(--app-muted-2)]">Gift Options</p>
            <p className="mt-1 text-xs text-[var(--app-muted)]">Send reward to {name}</p>
          </div>
          <button onClick={onClose} className="h-9 w-9 rounded-full border border-[var(--app-border)] bg-[var(--app-surface-soft)] text-[var(--app-muted)]">×</button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {options.map((option) => (
            <button key={option.label} onClick={() => toast.success(`${option.label} option selected`)} className="tap-bounce rounded-2xl border p-4 text-center" style={{ borderColor: `${option.color}35`, background: `${option.color}12`, color: option.color }}>
              <span className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${option.color}18` }}>{option.icon}</span>
              <span className="font-['Syne',Inter,sans-serif] text-xs font-black">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PublicProfileClient() {
  const searchParams = useSearchParams();
  const targetId = useMemo(() => String(searchParams.get("userId") || ""), [searchParams]);
  const { user, language } = useUserStore();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [friendStatus, setFriendStatus] = useState<FriendStatus>("none");
  const [busy, setBusy] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!targetId) {
        setLoading(false);
        setProfile(null);
        return;
      }
      setLoading(true);
      try {
        const found = await getUserProfile(targetId);
        if (!active) return;
        setProfile(found);
        if (user?.uid && targetId !== user.uid) {
          const state = await getFriendRelationState(user.uid, targetId).catch(() => ({ status: "none" as FriendStatus }));
          if (active) setFriendStatus(state.status);
        } else {
          setFriendStatus("accepted");
        }
      } catch {
        if (active) {
          setProfile(null);
          toast.error("Profile load failed");
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, [targetId, user?.uid]);

  const addFriend = async () => {
    if (!user?.uid || !profile?.uid || user.uid === profile.uid) return;
    setBusy(true);
    try {
      await sendFriendRequest(user.uid, profile.uid);
      setFriendStatus("pending");
      toast.success(language === "bn" ? "Friend request sent" : "Friend request sent");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Add friend failed");
    } finally {
      setBusy(false);
    }
  };

  const cancelRequest = async () => {
    if (!user?.uid || !profile?.uid || user.uid === profile.uid) return;
    setBusy(true);
    try {
      await cancelFriendRequest(user.uid, profile.uid);
      setFriendStatus("none");
      toast.success("Request cancelled");
    } catch {
      toast.error("Cancel failed");
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <div className="sr-card mx-auto max-w-md p-6 text-center text-[var(--app-muted)]">Loading profile...</div>;

  if (!profile) {
    return (
      <div className="mx-auto max-w-md text-center">
        <div className="sr-card p-6">
          <UserRound className="mx-auto mb-3 h-10 w-10 text-accent" />
          <h1 className="mb-2 text-xl font-black text-[var(--app-text)]">Profile not found</h1>
          <Button onClick={() => navigate("/leaderboard")} variant="ghost" className="w-full"><ArrowLeft className="w-4 h-4" /> Back</Button>
        </div>
      </div>
    );
  }

  const own = user?.uid === profile.uid;
  const canSeeFull = own || friendStatus === "accepted";
  const rank = (profile.rank || "Novice") as Rank;
  const rankColor = RANK_COLORS[rank] || "#39FF14";
  const displayName = profile.displayName || profile.username || "Student";
  const displayId = profile.studentId || profile.uid.slice(0, 10);

  return (
    <div className="sr-page mx-auto max-w-[420px] animate-card-in space-y-4">
      <button onClick={() => navigate("/leaderboard")} className="tap-bounce flex items-center gap-2 border-0 bg-transparent text-sm font-bold text-[var(--app-muted)]">
        <ArrowLeft className="h-5 w-5" /> {language === "bn" ? "ফিরে যাও" : "Back"}
      </button>

      <div className="sr-card sr-public-hero">
        <div className="relative shrink-0">
          <UserAvatar photoURL={profile.photoURL} avatar={profile.avatar} name={displayName} sizeClass="w-[76px] h-[76px]" iconClassName="w-9 h-9" borderColor={rankColor} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            <h1 className="font-['Syne',Inter,sans-serif] text-xl font-black text-[var(--app-text)] truncate">{displayName}</h1>
            {isVerifiedUser(profile) && <VerifiedBadge className="w-5 h-5 flex-shrink-0" />}
          </div>
          <p className="mt-1 truncate text-xs text-[var(--app-muted)]">@{profile.username} · ID {displayId}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="sr-pill" style={{ color: rankColor, borderColor: `${rankColor}35`, background: `${rankColor}12` }}><Trophy className="h-3 w-3" />{rank}</span>
            <span className="sr-pill sr-pill-green"><Zap className="h-3 w-3 fill-current" />LV.{profile.level}</span>
            <span className="sr-pill sr-pill-gold"><Flame className="h-3 w-3" />{profile.streak || 0}</span>
          </div>
        </div>
      </div>

      {!own && friendStatus !== "accepted" && (
        <div>
          {friendStatus === "pending" ? (
            <Button variant="gold" onClick={cancelRequest} disabled={busy} className="min-h-[50px] w-full rounded-[14px]" leftIcon={<XCircle className="w-4 h-4" />}>Cancel Request</Button>
          ) : friendStatus === "incoming" ? (
            <Button variant="secondary" onClick={() => navigate("/friends")} className="min-h-[50px] w-full rounded-[14px]" leftIcon={<UserPlus className="w-4 h-4" />}>Respond in Friends</Button>
          ) : friendStatus === "blocked_by_me" || friendStatus === "blocked_me" ? (
            <Button variant="danger" disabled className="min-h-[50px] w-full rounded-[14px]">Unavailable</Button>
          ) : (
            <Button onClick={addFriend} disabled={busy} className="min-h-[50px] w-full rounded-[14px] shadow-neon-primary" leftIcon={<UserPlus className="w-4 h-4" />}>Add Friend</Button>
          )}
        </div>
      )}

      {!own && friendStatus === "accepted" && (
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={() => navigate(`/friends?chat=${profile.uid}`)} className="min-h-[50px] rounded-[14px]" leftIcon={<MessageCircle className="w-4 h-4" />}>Message</Button>
          <Button variant="gold" onClick={() => setGiftOpen(true)} disabled={busy} className="min-h-[50px] rounded-[14px]" leftIcon={<Gift className="w-4 h-4" />}>Gift</Button>
        </div>
      )}

      <div className="sr-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <p className="font-['Syne',Inter,sans-serif] text-sm font-black text-[var(--app-text)]">{canSeeFull ? "Full Profile" : "Basic Public Profile"}</p>
        </div>
        <div className="space-y-2">
          <InfoCard icon={<UserRound className="h-5 w-5" />} label="Student Name" value={displayName} />
          <InfoCard icon={<GraduationCap className="h-5 w-5" />} label="Class / Level" value={`${normalizeClassName(profile.className) || "Student"} · LV.${profile.level}`} />
          <InfoCard icon={<MapPin className="h-5 w-5" />} label="District" value={profile.district || profile.zila || "Not added"} />
          {canSeeFull && <InfoCard icon={<School className="h-5 w-5" />} label="School / University" value={profile.school || profile.college || "Not added"} />}
          {canSeeFull && <InfoCard icon={<Building2 className="h-5 w-5" />} label="Group / Exam" value={`${profile.groupName || "General"} · ${profile.examMode || "SSC"}`} />}
        </div>
      </div>

      {!canSeeFull && (
        <div className="sr-privacy-notice">
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <p>Friend না হলে basic information দেখা যাবে। <b>Friend হলে</b> school, group, exam info সহ full profile দেখা যাবে।</p>
        </div>
      )}

      {giftOpen && <GiftOptions onClose={() => setGiftOpen(false)} name={displayName} />}
    </div>
  );
}
