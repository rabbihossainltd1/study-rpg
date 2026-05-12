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

  const isCapacitor =
    typeof (window as any).Capacitor !== "undefined" &&
    (window as any).Capacitor?.isNativePlatform?.() === true;

  if (isCapacitor) {
    // Use href instead of replace to avoid blank page on static export
    window.location.href = window.location.origin + url;
  } else {
    window.location.href = url;
  }
}
