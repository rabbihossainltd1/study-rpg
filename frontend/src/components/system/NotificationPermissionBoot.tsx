"use client";

import { useEffect } from "react";
import { getAppNotificationPermissionState, requestAppNotificationPermission } from "@/lib/notifications";

export function NotificationPermissionBoot() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const native = Boolean((window as any).Capacitor?.isNativePlatform?.());
    if (!native) return;

    let alive = true;
    let busy = false;
    let attempts = 0;

    const ask = async () => {
      if (!alive || busy) return;
      const state = await getAppNotificationPermissionState().catch(() => "unknown");
      if (state === "granted") return;
      busy = true;
      attempts += 1;
      await requestAppNotificationPermission("").catch(() => false);
      busy = false;
    };

    const timers = [450, 1600, 4200, 9000].map((ms) => window.setTimeout(ask, ms));
    const interval = window.setInterval(() => {
      if (attempts >= 6) return;
      ask().catch(() => undefined);
    }, 30000);
    const onWake = () => ask().catch(() => undefined);
    const onFirstGesture = () => ask().catch(() => undefined);

    window.addEventListener("load", onWake);
    window.addEventListener("focus", onWake);
    document.addEventListener("visibilitychange", onWake);
    document.addEventListener("pointerdown", onFirstGesture, { once: true, passive: true });
    document.addEventListener("touchstart", onFirstGesture, { once: true, passive: true });

    return () => {
      alive = false;
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearInterval(interval);
      window.removeEventListener("load", onWake);
      window.removeEventListener("focus", onWake);
      document.removeEventListener("visibilitychange", onWake);
      document.removeEventListener("pointerdown", onFirstGesture);
      document.removeEventListener("touchstart", onFirstGesture);
    };
  }, []);

  return null;
}
