const task=await taskSpace(26); const page=task.page('p1');
await page.goto('http://127.0.0.1:8767/26_1113/_blogger_runs/20261113-content-1401/busan-preview.html');
for (const width of [390,1280]) {
  await page.cdp('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<600});
  await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
  console.log(width,await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,images:[...document.images].map(i=>({loaded:i.complete&&i.naturalWidth>0,natural:[i.naturalWidth,i.naturalHeight],shown:[i.clientWidth,i.clientHeight]}))})));
  await page.screenshot({path:`Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-content-1401/busan-preview-${width}.png`,fullPage:true});
}
await task.finish({keep:[]});
