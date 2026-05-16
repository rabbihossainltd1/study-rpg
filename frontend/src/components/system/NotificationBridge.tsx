"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { subscribeUserNotifications } from "@/lib/firebase";
import { requestAppNotificationPermission, showDeviceNotification } from "@/lib/notifications";

export function NotificationBridge() {
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user || user.uid.startsWith("guest_")) return;
    const permissionKey = `study-rpg-notification-permission-${user.uid}`;
    if (typeof window !== "undefined" && !localStorage.getItem(permissionKey)) {
      localStorage.setItem(permissionKey, "requested");
      requestAppNotificationPermission(user.uid).catch(() => undefined);
    }
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
