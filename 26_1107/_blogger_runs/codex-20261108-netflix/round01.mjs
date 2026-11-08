const ps = await profiles();
const profile = ps.find(p => p.name === '순분' && p.id === 'Profile 2');
if (!profile) throw new Error('순분 프로필 불일치');
for (const n of [53,54]) {
  const task = await taskSpace(`codex-20261108-netflix-${n}`, {profileId: profile.id});
  const page = task.page('p1');
  await page.goto('https://www.blogger.com/blog/posts/7162964317827704236?hl=ko', {waitUntil:'domcontentloaded', timeout:30000});
  console.log(JSON.stringify({row:n,spaceId:task.spaceId,url:await page.url(),snapshot:await page.snapshot()}));
}
