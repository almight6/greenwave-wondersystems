const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS_DIR = path.join(__dirname, '..', 'audit_screenshots', 'comparison');
fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

async function scrollPage(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 50);
    });
  });
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}

async function runComparison() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });

  const localPage = await context.newPage();
  const livePage = await context.newPage();

  console.log('Loading local page...');
  await localPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await scrollPage(localPage);

  console.log('Loading live page...');
  try {
    await livePage.goto('https://www.wondersystemsindia.com/', { waitUntil: 'networkidle', timeout: 30000 });
    await scrollPage(livePage);
  } catch (e) {
    console.warn('Live page warning:', e.message);
  }

  // Define key sections by their DOM elements
  const sectionsToCheck = [
    { name: '01_header', selector: '.elementor-location-header, header' },
    { name: '02_hero_slider', selector: '.elementor-element-0a11bed7, .elementor-top-section:nth-of-type(1), [data-id="685af9b"]' },
    { name: '03_engineering_success', selector: '[data-id="b20e107"], [data-id="567fb1b"]' },
    { name: '04_abb_partner', selector: '[data-id="d56d338"], [data-id="25e65a6"]' },
    { name: '05_filtering_harmonics', selector: '[data-id="176916a"], [data-id="1f885e3"]' },
    { name: '06_substations', selector: '[data-id="b09df95"], [data-id="39a5c88"]' },
    { name: '07_customers_slider', selector: '[data-id="5e52c8a"], .swiper-container, .swiper' },
    { name: '08_footer', selector: '.elementor-location-footer, footer' }
  ];

  for (const s of sectionsToCheck) {
    console.log(`Auditing section: ${s.name} ...`);
    try {
      const localEl = await localPage.$(s.selector);
      if (localEl) {
        await localEl.screenshot({ path: path.join(SCREENSHOTS_DIR, `${s.name}_local.png`) });
      } else {
        console.warn(`Local element not found for ${s.name}`);
      }

      const liveEl = await livePage.$(s.selector);
      if (liveEl) {
        await liveEl.screenshot({ path: path.join(SCREENSHOTS_DIR, `${s.name}_live.png`) });
      } else {
        console.warn(`Live element not found for ${s.name}`);
      }
    } catch (err) {
      console.warn(`Error capturing ${s.name}:`, err.message);
    }
  }

  // Also capture full page local vs live
  await localPage.screenshot({ path: path.join(SCREENSHOTS_DIR, '00_full_local.png'), fullPage: true });
  await livePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '00_full_live.png'), fullPage: true });

  console.log('Comparison screenshots captured in audit_screenshots/comparison/');
  await browser.close();
}

runComparison().catch(err => {
  console.error('Comparison failed:', err);
  process.exit(1);
});
