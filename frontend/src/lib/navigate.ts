// Global router registry — set by RouterProvider in layout
let _push: ((path: string) => void) | null = null;

export function registerRouter(push: (path: string) => void) {
  _push = push;
}

export function navigate(path: string) {
  if (typeof window === "undefined") return;

  // Ensure trailing slash for Next.js static export
  let url = path;
  if (
    url !== "/" &&
    !url.endsWith("/") &&
    !url.includes(".") &&
    !url.includes("?") &&
    !url.includes("#")
  ) {
    url = url + "/";
  }

  // Prefer Next.js router (no page reload, preserves auth state)
  if (_push) {
    _push(url);
    return;
  }

  // Fallback: history.pushState (no reload, but Next.js won't re-render)
  // This shouldn't normally be reached if RouterProvider is mounted
  const isCapacitor =
    typeof (window as any).Capacitor !== "undefined" &&
    (window as any).Capacitor?.isNativePlatform?.() === true;

  const origin = isCapacitor ? window.location.origin : "";
  window.location.href = origin + url;
}
