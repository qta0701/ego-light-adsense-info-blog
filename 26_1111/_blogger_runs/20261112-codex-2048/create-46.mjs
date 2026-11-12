const fs=await import('node:fs/promises');
const t=await taskSpace(17); const p=t.page('p1');
await p.click('loc=role:button[name="새 글 작성"]');
const url=await p.url();
await fs.writeFile('Y:/antigravity-project/ego-light-adsense-info-blog/26_1111/_blogger_runs/20261112-codex-2048/created-46.json',JSON.stringify({row:46,url,observedAt:new Date().toISOString()}));
console.log('URL',url); console.log(await p.snapshot());
