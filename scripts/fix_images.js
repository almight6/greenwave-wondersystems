const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const INDEX_FILE = path.join(ROOT_DIR, 'index.html');
const ASSETS_IMAGES = path.join(ROOT_DIR, 'assets', 'images');

let html = fs.readFileSync(INDEX_FILE, 'utf-8');

// 1. Clean up duplicate/corrupted srcset and local paths
// First, find all files actually present in assets/images/
const availableImages = new Set(fs.readdirSync(ASSETS_IMAGES));
console.log(`Available images in assets/images: ${availableImages.size}`);

// Fix any _1, _2 suffixes in index.html that don't exist on disk, mapping them to the real file
html = html.replace(/assets\/images\/([a-zA-Z0-9_\-\.]+)/g, (match, filename) => {
  if (availableImages.has(filename)) {
    return match;
  }
  // Try removing _1, _2, _1_1, etc.
  const cleanName = filename.replace(/_\d+/g, '');
  if (availableImages.has(cleanName)) {
    console.log(`Fixing reference: ${filename} -> ${cleanName}`);
    return `assets/images/${cleanName}`;
  }
  // Try removing single _1 before extension
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  const fixedBase = base.replace(/_\d+$/, '');
  if (availableImages.has(fixedBase + ext)) {
    console.log(`Fixing reference: ${filename} -> ${fixedBase + ext}`);
    return `assets/images/${fixedBase + ext}`;
  }

  console.warn(`Unresolved image filename: ${filename}`);
  return match;
});

// 2. Fix lazy load data-lazy-src -> make sure src has the real image
html = html.replace(/<img([^>]+)>/gi, (imgTag) => {
  // Extract data-lazy-src or data-src if present
  const dataSrcMatch = imgTag.match(/data-(?:lazy-)?src=["']([^"']+)["']/i);
  const srcMatch = imgTag.match(/\ssrc=["']([^"']+)["']/i);
  const dataSrcsetMatch = imgTag.match(/data-(?:lazy-)?srcset=["']([^"']+)["']/i);

  let newTag = imgTag;

  if (dataSrcMatch && dataSrcMatch[1] && !dataSrcMatch[1].startsWith('data:')) {
    const realSrc = dataSrcMatch[1];
    if (srcMatch) {
      newTag = newTag.replace(srcMatch[0], ` src="${realSrc}"`);
    } else {
      newTag = newTag.replace('<img', `<img src="${realSrc}"`);
    }
  }

  if (dataSrcsetMatch && dataSrcsetMatch[1]) {
    newTag = newTag.replace(/\ssrcset=["'][^"']*["']/i, '');
    newTag = newTag.replace(dataSrcsetMatch[0], `srcset="${dataSrcsetMatch[1]}"`);
  }

  // Remove lazyload error/placeholder classes
  newTag = newTag.replace(/class=["']([^"']+)["']/i, (classMatch, classes) => {
    const cleanClasses = classes.replace(/\b(lazyload|lazyloaded|lazyloading|entered|error)\b/g, '').replace(/\s+/g, ' ').trim();
    return `class="${cleanClasses}"`;
  });

  return newTag;
});

// 3. Fix SVG / icon inline styles and ensure proper display
fs.writeFileSync(INDEX_FILE, html, 'utf-8');
console.log('Successfully updated and cleaned index.html images & references.');
