const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const INDEX_FILE = path.join(ROOT_DIR, 'index.html');

let html = fs.readFileSync(INDEX_FILE, 'utf-8');

// Replace all data-rocket-src with src
html = html.replace(/\sdata-rocket-src=["']([^"']+)["']/gi, ' src="$1"');
html = html.replace(/\sdata-rocket-defer\b/gi, '');

// Fix any raw AOS.init() calls to check if AOS is defined or run on window load
html = html.replace(/AOS\.init\(\s*\);?/g, `
if (typeof AOS !== 'undefined') {
  AOS.init({ once: true, duration: 800, offset: 50 });
} else {
  window.addEventListener('load', function() {
    if (typeof AOS !== 'undefined') {
      AOS.init({ once: true, duration: 800, offset: 50 });
    }
  });
}
`);

// Add CSS safety rule so that even before scroll or if animations are off, elements are never stuck hidden
const cssFix = `
<style id="custom-clone-fixes">
  /* Ensure all sections and animated elements remain fully visible */
  [data-aos] {
    opacity: 1 !important;
    transform: none !important;
    visibility: visible !important;
  }
  .elementor-invisible {
    visibility: visible !important;
    opacity: 1 !important;
  }
  /* Fix header alignment and dropdown menu positioning */
  .elementor-nav-menu--main .sub-menu,
  .elementor-nav-menu--main ul.elementor-nav-menu--dropdown {
    box-shadow: 0 10px 30px rgba(0,0,0,0.12);
    border-radius: 4px;
  }
  /* Ensure smooth display of customer logos */
  .swiper-slide img {
    max-width: 100%;
    height: auto;
    display: block;
  }
</style>
`;

if (!html.includes('id="custom-clone-fixes"')) {
  html = html.replace('</head>', `${cssFix}\n</head>`);
}

fs.writeFileSync(INDEX_FILE, html, 'utf-8');
console.log('Fixed all data-rocket-src, AOS initialization, and added CSS visibility guarantee.');
