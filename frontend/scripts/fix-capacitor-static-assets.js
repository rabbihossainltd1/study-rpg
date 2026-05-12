const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "..", "out");

function walk(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith(".html")) {
      let content = fs.readFileSync(fullPath, "utf8");

      content = content
        .replace(/href="\/_next\//g, 'href="./_next/')
        .replace(/src="\/_next\//g, 'src="./_next/')
        .replace(/"\/_next\//g, '"./_next/')
        .replace(/href="\/manifest\.json"/g, 'href="./manifest.json"')
        .replace(/href="\/favicon\.ico"/g, 'href="./favicon.ico"');

      fs.writeFileSync(fullPath, content);

      console.log("Fixed:", fullPath);
    }
  }
}

walk(outDir);

console.log("All static asset paths fixed.");
