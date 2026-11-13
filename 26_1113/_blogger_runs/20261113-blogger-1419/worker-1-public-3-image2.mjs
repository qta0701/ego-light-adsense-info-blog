const fs=await import('node:fs/promises');const run='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-blogger-1419';
const task=await taskSpace(38),page=task.page('p1');
await page.evaluate(()=>document.querySelector('[data-image-id="IMG_02"]')?.scrollIntoView({block:'center'}));await page.waitForTimeout(3000);
const image=await page.evaluate(()=>{const x=document.querySelector('[data-image-id="IMG_02"]'),i=x?.querySelector('img');return {id:x?.getAttribute('data-image-id'),src:i?.currentSrc,srcAttr:i?.getAttribute('src'),alt:i?.alt,complete:i?.complete,width:i?.naturalWidth,caption:x?.querySelector('.seo-image-caption')?.innerText};});
const p=JSON.parse(await fs.readFile(`${run}/public-3.json`,'utf8'));p.images[1]=image;p.checkedAt=new Date().toISOString();await fs.writeFile(`${run}/public-3.json`,JSON.stringify(p,null,2),'utf8');console.log(JSON.stringify(image));
