const fs=await import('node:fs/promises');
const root='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-blogger-1419';
for (const [order,id] of [[10,40],[11,41],[12,42]]) {
 const page=(await taskSpace(id)).page('p1');
 try {await page.waitForFunction(()=>!document.body.innerText.includes('로드 중...'),undefined,{timeout:20000});} catch(e){console.log('wait',order,String(e));}
 const snap=await page.snapshot();
 await fs.writeFile(`${root}/duplicate-final-${order}.txt`,snap);
 console.log(JSON.stringify({order,url:await page.url(),snapshot:snap}));
}
