const fs = require('fs');
const path = require('path');

async function main() {
  const res = await fetch("https://www.greenwave.org.in/");
  const html = await res.text();

  const links = [...html.matchAll(/href=["'](https:\/\/www\.greenwave\.org\.in\/[^"'#]+)["']/gi)].map(m => m[1]);
  const uniqueLinks = [...new Set(links)];
  console.log("Pages found on site:", uniqueLinks);

  const imgRegex = /https:\/\/www\.greenwave\.org\.in\/wp-content\/uploads\/[^\s"'<>]+\.(?:png|jpe?g|webp)/gi;
  const allImages = [...html.matchAll(imgRegex)].map(m => m[0]);
  console.log("Uploads found on homepage:", [...new Set(allImages)]);

  // Check individual product pages
  for (const pageUrl of uniqueLinks) {
    if (pageUrl.includes('product') || pageUrl.includes('spectrum') || pageUrl.includes('spectra') || pageUrl.includes('scorpion') || pageUrl.includes('machine') || pageUrl.includes('sparkle') || pageUrl.includes('starlite')) {
      console.log(`\nFetching ${pageUrl}...`);
      try {
        const pRes = await fetch(pageUrl);
        const pHtml = await pRes.text();
        const pImgs = [...pHtml.matchAll(imgRegex)].map(m => m[0]);
        console.log(`Images on ${pageUrl}:`, [...new Set(pImgs)]);
      } catch (e) {
        console.error(`Error fetching ${pageUrl}:`, e.message);
      }
    }
  }
}

main().catch(console.error);
