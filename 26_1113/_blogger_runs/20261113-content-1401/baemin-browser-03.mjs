import fs from 'node:fs/promises';
const task=await taskSpace(27);
const page=task.page('p1');
const dir='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-content-1401';
await page.goto('http://127.0.0.1:18765/26_1113/_blogger_runs/20261113-content-1401/baemin-preview.html');
for (const [label,width,height] of [['mobile',390,844],['desktop',1365,900]]) {
 await page.cdp('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});
 await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
 console.log(label,await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,images:[...document.images].map(x=>({alt:x.alt,loaded:x.complete&&x.naturalWidth>0,natural:[x.naturalWidth,x.naturalHeight],display:[x.clientWidth,x.clientHeight]}))})));
 await page.evaluate(()=>window.scrollTo(0,0));
 let shot=await page.cdp('Page.captureScreenshot',{format:'png',fromSurface:true});
 await fs.writeFile(`${dir}/baemin-${label}-top.png`,Buffer.from(shot.data,'base64'));
 await page.evaluate(()=>document.querySelector('#img-03').scrollIntoView({block:'center'}));
 shot=await page.cdp('Page.captureScreenshot',{format:'png',fromSurface:true});
 await fs.writeFile(`${dir}/baemin-${label}-detail.png`,Buffer.from(shot.data,'base64'));
}
await task.finish({keep:[]});
