"use client";

import { useEffect } from "react";
import { requestAppNotificationPermission } from "@/lib/notifications";

export function NotificationPermissionBoot() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const native = Boolean((window as any).Capacitor?.isNativePlatform?.());
    if (!native) return;

    const key = "study-rpg-notification-permission-boot-v137";
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");

    const timer = window.setTimeout(() => {
      requestAppNotificationPermission("").catch(() => undefined);
    }, 700);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
