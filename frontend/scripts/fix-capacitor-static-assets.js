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
        .replace(/\/_next\//g, "/next/")
        .replace(/\\\/_next\\\//g, "\\/next\\/")
        .replace(/"\.\/next\//g, '"/next/')
        .replace(/'\.\/next\//g, "'/next/")
        .replace(/`\.\/next\//g, "`/next/")
        .replace(/href="\.\/next\//g, 'href="/next/')
        .replace(/src="\.\/next\//g, 'src="/next/')
        .replace(/"next\/static\//g, '"/next/static/')
        .replace(/'next\/static\//g, "'/next/static/")
        .replace(/`next\/static\//g, "`/next/static/");

      fs.writeFileSync(fullPath, content, "utf8");
    }
  }
}

if (!fs.existsSync(outDir)) {
  console.error("Missing Next export directory:", outDir);
  process.exit(1);
}

walk(outDir);

if (fs.existsSync(newNextDir)) {
  fs.rmSync(newNextDir, { recursive: true, force: true });
}

if (fs.existsSync(oldNextDir)) {
  fs.renameSync(oldNextDir, newNextDir);
}

walk(outDir);

const indexFile = path.join(outDir, "index.html");
const indexHtml = fs.existsSync(indexFile) ? fs.readFileSync(indexFile, "utf8") : "";

if (!fs.existsSync(path.join(outDir, "next", "static", "chunks"))) {
  console.error("FATAL: out/next/static/chunks not found after asset fix");
  process.exit(1);
}

if (indexHtml.includes("/_next/") || indexHtml.includes("\\/_next\\/") || indexHtml.includes("./next/")) {
  console.error("FATAL: bad asset references still exist in index.html");
  process.exit(1);
}

console.log("Capacitor asset fix completed successfully.");
