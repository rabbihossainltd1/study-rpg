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

  // Check if running in Capacitor native WebView
  const isCapacitor =
    typeof (window as any).Capacitor !== "undefined" &&
    (window as any).Capacitor?.isNativePlatform?.() === true;

  if (isCapacitor) {
    // Build absolute URL based on current origin for Capacitor
    const origin = window.location.origin;
    window.location.href = origin + url;
  } else {
    window.location.href = url;
  }
}
