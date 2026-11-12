const fs=await import('node:fs/promises');const run='Y:/antigravity-project/ego-light-adsense-info-blog/26_1111/_blogger_runs/20261112-codex-2048';
const profile=(await profiles()).find(p=>p.name==='순분'&&p.id==='Profile 2');if(!profile)throw Error('profile not found');
const out=[];
for(const row of [48,49,50]) {const t=await taskSpace(`blogger-20261112-codex-2048-${row}`,{profileId:profile.id});const item={row,spaceId:t.spaceId,startedAt:new Date().toISOString()};out.push(item);await fs.writeFile(`${run}/spaces-48-50.json`,JSON.stringify(out,null,2));console.log(item);}
for(const item of out){const t=await taskSpace(item.spaceId),p=t.page('p1');await p.goto('https://www.blogger.com/blog/posts/7162964317827704236?hl=ko');console.log('ROW',item.row,await p.snapshot());}
