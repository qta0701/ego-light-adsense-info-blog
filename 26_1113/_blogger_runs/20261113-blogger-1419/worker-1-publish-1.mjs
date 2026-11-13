const fs=await import('node:fs/promises');
const run='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-blogger-1419';
const a=JSON.parse(await fs.readFile(`${run}/publish-ok-1.json`,'utf8'));
if(a.order!==1||a.postId!=='4970818560955615714'||a.blogId!=='694192108971227039'||!a.serialized||a.H!=='blank'||a.L!=='blank')throw Error('invalid publish authorization');
const task=await taskSpace(35),page=task.page('p1');
await page.click('loc=role:button[name="게시"]');console.log((await page.snapshot()).slice(-2200));
