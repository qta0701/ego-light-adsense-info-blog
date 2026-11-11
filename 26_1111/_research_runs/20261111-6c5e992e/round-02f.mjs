const task = await taskSpace(8);
const { targetInfos } = await task.cdp('Target.getTargets');
const pages = targetInfos.filter(t => t.type === 'page');
const seenWins = new Set();
for (const p of pages) {
  try {
    const win = await task.cdp('Browser.getWindowForTarget', { targetId: p.targetId });
    if (!seenWins.has(win.windowId)) {
      seenWins.add(win.windowId);
      console.log('windowId:', win.windowId, 'bounds:', win.bounds, 'sampleUrl:', p.url.slice(0, 60));
      if (win.bounds?.windowState === 'minimized') {
        await task.cdp('Browser.setWindowBounds', { windowId: win.windowId, bounds: { windowState: 'normal' } });
        console.log('Restored windowId:', win.windowId);
      }
    }
  } catch (e) {}
}
