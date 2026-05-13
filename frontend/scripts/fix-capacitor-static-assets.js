/**
 * fix-capacitor-static-assets.js
 *
 * TWO JOBS:
 * 1. Rename out/_next -> out/next (Android aapt skips underscore directories)
 * 2. Fix all HTML path references from /_next/ or ../_next/ or ./_next/ -> correct relative /next/
 */

const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "out");
const nextDirOld = path.join(outDir, "_next");
const nextDirNew = path.join(outDir, "next");

// Step 1: Rename _next -> next
if (fs.existsSync(nextDirOld)) {
  fs.renameSync(nextDirOld, nextDirNew);
  console.log("Renamed: out/_next -> out/next");
} else {
  console.error("ERROR: out/_next not found! Next.js build may have failed.");
  process.exit(1);
}

// Step 2: Walk HTML files and fix all references
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

  // Replace ALL variations of _next path with correct relative next/ path
  html = html
    // absolute /_next/
    .replace(/(src|href)="\/_next\//g, `$1="${prefix}/next/`)
    // relative ./_next/ (from assetPrefix:".")
    .replace(/(src|href)="\.\/_next\//g, `$1="${prefix}/next/`)
    // relative ../_next/ (from nested pages with assetPrefix:".")  
    .replace(/(src|href)="\.\.\/_next\//g, `$1="${prefix}/next/`)
    // JSON/string references
    .replace(/"\/_next\//g, `"${prefix}/next/`)
    .replace(/"\.\/_next\//g, `"${prefix}/next/`)
    // Fix manifest/favicon absolute refs
    .replace(/(src|href)="\/manifest\.json"/g, `$1="${prefix}/manifest.json"`)
    .replace(/(src|href)="\/favicon\.ico"/g, `$1="${prefix}/favicon.ico"`);

  if (html !== original) {
    fs.writeFileSync(file, html);
    fixed++;
    console.log(`Fixed: ${path.relative(outDir, file)} (prefix: ${prefix})`);
  }
}

console.log(`\nDone! Fixed ${fixed} HTML files. _next renamed to next.`);
console.log(`Chunk count: ${fs.readdirSync(path.join(nextDirNew, "static", "chunks")).length}`);
