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

export function navigate(path: string) {
  if (typeof window === "undefined") return;
  const url = normalizePath(path);
  // Always use hard navigation - works in both Capacitor and web
  window.location.href = url;
}

export function registerRouter(router: AppRouter) {
  appRouter = router;
}
