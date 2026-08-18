const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS_DIR = path.join(__dirname, '..', 'audit_screenshots');

async function detailedAudit() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();
  const livePage = await context.newPage();

  console.log('Loading local page...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  console.log('Loading live page...');
  try {
    await livePage.goto('https://www.wondersystemsindia.com/', { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) {
    console.log('Live page load error:', e.message);
  }

  // 1. Audit Header & Navigation Menu
  console.log('\n--- Auditing Header & Menu ---');
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01_header_local.png'), clip: { x: 0, y: 0, width: 1440, height: 180 } });
  await livePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '01_header_live.png'), clip: { x: 0, y: 0, width: 1440, height: 180 } });

  // Test Menu dropdowns on Local
  const menuItems = await page.$$('.elementor-nav-menu > li, nav > ul > li');
  console.log(`Found ${menuItems.length} top-level menu items on local.`);
  
  for (let i = 0; i < menuItems.length; i++) {
    const text = await menuItems[i].innerText();
    console.log(`Menu item ${i}: ${text.replace(/\n/g, ' ')}`);
    await menuItems[i].hover();
    await page.waitForTimeout(300);
  }
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01_header_menu_hover_local.png'), clip: { x: 0, y: 0, width: 1440, height: 350 } });

  // 2. Audit Hero Slider
  console.log('\n--- Auditing Hero Slider ---');
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02_hero_local.png'), clip: { x: 0, y: 150, width: 1440, height: 750 } });
  await livePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '02_hero_live.png'), clip: { x: 0, y: 150, width: 1440, height: 750 } });

  // 3. Section 3: Engineering your Success
  console.log('\n--- Auditing Engineering Success Section ---');
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03_engineering_local.png'), clip: { x: 0, y: 900, width: 1440, height: 800 } });
  await livePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '03_engineering_live.png'), clip: { x: 0, y: 900, width: 1440, height: 800 } });

  // 4. Section 4: ABB Partner & Products
  console.log('\n--- Auditing ABB Channel Partner Section ---');
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '04_abb_partner_local.png'), clip: { x: 0, y: 1700, width: 1440, height: 900 } });
  await livePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '04_abb_partner_live.png'), clip: { x: 0, y: 1700, width: 1440, height: 900 } });

  // 5. Section 5: Filtering Harmonics & Substations
  console.log('\n--- Auditing Harmonics & Substation Section ---');
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '05_harmonics_local.png'), clip: { x: 0, y: 2600, width: 1440, height: 900 } });
  await livePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '05_harmonics_live.png'), clip: { x: 0, y: 2600, width: 1440, height: 900 } });

  // 6. Section 6: Customer Logos Slider
  console.log('\n--- Auditing Customers Carousel ---');
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '06_customers_local.png'), clip: { x: 0, y: 3500, width: 1440, height: 600 } });
  await livePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '06_customers_live.png'), clip: { x: 0, y: 3500, width: 1440, height: 600 } });

  // 7. Section 7: Footer
  console.log('\n--- Auditing Footer ---');
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '07_footer_local.png'), clip: { x: 0, y: 4100, width: 1440, height: 1000 } });
  await livePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '07_footer_live.png'), clip: { x: 0, y: 4100, width: 1440, height: 1000 } });

  // Compare Computed Styles and DOM differences
  const localAnalysis = await page.evaluate(() => {
    return {
      title: document.title,
      bodyClasses: document.body.className,
      slidersCount: document.querySelectorAll('.swiper, .swiper-container, .owl-carousel').length,
      navMenuCount: document.querySelectorAll('.elementor-nav-menu').length,
      imagesTotal: document.querySelectorAll('img').length,
      allImageSrcs: Array.from(document.querySelectorAll('img')).map(i => ({ src: i.src, currentSrc: i.currentSrc, naturalWidth: i.naturalWidth }))
    };
  });

  const liveAnalysis = await livePage.evaluate(() => {
    return {
      title: document.title,
      bodyClasses: document.body.className,
      slidersCount: document.querySelectorAll('.swiper, .swiper-container, .owl-carousel').length,
      navMenuCount: document.querySelectorAll('.elementor-nav-menu').length,
      imagesTotal: document.querySelectorAll('img').length,
      allImageSrcs: Array.from(document.querySelectorAll('img')).map(i => ({ src: i.src, currentSrc: i.currentSrc, naturalWidth: i.naturalWidth }))
    };
  });

  console.log('\n--- Comparison Analysis ---');
  console.log('Local:', JSON.stringify(localAnalysis, null, 2));
  console.log('Live:', JSON.stringify(liveAnalysis, null, 2));

  await browser.close();
}

detailedAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
