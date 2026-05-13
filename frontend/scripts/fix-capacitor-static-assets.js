const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

function walk(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      walk(full);
    } else if (
      file.endsWith('.html') ||
      file.endsWith('.js') ||
      file.endsWith('.css')
    ) {
      let content = fs.readFileSync(full, 'utf8');

      content = content.replace(/\/_next\//g, '/next/');
      content = content.replace(/"\.\/next\//g, '"/next/');
      content = content.replace(/'\.\/next\//g, "'/next/");

      fs.writeFileSync(full, content);
    }
  }
}

walk(outDir);

const oldNext = path.join(outDir, '_next');
const newNext = path.join(outDir, 'next');

if (fs.existsSync(oldNext)) {
  fs.renameSync(oldNext, newNext);
}

console.log('Capacitor asset fix completed');
