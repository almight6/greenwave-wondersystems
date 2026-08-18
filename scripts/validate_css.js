const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const CSS_DIR = path.join(ROOT_DIR, 'assets', 'css');

const cssFiles = fs.readdirSync(CSS_DIR).filter(f => f.endsWith('.css'));
let missing = 0;
let checked = 0;

for (const file of cssFiles) {
  const cssPath = path.join(CSS_DIR, file);
  const content = fs.readFileSync(cssPath, 'utf-8');
  const urls = content.match(/url\(\s*["']?([^"')]+)["']?\s*\)/gi) || [];

  for (const u of urls) {
    const raw = u.replace(/url\(\s*["']?/, '').replace(/["']?\s*\)/, '').trim();
    if (raw.startsWith('data:') || raw.startsWith('#')) continue;
    
    const clean = raw.split('?')[0].split('#')[0];
    const resolvedPath = path.resolve(CSS_DIR, clean);
    checked++;
    if (!fs.existsSync(resolvedPath)) {
      console.log(`Missing in ${file}: ${raw} -> expected at: ${resolvedPath}`);
      missing++;
    }
  }
}

console.log(`CSS Assets Validation Complete: ${checked} references checked, ${missing} missing.`);
