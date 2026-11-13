const task = await taskSpace(28);
const page = task.page("p1");
await page.goto("file:///Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/은행_재테크_하나은행%20환율조회/웹조사/evidence/content-preview.html");
for (const [name,width,height] of [["mobile",390,844],["pc",1280,900]]) {
  await page.cdp("Emulation.setDeviceMetricsOverride", {width,height,deviceScaleFactor:1,mobile:false});
  console.log(name, await page.evaluate(() => ({width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,images:[...document.images].map(x=>({loaded:x.complete&&x.naturalWidth>0,width:x.clientWidth,natural:x.naturalWidth})), headings:document.querySelectorAll('h2').length})));
  console.log(await page.screenshot({path:`Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/은행_재테크_하나은행 환율조회/웹조사/evidence/preview-${name}.png`,fullPage:true}));
}
await task.finish({keep:[]});
