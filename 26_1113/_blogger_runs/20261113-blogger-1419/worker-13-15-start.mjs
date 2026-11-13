const fs = await import('node:fs/promises');
const profile = (await profiles()).find(p => p.name === '순분' && p.id === 'Profile 2');
if (!profile) throw new Error('순분 Profile 2 not found');
const base = 'Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-blogger-1419';
for (const order of [13,14,15]) {
  try {
    const task = await taskSpace(`20261113-blogger-1419-${order}`, {profileId: profile.id});
    const startedAt = new Date().toISOString();
    await fs.writeFile(`${base}/space-${order}.json`, JSON.stringify({order,spaceId:task.spaceId,startedAt,profileId:profile.id,blogId:'3013546958093270596'},null,2));
    const page = task.page('p1');
    await page.goto('https://www.blogger.com/blog/posts/3013546958093270596?hl=ko');
    console.log(JSON.stringify({order,spaceId:task.spaceId,startedAt,url:await page.url(),snapshot:await page.snapshot()}));
  } catch(e) { console.log(JSON.stringify({order,error:String(e)})); }
}
