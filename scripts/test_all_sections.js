const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS_DIR = path.join(__dirname, '..', 'audit_screenshots');
fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

async function fullSectionAudit() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();
  const report = [];

  page.on('console', msg => {
    if (msg.type() === 'error') report.push(`Console error: ${msg.text()}`);
  });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Audit Header Desktop
  console.log('1. Checking Desktop Header...');
  const headerElem = await page.$('.elementor-location-header, header');
  if (headerElem) {
    await headerElem.screenshot({ path: path.join(SCREENSHOTS_DIR, '01_desktop_header.png') });
  }

  // 2. Audit Desktop Dropdown Menus (Company, Products)
  console.log('2. Checking Dropdown Menus...');
  const companyLink = await page.$('#menu-1-d104a82 a:has-text("Company")');
  if (companyLink) {
    await companyLink.hover();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02_menu_company_dropdown.png'), clip: { x: 400, y: 0, width: 600, height: 350 } });
  }

  const productsLink = await page.$('#menu-1-d104a82 a:has-text("Products")');
  if (productsLink) {
    await productsLink.hover();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03_menu_products_dropdown.png'), clip: { x: 500, y: 0, width: 800, height: 450 } });
  }

  // 3. Audit Search Popup
  console.log('3. Checking Search Icon / Popup...');
  const searchBtn = await page.$('a[href*="popup:open"], .elementor-widget-search-form, a:has(img[alt="loupe"])');
  if (searchBtn) {
    await searchBtn.click({ force: true });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '04_search_popup_open.png') });
    
    // Close popup if open (ESC key)
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
  }

  // 4. Audit Hero Section
  console.log('4. Checking Hero Section...');
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '05_hero_section.png'), clip: { x: 0, y: 150, width: 1440, height: 750 } });

  // 5. Audit Engineering Your Success
  console.log('5. Checking Engineering Success Section...');
  await page.evaluate(() => window.scrollTo(0, 950));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '06_engineering_section.png'), clip: { x: 0, y: 0, width: 1440, height: 900 } });

  // 6. Audit ABB Partner Section
  console.log('6. Checking ABB Partner Section...');
  await page.evaluate(() => window.scrollTo(0, 1850));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '07_abb_partner_section.png'), clip: { x: 0, y: 0, width: 1440, height: 900 } });

  // 7. Audit Harmonic Filters & Substations
  console.log('7. Checking Harmonics & Substations Section...');
  await page.evaluate(() => window.scrollTo(0, 2750));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '08_harmonics_section.png'), clip: { x: 0, y: 0, width: 1440, height: 900 } });

  // 8. Audit Customers Logo Carousel
  console.log('8. Checking Customers Logo Slider...');
  await page.evaluate(() => window.scrollTo(0, 3650));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '09_customers_slider_section.png'), clip: { x: 0, y: 0, width: 1440, height: 600 } });

  // 9. Audit Footer Section
  console.log('9. Checking Footer...');
  await page.evaluate(() => window.scrollTo(0, 4200));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '10_footer_section.png'), clip: { x: 0, y: 0, width: 1440, height: 900 } });

  // 10. Audit Mobile Viewport (375px)
  console.log('10. Checking Mobile Viewport & Hamburger Toggle...');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '11_mobile_header.png'), clip: { x: 0, y: 0, width: 375, height: 250 } });

  const mobileToggle = await page.$('.elementor-menu-toggle');
  if (mobileToggle) {
    await mobileToggle.click({ force: true });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '12_mobile_menu_open.png'), clip: { x: 0, y: 0, width: 375, height: 600 } });
  }

  console.log('\n--- Full Section Audit Completed Successfully! ---');
  console.log('Reports/Errors:', report);

  await browser.close();
}

fullSectionAudit().catch(err => {
  console.error('Section audit failed:', err);
  process.exit(1);
});
