const task = await taskSpace(8);
const page = task.page('p1');

async function tryShot(label, params) {
  const t0 = Date.now();
  try {
    const res = await Promise.race([
      page.cdp('Page.captureScreenshot', params),
      new Promise((_, rej) => setTimeout(() => rej(new Error('timeout 3s')), 3000)),
    ]);
    console.log(label, 'SUCCESS in', Date.now() - t0, 'ms, bytes:', res.data?.length);
    return true;
  } catch (e) {
    console.log(label, 'FAILED in', Date.now() - t0, 'ms:', e.message);
    return false;
  }
}

await tryShot('1. default fromSurface:true', { format: 'png', fromSurface: true, captureBeyondViewport: false });
await tryShot('2. fromSurface:false', { format: 'png', fromSurface: false, captureBeyondViewport: false });

try {
  await task.cdp('Browser.setWindowBounds', { windowId: 640092853, bounds: { windowState: 'minimized' } });
  await task.cdp('Browser.setWindowBounds', { windowId: 640092853, bounds: { windowState: 'normal' } });
  await task.cdp('Browser.setWindowBounds', { windowId: 640092951, bounds: { windowState: 'normal' } });
} catch (e) {
  console.log('setWindowBounds err:', e.message);
}

await tryShot('3. after setWindowBounds minimize->normal on 640092853', { format: 'png', fromSurface: true, captureBeyondViewport: false });
