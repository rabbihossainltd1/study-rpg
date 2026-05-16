"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import {
  acceptFriendRequest,
  blockUser,
  createChallenge,
  getBlockedUsersForUser,
  getFriendsForUser,
  getIncomingFriendRequests,
  getMessagesWithFriend,
  markMessagesRead,
  sendQuickMessage,
  unblockUser,
  unfriendUser,
  type FriendMessage,
  type PublicUserResult,
} from "@/lib/firebase";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { UserAvatar } from "@/components/ui/AppIcon";
import { MessageCircle, Swords, Users, CheckCircle2, RefreshCw, Send, ChevronLeft, MoreVertical, Ban, UserMinus, Clock3, Check, CheckCheck, UserRound } from "lucide-react";
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

function MessageStatus({ msg }: { msg: FriendMessage }) {
  const isLocal = String(msg.id || "").startsWith("local-");
  if (isLocal) {
    return <span className="inline-flex items-center gap-0.5 rounded-full bg-black/10 px-1.5 py-0.5 text-[10px] font-bold text-black/65"><Check className="w-3 h-3" />Sent</span>;
  }
  if (msg.read) {
    return <span className="inline-flex items-center gap-0.5 rounded-full bg-white/95 px-1.5 py-0.5 text-[10px] font-black text-[#007AFF] shadow-sm ring-1 ring-[#007AFF]/25"><CheckCheck className="w-3.5 h-3.5 stroke-[3]" />Seen</span>;
  }
  return <span className="inline-flex items-center gap-0.5 rounded-full bg-black/10 px-1.5 py-0.5 text-[10px] font-bold text-black/65"><CheckCheck className="w-3.5 h-3.5" />Delivered</span>;
}


