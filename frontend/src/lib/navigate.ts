// Capacitor static export compatible navigation
// trailingSlash: true requires paths like /dashboard/
export function navigate(path: string) {
  let url = path;
  if (url !== "/" && !url.endsWith("/") && !url.includes(".") && !url.includes("?") && !url.includes("#")) {
    url = url + "/";
  }
  window.location.href = url;
}
