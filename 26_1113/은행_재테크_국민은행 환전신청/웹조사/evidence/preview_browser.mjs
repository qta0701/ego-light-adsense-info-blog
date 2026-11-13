const task = await taskSpace('kb-exchange-content-preview-20261113');
const page = task.page('p1');
await page.goto('http://127.0.0.1:8768/_content_preview.html');
for (const width of [390, 1280]) {
  await page.cdp('Emulation.setDeviceMetricsOverride', {width, height: 900, deviceScaleFactor: 1, mobile: false});
  const report = await page.evaluate(() => ({width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth, images: [...document.images].map(i => ({loaded: i.complete && i.naturalWidth > 0, natural: [i.naturalWidth,i.naturalHeight], rendered: [i.clientWidth,i.clientHeight]})), headings: [...document.querySelectorAll('h2')].map(x=>x.textContent)}));
  console.log(JSON.stringify({width, report}));
  console.log(await page.screenshot({path:`Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/은행_재테크_국민은행 환전신청/웹조사/evidence/preview-${width}.png`, fullPage:true}));
}
console.log('spaceId', task.spaceId);
