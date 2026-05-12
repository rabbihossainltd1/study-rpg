/**
 * fix-capacitor-static-assets.js
 *
 * After `next build` (output:"export"), all HTML files reference /_next/... with 
 * absolute paths. Capacitor bundles them as file assets served from nested directories,
 * so /login/index.html needs ../../_next/... not /_next/...
 *
 * This script rewrites every absolute /_next/ reference to the correct
 * relative path based on the HTML file's depth in the out/ directory.
 */

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

// Calculate how many levels deep the file is relative to outDir
// out/index.html -> depth 0 -> prefix "."
// out/login/index.html -> depth 1 -> prefix ".."
// out/subjects/math/index.html -> depth 2 -> prefix "../.."
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

  // Fix all absolute /_next/ references (href, src, JSON strings)
  html = html
    .replace(/(href|src)="\/_next\//g, `$1="${prefix}/_next/`)
    .replace(/(href|src)='\/_ next\//g, `$1='${prefix}/_next/`)
    .replace(/"\/_next\//g, `"${prefix}/_next/`)
    .replace(/'\/_next\//g, `'${prefix}/_next/`)
    .replace(/(href|src)="\/manifest\.json"/g, `$1="${prefix}/manifest.json"`)
    .replace(/(href|src)="\/favicon\.ico"/g, `$1="${prefix}/favicon.ico"`);

  // Also fix any leftover ./_next/ from a previous assetPrefix:"." build
  // ./_next/ is only correct for root-level files, wrong for nested ones
  if (prefix !== ".") {
    html = html
      .replace(/(href|src)="\.\/_next\//g, `$1="${prefix}/_next/`)
      .replace(/"\.\/_next\//g, `"${prefix}/_next/`);
  }

  if (html !== original) {
    fs.writeFileSync(file, html);
    fixed++;
    console.log(`Fixed: ${path.relative(outDir, file)} (prefix: ${prefix})`);
  }
}

console.log(`\nCapacitor static asset paths fixed in ${fixed} files.`);

// Verify _next directory was generated
const nextDir = path.join(outDir, "_next");
if (!fs.existsSync(nextDir)) {
  console.error("\nERROR: out/_next/ directory not found!");
  console.error("The Next.js build likely failed to generate JavaScript chunks.");
  console.error("Check for webpack/build errors above.");
  process.exit(1);
} else {
  const chunks = fs.readdirSync(path.join(nextDir, "static", "chunks")).length;
  console.log(`\nVerified: out/_next/static/chunks/ exists with ${chunks} files.`);
}
