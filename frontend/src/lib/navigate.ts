export function navigate(path: string) {
  if (typeof window === "undefined") return;

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
    window.location.href = window.location.origin + url;
  } else {
    window.location.href = url;
  }
}

// No-op: kept for compatibility with RouterProvider
export function registerRouter(_router: any) {}
