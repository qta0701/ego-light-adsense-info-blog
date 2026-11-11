const task = await taskSpace(8);
const page = task.page('p1');
const tabs = await task.tabs();
const win = await task.cdp('Browser.getWindowForTarget', { targetId: tabs[0].targetId });
console.log('Space 8 win:', win);

async function tryShot(label) {
  const t0 = Date.now();
  try {
    const res = await Promise.race([
      page.cdp('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false }),
      new Promise((_, rej) => setTimeout(() => rej(new Error('timeout 3s')), 3000)),
    ]);
    console.log(label, 'SUCCESS in', Date.now() - t0, 'ms, bytes:', res.data?.length);
    return true;
  } catch (e) {
    console.log(label, 'FAILED in', Date.now() - t0, 'ms:', e.message);
    return false;
  }
}

await task.cdp('Browser.setWindowBounds', { windowId: win.windowId, bounds: { windowState: 'minimized' } });
await page.waitForTimeout(200);
await task.cdp('Browser.setWindowBounds', { windowId: win.windowId, bounds: { windowState: 'normal' } });
await page.waitForTimeout(300);
await tryShot('After minimize->normal on Space 8 windowId');

await task.cdp('Browser.setWindowBounds', { windowId: win.windowId, bounds: { windowState: 'maximized' } });
await page.waitForTimeout(300);
await task.cdp('Browser.setWindowBounds', { windowId: win.windowId, bounds: { windowState: 'normal', left: 100, top: 50, width: 1280, height: 900 } });
await page.waitForTimeout(300);
await tryShot('After maximized->normal on Space 8 windowId');
