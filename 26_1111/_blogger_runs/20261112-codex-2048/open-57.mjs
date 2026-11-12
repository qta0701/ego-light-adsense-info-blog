const t = await taskSpace('blogger-20261112-codex-2048-57-restart', {profileId:'Profile 2'});
console.log(JSON.stringify({spaceId:t.spaceId,startedAt:new Date().toISOString()}));
const p=t.page('p1');
await p.goto('https://www.blogger.com/blog/posts/7162964317827704236?hl=ko');
console.log(await p.snapshot());
