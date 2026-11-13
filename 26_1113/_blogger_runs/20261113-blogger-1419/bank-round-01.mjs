const fs = await import('node:fs/promises');
const root = 'Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-blogger-1419';
const profile = (await profiles()).find(p => p.name === '순분' && p.id === 'Profile 2');
if (!profile) throw new Error('순분 Profile 2 not found');
for (const order of [10,11,12]) {
  try {
    const startedAt = new Date().toISOString();
    const task = await taskSpace(`blogger-20261113-1419-${order}`, {profileId: profile.id});
    await fs.writeFile(`${root}/space-${order}.json`, JSON.stringify({order,spaceId:task.spaceId,startedAt,profileId:profile.id},null,2));
    const page=task.page('p1');
    await page.goto('https://www.blogger.com/blog/posts/3013546958093270596?hl=ko', {waitUntil:'domcontentloaded',timeout:30000});
    console.log(JSON.stringify({order,spaceId:task.spaceId,url:await page.url(),snapshot:await page.snapshot()}));
  } catch (e) {console.log(JSON.stringify({order,error:String(e)}));}
}
