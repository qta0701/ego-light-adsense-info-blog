const task = await taskSpace(18);
const page = task.page('p1');
const {capture} = await import('file:///Y:/antigravity-project/ego-light-adsense-info-blog/tools/research_browser.mjs');
await page.cdp('Emulation.setDeviceMetricsOverride',{width:1100,height:850,deviceScaleFactor:1,mobile:false});
await page.evaluate(() => document.querySelector('#sections > h2').scrollIntoView({block:'center'}));
console.log(await capture(page,'26_1113/이슈_앱스토어 로그아웃/웹조사','05_family',['#sections > h2 + p'],{width:1100,height:850}));
