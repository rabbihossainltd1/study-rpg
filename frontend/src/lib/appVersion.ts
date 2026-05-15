import { CURRENT_UPDATE_INFO } from "@/lib/updateInfo";

export const APP_VERSION = "1.3.2";
export const UPDATE_RELEASE_URL = "https://github.com/rabbihossainltd1/study-rpg/releases/latest";
export const UPDATE_API_URL = "https://api.github.com/repos/rabbihossainltd1/study-rpg/releases/latest";
export const UPDATE_PACKAGE_URL = "https://raw.githubusercontent.com/rabbihossainltd1/study-rpg/main/frontend/package.json";

export function compareVersion(a: string, b: string) {
  const pa = a.replace(/^v/i, "").split(".").map((n) => Number(n) || 0);
  const pb = b.replace(/^v/i, "").split(".").map((n) => Number(n) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    if ((pa[i] || 0) > (pb[i] || 0)) return 1;
    if ((pa[i] || 0) < (pb[i] || 0)) return -1;
  }
  return 0;
}

export type LatestUpdate = {
  version: string;
  url: string;
  title: string;
  notes: string[];
  apkUrl?: string;
};

function parseReleaseNotes(body?: string) {
  const lines = String(body || "")
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-*•\s]+/, "").trim())
    .filter(Boolean)
    .slice(0, 12);
  return lines.length ? lines : CURRENT_UPDATE_INFO.notesBn;
}

export async function fetchLatestUpdate(): Promise<LatestUpdate | null> {
  const release = await fetch(UPDATE_API_URL, { cache: "no-store" }).then((r) => r.ok ? r.json() : null).catch(() => null);
  if (release?.tag_name) {
    const version = String(release.tag_name).replace(/^v/i, "");
    const apkAsset = Array.isArray(release.assets)
      ? release.assets.find((asset: any) => String(asset?.name || "").toLowerCase().endsWith(".apk"))
      : null;
    return {
      version,
      url: release.html_url || UPDATE_RELEASE_URL,
      title: release.name || `Study RPG v${version}`,
      notes: parseReleaseNotes(release.body),
      apkUrl: apkAsset?.browser_download_url,
    };
  }

  const pkg = await fetch(UPDATE_PACKAGE_URL, { cache: "no-store" }).then((r) => r.ok ? r.json() : null).catch(() => null);
  if (pkg?.version) {
    return {
      version: String(pkg.version),
      url: UPDATE_RELEASE_URL,
      title: `Study RPG v${pkg.version}`,
      notes: CURRENT_UPDATE_INFO.notesBn,
    };
  }

  return null;
}
