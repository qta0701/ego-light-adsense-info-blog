const task=await taskSpace(23);const p=task.page('p1');
const {capture}=await import('file:///Y:/antigravity-project/ego-light-adsense-info-blog/tools/research_browser.mjs');
const folder='26_1113/_blogger_runs/korail35-preview-evidence';
await p.goto('http://127.0.0.1:8765/26_1113/_blogger_runs/korail35-preview.html');
for(const [name,width,selector] of [['mobile-top',390,null],['mobile-image',390,'#img-04'],['pc-top',1200,null],['pc-image',1200,'#img-05']]){
 await p.cdp('Emulation.setDeviceMetricsOverride',{width,height:844,deviceScaleFactor:1,mobile:width<600});
 await p.evaluate((s)=>{if(s)document.querySelector(s).scrollIntoView({block:'start'});else window.scrollTo(0,0)},selector);
 console.log(name,await capture(p,folder,name,[],{width,height:844}));
 console.log(await p.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,images:[...document.images].map(x=>({loaded:x.complete&&x.naturalWidth>0,natural:[x.naturalWidth,x.naturalHeight],display:[x.getBoundingClientRect().width,x.getBoundingClientRect().height]}))})));
}
await task.finish({keep:[]});
