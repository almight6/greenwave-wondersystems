const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const IMG_DIR = path.join(ROOT_DIR, 'assets', 'images');

// Provide valid fallbacks for any missing/placeholder assets
fs.copyFileSync(path.join(IMG_DIR, 'new-bannere-1.webp'), path.join(IMG_DIR, 'hqdefault.jpg'));
fs.copyFileSync(path.join(IMG_DIR, 'new-bannere-1.webp'), path.join(IMG_DIR, 'owl.video.play.png'));

// Also copy images to assets/css/assets/images just in case any dynamic elementor/wprocket script resolves relatively from css/
const cssSubDir = path.join(ROOT_DIR, 'assets', 'css', 'assets', 'images');
fs.mkdirSync(cssSubDir, { recursive: true });
for (const f of fs.readdirSync(IMG_DIR)) {
  const srcP = path.join(IMG_DIR, f);
  if (fs.statSync(srcP).isFile()) {
    fs.copyFileSync(srcP, path.join(cssSubDir, f));
  }
}

console.log('Fallbacks and CSS sub-directory image aliases created.');