function mergeFriendMessages(existing: FriendMessage[], incoming: FriendMessage[]) {
  const map = new Map<string, FriendMessage>();
  const localKey = (m: FriendMessage) => [m.from, m.to, m.content].join("|");

  existing.forEach((m) => map.set(m.id.startsWith("local-") ? localKey(m) : m.id, m));
  incoming.forEach((m) => {
    const key = m.id.startsWith("local-") ? localKey(m) : m.id;
    const matchingLocalKey = localKey(m);
    if (map.has(matchingLocalKey)) map.delete(matchingLocalKey);
    map.set(key, m);
  });

  return Array.from(map.values()).sort((a, b) => {
    const ta = dateFromUnknown(a.createdAt)?.getTime() || 0;
    const tb = dateFromUnknown(b.createdAt)?.getTime() || 0;
    return ta - tb;
  });
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
  const [blockedUsers, setBlockedUsers] = useState<PublicUserResult[]>([]);
  const [selected, setSelected] = useState<PublicUserResult | null>(null);
  const [messages, setMessages] = useState<FriendMessage[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [menu, setMenu] = useState<MenuState>({ uid: "", open: false });
  const [profileView, setProfileView] = useState<PublicUserResult | null>(null);
  const [showBlockedList, setShowBlockedList] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const load = async () => {
    if (!user || user.uid.startsWith("guest_")) return;
    setLoading(true);
    try {
      const [friendList, requestList, blockedList] = await Promise.all([
        getFriendsForUser(user.uid).catch(() => []),
        getIncomingFriendRequests(user.uid).catch(() => []),
        getBlockedUsersForUser(user.uid).catch(() => []),
      ]);
      setFriends(friendList);
      setIncoming(requestList);
      setBlockedUsers(blockedList);
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
    setMessages((prev) => {
      if (list.length === 0 && prev.length > 0) return prev;
      return mergeFriendMessages(prev, list);
    });
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  useEffect(() => {
    if (!user || !selected || user.uid.startsWith("guest_")) {
      setMessages([]);
      return;
    }

    let alive = true;
    const loadThread = async () => {
      await markMessagesRead(user.uid, selected.uid).catch(() => undefined);
      const list = await getMessagesWithFriend(user.uid, selected.uid).catch(() => []);
      if (alive) {
        setMessages((prev) => {
          if (list.length === 0 && prev.length > 0) return prev;
          return mergeFriendMessages(prev, list);
        });
      }
    };

    loadThread();
    const timer = window.setInterval(loadThread, 5000);
    return () => {
      alive = false;
      window.clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid, selected?.uid]);

  useEffect(() => {
    if (typeof window === "undefined" || !friends.length) return;
    const chatUid = new URLSearchParams(window.location.search).get("chat");
    if (!chatUid) return;
    const found = friends.find((f) => f.uid === chatUid);
    if (found) setSelected(found);
  }, [friends]);


  useEffect(() => {
    if (!selected || typeof window === "undefined") return;
    const frame = window.requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ block: "end" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [messages.length, selected?.uid]);

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
      setShowBlockedList(true);
      await load();
    } catch {
      toast.error("Block failed");
    } finally {
      setBusyId(null);
    }
  };

  const unblock = async (target: PublicUserResult) => {
    setBusyId(target.uid);
    try {
      await unblockUser(user.uid, target.uid);
      toast.success("Student unblocked");
      await load();
    } catch {
      toast.error("Unblock failed");
    } finally {
      setBusyId(null);
    }
  };

  const sendMessage = async () => {
    const body = text.trim();
    if (!user || !selected || !body) return;
    const target = selected;
    const localMessage: FriendMessage = {
      id: `local-${Date.now()}`,
      from: user.uid,
      to: target.uid,
      content: body,
      createdAt: new Date() as any,
      read: false,
      participants: [user.uid, target.uid],
    };

    setBusyId(target.uid);
    setText("");
    setMessages((prev) => mergeFriendMessages(prev, [localMessage]));

    try {
      await sendQuickMessage(user.uid, target.uid, body);
      window.setTimeout(() => {
        refreshMessages(target).catch(() => undefined);
      }, 800);
    } catch (error) {
      setMessages((prev) => prev.filter((msg) => msg.id !== localMessage.id));
      setText(body);
      toast.error(error instanceof Error ? error.message : "Message failed");
    } finally {
      setBusyId(null);
    }
  };

  if (selected) {
    const active = activityText(selected);
    return (
      <div className="fixed inset-0 z-[520] flex h-[100dvh] flex-col overflow-hidden bg-[var(--app-bg)] text-[var(--app-text)] animate-card-in">
        <div className="shrink-0 border-b border-white/10 bg-[var(--app-surface-strong)]/95 px-3 pb-3 pt-[max(env(safe-area-inset-top),12px)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelected(null)} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 tap-bounce" aria-label="Back to friends">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <UserAvatar photoURL={selected.photoURL} avatar={selected.avatar} name={selected.displayName} sizeClass="w-11 h-11" iconClassName="w-5 h-5" />
            <div className="min-w-0 flex-1">
              <h1 className="text-base font-black text-white truncate">{selected.displayName}</h1>
              <p className="text-[11px] text-gray-500 truncate">@{selected.username} · {active}</p>
            </div>
            <button onClick={() => setMenu({ uid: selected.uid, open: !menu.open })} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-300 flex items-center justify-center tap-bounce" aria-label="Chat options"><MoreVertical className="w-4 h-4" /></button>
            {menu.open && menu.uid === selected.uid && (
              <div className="absolute right-3 top-[calc(max(env(safe-area-inset-top),12px)+54px)] z-30 w-48 rounded-2xl border border-white/10 bg-[var(--app-surface-strong)] shadow-2xl overflow-hidden">
                <button onClick={() => challenge(selected)} className="w-full px-4 py-3 text-left text-sm text-gold hover:bg-white/5 flex items-center gap-2"><Swords className="w-4 h-4" />Challenge</button>
                <button onClick={() => unfriend(selected)} className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-white/5 flex items-center gap-2"><UserMinus className="w-4 h-4" />Unfriend</button>
                <button onClick={() => block(selected)} className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"><Ban className="w-4 h-4" />Block</button>
              </div>
            )}
          </div>
          <div className="mt-2 flex items-center justify-between gap-2 text-[10px] text-gray-500">
            <span className="inline-flex items-center gap-1"><Clock3 className="w-3 h-3" /> {active}</span>
            <span className="truncate">✓ sent · ✓✓ delivered · <b className="rounded-full bg-white/95 px-1.5 py-0.5 text-[#007AFF]">✓✓ seen</b></span>
            {unreadCount > 0 && <span className="shrink-0 rounded-full bg-secondary/15 px-2 py-0.5 text-secondary font-bold">{unreadCount} new</span>}
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto px-3 py-4 space-y-3 bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.05),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(57,255,20,0.045),transparent_30%)]">
          {messages.length === 0 && <p className="text-sm text-gray-500 text-center mt-10">No messages yet. Start the conversation.</p>}
          {messages.map((msg) => {
            const mine = msg.from === user.uid;
            return (
              <div key={msg.id} className={`flex items-end gap-2 ${mine ? "justify-end" : "justify-start"}`}>
                {!mine && <UserAvatar photoURL={selected.photoURL} avatar={selected.avatar} name={selected.displayName} sizeClass="w-7 h-7 shrink-0" iconClassName="w-3 h-3" />}
                <div className={`max-w-[82%] rounded-[22px] px-4 py-2.5 text-sm shadow-lg ${mine ? "bg-primary text-black font-semibold rounded-br-md" : "bg-white/[0.075] border border-white/10 text-[var(--app-text)] rounded-bl-md"}`}>
                  <p className="whitespace-pre-wrap break-words leading-relaxed">{msg.content}</p>
                  <div className={`mt-1.5 flex items-center gap-1.5 ${mine ? "justify-end" : "justify-start text-gray-500"}`}>
                    <span className={`text-[10px] ${mine ? "text-black/60" : "text-gray-500"}`}>{messageTime(msg)}</span>
                    {mine && <MessageStatus msg={msg} />}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="shrink-0 border-t border-white/10 bg-[var(--app-surface-strong)]/95 p-3 pb-[max(env(safe-area-inset-bottom),12px)] backdrop-blur-xl">
          <div className="flex items-end gap-2 rounded-[26px] border border-white/10 bg-white/[0.06] p-2 shadow-2xl">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              rows={1}
              placeholder="Write message..."
              className="max-h-28 min-h-[44px] flex-1 resize-none bg-transparent px-3 py-3 text-sm text-white placeholder-gray-600 focus:outline-none"
            />
            <Button onClick={sendMessage} disabled={!text.trim() || busyId === selected.uid} className="h-11 w-11 shrink-0 rounded-full p-0"><Send className="w-4 h-4" /></Button>
          </div>
        </div>
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
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="px-2.5 py-1 text-xs" onClick={() => setShowBlockedList((v) => !v)}><Ban className="w-3.5 h-3.5" />Block list</Button>
          <Button variant="ghost" size="sm" onClick={load} isLoading={loading}><RefreshCw className="w-4 h-4" />Refresh</Button>
        </div>
      </div>

      {showBlockedList && (
        <Card className="border border-red-500/20 bg-red-500/[0.035]">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-white">Blocked Students</p>
            <p className="text-xs text-gray-500">{blockedUsers.length} blocked</p>
          </div>
          <div className="space-y-2">
            {blockedUsers.length === 0 && <p className="text-sm text-gray-500">No blocked students.</p>}
            {blockedUsers.map((person) => (
              <div key={person.uid} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <UserAvatar photoURL={person.photoURL} avatar={person.avatar} name={person.displayName} sizeClass="w-10 h-10" iconClassName="w-4 h-4" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{person.displayName}</p>
                  <p className="text-xs text-gray-500 truncate">@{person.username}</p>
                </div>
                <Button size="sm" variant="secondary" onClick={() => unblock(person)} disabled={busyId === person.uid} className="px-3 py-1.5 text-xs">
                  Unblock
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

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
