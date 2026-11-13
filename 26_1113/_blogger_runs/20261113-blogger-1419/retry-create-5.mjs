const fs=await import('node:fs/promises'); const p='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/노하우_코레일 승차권 조회/웹조사/evidence/blogger-state.json';
const s=JSON.parse(await fs.readFile(p,'utf8')); if(s.postId) throw Error('Already created');
const task=await taskSpace(s.spaceId), page=task.page('p1');
await page.click('loc=role:button[name="새 글 작성"]');
await page.waitForSelector('input[aria-label="제목"]',{state:'visible',timeout:30000});
const url=await page.url(), id=url.match(/\/blog\/post\/edit\/\d+\/(\d+)/)?.[1]; if(!id) throw Error('No postId');
Object.assign(s,{postId:id,editorUrl:url,stage:'created',createdAt:new Date().toISOString(),retryEvidence:'List showed only the two known other drafts after initial timeout'}); await fs.writeFile(p,JSON.stringify(s,null,2));
console.log(JSON.stringify({postId:id,url,snapshot:await page.snapshot()}));
