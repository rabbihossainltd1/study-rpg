"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { useUserStore } from "@/store/useUserStore";
import { navigate } from "@/lib/navigate";
import {
  acceptFriendRequest,
  blockUser,
  getBlockedUsersForUser,
  getFriendsForUser,
  getIncomingFriendRequests,
  getMessagesWithFriend,
  markMessagesRead,
  sendQuickMessage,
  subscribeMessagesWithFriend,
  subscribeRecentMessagesForUser,
  unblockUser,
  unfriendUser,
  type FriendMessage,
  type PublicUserResult,
} from "@/lib/firebase";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { UserAvatar, VerifiedBadge } from "@/components/ui/AppIcon";
import { CheckCircle2, RefreshCw, Send, ChevronLeft, MoreVertical, Ban, UserMinus, Check, CheckCheck, UserRound, Trash2, BellOff } from "lucide-react";
import toast from "react-hot-toast";
import { isVerifiedUser } from "@/lib/verified";

type MenuState = { uid: string; open: boolean };
type FriendWithMeta = PublicUserResult & { lastMessageAtMs?: number; lastMessagePreview?: string; muted?: boolean; unreadCount?: number; hasUnread?: boolean };

function dateFromUnknown(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  const maybe = value as { toDate?: () => Date; seconds?: number };
  if (typeof maybe.toDate === "function") return maybe.toDate();
  if (typeof maybe.seconds === "number") return new Date(maybe.seconds * 1000);
  return null;
}


function readLocalJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "");
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function writeLocalJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

const friendsCacheKey = (uid: string) => `studyRpgFriendsCache_${uid}`;
const messagesCacheKey = (uid: string, targetUid: string) => `studyRpgChatMessages_${uid}_${targetUid}`;
const mutedChatsKey = (uid: string) => `studyRpgMutedChats_${uid}`;
const deletedCutoffKey = (uid: string, targetUid: string) => `studyRpgChatDeletedAt_${uid}_${targetUid}`;

function messageMs(msg: FriendMessage) {
  return dateFromUnknown(msg.createdAt)?.getTime() || 0;
}

function isUnreadIncomingMessage(msg: FriendMessage, uid: string, friendUid: string) {
  const from = msg.from || msg.senderId || "";
  const to = msg.to || msg.receiverId || "";
  return from === friendUid && (to === uid || msg.receiverId === uid || msg.participants?.includes(uid)) && !msg.read;
}

function readMutedChats(uid: string) {
  return readLocalJson<string[]>(mutedChatsKey(uid), []).filter(Boolean);
}

function isChatMutedLocal(uid: string, targetUid: string) {
  return readMutedChats(uid).includes(targetUid);
}

function setChatMutedLocal(uid: string, targetUid: string, muted: boolean) {
  const current = readMutedChats(uid).filter((id) => id !== targetUid);
  writeLocalJson(mutedChatsKey(uid), muted ? [...current, targetUid] : current);
}

function getChatDeletedCutoff(uid: string, targetUid: string) {
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem(deletedCutoffKey(uid, targetUid)) || 0) || 0;
}

function setChatDeletedCutoff(uid: string, targetUid: string, cutoff = Date.now()) {
  if (typeof window === "undefined") return;
  localStorage.setItem(deletedCutoffKey(uid, targetUid), String(cutoff));
}

function filterDeletedMessages(uid: string, targetUid: string, list: FriendMessage[]) {
  const cutoff = getChatDeletedCutoff(uid, targetUid);
  if (!cutoff) return list;
  return list.filter((msg) => messageMs(msg) > cutoff || String(msg.id || "").startsWith("local-"));
}

function readCachedMessages(uid: string, targetUid: string) {
  return readLocalJson<FriendMessage[]>(messagesCacheKey(uid, targetUid), []);
}

function saveCachedMessages(uid: string, targetUid: string, list: FriendMessage[]) {
  const cleaned = filterDeletedMessages(uid, targetUid, list).slice(-250);
  writeLocalJson(messagesCacheKey(uid, targetUid), cleaned);
}

