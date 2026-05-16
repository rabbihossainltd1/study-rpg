"use client";

import { useEffect, useRef } from "react";
import { useUserStore } from "@/store/useUserStore";
import { getPendingUserNotifications, markUserNotificationShown, subscribeUserNotifications, type AppNotification } from "@/lib/firebase";
import { getAppNotificationPermissionState, requestAppNotificationPermission, showDeviceNotification } from "@/lib/notifications";

export function NotificationBridge() {
  const user = useUserStore((state) => state.user);
  const shownInSession = useRef(new Set<string>());

  useEffect(() => {
    if (!user || user.uid.startsWith("guest_")) return;
    let alive = true;

    const ensurePermission = async () => {
      if (!alive) return;
      const state = await getAppNotificationPermissionState().catch(() => "unknown");
      if (state !== "granted") {
        await requestAppNotificationPermission(user.uid).catch(() => false);
      }
    };

    const timer = window.setTimeout(ensurePermission, 700);
    const repeatTimer = window.setInterval(ensurePermission, 90000);
    const onFocus = () => ensurePermission();
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);

    return () => {
      alive = false;
      window.clearTimeout(timer);
      window.clearInterval(repeatTimer);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [user?.uid]);

  useEffect(() => {
    if (!user || user.uid.startsWith("guest_")) return;

    const handleNotification = async (notification: AppNotification) => {
      if (!notification.id || shownInSession.current.has(notification.id)) return;
      shownInSession.current.add(notification.id);
      await showDeviceNotification(notification).catch(() => undefined);
      await markUserNotificationShown(user.uid, notification.id).catch(() => undefined);
    };

    const unsubscribe = subscribeUserNotifications(user.uid, (notification) => {
      handleNotification(notification).catch(() => undefined);
    });

    const pollPending = async () => {
      const pending = await getPendingUserNotifications(user.uid).catch(() => []);
      for (const notification of pending) {
        await handleNotification(notification).catch(() => undefined);
      }
    };

    const firstPoll = window.setTimeout(() => pollPending().catch(() => undefined), 1200);
    const pollTimer = window.setInterval(() => pollPending().catch(() => undefined), 8000);

    return () => {
      unsubscribe?.();
      window.clearTimeout(firstPoll);
      window.clearInterval(pollTimer);
    };
  }, [user?.uid]);

  return null;
}
