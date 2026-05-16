type AppRouter = {
  push: (path: string) => void;
  replace?: (path: string) => void;
} | null;

let appRouter: AppRouter = null;

const SCROLL_PREFIX = "study_rpg_scroll_";

export function normalizePathForRouter(path: string) {
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

export function getScrollStorageKey(path = typeof window !== "undefined" ? window.location.pathname : "/") {
  return `${SCROLL_PREFIX}${normalizePathForRouter(path)}`;
}

export function saveCurrentScrollPosition() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(getScrollStorageKey(window.location.pathname), String(window.scrollY || 0));
  } catch {}
}

export function restoreSavedScrollPosition(path: string) {
  if (typeof window === "undefined") return;
  const key = getScrollStorageKey(path);
  const saved = Number(sessionStorage.getItem(key) || "0");
  if (!Number.isFinite(saved) || saved < 1) return;
  window.requestAnimationFrame(() => {
    window.scrollTo({ top: saved, behavior: "auto" });
  });
}

export function registerRouter(router: AppRouter) {
  appRouter = router;
}

export function navigate(path: string) {
  if (typeof window === "undefined") return;

  const url = normalizePathForRouter(path);
  saveCurrentScrollPosition();

  if (appRouter) {
    appRouter.push(url);
    return;
  }

  window.history.pushState({}, "", url);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
