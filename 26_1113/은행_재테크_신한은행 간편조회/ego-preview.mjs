const task = await taskSpace(29);
const page = task.page('p1');
const {pathToFileURL}=await import('node:url');
const path='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/은행_재테크_신한은행 간편조회/웹조사/publish/_local_preview.html';
await page.goto(pathToFileURL(path).href);
for (const [label,width] of [['mobile',390],['pc',1200]]) {
 await page.cdp('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<600});
 const state=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,images:[...document.images].map(x=>({complete:x.complete,width:x.naturalWidth,height:x.naturalHeight,rendered:x.getBoundingClientRect().width}))}));
 const file=await page.screenshot({path:`Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/은행_재테크_신한은행 간편조회/웹조사/evidence/preview-${label}.png`});
 console.log({label,state,file});
}
await task.finish({keep:[]});
