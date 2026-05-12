export function navigate(path: string) {
  if (typeof window === "undefined") return;
  
  // Ensure trailing slash for Next.js static export
  let url = path;
  if (url !== "/" && !url.endsWith("/") && !url.includes(".") && !url.includes("?") && !url.includes("#")) {
    url = url + "/";
  }
  
  // Try multiple navigation methods
  try {
    window.location.href = url;
  } catch {
    try {
      window.location.assign(url);
    } catch {
      window.location.replace(url);
    }
  }
}
