const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  const htmlPath = path.resolve(__dirname, '../index.html');
  await page.goto('file://' + htmlPath);
  await page.waitForTimeout(1000);
  
  const element = await page.locator('#materials');
  if (await element.count() > 0) {
    await element.screenshot({ path: path.resolve(__dirname, '../audit_screenshots/materials_section.png') });
    console.log('Successfully saved materials_section.png');
  } else {
    console.log('Section #materials not found');
  }
  await browser.close();
})();
