const fs = await import('node:fs/promises');
const root = 'Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-blogger-1419';
for (const order of [4,5,6]) {
  try {
    const task = await taskSpace(`20261113-blogger-1419-order-${order}`, {profileId:'Profile 2'});
    const start = new Date().toISOString();
    await fs.writeFile(`${root}/space-${order}.json`, JSON.stringify({order,spaceId:task.spaceId,profileId:'Profile 2',startedAt:start},null,2));
    const page = task.page('p1');
    await page.goto('https://www.blogger.com/blog/posts/1872124715220437079?hl=ko', {waitUntil:'domcontentloaded',timeout:30000});
    console.log(JSON.stringify({order,spaceId:task.spaceId,startedAt:start,url:await page.url(),snapshot:await page.snapshot()}));
  } catch(e) { console.log(JSON.stringify({order,error:String(e)})); }
}
