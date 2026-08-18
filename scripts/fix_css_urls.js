const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const CSS_DIR = path.join(ROOT_DIR, 'assets', 'css');
const files = fs.readdirSync(CSS_DIR).filter(f => f.endsWith('.css'));

let fixed = 0;
for (const file of files) {
  const p = path.join(CSS_DIR, file);
  let content = fs.readFileSync(p, 'utf-8');
  if (/url\(\s*['"]?assets\//i.test(content)) {
    content = content.replace(/url\(\s*['"]?assets\/([^'")]+)['"]?\s*\)/gi, 'url("../$1")');
    fs.writeFileSync(p, content, 'utf-8');
    console.log('Fixed CSS relative URLs in:', file);
    fixed++;
  }
}
console.log(`Fixed ${fixed} CSS files.`);
