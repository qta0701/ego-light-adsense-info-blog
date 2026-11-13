import {capture} from '../../../../tools/research_browser.mjs';
const task = await taskSpace(20);
const page = task.page('p1');
await page.goto('http://127.0.0.1:18771/26_1113/_blogger_runs/20261113-content-1401/preview-31/preview.html');
const folder='26_1113/_blogger_runs/20261113-content-1401/preview-31';
for (const [name,width,height] of [['mobile',390,844],['pc',1200,800]]) {
 await page.cdp('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});
 await page.evaluate(()=>scrollTo(0,0));
 console.log(name,await page.evaluate(()=>({viewport:innerWidth,body:document.documentElement.scrollWidth,images:[...document.images].map(x=>({loaded:x.complete&&x.naturalWidth>0,natural:[x.naturalWidth,x.naturalHeight],rendered:[Math.round(x.getBoundingClientRect().width),Math.round(x.getBoundingClientRect().height)]})),links:[...document.querySelectorAll('a')].length})));
 console.log(await capture(page,folder,name,[],{width,height}));
 await page.evaluate(()=>document.querySelector('#img-05').scrollIntoView({block:'center'}));
 console.log(await capture(page,folder,name+'-image',[],{width,height}));
}
await task.finish({keep:[]});
