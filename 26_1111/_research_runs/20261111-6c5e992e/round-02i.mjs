const task = await taskSpace(8);
const page = task.page('p1');

try {
  await page.cdp('Page.enable');
  await page.cdp('Page.startScreencast', { format: 'png', quality: 100, maxWidth: 1280, maxHeight: 900, everyNthFrame: 1 });
  console.log('startScreencast called');
  await page.evaluate(() => { document.body.style.opacity = '0.999'; });
  await page.waitForTimeout(500);
  const events = await page.events();
  console.log('events count:', events.length, events.map(e => e.method || e.type));
  const shot = await Promise.race([
    page.cdp('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false }),
    new Promise((_, rej) => setTimeout(() => rej(new Error('timeout 3s')), 3000)),
  ]);
  console.log('SUCCESS with startScreencast! len:', shot.data.length);
  await page.cdp('Page.stopScreencast');
} catch (e) {
  console.log('startScreencast test err:', e.message);
  try { await page.cdp('Page.stopScreencast'); } catch {}
}
