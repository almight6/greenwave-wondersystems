const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS_DIR = path.join(__dirname, '..', 'audit_screenshots');
fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

async function runAudit() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();
  
  const consoleErrors = [];
  const networkErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('requestfailed', req => {
    networkErrors.push(`${req.method()} ${req.url()} - ${req.failure()?.errorText}`);
  });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Full page screenshot
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'local_full.png'), fullPage: true });
  console.log('Saved local_full.png');

  // Check section presence and screenshot each section
  const sections = await page.$$('section, div.elementor-section, header, footer');
  console.log(`Found ${sections.length} major sections/containers.`);

  // Audit menu
  const navMenu = await page.$('.elementor-nav-menu, nav, header');
  if (navMenu) {
    await navMenu.screenshot({ path: path.join(SCREENSHOTS_DIR, 'local_header_menu.png') });
  }

  // Audit broken images on page
  const imagesInfo = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(img => ({
      src: img.src,
      currentSrc: img.currentSrc,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete,
      alt: img.alt,
      classes: img.className,
      isBroken: !img.complete || img.naturalWidth === 0
    }));
  });

  const brokenImgs = imagesInfo.filter(i => i.isBroken);
  console.log(`Total images on page: ${imagesInfo.length}, Broken images: ${brokenImgs.length}`);
  if (brokenImgs.length > 0) {
    console.log('Broken images list:', JSON.stringify(brokenImgs, null, 2));
  }

  // Check live website
  console.log('\nNavigating to live website https://www.wondersystemsindia.com/ ...');
  const livePage = await context.newPage();
  try {
    await livePage.goto('https://www.wondersystemsindia.com/', { waitUntil: 'networkidle', timeout: 30000 });
    await livePage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'live_full.png'), fullPage: true });
    console.log('Saved live_full.png');

    const liveImagesInfo = await livePage.evaluate(() => {
      return Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      }));
    });
    console.log(`Live site images: ${liveImagesInfo.length}`);
  } catch (err) {
    console.warn('Could not capture live site directly:', err.message);
  }

  console.log('\nConsole Errors on local page:', consoleErrors);
  console.log('Network Failed Requests on local page:', networkErrors);

  await browser.close();
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
