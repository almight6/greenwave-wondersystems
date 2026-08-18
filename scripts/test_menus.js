const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS_DIR = path.join(__dirname, '..', 'audit_screenshots');

async function testMenus() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();
  const livePage = await context.newPage();

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  try {
    await livePage.goto('https://www.wondersystemsindia.com/', { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) {}

  // Let's test hovering over 'Company' menu item on Local vs Live
  console.log('Hovering on Company item on local...');
  const companyLocal = await page.$('.elementor-nav-menu--main li.menu-item-has-children, .elementor-nav-menu--main a:has-text("Company")');
  if (companyLocal) {
    await companyLocal.hover({ force: true });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'menu_company_hover_local.png'), clip: { x: 0, y: 0, width: 1440, height: 400 } });
  }

  // Let's test hovering over 'Products' menu item on Local vs Live
  console.log('Hovering on Products item on local...');
  const productsLocal = await page.$('.elementor-nav-menu--main a:has-text("Products")');
  if (productsLocal) {
    await productsLocal.hover({ force: true });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'menu_products_hover_local.png'), clip: { x: 0, y: 0, width: 1440, height: 500 } });
  }

  // On Live page
  const companyLive = await livePage.$('.elementor-nav-menu--main li.menu-item-has-children, .elementor-nav-menu--main a:has-text("Company")');
  if (companyLive) {
    await companyLive.hover({ force: true });
    await livePage.waitForTimeout(500);
    await livePage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'menu_company_hover_live.png'), clip: { x: 0, y: 0, width: 1440, height: 400 } });
  }

  const productsLive = await livePage.$('.elementor-nav-menu--main a:has-text("Products")');
  if (productsLive) {
    await productsLive.hover({ force: true });
    await livePage.waitForTimeout(500);
    await livePage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'menu_products_hover_live.png'), clip: { x: 0, y: 0, width: 1440, height: 500 } });
  }

  // Let's check mobile menu toggle at 768px
  await page.setViewportSize({ width: 768, height: 900 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'mobile_header_local.png'), clip: { x: 0, y: 0, width: 768, height: 300 } });

  const toggleBtn = await page.$('.elementor-menu-toggle');
  if (toggleBtn) {
    console.log('Clicking mobile menu toggle on local...');
    await toggleBtn.click({ force: true });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'mobile_menu_open_local.png'), clip: { x: 0, y: 0, width: 768, height: 600 } });
  }

  await browser.close();
  console.log('Menu testing completed.');
}

testMenus().catch(err => {
  console.error(err);
  process.exit(1);
});
