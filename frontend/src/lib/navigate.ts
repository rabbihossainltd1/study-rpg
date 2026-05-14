type AppRouter = {
  push: (path: string) => void;
  replace?: (path: string) => void;
} | null;

let appRouter: AppRouter = null;

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

export function registerRouter(router: AppRouter) {
  appRouter = router;
}

export function navigate(path: string) {
  if (typeof window === "undefined") return;

  const url = normalizePathForRouter(path);

  // Use Next router if available
  if (appRouter) {
    appRouter.push(url);
    return;
  }

  // Fallback
  window.history.pushState({}, "", url);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
