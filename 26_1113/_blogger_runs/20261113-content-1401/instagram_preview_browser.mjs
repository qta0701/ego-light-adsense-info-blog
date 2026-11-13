const task=await taskSpace(25), page=task.page('p1');
await page.goto('http://127.0.0.1:8765/26_1113/_blogger_runs/20261113-content-1401/instagram-preview.html');
for(const size of [{width:390,height:844},{width:1280,height:900}]){
  await page.cdp('Emulation.setDeviceMetricsOverride',{...size,deviceScaleFactor:1,mobile:size.width<600});
  await page.evaluate(()=>document.querySelector('#img-03').scrollIntoView({block:'center'}));
  const stats=await page.evaluate(()=>({innerWidth,scrollWidth:document.documentElement.scrollWidth,images:[...document.images].map(x=>({loaded:x.complete&&x.naturalWidth>0,natural:[x.naturalWidth,x.naturalHeight],rendered:[x.getBoundingClientRect().width,x.getBoundingClientRect().height]}))}));
  const path='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-content-1401/instagram-preview-'+size.width+'.png';
  await page.screenshot({path});
  console.log(JSON.stringify({size,stats,path}));
}
await task.finish({keep:[]});
