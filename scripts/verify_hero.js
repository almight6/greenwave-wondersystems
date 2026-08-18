const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function verify() {
  const screenshotsDir = path.join(__dirname, '..', 'audit_screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  
  // 1. Desktop 1440x900
  const contextDesktop = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const pageDesktop = await contextDesktop.newPage();
  await pageDesktop.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await pageDesktop.waitForTimeout(2000);

  await pageDesktop.screenshot({
    path: path.join(screenshotsDir, 'hero_fullsize_desktop.png'),
    clip: { x: 0, y: 0, width: 1440, height: 950 }
  });
  console.log('Saved hero_fullsize_desktop.png');

  // Test feed switch interaction
  const spectraBtn = await pageDesktop.$('.gw-feed-btn:nth-child(2)');
  if (spectraBtn) {
    await spectraBtn.click();
    await pageDesktop.waitForTimeout(1000);
    await pageDesktop.screenshot({
      path: path.join(screenshotsDir, 'hero_feed_switched.png'),
      clip: { x: 0, y: 0, width: 1440, height: 950 }
    });
    console.log('Saved hero_feed_switched.png');
  }

  // 2. Tablet 768x1024
  const contextTablet = await browser.newContext({
    viewport: { width: 768, height: 1024 }
  });
  const pageTablet = await contextTablet.newPage();
  await pageTablet.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await pageTablet.waitForTimeout(1500);

  await pageTablet.screenshot({
    path: path.join(screenshotsDir, 'hero_tablet.png'),
    clip: { x: 0, y: 0, width: 768, height: 1100 }
  });
  console.log('Saved hero_tablet.png');

  // 3. Mobile 375x812
  const contextMobile = await browser.newContext({
    viewport: { width: 375, height: 812 }
  });
  const pageMobile = await contextMobile.newPage();
  await pageMobile.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await pageMobile.waitForTimeout(1500);

  await pageMobile.screenshot({
    path: path.join(screenshotsDir, 'hero_mobile.png'),
    clip: { x: 0, y: 0, width: 375, height: 1200 }
  });
  console.log('Saved hero_mobile.png');

  await browser.close();
}

verify().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});
