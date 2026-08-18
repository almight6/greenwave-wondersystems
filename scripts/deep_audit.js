const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS_DIR = path.join(__dirname, '..', 'audit_screenshots');
fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

async function runDeepAudit() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();
  const livePage = await context.newPage();

  console.log('Loading local page...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  console.log('Loading live page...');
  try {
    await livePage.goto('https://www.wondersystemsindia.com/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await livePage.waitForTimeout(2000);
  } catch (e) {
    console.log('Live page load error:', e.message);
  }

  // 1. Full page screenshots
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'local_full.png'), fullPage: true });
  await livePage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'live_full.png'), fullPage: true });
  console.log('Captured full page screenshots.');

  // 2. Extract and inspect all images on both local and live
  const localImages = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map((img, idx) => ({
      idx,
      src: img.getAttribute('src'),
      dataSrc: img.getAttribute('data-src') || img.getAttribute('data-lazy-src'),
      currentSrc: img.currentSrc,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      alt: img.alt,
      parentClass: img.parentElement?.className,
      rect: { width: img.clientWidth, height: img.clientHeight }
    }));
  });

  const liveImages = await livePage.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map((img, idx) => ({
      idx,
      src: img.getAttribute('src'),
      currentSrc: img.currentSrc,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      alt: img.alt,
      rect: { width: img.clientWidth, height: img.clientHeight }
    }));
  });

  console.log('\n--- Image Audit ---');
  console.log(`Local images count: ${localImages.length}`);
  const brokenLocal = localImages.filter(i => i.naturalWidth === 0 || i.rect.width === 0);
  console.log(`Broken / zero-size local images (${brokenLocal.length}):`);
  console.log(JSON.stringify(brokenLocal, null, 2));

  // 3. Menu and Header Audit
  const localNav = await page.evaluate(() => {
    const navs = Array.from(document.querySelectorAll('nav, .elementor-nav-menu--main, .elementor-nav-menu'));
    return navs.map(n => ({
      classes: n.className,
      html: n.outerHTML.substring(0, 300),
      links: Array.from(n.querySelectorAll('a')).map(a => ({ text: a.innerText.trim(), href: a.href, display: window.getComputedStyle(a).display }))
    }));
  });

  const liveNav = await livePage.evaluate(() => {
    const navs = Array.from(document.querySelectorAll('nav, .elementor-nav-menu--main, .elementor-nav-menu'));
    return navs.map(n => ({
      classes: n.className,
      html: n.outerHTML.substring(0, 300),
      links: Array.from(n.querySelectorAll('a')).map(a => ({ text: a.innerText.trim(), href: a.href, display: window.getComputedStyle(a).display }))
    }));
  });

  console.log('\n--- Menu Audit ---');
  console.log('Local Nav count:', localNav.length);
  console.log('Live Nav count:', liveNav.length);
  fs.writeFileSync(path.join(SCREENSHOTS_DIR, 'nav_local.json'), JSON.stringify(localNav, null, 2));
  fs.writeFileSync(path.join(SCREENSHOTS_DIR, 'nav_live.json'), JSON.stringify(liveNav, null, 2));

  // 4. Section structure audit
  const localSections = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.elementor-section-wrap > section, .elementor > section, .elementor-element-header, main > section, .elementor-top-section')).map((s, idx) => ({
      idx,
      classes: s.className,
      id: s.id,
      height: s.clientHeight,
      text: s.innerText?.substring(0, 100).replace(/\n/g, ' ')
    }));
  });

  const liveSections = await livePage.evaluate(() => {
    return Array.from(document.querySelectorAll('.elementor-section-wrap > section, .elementor > section, .elementor-element-header, main > section, .elementor-top-section')).map((s, idx) => ({
      idx,
      classes: s.className,
      id: s.id,
      height: s.clientHeight,
      text: s.innerText?.substring(0, 100).replace(/\n/g, ' ')
    }));
  });

  console.log('\n--- Section Structure Audit ---');
  console.log('Local sections:', JSON.stringify(localSections, null, 2));
  console.log('Live sections:', JSON.stringify(liveSections, null, 2));

  await browser.close();
}

runDeepAudit().catch(err => {
  console.error('Deep audit failed:', err);
  process.exit(1);
});
