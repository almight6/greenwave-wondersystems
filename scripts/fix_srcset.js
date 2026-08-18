const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const INDEX_FILE = path.join(ROOT_DIR, 'index.html');
const ASSETS_IMAGES = path.join(ROOT_DIR, 'assets', 'images');

const availableImages = new Set(fs.readdirSync(ASSETS_IMAGES));

let html = fs.readFileSync(INDEX_FILE, 'utf-8');

// Replace any assets/images/xxx_1.ext with assets/images/xxx.ext if xxx_1 doesn't exist but xxx exists
html = html.replace(/assets\/images\/([a-zA-Z0-9_\-\.]+)/g, (fullMatch, filename) => {
  if (availableImages.has(filename)) {
    return fullMatch;
  }
  // Try removing _1, _2, etc.
  const cleaned = filename.replace(/_\d+(\.[a-zA-Z0-9]+)$/, '$1');
  if (availableImages.has(cleaned)) {
    console.log(`Mapping ${filename} -> ${cleaned}`);
    return `assets/images/${cleaned}`;
  }
  const cleanAll = filename.replace(/_\d+/g, '');
  if (availableImages.has(cleanAll)) {
    console.log(`Mapping all-underscore ${filename} -> ${cleanAll}`);
    return `assets/images/${cleanAll}`;
  }
  return fullMatch;
});

// Also remove WP-Rocket lazyload attributes that interfere with natural rendering
html = html.replace(/\sdata-lazy-src=["'][^"']*["']/gi, '');
html = html.replace(/\sdata-lazy-srcset=["'][^"']*["']/gi, '');
html = html.replace(/\sdata-lazy-sizes=["'][^"']*["']/gi, '');
html = html.replace(/\sloading=["']lazy["']/gi, '');

fs.writeFileSync(INDEX_FILE, html, 'utf-8');
console.log('Fixed all srcset and image paths in index.html!');
