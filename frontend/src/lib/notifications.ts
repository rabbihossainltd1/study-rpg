import toast from "react-hot-toast";
import { savePushToken, type AppNotification } from "@/lib/firebase";

function isNativeCapacitor() {
  if (typeof window === "undefined") return false;
  return Boolean((window as any).Capacitor?.isNativePlatform?.());
}

export async function requestAppNotificationPermission(uid: string) {
  if (typeof window === "undefined" || !uid || uid.startsWith("guest_")) return;

  try {
    if (isNativeCapacitor()) {
      const [{ PushNotifications }, { LocalNotifications }] = await Promise.all([
        import("@capacitor/push-notifications"),
        import("@capacitor/local-notifications"),
      ]);

      await LocalNotifications.requestPermissions().catch(() => undefined);
      const permission = await PushNotifications.requestPermissions().catch(() => null);
      if (permission?.receive === "granted") {
        await PushNotifications.register().catch(() => undefined);
        PushNotifications.addListener("registration", (token) => {
          savePushToken(uid, token.value, "android").catch(() => undefined);
        }).catch(() => undefined);
      }
      return;
    }

    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission().catch(() => undefined);
    }
  } catch {
    // Notification permission is optional; app must keep working if the device blocks it.
  }
}

export async function showDeviceNotification(notification: AppNotification) {
  const title = notification.title || "Study RPG";
  const body = notification.body || "New notification";

  try {
    if (isNativeCapacitor()) {
      const { LocalNotifications } = await import("@capacitor/local-notifications");
      await LocalNotifications.schedule({
        notifications: [
          {
            id: Math.floor(Date.now() % 2147483647),
            title,
            body,
            schedule: { at: new Date(Date.now() + 300) },
          },
        ],
      });
      return;
    }

    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      const webNotification = new Notification(title, { body, icon: "/manifest.json" });
      webNotification.onclick = () => {
        window.focus();
        if (notification.link) window.location.href = notification.link;
      };
      return;
    }
  } catch {
    // Fall back to in-app toast below.
  }

  toast(`${title}: ${body}`);
}
