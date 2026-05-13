const fs = require("fs");
const path = require("path");

// Script runs from frontend/ directory (npm run build runs in frontend/)
// So out/ is at frontend/out/
const outDir = path.resolve(process.cwd(), "out");
const nextDirOld = path.join(outDir, "_next");
const nextDirNew = path.join(outDir, "next");

console.log("Working directory:", process.cwd());
console.log("outDir:", outDir);
console.log("_next exists:", fs.existsSync(nextDirOld));
console.log("out/ contents:", fs.existsSync(outDir) ? fs.readdirSync(outDir).join(", ") : "NOT FOUND");

if (!fs.existsSync(nextDirOld)) {
  console.error("ERROR: out/_next not found!");
  process.exit(1);
}

// Step 1: Rename _next -> next
fs.renameSync(nextDirOld, nextDirNew);
console.log("Renamed: out/_next -> out/next");

// Step 2: Fix HTML references
function walk(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) walk(full, results);
    else results.push(full);
  }
  return results;
}

function prefixFor(file) {
  const rel = path.relative(outDir, path.dirname(file));
  if (!rel || rel === ".") return ".";
  const depth = rel.split(path.sep).filter(Boolean).length;
  return Array(depth).fill("..").join("/");
}

let fixed = 0;
for (const file of walk(outDir)) {
  if (!file.endsWith(".html")) continue;
  const prefix = prefixFor(file);
  let html = fs.readFileSync(file, "utf8");
  const original = html;

  html = html
    .replace(/(src|href)="\/_next\//g, `$1="${prefix}/next/`)
    .replace(/(src|href)="\.\/_next\//g, `$1="${prefix}/next/`)
    .replace(/(src|href)="\.\.\/_next\//g, `$1="${prefix}/next/`)
    .replace(/"\/_next\//g, `"${prefix}/next/`)
    .replace(/"\.\/_next\//g, `"${prefix}/next/`)
    .replace(/(src|href)="\/manifest\.json"/g, `$1="${prefix}/manifest.json"`)
    .replace(/(src|href)="\/favicon\.ico"/g, `$1="${prefix}/favicon.ico"`);

  if (html !== original) {
    fs.writeFileSync(file, html);
    fixed++;
    console.log(`Fixed: ${path.relative(outDir, file)} (prefix: ${prefix})`);
  }
}

const chunkCount = fs.readdirSync(path.join(nextDirNew, "static", "chunks")).length;
console.log(`\nDone! Fixed ${fixed} HTML files. Chunks: ${chunkCount}`);
