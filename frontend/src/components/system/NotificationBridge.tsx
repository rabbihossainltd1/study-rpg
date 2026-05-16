"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { subscribeUserNotifications } from "@/lib/firebase";
import { getAppNotificationPermissionState, requestAppNotificationPermission, showDeviceNotification } from "@/lib/notifications";

export function NotificationBridge() {
  const user = useUserStore((state) => state.user);

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

    const timer = window.setTimeout(ensurePermission, 900);
    const onFocus = () => ensurePermission();
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);

    return () => {
      alive = false;
      window.clearTimeout(timer);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [user?.uid]);

  useEffect(() => {
    if (!user || user.uid.startsWith("guest_")) return;
    const unsubscribe = subscribeUserNotifications(user.uid, (notification) => {
      showDeviceNotification(notification).catch(() => undefined);
    });
    return () => unsubscribe?.();
  }, [user?.uid]);

  return null;
}
