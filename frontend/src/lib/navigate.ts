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

  // In Capacitor WebView, Next.js client-side router is not available.
  // We must do a full page navigation via location.replace (no history stack buildup).
  window.location.replace(url);
}
