const task = await taskSpace(8);
const page = task.page('p1');
console.log('targetId:', page.targetId, 'url:', await page.url());
try {
  const win = await task.cdp('Browser.getWindowForTarget', { targetId: page.targetId });
  console.log('win:', win);
  if (win && win.windowId && win.bounds?.windowState === 'minimized') {
    await task.cdp('Browser.setWindowBounds', {
      windowId: win.windowId,
      bounds: { windowState: 'normal' },
    });
    console.log('Restored window via CDP:', await task.cdp('Browser.getWindowForTarget', { targetId: page.targetId }));
  }
} catch (e) {
  console.log('Browser.getWindowForTarget error:', e.message);
}
