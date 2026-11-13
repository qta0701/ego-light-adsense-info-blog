const task=await taskSpace(18);
const page=task.page('p1');
const {capture}=await import('file:///Y:/antigravity-project/ego-light-adsense-info-blog/tools/research_browser.mjs');
await page.goto('http://127.0.0.1:18767/'+encodeURI('26_1113/이슈_앱스토어 로그아웃/웹조사/evidence/content-preview.html'));
for (const [name,width,height] of [['mobile',390,844],['pc',1280,900]]) {
  await page.cdp('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});
  await page.evaluate(()=>document.querySelector('#img-01').scrollIntoView({block:'center'}));
  console.log(name,await page.evaluate(()=>({width:innerWidth,doc:document.documentElement.scrollWidth,images:[...document.images].map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0,natural:[i.naturalWidth,i.naturalHeight],display:[i.getBoundingClientRect().width,i.getBoundingClientRect().height]}))})));
  console.log(await capture(page,'26_1113/이슈_앱스토어 로그아웃/웹조사/evidence/preview-captures',name,[],{width,height}));
}
