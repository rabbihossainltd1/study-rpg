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

function isCapacitor(): boolean {
  return (
    typeof window !== "undefined" &&
    ((window as any).Capacitor?.isNativePlatform?.() === true ||
      window.location.protocol === "capacitor:" ||
      window.location.protocol === "ionic:" ||
      window.navigator.userAgent.includes("wv"))
  );
}

export function navigate(path: string) {
  if (typeof window === "undefined") return;

  const url = normalizePath(path);

  if (isCapacitor()) {
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
