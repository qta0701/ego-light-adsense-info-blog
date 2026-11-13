const list = await profiles();
const profile = list.find(p => p.name === '순분' && p.id === 'Profile 2');
if (!profile) throw new Error('순분 Profile 2 not found');
for (const order of [7, 8, 9]) {
  try {
    const startedAt = new Date().toISOString();
    const task = await taskSpace(`20261113-blogger-1419-order-${order}`, {profileId: profile.id});
    console.log(JSON.stringify({order, spaceId: task.spaceId, startedAt}));
    const page = task.page('p1');
    await page.goto('https://www.blogger.com/blog/posts/3087664879020853782?hl=ko');
    console.log(JSON.stringify({order, url: await page.url(), snapshot: await page.snapshot()}));
  } catch (error) { console.log(JSON.stringify({order, error: String(error)})); }
}
