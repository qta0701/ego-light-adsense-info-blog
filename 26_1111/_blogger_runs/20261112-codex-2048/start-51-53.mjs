const fs=await import('node:fs/promises');
const run='Y:/antigravity-project/ego-light-adsense-info-blog/26_1111/_blogger_runs/20261112-codex-2048';
const profile=(await profiles()).find(p=>p.name==='순분'&&p.id==='Profile 2'); if(!profile) throw Error('Profile 2 순분 not found');
const out=[];
for(const row of [51,52,53]) { const t=await taskSpace(`blogger-20261112-codex-2048-${row}`,{profileId:profile.id}); out.push({row,spaceId:t.spaceId,startedAt:new Date().toISOString()}); await fs.writeFile(`${run}/spaces-51-53.json`,JSON.stringify(out,null,2)); console.log(out.at(-1)); }
for(const item of out){const t=await taskSpace(item.spaceId), p=t.page('p1'); await p.goto('https://www.blogger.com/blog/posts/7162964317827704236?hl=ko'); console.log('ROW',item.row,await p.snapshot());}
