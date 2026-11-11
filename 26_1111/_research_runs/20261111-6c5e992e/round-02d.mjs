for (const spaceId of [8, 9, 10]) {
  const task = await taskSpace(spaceId);
  const tabs = await task.tabs();
  console.log(`=== Space ${spaceId} ===`, tabs.map(t => ({ label: t.label, targetId: t.targetId, active: t.active, url: t.url })));
  for (const t of tabs) {
    try {
      const win = await task.cdp('Browser.getWindowForTarget', { targetId: t.targetId });
      console.log(`  target ${t.targetId} win:`, win);
      if (win?.bounds?.windowState === 'minimized') {
        await task.cdp('Browser.setWindowBounds', {
          windowId: win.windowId,
          bounds: { windowState: 'normal' },
        });
        console.log(`  Restored window ${win.windowId}:`, await task.cdp('Browser.getWindowForTarget', { targetId: t.targetId }));
      }
    } catch (e) {
      console.log(`  err:`, e.message);
    }
  }
}
