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

  try {
    if (typeof appRouter === "function") {
      appRouter(url);
      return;
    }

    if (appRouter && typeof appRouter.push === "function") {
      appRouter.push(url);
      return;
    }
  } catch (_) {
    // Fall back below.
  }

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
