const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(__dirname, "..", "out");

function walk(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);

      if (file === "_next") {
        const newPath = path.join(dir, "next");

        if (fs.existsSync(newPath)) {
          fs.rmSync(newPath, { recursive: true, force: true });
        }

        fs.renameSync(fullPath, newPath);
        console.log(`Renamed: ${fullPath} -> ${newPath}`);
      }
    } else {
      if (
        file.endsWith(".html") ||
        file.endsWith(".js") ||
        file.endsWith(".css")
      ) {
        let content = fs.readFileSync(fullPath, "utf8");

        content = content
          .replace(/\/_next\//g, "/next/")
          .replace(/\._next\//g, "./next/")
          .replace(/"_next\//g, '"next/')
          .replace(/'_next\//g, "'next/");

        fs.writeFileSync(fullPath, content, "utf8");

        console.log(`Fixed refs: ${fullPath}`);
      }
    }
  }
}

walk(OUT_DIR);

console.log("Capacitor asset fix completed.");
