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
import { MessageCircle, Swords, Users, CheckCircle2, RefreshCw, Send } from "lucide-react";
import toast from "react-hot-toast";

function Avatar({ person }: { person: PublicUserResult }) {
  return (
    <div className="w-11 h-11 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center overflow-hidden text-xl flex-shrink-0">
      {person.photoURL ? <img src={person.photoURL} alt="" className="w-full h-full object-cover" /> : person.avatar || "⚡"}
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
      if (!selected && friendList[0]) setSelected(friendList[0]);
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
      toast.success("Message sent");
    } catch {
      toast.error("Message failed");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-5 animate-card-in">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">{language === "bn" ? "ফ্রেন্ডস" : "Friends"}</h1>
            <p className="text-sm text-gray-500">Accepted students, messages and quiz challenges</p>
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
                <Avatar person={person} />
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

      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <p className="text-sm font-bold text-white mb-3">My Friends</p>
          <div className="space-y-2">
            {friends.length === 0 && <p className="text-sm text-gray-500">No friends yet. Use dashboard search to add students.</p>}
            {friends.map((person) => (
              <button key={person.uid} onClick={() => setSelected(person)} className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left tap-bounce ${selected?.uid === person.uid ? "bg-primary/10 border-primary/30" : "bg-white/5 border-white/10"}`}>
                <Avatar person={person} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{person.displayName}</p>
                  <p className="text-xs text-gray-500 truncate">@{person.username} · LV.{person.level} · {person.district || "BD"}</p>
                </div>
                <Button size="sm" variant="gold" onClick={(e) => { e.stopPropagation(); challenge(person); }} disabled={busyId === person.uid}>
                  <Swords className="w-3 h-3" />
                </Button>
              </button>
            ))}
          </div>
        </Card>

        <Card className="min-h-[360px] flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="w-4 h-4 text-secondary" />
            <p className="text-sm font-bold text-white">{selected ? `Message ${selected.displayName}` : "Messages"}</p>
          </div>
          <div className="flex-1 rounded-xl bg-black/20 border border-white/5 p-3 space-y-2 overflow-y-auto max-h-[320px]">
            {!selected && <p className="text-sm text-gray-500">Select a friend to message.</p>}
            {selected && messages.length === 0 && <p className="text-sm text-gray-500">No messages yet.</p>}
            {selected && messages.map((msg) => {
              const mine = msg.from === user.uid;
              return (
                <div key={msg.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${mine ? "bg-primary/15 border border-primary/25 text-primary" : "bg-white/5 border border-white/10 text-gray-200"}`}>
                    {msg.content}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-2 mt-3">
            <input value={text} onChange={(e) => setText(e.target.value)} disabled={!selected} placeholder="Write message..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-secondary/50" />
            <Button onClick={sendMessage} disabled={!selected || !text.trim() || busyId === selected?.uid}><Send className="w-4 h-4" /></Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
