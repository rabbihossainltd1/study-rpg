type AppRouter = { push: (path: string) => void } | ((path: string) => void) | null;

let appRouter: AppRouter = null;

function normalizePath(path: string) {
  if (!path) return "/";
  let url = path.startsWith("/") ? path : `/${path}`;
  if (
    url !== "/" &&
    !url.endsWith("/") &&
    !url.includes("?") &&
    !url.includes("#") &&
    !url.split("/").pop()?.includes(".")
  ) {
    url += "/";
  }
  return url;
}

// Capacitor with androidScheme:"https" serves pages as https://studyrpg.app/...
// so protocol check won't detect it. Use Capacitor bridge OR hostname check.
function isCapacitor(): boolean {
  if (typeof window === "undefined") return false;
  // Most reliable: check Capacitor global
  if ((window as any).Capacitor?.isNativePlatform?.() === true) return true;
  if ((window as any).Capacitor?.platform === "android") return true;
  if ((window as any).Capacitor?.platform === "ios") return true;
  // Fallback: check hostname set in capacitor.config.ts
  if (window.location.hostname === "studyrpg.app") return true;
  // Fallback: protocol check for non-https schemes
  if (window.location.protocol === "capacitor:") return true;
  if (window.location.protocol === "ionic:") return true;
  return false;
}

export function navigate(path: string) {
  if (typeof window === "undefined") return;

  const url = normalizePath(path);

  if (isCapacitor()) {
    // In Capacitor, use location.href for hard navigation between pages.
    // pushState doesn't trigger Next.js route changes in static export mode.
    window.location.href = url;
    return;
  }

  try {
    if (typeof appRouter === "function") {
      appRouter(url);
      return;
    }
    if (appRouter && typeof appRouter.push === "function") {
      appRouter.push(url);
      return;
    }
  } catch (_) {}

  try {
    window.history.pushState({}, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  } catch (_) {
    window.location.assign(url);
  }
}

export function registerRouter(router: AppRouter) {
  appRouter = router;
}
