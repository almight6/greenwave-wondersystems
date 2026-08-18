const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf-8');
const assetRefs = html.match(/assets\/[a-zA-Z0-9_\-\.\/]+/g) || [];

let missing = 0;
let found = 0;

for (const ref of new Set(assetRefs)) {
  const clean = ref.split('?')[0].split('#')[0];
  const fullPath = path.join(ROOT_DIR, clean);
  if (!fs.existsSync(fullPath)) {
    console.log('Missing asset:', ref, '-> expected at:', fullPath);
    missing++;
  } else {
    found++;
  }
}

console.log(`Validation Complete: ${found} assets verified on disk, ${missing} missing.`);