function applyLocalFriendMeta(uid: string, friendList: PublicUserResult[]): FriendWithMeta[] {
  const cached = readLocalJson<FriendWithMeta[]>(friendsCacheKey(uid), []);
  const cacheMap = new Map(cached.map((friend) => [friend.uid, friend]));
  return friendList.map((friend) => {
    const old = cacheMap.get(friend.uid);
    const cachedMessages = readCachedMessages(uid, friend.uid);
    const latest = cachedMessages.reduce((max, msg) => Math.max(max, messageMs(msg)), old?.lastMessageAtMs || 0);
    const unreadCount = cachedMessages.filter((msg) => isUnreadIncomingMessage(msg, uid, friend.uid)).length || old?.unreadCount || 0;
    return {
      ...friend,
      lastMessageAtMs: latest,
      lastMessagePreview: old?.lastMessagePreview || "",
      muted: isChatMutedLocal(uid, friend.uid),
      unreadCount,
      hasUnread: unreadCount > 0 || Boolean(old?.hasUnread),
    };
  });
}

function sortFriendsByLatest(list: FriendWithMeta[]) {
  return [...list].sort((a, b) => {
    const ta = a.lastMessageAtMs || dateFromUnknown(a.lastActiveAt)?.getTime() || 0;
    const tb = b.lastMessageAtMs || dateFromUnknown(b.lastActiveAt)?.getTime() || 0;
    return tb - ta;
  });
}

