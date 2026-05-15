"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { navigate } from "@/lib/navigate";
import { useUserStore } from "@/store/useUserStore";
import { createChallenge, getFriendRelationState, getUserProfile } from "@/lib/firebase";
import { Button } from "@/components/ui/Button";
import { UserAvatar } from "@/components/ui/AppIcon";
import { RANK_COLORS, type Rank, type User } from "@/types";
import { ArrowLeft, Building2, Eye, Flame, GraduationCap, MapPin, MessageCircle, School, Shield, Swords, Trophy, UserRound, Zap } from "lucide-react";
import toast from "react-hot-toast";

function InfoCard({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-center gap-3">
      <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-black text-white truncate">{value || "Not added"}</p>
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
  const [isFriend, setIsFriend] = useState(false);
  const [busy, setBusy] = useState(false);

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
          const state = await getFriendRelationState(user.uid, targetId).catch(() => ({ status: "none" as const }));
          if (active) setIsFriend(state.status === "accepted");
        } else {
          setIsFriend(true);
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

  const sendChallenge = async () => {
    if (!user?.uid || !profile?.uid || user.uid === profile.uid) return;
    setBusy(true);
    try {
      await createChallenge(user.uid, profile.uid);
      toast.success("Challenge sent");
    } catch {
      toast.error("Challenge failed");
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <div className="glass-card p-6 text-center text-gray-400">Loading profile...</div>;

  if (!profile) {
    return (
      <div className="space-y-4 max-w-md mx-auto text-center">
        <div className="glass-card p-6 border border-accent/20">
          <UserRound className="w-10 h-10 text-accent mx-auto mb-3" />
          <h1 className="text-xl font-black text-white mb-2">Profile not found</h1>
          <Button onClick={() => navigate("/leaderboard")} variant="ghost" className="w-full"><ArrowLeft className="w-4 h-4" /> Back</Button>
        </div>
      </div>
    );
  }

  const own = user?.uid === profile.uid;
  const canSeeFull = own || isFriend;
  const rank = (profile.rank || "Novice") as Rank;
  const rankColor = RANK_COLORS[rank] || "#39FF14";

  return (
    <div className="space-y-5 max-w-2xl mx-auto animate-card-in">
      <button onClick={() => navigate("/leaderboard")} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors bg-transparent border-0 cursor-pointer tap-bounce">
        <ArrowLeft className="w-5 h-5" /> {language === "bn" ? "লিডারবোর্ডে ফিরে যাও" : "Back to Leaderboard"}
      </button>

      <div className="glass-card p-6 border relative overflow-hidden" style={{ borderColor: `${rankColor}35` }}>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-10" style={{ background: rankColor }} />
        <div className="relative flex items-center gap-4">
          <UserAvatar photoURL={profile.photoURL} avatar={profile.avatar} name={profile.displayName || profile.username} sizeClass="w-20 h-20" iconClassName="w-9 h-9" borderColor={rankColor} />
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-black text-white truncate">{profile.displayName || profile.username}</h1>
            <p className="text-sm text-gray-500 truncate">@{profile.username} · ID {profile.studentId || profile.uid.slice(0, 9)}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-xs px-2.5 py-1 rounded-lg border font-bold" style={{ color: rankColor, borderColor: `${rankColor}40`, background: `${rankColor}14` }}><Trophy className="w-3 h-3 inline mr-1" />{rank}</span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 font-bold"><Zap className="w-3 h-3 inline mr-1" />LV.{profile.level}</span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold"><Flame className="w-3 h-3 inline mr-1" />{profile.streak}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-4 border border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <Eye className="w-4 h-4 text-primary" />
          <p className="font-black text-white">{canSeeFull ? "Full Profile" : "Basic Public Profile"}</p>
        </div>
        <div className="grid gap-3">
          <InfoCard icon={<UserRound className="w-5 h-5" />} label="Student Name" value={profile.displayName || profile.username} />
          <InfoCard icon={<GraduationCap className="w-5 h-5" />} label="Class / Level" value={`${profile.className || "Student"} · LV.${profile.level}`} />
          <InfoCard icon={<MapPin className="w-5 h-5" />} label="District" value={profile.district || profile.zila || "Not added"} />
          {canSeeFull && <InfoCard icon={<School className="w-5 h-5" />} label="School / University" value={profile.school || profile.college || "Not added"} />}
          {canSeeFull && <InfoCard icon={<Building2 className="w-5 h-5" />} label="Group / Exam" value={`${profile.groupName || "General"} · ${profile.examMode || "SSC"}`} />}
          {!canSeeFull && (
            <div className="rounded-2xl border border-gold/20 bg-gold/5 p-4 flex items-start gap-3 text-sm text-gray-400">
              <Shield className="w-5 h-5 text-gold flex-shrink-0" />
              <p>Friend না হলে basic information দেখা যাবে। Friend হলে school, group, exam info সহ full profile দেখা যাবে।</p>
            </div>
          )}
        </div>
      </div>

      {!own && (
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" onClick={() => navigate(`/friends?chat=${profile.uid}`)} className="min-h-[50px]" leftIcon={<MessageCircle className="w-4 h-4" />}>Message</Button>
          <Button variant="gold" onClick={sendChallenge} disabled={busy} className="min-h-[50px]" leftIcon={<Swords className="w-4 h-4" />}>Challenge</Button>
        </div>
      )}
    </div>
  );
}
