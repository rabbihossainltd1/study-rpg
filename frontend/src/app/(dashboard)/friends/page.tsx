"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import {
  acceptFriendRequest,
  createChallenge,
  getFriendsForUser,
  getIncomingFriendRequests,
  getMessagesWithFriend,
  sendQuickMessage,
  type FriendMessage,
  type PublicUserResult,
} from "@/lib/firebase";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { UserAvatar } from "@/components/ui/AppIcon";
import { MessageCircle, Swords, Users, CheckCircle2, RefreshCw, Send, ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";

function PersonRow({ person, onMessage, onChallenge, busy }: { person: PublicUserResult; onMessage: () => void; onChallenge: () => void; busy: boolean }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.035] border border-white/10 hover:border-primary/20 transition-all">
      <UserAvatar photoURL={person.photoURL} avatar={person.avatar} name={person.displayName} sizeClass="w-12 h-12" iconClassName="w-5 h-5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-black text-white truncate">{person.displayName}</p>
        <p className="text-xs text-gray-500 truncate">@{person.username} · LV.{person.level} · {person.district || "BD"}</p>
      </div>
      <button onClick={onMessage} className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/25 text-secondary flex items-center justify-center tap-bounce" aria-label="Message">
        <MessageCircle className="w-4 h-4" />
      </button>
      <button onClick={onChallenge} disabled={busy} className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/25 text-gold flex items-center justify-center tap-bounce disabled:opacity-50" aria-label="Challenge">
        <Swords className="w-4 h-4" />
      </button>
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

  const load = async () => {
    if (!user || user.uid.startsWith("guest_")) return;
    setLoading(true);
    try {
      const [friendList, requestList] = await Promise.all([
        getFriendsForUser(user.uid),
        getIncomingFriendRequests(user.uid),
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

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  useEffect(() => {
    if (!user || !selected || user.uid.startsWith("guest_")) return;
    getMessagesWithFriend(user.uid, selected.uid).then(setMessages).catch(() => setMessages([]));
  }, [user, selected]);

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
    } catch {
      toast.error("Challenge failed");
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
      setMessages(await getMessagesWithFriend(user.uid, selected.uid));
    } catch {
      toast.error("Message failed");
    } finally {
      setBusyId(null);
    }
  };

  if (selected) {
    return (
      <div className="space-y-4 animate-card-in">
        <div className="flex items-center gap-3">
          <button onClick={() => setSelected(null)} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 tap-bounce">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <UserAvatar photoURL={selected.photoURL} avatar={selected.avatar} name={selected.displayName} sizeClass="w-11 h-11" iconClassName="w-5 h-5" />
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-black text-white truncate">{selected.displayName}</h1>
            <p className="text-xs text-gray-500 truncate">@{selected.username} · ID {selected.studentId}</p>
          </div>
          <Button size="sm" variant="gold" onClick={() => challenge(selected)} disabled={busyId === selected.uid}><Swords className="w-4 h-4" /></Button>
        </div>

        <Card className="min-h-[65vh] flex flex-col p-0 overflow-hidden">
          <div className="flex-1 p-4 space-y-2 overflow-y-auto max-h-[65vh]">
            {messages.length === 0 && <p className="text-sm text-gray-500 text-center mt-10">No messages yet.</p>}
            {messages.map((msg) => {
              const mine = msg.from === user.uid;
              return (
                <div key={msg.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[78%] rounded-2xl px-4 py-2 text-sm ${mine ? "bg-primary text-black font-semibold" : "bg-white/7 border border-white/10 text-gray-200"}`}>
                    {msg.content}
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
            <p className="text-sm text-gray-500">Friends, messages and quiz challenges</p>
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
        <p className="text-sm font-bold text-white mb-3">My Friends</p>
        <div className="space-y-2">
          {friends.length === 0 && <p className="text-sm text-gray-500">No friends yet. Use the top search bar to add students.</p>}
          {friends.map((person) => (
            <PersonRow key={person.uid} person={person} busy={busyId === person.uid} onMessage={() => setSelected(person)} onChallenge={() => challenge(person)} />
          ))}
        </div>
      </Card>
    </div>
  );
}
