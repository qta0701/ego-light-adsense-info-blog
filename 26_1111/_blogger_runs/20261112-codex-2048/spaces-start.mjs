const fs = await import('node:fs/promises');
const out = [];
for (const row of [44,45,46]) {
  const task = await taskSpace(`blogger-20261112-codex-2048-${row}`, {profileId:'Profile 2'});
  const item = {row, spaceId:task.spaceId, startedAt:new Date().toISOString()};
  out.push(item);
  await fs.writeFile('Y:/antigravity-project/ego-light-adsense-info-blog/26_1111/_blogger_runs/20261112-codex-2048/spaces.json', JSON.stringify(out,null,2));
  console.log(item);
  await task.page('p1').goto('https://www.blogger.com/blog/posts/7162964317827704236?hl=ko');
  console.log('row',row,await task.page('p1').snapshot());
}
