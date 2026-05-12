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

function prefixFor(file) {
  const rel = path.relative(outDir, path.dirname(file));
  if (!rel) return ".";
  return rel.split(path.sep).filter(Boolean).map(() => "..").join("/");
}

for (const file of walk(outDir)) {
  if (!file.endsWith(".html")) continue;

  const prefix = prefixFor(file);
  let html = fs.readFileSync(file, "utf8");

  html = html
    .replace(/(href|src)="\/_next\//g, `$1="${prefix}/_next/`)
    .replace(/(href|src)="\/manifest\.json"/g, `$1="${prefix}/manifest.json`)
    .replace(/(href|src)="\/favicon\.ico"/g, `$1="${prefix}/favicon.ico`)
    .replace(/"\/_next\//g, `"${prefix}/_next/`)
    .replace(/'\/_next\//g, `'${prefix}/_next/`);

  fs.writeFileSync(file, html);
}

console.log("Capacitor static asset paths fixed.");
