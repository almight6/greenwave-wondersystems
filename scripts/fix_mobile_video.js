const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Update iframe container styles in the hero section to be 100% responsive on all mobile devices
html = html.replace(
  '<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; background: #000000; border: 1px solid rgba(255,255,255,0.1);">',
  '<div class="gw-video-wrapper" style="position: relative; width: 100%; padding-top: 56.25%; min-height: 220px; overflow: hidden; border-radius: 12px; background: #000000; border: 1px solid rgba(255,255,255,0.1);">'
);

fs.writeFileSync(indexPath, html);
console.log('Mobile video wrapper updated.');
