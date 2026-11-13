const fs = await import('node:fs/promises');
const base = 'Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-blogger-1419';
const ps = await profiles();
const profile = ps.find(p => p.name === '순분' && p.id === 'Profile 2');
if (!profile) throw new Error('순분 Profile 2 not found');
for (const [order, keyword] of [[1,'앱스토어 로그아웃'],[2,'코레일 민원접수'],[3,'테무 회원탈퇴']]) {
  try {
    const task = await taskSpace(`20261113-blogger-1419-order-${order}`, {profileId: profile.id});
    const startedAt = new Date().toISOString();
    await fs.writeFile(`${base}/space-${order}.json`, JSON.stringify({order,keyword,spaceId:task.spaceId,startedAt,profileId:profile.id,blogId:'694192108971227039',stage:'opened'},null,2),'utf8');
    const page = task.page('p1');
    await page.goto('https://www.blogger.com/blog/posts/694192108971227039?hl=ko', {waitUntil:'domcontentloaded', timeout:30000});
    console.log(JSON.stringify({order,spaceId:task.spaceId,startedAt,url:await page.url(),snapshot:await page.snapshot()}));
  } catch(e) { console.log(JSON.stringify({order,error:String(e)})); }
}
