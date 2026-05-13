const fs = require("fs");
const path = require("path");

const outDir = path.resolve(process.cwd(), "out");
const oldNextDir = path.join(outDir, "_next");
const newNextDir = path.join(outDir, "next");

if (!fs.existsSync(outDir)) {
  console.error("FATAL: out folder not found.");
  process.exit(1);
}

if (fs.existsSync(oldNextDir)) {
  if (fs.existsSync(newNextDir)) fs.rmSync(newNextDir, { recursive: true, force: true });
  fs.renameSync(oldNextDir, newNextDir);
  console.log("Renamed out/_next to out/next");
} else if (fs.existsSync(newNextDir)) {
  console.log("out/next already exists");
} else {
  console.error("FATAL: neither out/_next nor out/next exists.");
  process.exit(1);
}

function walk(dir, results = []) {
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
  if (!rel || rel === ".") return ".";
  return rel.split(path.sep).filter(Boolean).map(() => "..").join("/");
}

let fixedHtml = 0;
for (const file of walk(outDir)) {
  if (!file.endsWith(".html")) continue;
  const prefix = prefixFor(file);
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  html = html
    .replace(/(src|href)="\/_next\//g, `$1="${prefix}/next/`)
    .replace(/(src|href)="\.\/_next\//g, `$1="${prefix}/next/`)
    .replace(/"\/_next\//g, `"${prefix}/next/`)
    .replace(/'\/_next\//g, `'${prefix}/next/`)
    .replace(/(src|href)="\/next\//g, `$1="${prefix}/next/`)
    .replace(/(src|href)="\/manifest\.json"/g, `$1="${prefix}/manifest.json"`)
    .replace(/(src|href)="\/favicon\.ico"/g, `$1="${prefix}/favicon.ico"`);
  if (html !== before) {
    fs.writeFileSync(file, html);
    fixedHtml += 1;
    console.log(`Fixed ${path.relative(outDir, file)} -> prefix ${prefix}`);
  }
}

const chunkDir = path.join(newNextDir, "static", "chunks");
const chunkCount = fs.existsSync(chunkDir) ? walk(chunkDir).filter((f) => f.endsWith(".js")).length : 0;
if (chunkCount === 0) {
  console.error("FATAL: no JS chunks found in out/next/static/chunks");
  process.exit(1);
}
console.log(`All Capacitor asset paths fixed. HTML files fixed: ${fixedHtml}. JS chunks: ${chunkCount}`);
