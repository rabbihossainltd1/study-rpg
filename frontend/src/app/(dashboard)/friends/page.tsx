"use client";

import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import {
  acceptFriendRequest,
  blockUser,
  createChallenge,
  getFriendsForUser,
  getIncomingFriendRequests,
  getMessagesWithFriend,
  markMessagesRead,
  sendQuickMessage,
  unfriendUser,
  type FriendMessage,
  type PublicUserResult,
} from "@/lib/firebase";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { UserAvatar } from "@/components/ui/AppIcon";
import { MessageCircle, Swords, Users, CheckCircle2, RefreshCw, Send, ChevronLeft, MoreVertical, Ban, UserMinus, Clock3, CheckCheck, UserRound } from "lucide-react";
import toast from "react-hot-toast";

type MenuState = { uid: string; open: boolean };

function dateFromUnknown(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  const maybe = value as { toDate?: () => Date; seconds?: number };
  if (typeof maybe.toDate === "function") return maybe.toDate();
  if (typeof maybe.seconds === "number") return new Date(maybe.seconds * 1000);
  return null;
}

function activityText(person: PublicUserResult) {
  const date = dateFromUnknown(person.lastActiveAt);
  if (!date) return "offline";
  const diffMin = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60000));
  if (diffMin < 2) return "Active now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const hours = Math.floor(diffMin / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function messageTime(msg: FriendMessage) {
  const date = dateFromUnknown(msg.createdAt);
  if (!date) return "";
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function FriendRow({ person, menu, setMenu, onMessage, onViewProfile, onChallenge, onBlock, onUnfriend, busy }: {
  person: PublicUserResult;
  menu: MenuState;
  setMenu: (menu: MenuState) => void;
  onMessage: () => void;
  onViewProfile: () => void;
  onChallenge: () => void;
  onBlock: () => void;
  onUnfriend: () => void;
  busy: boolean;
}) {
  const active = activityText(person);
  return (
    <div className="relative flex items-center gap-3 p-3 rounded-2xl bg-white/[0.035] border border-white/10 hover:border-primary/20 transition-all">
      <div className="relative">
        <UserAvatar photoURL={person.photoURL} avatar={person.avatar} name={person.displayName} sizeClass="w-12 h-12" iconClassName="w-5 h-5" />
        <span className={`absolute -right-0.5 -bottom-0.5 w-3 h-3 rounded-full border-2 border-[#101010] ${active === "Active now" ? "bg-primary" : "bg-gray-600"}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-black text-white truncate">{person.displayName}</p>
        <p className="text-xs text-gray-500 truncate">@{person.username} · LV.{person.level} · {active}</p>
      </div>
      <button onClick={onMessage} className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/25 text-secondary flex items-center justify-center tap-bounce" aria-label="Message">
        <MessageCircle className="w-4 h-4" />
      </button>
      <button onClick={() => setMenu({ uid: person.uid, open: !(menu.open && menu.uid === person.uid) })} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-300 flex items-center justify-center tap-bounce" aria-label="More">
        <MoreVertical className="w-4 h-4" />
      </button>
      {menu.open && menu.uid === person.uid && (
        <div className="absolute right-3 top-14 z-20 w-48 rounded-2xl border border-white/10 bg-[var(--app-surface-strong)] shadow-2xl overflow-hidden animate-card-in">
          <button onClick={onViewProfile} className="w-full px-4 py-3 text-left text-sm text-secondary hover:bg-white/5 flex items-center gap-2"><UserRound className="w-4 h-4" />View profile</button><button onClick={onChallenge} disabled={busy} className="w-full px-4 py-3 text-left text-sm text-gold hover:bg-white/5 flex items-center gap-2 disabled:opacity-50"><Swords className="w-4 h-4" />Challenge</button>
          <button onClick={onUnfriend} disabled={busy} className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-white/5 flex items-center gap-2 disabled:opacity-50"><UserMinus className="w-4 h-4" />Unfriend</button>
          <button onClick={onBlock} disabled={busy} className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2 disabled:opacity-50"><Ban className="w-4 h-4" />Block</button>
        </div>
      )}
    </div>
  );
}

export default function FriendsPage() {
  const { user, language } = useUserStore();
  const [friends, setFriends] = useState<PublicUserResult[]>([]);
  const [incoming, setIncoming] = useState<PublicUserResult[]>([]);
  const [selected, setSelected] = useState<PublicUserResult | null>(null);
  const [messages, setMessages] = useState<FriendMessage[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [menu, setMenu] = useState<MenuState>({ uid: "", open: false });
  const [profileView, setProfileView] = useState<PublicUserResult | null>(null);

  const load = async () => {
    if (!user || user.uid.startsWith("guest_")) return;
    setLoading(true);
    try {
      const [friendList, requestList] = await Promise.all([
        getFriendsForUser(user.uid).catch(() => []),
        getIncomingFriendRequests(user.uid).catch(() => []),
      ]);
      setFriends(friendList);
      setIncoming(requestList);
      if (selected && !friendList.some((f) => f.uid === selected.uid)) setSelected(null);
    } catch {
      toast.error("Friends load failed");
    } finally {
      setLoading(false);
    }
  };

  const refreshMessages = async (friend = selected) => {
    if (!user || !friend || user.uid.startsWith("guest_")) return;
    await markMessagesRead(user.uid, friend.uid).catch(() => undefined);
    const list = await getMessagesWithFriend(user.uid, friend.uid).catch(() => []);
    setMessages(list);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  useEffect(() => {
    refreshMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid, selected?.uid]);

  useEffect(() => {
    if (typeof window === "undefined" || !friends.length) return;
    const chatUid = new URLSearchParams(window.location.search).get("chat");
    if (!chatUid) return;
    const found = friends.find((f) => f.uid === chatUid);
    if (found) setSelected(found);
  }, [friends]);


  const unreadCount = useMemo(() => messages.filter((m) => selected && m.to === user?.uid && m.from === selected.uid && !m.read).length, [messages, selected, user?.uid]);

  if (!user) return null;

  const accept = async (target: PublicUserResult) => {
    if (!target.requestId) return;
    setBusyId(target.uid);
    try {
      await acceptFriendRequest(target.requestId);
      toast.success("Friend request accepted");
      await load();
    } catch {
      toast.error("Accept failed");
    } finally {
      setBusyId(null);
    }
  };

  const challenge = async (target: PublicUserResult) => {
    setBusyId(target.uid);
    try {
      await createChallenge(user.uid, target.uid);
      toast.success("Challenge sent");
      setMenu({ uid: "", open: false });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Challenge failed");
    } finally {
      setBusyId(null);
    }
  };

  const unfriend = async (target: PublicUserResult) => {
    if (!confirm(`Unfriend ${target.displayName}?`)) return;
    setBusyId(target.uid);
    try {
      await unfriendUser(user.uid, target.uid);
      toast.success("Unfriended");
      setSelected(null);
      setMenu({ uid: "", open: false });
      await load();
    } catch {
      toast.error("Unfriend failed");
    } finally {
      setBusyId(null);
    }
  };

  const block = async (target: PublicUserResult) => {
    if (!confirm(`Block ${target.displayName}? Messages and challenges will stop.`)) return;
    setBusyId(target.uid);
    try {
      await blockUser(user.uid, target.uid);
      toast.success("Student blocked");
      setSelected(null);
      setMenu({ uid: "", open: false });
      await load();
    } catch {
      toast.error("Block failed");
    } finally {
      setBusyId(null);
    }
  };

  const sendMessage = async () => {
    const body = text.trim();
    if (!selected || !body) return;
    setBusyId(selected.uid);
    try {
      await sendQuickMessage(user.uid, selected.uid, body);
      setText("");
      await refreshMessages(selected);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Message failed");
    } finally {
      setBusyId(null);
    }
  };

  if (selected) {
    const active = activityText(selected);
    return (
      <div className="space-y-4 animate-card-in">
        <div className="flex items-center gap-3 sticky top-[68px] z-20 bg-[var(--app-surface-strong)] backdrop-blur-xl py-2">
          <button onClick={() => setSelected(null)} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 tap-bounce">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <UserAvatar photoURL={selected.photoURL} avatar={selected.avatar} name={selected.displayName} sizeClass="w-11 h-11" iconClassName="w-5 h-5" />
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-black text-[var(--app-text)] truncate">{selected.displayName}</h1>
            <p className="text-xs text-gray-500 truncate">@{selected.username} · {active}</p>
          </div>
          <button onClick={() => setMenu({ uid: selected.uid, open: !menu.open })} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-300 flex items-center justify-center tap-bounce"><MoreVertical className="w-4 h-4" /></button>
          {menu.open && menu.uid === selected.uid && (
            <div className="absolute right-0 top-14 z-30 w-48 rounded-2xl border border-white/10 bg-[var(--app-surface-strong)] shadow-2xl overflow-hidden">
              <button onClick={() => challenge(selected)} className="w-full px-4 py-3 text-left text-sm text-gold hover:bg-white/5 flex items-center gap-2"><Swords className="w-4 h-4" />Challenge</button>
              <button onClick={() => unfriend(selected)} className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-white/5 flex items-center gap-2"><UserMinus className="w-4 h-4" />Unfriend</button>
              <button onClick={() => block(selected)} className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"><Ban className="w-4 h-4" />Block</button>
            </div>
          )}
        </div>

        <Card className="min-h-[68vh] flex flex-col p-0 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/5 text-xs text-gray-500 flex items-center justify-between">
            <span className="inline-flex items-center gap-1"><Clock3 className="w-3 h-3" /> {active}</span>
            {unreadCount > 0 && <span className="text-secondary font-bold">{unreadCount} new</span>}
          </div>
          <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[68vh]">
            {messages.length === 0 && <p className="text-sm text-gray-500 text-center mt-10">No messages yet. Start the conversation.</p>}
            {messages.map((msg) => {
              const mine = msg.from === user.uid;
              return (
                <div key={msg.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[78%] rounded-2xl px-4 py-2 text-sm ${mine ? "bg-primary text-black font-semibold" : "bg-white/7 border border-white/10 text-[var(--app-text)]"}`}>
                    <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                    <div className={`mt-1 text-[10px] flex items-center gap-1 ${mine ? "text-black/55 justify-end" : "text-gray-500"}`}>
                      <span>{messageTime(msg)}</span>
                      {mine && <span className="inline-flex items-center gap-0.5"><CheckCheck className="w-3 h-3" />{msg.read ? "Seen" : "Sent"}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-3 border-t border-white/5 flex gap-2 bg-black/20">
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Write message..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-secondary/50" />
            <Button onClick={sendMessage} disabled={!text.trim() || busyId === selected.uid}><Send className="w-4 h-4" /></Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-card-in">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">{language === "bn" ? "ফ্রেন্ডস" : "Friends"}</h1>
            <p className="text-sm text-gray-500">Friend list, messages and quiz challenges</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={load} isLoading={loading}><RefreshCw className="w-4 h-4" />Refresh</Button>
      </div>

      {incoming.length > 0 && (
        <Card className="border border-secondary/20 bg-secondary/5">
          <p className="text-sm font-bold text-white mb-3">Incoming Requests</p>
          <div className="space-y-2">
            {incoming.map((person) => (
              <div key={person.uid} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <UserAvatar photoURL={person.photoURL} avatar={person.avatar} name={person.displayName} sizeClass="w-11 h-11" iconClassName="w-5 h-5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{person.displayName}</p>
                  <p className="text-xs text-gray-500 truncate">@{person.username} · ID {person.studentId}</p>
                </div>
                <Button size="sm" variant="secondary" onClick={() => accept(person)} disabled={busyId === person.uid}>
                  <CheckCircle2 className="w-3 h-3" />Accept
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-white">My Friends</p>
          <p className="text-xs text-gray-500">{friends.length} added</p>
        </div>
        <div className="space-y-2">
          {friends.length === 0 && <p className="text-sm text-gray-500">No friends yet. Use the top search bar to add students.</p>}
          {friends.map((person) => (
            <FriendRow
              key={person.uid}
              person={person}
              menu={menu}
              setMenu={setMenu}
              busy={busyId === person.uid}
              onMessage={() => { setSelected(person); setMenu({ uid: "", open: false }); }}
              onViewProfile={() => { setProfileView(person); setMenu({ uid: "", open: false }); }}
              onChallenge={() => challenge(person)}
              onBlock={() => block(person)}
              onUnfriend={() => unfriend(person)}
            />
          ))}
        </div>
      </Card>
      {profileView && (
        <div className="modal-backdrop fixed inset-0 z-[260] flex items-center justify-center p-4" onClick={() => setProfileView(null)}>
          <div className="glass-card w-full max-w-[330px] p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3"><b className="text-white">Friend Profile</b><button onClick={() => setProfileView(null)} className="text-gray-400 bg-transparent border-0 text-2xl">×</button></div>
            <div className="text-center"><UserAvatar photoURL={profileView.photoURL} avatar={profileView.avatar} name={profileView.displayName} sizeClass="w-16 h-16 mx-auto" iconClassName="w-8 h-8" /><h3 className="text-lg font-black text-white mt-2">{profileView.displayName}</h3><p className="text-xs text-gray-500">@{profileView.username} · ID {profileView.studentId}</p></div>
            <div className="mt-4 space-y-2 text-sm"><p className="text-gray-400"><b className="text-white">School:</b> {profileView.school || profileView.college || "Not added"}</p><p className="text-gray-400"><b className="text-white">District:</b> {profileView.district}</p><p className="text-gray-400"><b className="text-white">Class:</b> {profileView.className || "Student"}</p><p className="text-gray-400"><b className="text-white">Group:</b> {profileView.groupName || "General"}</p><p className="text-gray-400"><b className="text-white">Thana:</b> {profileView.thana || "Not added"}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
