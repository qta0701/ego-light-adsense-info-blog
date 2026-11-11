const spaces = await listTaskSpaces();
console.log('All spaces:', spaces);
const task = await taskSpace(8);
const page = task.page('p1');
const tabs = await task.tabs();
const targetId = tabs[0].targetId;
console.log('Before activate, visibilityState:', await page.evaluate(() => ({ visibilityState: document.visibilityState, hidden: document.hidden })));
try {
  await task.cdp('Target.activateTarget', { targetId });
} catch (e) {
  console.log('Target.activateTarget err:', e.message);
}
try {
  await page.cdp('Page.bringToFront');
} catch (e) {
  console.log('Page.bringToFront err:', e.message);
}
console.log('After activate, visibilityState:', await page.evaluate(() => ({ visibilityState: document.visibilityState, hidden: document.hidden })));