function saveFriendsCache(uid: string, list: FriendWithMeta[]) {
  writeLocalJson(friendsCacheKey(uid), sortFriendsByLatest(list).slice(0, 200));
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

function FriendRow({ person, menu, setMenu, onMessage, onViewProfile, onDeleteChat, onBlock, onUnfriend, busy }: {
  person: FriendWithMeta;
  menu: MenuState;
  setMenu: (menu: MenuState) => void;
  onMessage: () => void;
  onViewProfile: () => void;
  onDeleteChat: () => void;
  onBlock: () => void;
  onUnfriend: () => void;
  busy: boolean;
}) {
  const active = activityText(person);
  const holdTimer = useRef<number | null>(null);
  const holdTriggered = useRef(false);

  const clearHoldTimer = () => {
    if (holdTimer.current) {
      window.clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  const openActionMenu = () => {
    holdTriggered.current = true;
    setMenu({ uid: person.uid, open: true });
  };

  const startHold = () => {
    holdTriggered.current = false;
    clearHoldTimer();
    holdTimer.current = window.setTimeout(openActionMenu, 520);
  };

  const stopHold = () => {
    clearHoldTimer();
  };

  const handleClick = () => {
    if (holdTriggered.current) {
      holdTriggered.current = false;
      return;
    }
    onMessage();
  };

  const handleMenuClick = (action: () => void) => (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    action();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onMessage();
        }
      }}
      onContextMenu={(event) => {
        event.preventDefault();
        openActionMenu();
      }}
      onMouseDown={startHold}
      onMouseUp={stopHold}
      onMouseLeave={stopHold}
      onTouchStart={startHold}
      onTouchEnd={stopHold}
      onTouchCancel={stopHold}
      className={`sr-friend-card relative flex cursor-pointer select-none items-center gap-3 p-3 border transition-all tap-bounce ${person.hasUnread ? "sr-friend-unread" : ""}`}
    >
      <div className="relative">
        <UserAvatar photoURL={person.photoURL} avatar={person.avatar} name={person.displayName} sizeClass="w-12 h-12" iconClassName="w-5 h-5" />
        <span className={`absolute -right-0.5 -bottom-0.5 w-3 h-3 rounded-full border-2 border-[#101010] ${active === "Active now" ? "bg-primary" : "bg-gray-600"}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 min-w-0"><p className={`text-sm text-white truncate ${person.hasUnread ? "font-black" : "font-bold"}`}>{person.displayName}</p>{isVerifiedUser(person) && <VerifiedBadge className="w-4 h-4 flex-shrink-0" />}{person.muted && <BellOff className="w-3.5 h-3.5 text-gold flex-shrink-0" />}</div>
        <p className={`text-xs truncate ${person.hasUnread ? "font-extrabold text-white/85" : "text-gray-500"}`}>{person.lastMessagePreview ? person.lastMessagePreview : `@${person.username} · LV.${person.level} · ${active}`}</p>
      </div>
      {person.hasUnread && <span className="ml-1 h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_12px_rgba(0,240,255,0.9)]" aria-label="Unread message" />}
      {menu.open && menu.uid === person.uid && (
        <div data-action-menu="true" className="absolute right-3 top-14 z-20 w-48 rounded-2xl border border-white/10 bg-[var(--app-surface-strong)] shadow-2xl overflow-hidden animate-card-in" onClick={(event) => event.stopPropagation()}>
          <button onClick={handleMenuClick(onViewProfile)} className="w-full px-4 py-3 text-left text-sm text-secondary hover:bg-white/5 flex items-center gap-2"><UserRound className="w-4 h-4" />View profile</button>
          <button onClick={handleMenuClick(onDeleteChat)} disabled={busy} className="w-full px-4 py-3 text-left text-sm text-gold hover:bg-white/5 flex items-center gap-2 disabled:opacity-50"><Trash2 className="w-4 h-4" />Delete chat</button>
          <button onClick={handleMenuClick(onUnfriend)} disabled={busy} className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-white/5 flex items-center gap-2 disabled:opacity-50"><UserMinus className="w-4 h-4" />Unfriend</button>
          <button onClick={handleMenuClick(onBlock)} disabled={busy} className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2 disabled:opacity-50"><Ban className="w-4 h-4" />Block</button>
        </div>
      )}
    </div>
  );
}

export default function FriendsPage() {
  const { user } = useUserStore();
  const [friends, setFriends] = useState<FriendWithMeta[]>([]);
  const [incoming, setIncoming] = useState<PublicUserResult[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<PublicUserResult[]>([]);
  const [selected, setSelected] = useState<FriendWithMeta | null>(null);
  const [messages, setMessages] = useState<FriendMessage[]>([]);
  const [text, setText] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [menu, setMenu] = useState<MenuState>({ uid: "", open: false });
  const [profileView, setProfileView] = useState<PublicUserResult | null>(null);
  const [showBlockedList, setShowBlockedList] = useState(false);
  const [topMenuOpen, setTopMenuOpen] = useState(false);
  const [chatMenuOpen, setChatMenuOpen] = useState(false);
  const [muteVersion, setMuteVersion] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const load = async () => {
    if (!user || user.uid.startsWith("guest_")) return;
    const cached = readLocalJson<FriendWithMeta[]>(friendsCacheKey(user.uid), []);
    if (cached.length) setFriends(sortFriendsByLatest(cached.map((friend) => ({ ...friend, muted: isChatMutedLocal(user.uid, friend.uid) }))));
    try {
      const [friendList, requestList, blockedList] = await Promise.all([
        getFriendsForUser(user.uid).catch(() => []),
        getIncomingFriendRequests(user.uid).catch(() => []),
        getBlockedUsersForUser(user.uid).catch(() => []),
      ]);
      const prepared = sortFriendsByLatest(applyLocalFriendMeta(user.uid, friendList));
      setFriends(prepared);
      saveFriendsCache(user.uid, prepared);
      setIncoming(requestList);
      setBlockedUsers(blockedList);
      if (selected && !friendList.some((f) => f.uid === selected.uid)) setSelected(null);

      Promise.all(prepared.map(async (friend) => {
        const list = filterDeletedMessages(user.uid, friend.uid, await getMessagesWithFriend(user.uid, friend.uid).catch(() => []));
        saveCachedMessages(user.uid, friend.uid, list);
        const latest = list[list.length - 1];
        const unreadCount = list.filter((msg) => isUnreadIncomingMessage(msg, user.uid, friend.uid)).length;
        return { ...friend, lastMessageAtMs: latest ? messageMs(latest) : friend.lastMessageAtMs || 0, lastMessagePreview: latest?.content || friend.lastMessagePreview || "", muted: isChatMutedLocal(user.uid, friend.uid), unreadCount, hasUnread: unreadCount > 0 };
      })).then((enriched) => {
        const sorted = sortFriendsByLatest(enriched);
        setFriends(sorted);
        saveFriendsCache(user.uid, sorted);
      }).catch(() => undefined);
    } catch {
      toast.error("Friends load failed");
    }
  };

  const refreshMessages = async (friend = selected) => {
    if (!user || !friend || user.uid.startsWith("guest_")) return;
    await markMessagesRead(user.uid, friend.uid).catch(() => undefined);
    const list = filterDeletedMessages(user.uid, friend.uid, await getMessagesWithFriend(user.uid, friend.uid).catch(() => []));
    setMessages((prev) => {
      const merged = list.length === 0 && prev.length > 0 ? prev : mergeFriendMessages(prev, list);
      saveCachedMessages(user.uid, friend.uid, merged);
      const latest = merged[merged.length - 1];
      setFriends((items) => {
        const updated = sortFriendsByLatest(items.map((item) => item.uid === friend.uid ? { ...item, lastMessageAtMs: latest ? messageMs(latest) : item.lastMessageAtMs, lastMessagePreview: latest?.content || item.lastMessagePreview || "", muted: isChatMutedLocal(user.uid, item.uid), unreadCount: 0, hasUnread: false } : { ...item, muted: isChatMutedLocal(user.uid, item.uid) }));
        saveFriendsCache(user.uid, updated);
        return updated;
      });
      return merged;
    });
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  useEffect(() => {
    if (!user || user.uid.startsWith("guest_")) return;
    const unsubscribe = subscribeRecentMessagesForUser(user.uid, (list) => {
      setFriends((items) => {
        if (!items.length) return items;
        const latestByFriend = new Map<string, FriendMessage>();
        list.forEach((msg) => {
          const otherUid = msg.from === user.uid ? msg.to : msg.to === user.uid ? msg.from : msg.senderId === user.uid ? msg.receiverId : msg.receiverId === user.uid ? msg.senderId : undefined;
          if (!otherUid || !items.some((item) => item.uid === otherUid)) return;
          const visible = filterDeletedMessages(user.uid, otherUid, [msg]);
          if (!visible.length) return;
          const current = latestByFriend.get(otherUid);
          if (!current || messageMs(msg) >= messageMs(current)) latestByFriend.set(otherUid, msg);
        });
        if (!latestByFriend.size) return items.map((item) => ({ ...item, muted: isChatMutedLocal(user.uid, item.uid) }));
        const updated = sortFriendsByLatest(items.map((item) => {
          const latest = latestByFriend.get(item.uid);
          const activeChatUid = typeof window !== "undefined" ? String((window as any).studyRpgActiveChatUid || "") : "";
          const unread = latest ? isUnreadIncomingMessage(latest, user.uid, item.uid) && activeChatUid !== item.uid : Boolean(item.hasUnread);
          return latest ? { ...item, lastMessageAtMs: messageMs(latest), lastMessagePreview: latest.content || item.lastMessagePreview || "", muted: isChatMutedLocal(user.uid, item.uid), unreadCount: unread ? Math.max(1, item.unreadCount || 0) : 0, hasUnread: unread } : { ...item, muted: isChatMutedLocal(user.uid, item.uid) };
        }));
        saveFriendsCache(user.uid, updated);
        return updated;
      });
    });
    return () => unsubscribe?.();
  }, [user?.uid]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).studyRpgActiveChatUid = selected?.uid || "";
    }
    if (!user || !selected || user.uid.startsWith("guest_")) {
      setMessages([]);
      return () => {
        if (typeof window !== "undefined") (window as any).studyRpgActiveChatUid = "";
      };
    }

    let alive = true;
    const cachedMessages = filterDeletedMessages(user.uid, selected.uid, readCachedMessages(user.uid, selected.uid));
    setMessages(cachedMessages);
    markMessagesRead(user.uid, selected.uid).catch(() => undefined);
    const unsubscribe = subscribeMessagesWithFriend(user.uid, selected.uid, (list) => {
      if (!alive) return;
      const filtered = filterDeletedMessages(user.uid, selected.uid, list);
      setMessages((prev) => {
        const merged = mergeFriendMessages(prev, filtered);
        saveCachedMessages(user.uid, selected.uid, merged);
        const latest = merged[merged.length - 1];
        setFriends((items) => {
          const updated = sortFriendsByLatest(items.map((item) => item.uid === selected.uid ? { ...item, lastMessageAtMs: latest ? messageMs(latest) : item.lastMessageAtMs, lastMessagePreview: latest?.content || item.lastMessagePreview || "", muted: isChatMutedLocal(user.uid, item.uid) } : { ...item, muted: isChatMutedLocal(user.uid, item.uid) }));
          saveFriendsCache(user.uid, updated);
          return updated;
        });
        return merged;
      });
      markMessagesRead(user.uid, selected.uid).catch(() => undefined);
    });

    const fallbackTimer = window.setInterval(() => refreshMessages(selected).catch(() => undefined), 12000);
    return () => {
      alive = false;
      unsubscribe?.();
      window.clearInterval(fallbackTimer);
      if (typeof window !== "undefined") (window as any).studyRpgActiveChatUid = "";
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
    if (typeof document === "undefined" || (!menu.open && !topMenuOpen && !chatMenuOpen)) return;
    const closeMenus = (event: Event) => {
      const target = event.target as Element | null;
      if (target?.closest?.('[data-action-menu="true"]')) return;
      setMenu({ uid: "", open: false });
      setTopMenuOpen(false);
      setChatMenuOpen(false);
    };
    document.addEventListener("pointerdown", closeMenus);
    document.addEventListener("touchstart", closeMenus);
    return () => {
      document.removeEventListener("pointerdown", closeMenus);
      document.removeEventListener("touchstart", closeMenus);
    };
  }, [menu.open, topMenuOpen, chatMenuOpen]);

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
    if (!confirm(`Block ${target.displayName}? Messages and gifts will stop.`)) return;
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


  const toggleMuteChatLocal = (target: PublicUserResult) => {
    const muted = isChatMutedLocal(user.uid, target.uid);
    setChatMutedLocal(user.uid, target.uid, !muted);
    setMuteVersion((v) => v + 1);
    setFriends((items) => {
      const updated = sortFriendsByLatest(items.map((item) => item.uid === target.uid ? { ...item, muted: !muted } : item));
      saveFriendsCache(user.uid, updated);
      return updated;
    });
    setSelected((current) => current?.uid === target.uid ? { ...current, muted: !muted } : current);
    setChatMenuOpen(false);
    setMenu({ uid: "", open: false });
    toast.success(muted ? "Chat unmuted" : "Chat muted");
  };

  const deleteChatLocal = (target: PublicUserResult) => {
    setChatDeletedCutoff(user.uid, target.uid);
    saveCachedMessages(user.uid, target.uid, []);
    if (selected?.uid === target.uid) setMessages([]);
    setFriends((items) => {
      const updated = sortFriendsByLatest(items.map((item) => item.uid === target.uid ? { ...item, lastMessageAtMs: 0, lastMessagePreview: "", unreadCount: 0, hasUnread: false } : item));
      saveFriendsCache(user.uid, updated);
      return updated;
    });
    setChatMenuOpen(false);
    setMenu({ uid: "", open: false });
    toast.success("Chat deleted from this device");
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
    setMessages((prev) => {
      const merged = mergeFriendMessages(prev, [localMessage]);
      saveCachedMessages(user.uid, target.uid, merged);
      setFriends((items) => {
        const updated = sortFriendsByLatest(items.map((item) => item.uid === target.uid ? { ...item, lastMessageAtMs: Date.now(), lastMessagePreview: body, muted: isChatMutedLocal(user.uid, item.uid), unreadCount: 0, hasUnread: false } : { ...item, muted: isChatMutedLocal(user.uid, item.uid) }));
        saveFriendsCache(user.uid, updated);
        return updated;
      });
      return merged;
    });

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
    const selectedMuted = isChatMutedLocal(user.uid, selected.uid);
    return (
      <div className="sr-chat-panel fixed inset-0 z-[520] flex h-[100dvh] flex-col overflow-hidden bg-[var(--app-bg)] text-[var(--app-text)] animate-card-in">
        <div className="shrink-0 border-b border-[var(--app-border)] bg-[var(--app-surface-strong)]/95 px-3 pb-3 pt-[max(env(safe-area-inset-top),12px)] backdrop-blur-xl">
          <div className="relative flex items-center gap-3">
            <button onClick={() => setSelected(null)} className="h-10 w-8 bg-transparent border-0 flex items-center justify-center text-gray-300 tap-bounce" aria-label="Back to friends">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={() => navigate(`/public-profile?userId=${encodeURIComponent(selected.uid)}`)} className="min-w-0 flex flex-1 items-center gap-3 bg-transparent border-0 p-0 text-left tap-bounce" aria-label="View profile">
              <UserAvatar photoURL={selected.photoURL} avatar={selected.avatar} name={selected.displayName} sizeClass="w-11 h-11" iconClassName="w-5 h-5" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 min-w-0"><h1 className="text-base font-black text-white truncate">{selected.displayName}</h1>{isVerifiedUser(selected) && <VerifiedBadge className="w-4 h-4 flex-shrink-0" />}{selectedMuted && <BellOff className="w-3.5 h-3.5 text-gold flex-shrink-0" />}</div>
                <p className="text-[11px] text-gray-500 truncate">@{selected.username} · {active}</p>
              </div>
            </button>
            <button type="button" data-action-menu="true" onClick={(event) => { event.stopPropagation(); setChatMenuOpen((v) => !v); }} className="h-10 w-8 bg-transparent border-0 text-gray-400 flex items-center justify-center tap-bounce" aria-label="Chat options">
              <MoreVertical className="w-5 h-5" />
            </button>
            {chatMenuOpen && (
              <div data-action-menu="true" className="absolute right-0 top-12 z-30 w-44 rounded-2xl border border-white/10 bg-[var(--app-surface-strong)] shadow-2xl overflow-hidden animate-card-in">
                <button onClick={() => { setChatMenuOpen(false); block(selected); }} disabled={busyId === selected.uid} className="w-full px-4 py-3 text-left text-sm text-red-300 hover:bg-red-500/10 flex items-center gap-2 disabled:opacity-50"><Ban className="w-4 h-4" />Block</button>
                <button onClick={() => { setChatMenuOpen(false); unfriend(selected); }} disabled={busyId === selected.uid} className="w-full px-4 py-3 text-left text-sm text-gray-200 hover:bg-white/5 flex items-center gap-2 disabled:opacity-50"><UserMinus className="w-4 h-4" />Unfriend</button>
                <button onClick={() => toggleMuteChatLocal(selected)} className="w-full px-4 py-3 text-left text-sm text-gold hover:bg-white/5 flex items-center gap-2"><BellOff className="w-4 h-4" />{selectedMuted ? "Unmute" : "Mute"}</button>
                <button onClick={() => deleteChatLocal(selected)} className="w-full px-4 py-3 text-left text-sm text-secondary hover:bg-white/5 flex items-center gap-2"><Trash2 className="w-4 h-4" />Delete chat</button>
              </div>
            )}
          </div>
          {unreadCount > 0 && <div className="mt-2 text-right"><span className="rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] text-secondary font-bold">{unreadCount} new</span></div>}
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto px-3 py-4 space-y-3 bg-[radial-gradient(circle_at_top_right,rgba(0,212,180,0.07),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(57,255,20,0.055),transparent_30%)]">
          {messages.length === 0 && <p className="text-sm text-gray-500 text-center mt-10">No messages yet. Start the conversation.</p>}
          {messages.map((msg) => {
            const mine = msg.from === user.uid;
            return (
              <div key={msg.id} className={`flex items-end gap-2 ${mine ? "justify-end" : "justify-start"}`}>
                {!mine && <button onClick={() => navigate(`/public-profile?userId=${encodeURIComponent(selected.uid)}`)} className="bg-transparent border-0 p-0 shrink-0 tap-bounce" aria-label="View profile"><UserAvatar photoURL={selected.photoURL} avatar={selected.avatar} name={selected.displayName} sizeClass="w-7 h-7" iconClassName="w-3 h-3" /></button>}
                <div className={`max-w-[76%] rounded-2xl px-3 py-2 text-[13px] ${mine ? "sr-chat-bubble-sent font-semibold rounded-br-sm" : "sr-chat-bubble-received rounded-bl-sm"}`}>
                  <p className="whitespace-pre-wrap break-words leading-snug">{msg.content}</p>
                  <div className={`mt-1 flex items-center gap-1.5 ${mine ? "justify-end" : "justify-start text-gray-500"}`}>
                    <span className={`text-[10px] ${mine ? "text-black/60" : "text-gray-500"}`}>{messageTime(msg)}</span>
                    {mine && <MessageStatus msg={msg} />}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="sr-bottom-input shrink-0 border-t bg-[var(--app-surface-strong)]/95 p-3 pb-[max(env(safe-area-inset-bottom),12px)] backdrop-blur-xl">
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
    <div className="sr-page relative -mt-2 mx-auto max-w-[420px] space-y-3 animate-card-in">
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
                  <div className="flex items-center gap-1.5 min-w-0"><p className="text-sm font-bold text-white truncate">{person.displayName}</p>{isVerifiedUser(person) && <VerifiedBadge className="w-4 h-4 flex-shrink-0" />}</div>
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
        <Card className="sr-card border border-secondary/20 bg-secondary/5">
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

      <Card className="sr-card relative min-h-[70vh]">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="text-sm font-bold text-white">My Friends</p>
            <p className="text-xs text-gray-500 mt-0.5">{friends.length} added</p>
          </div>
          <div className="relative">
            <button
              type="button"
              data-action-menu="true"
              onClick={(event) => { event.stopPropagation(); setTopMenuOpen((v) => !v); setMenu({ uid: "", open: false }); }}
              className="h-8 w-8 bg-transparent border-0 text-gray-400 flex items-center justify-center tap-bounce"
              aria-label="Inbox options"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            {topMenuOpen && (
              <div data-action-menu="true" className="absolute right-0 top-9 z-30 w-44 rounded-2xl border border-white/10 bg-[var(--app-surface-strong)] shadow-2xl overflow-hidden animate-card-in">
                <button onClick={() => { setTopMenuOpen(false); load(); }} className="w-full px-4 py-3 text-left text-sm text-gray-200 hover:bg-white/5 flex items-center gap-2"><RefreshCw className="w-4 h-4" />Refresh</button>
                <button onClick={() => { setTopMenuOpen(false); setShowBlockedList((v) => !v); }} className="w-full px-4 py-3 text-left text-sm text-red-300 hover:bg-red-500/10 flex items-center gap-2"><Ban className="w-4 h-4" />Block list</button>
              </div>
            )}
          </div>
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
              onMessage={() => { const next = { ...person, muted: isChatMutedLocal(user.uid, person.uid), unreadCount: 0, hasUnread: false }; setSelected(next); setFriends((items) => { const updated = sortFriendsByLatest(items.map((item) => item.uid === person.uid ? next : item)); saveFriendsCache(user.uid, updated); return updated; }); setMenu({ uid: "", open: false }); }}
              onViewProfile={() => { setMenu({ uid: "", open: false }); navigate(`/public-profile?userId=${encodeURIComponent(person.uid)}`); }}
              onDeleteChat={() => deleteChatLocal(person)}
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
