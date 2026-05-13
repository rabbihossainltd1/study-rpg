const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "..", "out");
const oldNextDir = path.join(outDir, "_next");
const newNextDir = path.join(outDir, "next");

function walk(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (
      entry.endsWith(".html") ||
      entry.endsWith(".js") ||
      entry.endsWith(".css") ||
      entry.endsWith(".json")
    ) {
      let content = fs.readFileSync(fullPath, "utf8");

      content = content
        // absolute _next → next
        .replace(/\/_next\//g, "/next/")

        // escaped json refs
        .replace(/\\\/_next\\\//g, "\\/next\\/")

        // route-relative refs
        .replace(/"\.\/next\//g, '"/next/')
        .replace(/'\.\/next\//g, "'/next/")
        .replace(/`\.\/next\//g, "`/next/")

        // html refs
        .replace(/href="\.\/next\//g, 'href="/next/')
        .replace(/src="\.\/next\//g, 'src="/next/')

        // safety
        .replace(/"next\/static\//g, '"/next/static/')
        .replace(/'next\/static\//g, "'/next/static/")
        .replace(/`next\/static\//g, "`/next/static/");

      fs.writeFileSync(fullPath, content, "utf8");
    }
  }
}

if (!fs.existsSync(outDir)) {
  console.error("Missing out directory:", outDir);
  process.exit(1);
}

console.log("Processing exported files...");

walk(outDir);

// rename _next → next
if (fs.existsSync(oldNextDir)) {
  console.log("Renaming _next → next");

  if (fs.existsSync(newNextDir)) {
    fs.rmSync(newNextDir, {
      recursive: true,
      force: true,
    });
  }

  fs.renameSync(oldNextDir, newNextDir);
}

// run replacement again after rename
walk(outDir);

const possibleDirs = [
  path.join(outDir, "next"),
  path.join(outDir, "_next"),
  path.join(outDir, "next", "static"),
  path.join(outDir, "_next", "static"),
];

const hasAssets = possibleDirs.some((dir) => fs.existsSync(dir));

if (!hasAssets) {
  console.error("FATAL: no next assets directory found");
  process.exit(1);
}

const indexFile = path.join(outDir, "index.html");

if (fs.existsSync(indexFile)) {
  const html = fs.readFileSync(indexFile, "utf8");

  if (
    html.includes("/_next/") ||
    html.includes("\\/_next\\/") ||
    html.includes("./next/")
  ) {
    console.error("FATAL: bad asset references still exist");
    process.exit(1);
  }
}

console.log("Capacitor asset fix completed successfully.");
