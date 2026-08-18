const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS_DIR = path.join(__dirname, '..', 'audit_screenshots', 'final_verified');
fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

async function verifyAll() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();
  
  const consoleErrors = [];
  const notFounds = [];

  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  page.on('response', res => {
    if (res.status() === 404) notFounds.push(res.url());
  });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Full page screenshot
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '00_full_page.png'), fullPage: true });
  console.log('Saved 00_full_page.png');

  // Verify all sections
  const sectionSelectors = [
    { id: '01_header', name: 'Header Navigation', selector: '.elementor-location-header, header' },
    { id: '02_hero_slider', name: 'Hero Banner Slider', selector: '[data-id="89caf2a"], [data-id="685af9b"]' },
    { id: '03_engineering_success', name: 'Engineering Your Success Section', selector: '[data-id="cbfd1f8"]' },
    { id: '04_abb_partner', name: 'ABB Authorised Channel Partner Section', selector: '[data-id="4c0e682"]' },
    { id: '05_filtering_harmonics', name: 'Filtering Harmonics Section', selector: '[data-id="856c69b"]' },
    { id: '06_substations', name: 'Smart Substations Section', selector: '[data-id="6e6a14c"]' },
    { id: '07_customers_slider', name: 'Our Customers Carousel Section', selector: '[data-id="3d01a82"]' },
    { id: '08_connect_with_us', name: 'Connect With Us Form Section', selector: '[data-id="b20e107"]' },
    { id: '09_footer', name: 'Footer Section', selector: '.elementor-location-footer, footer' }
  ];

  for (const s of sectionSelectors) {
    const el = await page.$(s.selector);
    if (el) {
      const box = await el.boundingBox();
      console.log(`[PASS] ${s.name} found! (width: ${Math.round(box?.width || 0)}, height: ${Math.round(box?.height || 0)})`);
      await el.screenshot({ path: path.join(SCREENSHOTS_DIR, `${s.id}.png`) });
    } else {
      console.error(`[FAIL] ${s.name} not found by selector: ${s.selector}`);
    }
  }

  // Verify Dropdown menus hover
  console.log('\nTesting Dropdown Navigation Menus...');
  const companyLink = await page.$('#menu-1-d104a82 a:has-text("Company")');
  if (companyLink) {
    await companyLink.hover();
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'dropdown_company.png'), clip: { x: 450, y: 0, width: 450, height: 350 } });
    console.log('[PASS] Company dropdown opened and captured.');
  }

  const productsLink = await page.$('#menu-1-d104a82 a:has-text("Products")');
  if (productsLink) {
    await productsLink.hover();
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'dropdown_products.png'), clip: { x: 550, y: 0, width: 750, height: 450 } });
    console.log('[PASS] Products dropdown opened and captured.');
  }

  // Verify Images
  const images = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return {
      total: imgs.length,
      broken: imgs.filter(i => !i.complete || i.naturalWidth === 0).length,
      details: imgs.map(i => ({ src: i.src, naturalWidth: i.naturalWidth, naturalHeight: i.naturalHeight }))
    };
  });

  console.log(`\nImages Audit: Total ${images.total}, Broken: ${images.broken}`);
  console.log(`Network 404s: ${notFounds.length}`);
  console.log(`Console Errors: ${consoleErrors.length}`);

  // Mobile Audit (375px)
  await page.setViewportSize({ width: 375, height: 812 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'mobile_view.png') });
  console.log('[PASS] Mobile responsive view captured.');

  await browser.close();
}

verifyAll().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
