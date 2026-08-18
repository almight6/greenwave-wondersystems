const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const INDEX_FILE = path.join(ROOT_DIR, 'index.html');
const ASSETS_IMAGES = path.join(ROOT_DIR, 'assets', 'images');
const ASSETS_JS = path.join(ROOT_DIR, 'assets', 'js');
const ASSETS_CSS = path.join(ROOT_DIR, 'assets', 'css');

const availableImages = fs.readdirSync(ASSETS_IMAGES);
const availableJs = fs.readdirSync(ASSETS_JS);
const availableCss = fs.readdirSync(ASSETS_CSS);

let html = fs.readFileSync(INDEX_FILE, 'utf-8');

// 1. Fix Rocket LazyLoad script tags to standard JS execution
html = html.replace(/<script\s+type=["']rocketlazyloadscript["']\s+id=["']([^"']+)["']\s+data-rocket-src=["']([^"']+)["'][^>]*><\/script>/gi, (m, id, src) => {
  return `<script type="text/javascript" id="${id}" src="${src}" defer></script>`;
});
html = html.replace(/<script\s+type=["']rocketlazyloadscript["']\s+data-rocket-src=["']([^"']+)["'][^>]*><\/script>/gi, (m, src) => {
  return `<script type="text/javascript" src="${src}" defer></script>`;
});
html = html.replace(/<script\s+type=["']rocketlazyloadscript["']([^>]*)>/gi, '<script type="text/javascript"$1>');

// 2. Fix corrupted src attributes in <img> tags
html = html.replace(/src=["']([^"']+)["'](?:http[s]?:[^\s"'>]+)?/gi, (m, src) => {
  // Clean anything after legitimate asset path
  let cleanSrc = src.split('http')[0].trim();
  return `src="${cleanSrc}"`;
});

// 3. Fix specific known broken image filenames and _1 patterns
html = html.replace(/assets\/images\/Layer-1-logo-1_1\.png/g, 'assets/images/Layer-1-logo-1.png');
html = html.replace(/assets\/images\/loupe-1_1\.webp/g, 'assets/images/loupe-1.webp');
html = html.replace(/assets\/images\/loupe_1\.png/g, 'assets/images/loupe.png');
html = html.replace(/assets\/images\/ABB-Authorised-Channel-Partner_1\.webp/g, 'assets/images/ABB-Authorised-Channel-Partner.webp');
html = html.replace(/assets\/images\/FILTERING-HARMONICS_1\.jpg/g, 'assets/images/FILTERING-HARMONICS.jpg');
html = html.replace(/assets\/images\/slide-4_1\.webp/g, 'assets/images/slide-4.webp');

// 4. Fix JS filename references with _1
html = html.replace(/assets\/js\/frontend\.min_1\.js/g, 'assets/js/frontend.min.js');
html = html.replace(/assets\/js\/frontend\.min_2\.js/g, 'assets/js/frontend.min.js');

// 5. Remove any residual <noscript> duplicate wrappers that cause double images
html = html.replace(/<noscript><img[^>]+><\/noscript>/gi, '');

// 6. Ensure all <img> tags have clean attributes
html = html.replace(/<img\s+([^>]+)>/gi, (m, attrs) => {
  // Clean double quotes or corrupted svg viewBox fragments
  let cleanAttrs = attrs.replace(/http:\/\/www\.w3\.org\/2000\/svg'%20viewBox=[^"']+/gi, '');
  cleanAttrs = cleanAttrs.replace(/data:image\/svg\+xml;[^"']+/gi, '');
  return `<img ${cleanAttrs}>`;
});

fs.writeFileSync(INDEX_FILE, html, 'utf-8');
console.log('Repaired index.html scripts, images, and srcset.');
