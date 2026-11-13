import {pathToFileURL} from 'node:url';
import fs from 'node:fs/promises';
const task = await taskSpace(30);
const page = task.page('p1');
const folder='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/은행_재테크_국민은행 통장사본 출력/웹조사/evidence/';
await page.goto(pathToFileURL(folder+'content-preview.html').href);
for (const width of [390,1200]) {
  await page.cdp('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<600});
  await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
  const result=await page.evaluate(()=>({viewport:innerWidth,documentWidth:document.documentElement.scrollWidth,images:[...document.images].map(i=>({loaded:i.complete&&i.naturalWidth>0,natural:[i.naturalWidth,i.naturalHeight],display:[i.getBoundingClientRect().width,i.getBoundingClientRect().height]})),height:document.documentElement.scrollHeight}));
  const shot=await page.cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,fromSurface:true});
  await fs.writeFile(folder+`preview-${width}.png`,Buffer.from(shot.data,'base64'));
  console.log(width,JSON.stringify(result));
}
await task.finish({keep:[]});
