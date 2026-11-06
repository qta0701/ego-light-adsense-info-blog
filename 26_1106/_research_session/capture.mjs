import fs from 'node:fs/promises';
export const root='Y:/antigravity-project/ego-light-adsense-info-blog/26_1106/';
export async function mobile(p){await p.cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>r(true)))));}
export async function capture(p,folder,name,targets=[]){
  await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>r(true)))));
  const meta=await p.evaluate((targets)=>({url:location.href,title:document.title,width:innerWidth,height:innerHeight,scrollY,targets:targets.map(x=>{let e=x.selector?document.querySelector(x.selector):[...document.querySelectorAll('h1,h2,h3,h4,p,li,a,button,label,td,span')].find(e=>e.textContent.replace(/\s/g,'')===x.text.replace(/\s/g,''));if(!e)return {...x,missing:true};const r=e.getBoundingClientRect();return {...x,x:r.x,y:r.y,w:r.width,h:r.height};})}),targets);
  const shot=await p.cdp('Page.captureScreenshot',{format:'png'});
  await fs.writeFile(root+folder+'/웹조사/'+name+'_원본.png',Buffer.from(shot.data,'base64'));
  await fs.writeFile(root+folder+'/웹조사/'+name+'_캡처정보.json',JSON.stringify(meta,null,2));
  console.log(name,meta);
}
