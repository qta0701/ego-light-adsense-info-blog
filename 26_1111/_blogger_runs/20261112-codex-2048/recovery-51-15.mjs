const fs=await import('node:fs/promises'); const path='Y:/antigravity-project/ego-light-adsense-info-blog/26_1111/앱사용_번개장터 카드 결제/웹조사/evidence/blogger-state.json';
const task=await taskSpace(21); const page=task.page('p1'); await page.click('@440');
const state=JSON.parse(await fs.readFile(path,'utf8')); state.recovery.republishRequestedAt=new Date().toISOString(); await fs.writeFile(path,JSON.stringify(state,null,2)+'\n','utf8');
await page.waitForURL('**/blog/posts/**',{timeout:30000}).catch(e=>console.log('wait:',e.message));
console.log((await page.snapshot()).slice(0,7000));
