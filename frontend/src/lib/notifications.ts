import toast from "react-hot-toast";
import { savePushToken, type AppNotification } from "@/lib/firebase";

let pushRegistrationListenerAttached = false;
let pendingPushToken = "";

function isNativeCapacitor() {
  if (typeof window === "undefined") return false;
  return Boolean((window as any).Capacitor?.isNativePlatform?.());
}


const STUDY_RPG_CHANNEL_ID = "study-rpg-alerts";

async function ensureAndroidNotificationChannel(LocalNotifications: any) {
  if (!isNativeCapacitor() || typeof LocalNotifications?.createChannel !== "function") return;
  await LocalNotifications.createChannel({
    id: STUDY_RPG_CHANNEL_ID,
    name: "Study RPG Alerts",
    description: "Friend request, message and update alerts",
    importance: 5,
    visibility: 1,
    sound: "default",
    vibration: true,
  }).catch(() => undefined);
}

type PermissionState = "granted" | "denied" | "prompt" | "unknown";

export async function getAppNotificationPermissionState(): Promise<PermissionState> {
  if (typeof window === "undefined") return "unknown";

  try {
    if (isNativeCapacitor()) {
      const { LocalNotifications } = await import("@capacitor/local-notifications");
      const localStatus = await LocalNotifications.checkPermissions().catch(() => null);
      if (localStatus?.display === "granted") return "granted";
      if (localStatus?.display === "denied") return "denied";
      return "prompt";
    }

    if ("Notification" in window) return Notification.permission as PermissionState;
  } catch {
    return "unknown";
  }

  return "unknown";
}

export async function requestAppNotificationPermission(uid = ""): Promise<boolean> {
  if (typeof window === "undefined") return false;

  try {
    if (isNativeCapacitor()) {
      const [{ PushNotifications }, { LocalNotifications }] = await Promise.all([
        import("@capacitor/push-notifications"),
        import("@capacitor/local-notifications"),
      ]);

      await ensureAndroidNotificationChannel(LocalNotifications);
      const localBefore = await LocalNotifications.checkPermissions().catch(() => null);
      const localPermission = localBefore?.display === "granted"
        ? localBefore
        : await LocalNotifications.requestPermissions().catch(() => null);

      const pushPermission = await PushNotifications.requestPermissions().catch(() => null);
      if (pushPermission?.receive === "granted") {
        await PushNotifications.register().catch(() => undefined);
        if (!pushRegistrationListenerAttached) {
          pushRegistrationListenerAttached = true;
          PushNotifications.addListener("registration", (token) => {
            pendingPushToken = token.value || pendingPushToken;
            if (uid && !uid.startsWith("guest_") && pendingPushToken) savePushToken(uid, pendingPushToken, "android").catch(() => undefined);
          }).catch(() => undefined);
        }
      }

      if (uid && !uid.startsWith("guest_") && pendingPushToken) savePushToken(uid, pendingPushToken, "android").catch(() => undefined);
      return localPermission?.display === "granted" || pushPermission?.receive === "granted";
    }

    if ("Notification" in window) {
      if (Notification.permission === "granted") return true;
      const permission = await Notification.requestPermission().catch(() => "default");
      return permission === "granted";
    }
  } catch {
    // Notification permission is optional; app must keep working if the device blocks it.
  }

  return false;
}

export async function showDeviceNotification(notification: AppNotification) {
  const title = notification.title || "Study RPG";
  const body = notification.body || "New notification";

  try {
    if (isNativeCapacitor()) {
      const { LocalNotifications } = await import("@capacitor/local-notifications");
      await ensureAndroidNotificationChannel(LocalNotifications);
      const permission = await LocalNotifications.checkPermissions().catch(() => null);
      if (permission?.display !== "granted") {
        await LocalNotifications.requestPermissions().catch(() => undefined);
      }
      await LocalNotifications.schedule({
        notifications: [
          {
            id: Math.floor(Date.now() % 2147483647),
            title,
            body,
            schedule: { at: new Date(Date.now() + 300) },
            channelId: STUDY_RPG_CHANNEL_ID,
            sound: "default",
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
