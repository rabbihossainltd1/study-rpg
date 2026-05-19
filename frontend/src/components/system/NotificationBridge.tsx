"use client";

import { useEffect, useRef } from "react";
import { useUserStore } from "@/store/useUserStore";
import {
  getPendingUserNotifications,
  markUserNotificationShown,
  subscribeRecentMessagesForUser,
  subscribeUserNotifications,
  type AppNotification,
  type FriendMessage,
} from "@/lib/firebase";
import { getAppNotificationPermissionState, requestAppNotificationPermission, showDeviceNotification } from "@/lib/notifications";

function dateMs(value: unknown) {
  if (!value) return 0;
  if (value instanceof Date) return value.getTime();
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
  }
  const maybe = value as { toDate?: () => Date; seconds?: number; toMillis?: () => number };
  if (typeof maybe.toMillis === "function") return maybe.toMillis();
  if (typeof maybe.toDate === "function") return maybe.toDate().getTime();
  if (typeof maybe.seconds === "number") return maybe.seconds * 1000;
  return 0;
}

function getMutedChats(uid: string) {
  if (typeof window === "undefined") return [] as string[];
  try {
    return JSON.parse(localStorage.getItem(`studyRpgMutedChats_${uid}`) || "[]") as string[];
  } catch {
    return [] as string[];
  }
}

function messageSignature(from: string, body: string) {
  return `${from}|${String(body || "").slice(0, 120)}`;
}

function shownMessagesKey(uid: string) {
  return `studyRpgShownMessagePopupIds_${uid}`;
}

function readShownMessageIds(uid: string) {
  if (typeof window === "undefined") return [] as string[];
  try {
    return JSON.parse(localStorage.getItem(shownMessagesKey(uid)) || "[]") as string[];
  } catch {
    return [] as string[];
  }
}

function rememberShownMessageId(uid: string, messageId: string) {
  if (typeof window === "undefined" || !messageId) return;
  const current = readShownMessageIds(uid).filter(Boolean);
  if (current.includes(messageId)) return;
  const next = [...current.slice(-299), messageId];
  try {
    localStorage.setItem(shownMessagesKey(uid), JSON.stringify(next));
  } catch {}
}

export function NotificationBridge() {
  const user = useUserStore((state) => state.user);
  const shownInSession = useRef(new Set<string>());
  const shownMessageSignatures = useRef(new Set<string>());
  const seenMessageIds = useRef(new Set<string>());

  useEffect(() => {
    if (!user) return;
    let alive = true;

    const ensurePermission = async () => {
      if (!alive) return;
      const state = await getAppNotificationPermissionState().catch(() => "unknown");
      if (state !== "granted") {
        await requestAppNotificationPermission(user.uid.startsWith("guest_") ? "" : user.uid).catch(() => false);
      }
    };

    const timer = window.setTimeout(ensurePermission, 500);
    const repeatTimer = window.setInterval(ensurePermission, 60000);
    const onFocus = () => ensurePermission();
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    document.addEventListener("pointerdown", onFocus, { passive: true });

    return () => {
      alive = false;
      window.clearTimeout(timer);
      window.clearInterval(repeatTimer);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
      document.removeEventListener("pointerdown", onFocus);
    };
  }, [user?.uid]);

  useEffect(() => {
    if (!user || user.uid.startsWith("guest_")) return;

    seenMessageIds.current = new Set(readShownMessageIds(user.uid));
    shownMessageSignatures.current.clear();

    const isMessageSilenced = (fromUid: string) => {
      const activeChatUid = typeof window !== "undefined" ? String((window as any).studyRpgActiveChatUid || "") : "";
      const mutedChats = getMutedChats(user.uid);
      return fromUid === activeChatUid || mutedChats.includes(fromUid);
    };

    const handleNotification = async (notification: AppNotification) => {
      if (!notification.id || shownInSession.current.has(notification.id)) return;
      shownInSession.current.add(notification.id);

      const shouldSilenceMessage = notification.type === "message" && isMessageSilenced(notification.from);
      if (notification.type === "message") {
        const signature = messageSignature(notification.from, notification.body);
        if (shownMessageSignatures.current.has(signature)) {
          await markUserNotificationShown(user.uid, notification.id).catch(() => undefined);
          return;
        }
        shownMessageSignatures.current.add(signature);
      }

      if (!shouldSilenceMessage) await showDeviceNotification(notification).catch(() => undefined);
      await markUserNotificationShown(user.uid, notification.id).catch(() => undefined);
    };

    const unsubscribeNotifications = subscribeUserNotifications(user.uid, (notification) => {
      handleNotification(notification).catch(() => undefined);
    });

    const pollPending = async () => {
      const pending = await getPendingUserNotifications(user.uid).catch(() => []);
      for (const notification of pending) {
        await handleNotification(notification).catch(() => undefined);
      }
    };

    let firstMessageSnapshot = true;
    const unsubscribeMessages = subscribeRecentMessagesForUser(user.uid, (list: FriendMessage[]) => {
      const now = Date.now();
      for (const msg of list) {
        if (!msg.id || seenMessageIds.current.has(msg.id)) continue;
        const from = msg.from || msg.senderId || "";
        const to = msg.to || msg.receiverId || "";
        const incoming = from && from !== user.uid && (to === user.uid || msg.receiverId === user.uid || msg.participants?.includes(user.uid));
        if (!incoming) {
          seenMessageIds.current.add(msg.id);
          continue;
        }
        if (msg.read) {
          seenMessageIds.current.add(msg.id);
          rememberShownMessageId(user.uid, msg.id);
          continue;
        }

        const ms = dateMs(msg.createdAt);
        if (firstMessageSnapshot && ms && now - ms > 10 * 60 * 1000) {
          seenMessageIds.current.add(msg.id);
          continue;
        }
        if (isMessageSilenced(from)) {
          seenMessageIds.current.add(msg.id);
          rememberShownMessageId(user.uid, msg.id);
          continue;
        }

        const signature = messageSignature(from, msg.content);
        if (shownMessageSignatures.current.has(signature)) continue;
        shownMessageSignatures.current.add(signature);

        seenMessageIds.current.add(msg.id);
        rememberShownMessageId(user.uid, msg.id);

        showDeviceNotification({
          id: `message-${msg.id}`,
          type: "message",
          from,
          to: user.uid,
          title: "New message",
          body: String(msg.content || "You received a new message.").slice(0, 160),
          link: `/friends?chat=${from}`,
          shown: false,
          read: false,
          createdAt: msg.createdAt as any,
        }).catch(() => undefined);
      }
      firstMessageSnapshot = false;
    });

    const firstPoll = window.setTimeout(() => pollPending().catch(() => undefined), 900);
    const pollTimer = window.setInterval(() => pollPending().catch(() => undefined), 5000);

    return () => {
      unsubscribeNotifications?.();
      unsubscribeMessages?.();
      window.clearTimeout(firstPoll);
      window.clearInterval(pollTimer);
    };
  }, [user?.uid]);

  return null;
}
