const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "..", "out");

function walk(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, results);
    else results.push(full);
  }
  return results;
}

function relPrefix(file) {
  const relativeDir = path.relative(outDir, path.dirname(file));
  if (!relativeDir) return ".";
  const depth = relativeDir.split(path.sep).filter(Boolean).length;
  return Array(depth).fill("..").join("/");
}

for (const file of walk(outDir)) {
  if (!file.endsWith(".html")) continue;
  const prefix = relPrefix(file);
  let html = fs.readFileSync(file, "utf8");

  html = html
    .replace(/(href|src)="\/_next\//g, `$1="${prefix}/_next/`)
    .replace(/(href|src)="\/manifest\.json"/g, `$1="${prefix}/manifest.json`)
    .replace(/(href|src)="\/favicon\.ico"/g, `$1="${prefix}/favicon.ico`);

  fs.writeFileSync(file, html);
}

console.log("Capacitor static asset paths fixed.");
