const profilesList=await profiles();const p=profilesList.find(x=>x.name==='순분'&&x.id==='Profile 2');if(!p)throw Error('Profile 2 missing');
const t=await taskSpace('blogger-audit-20261112-codex',{profileId:p.id});const page=t.page('p1');console.log({spaceId:t.spaceId});
for(const url of ['https://app.supportimes.com/2026/11/blog-post_565.html','https://app.supportimes.com/2026/11/pc.html']){await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});console.log(await page.evaluate(()=>({url:location.href,title:document.title,canonical:document.querySelector('link[rel=canonical]')?.href,h1:document.querySelector('h1')?.innerText,time:document.querySelector('time.published')?.getAttribute('datetime')})));}
await t.finish({keep:[]});
