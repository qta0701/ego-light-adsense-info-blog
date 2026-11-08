const ps=await profiles();const profile=ps.find(p=>p.name==='순분'&&p.id==='Profile 2');if(!profile)throw new Error('프로필 불일치');
const task=await taskSpace('codex-20261108-netflix-55',{profileId:profile.id});const page=task.page('p1');
await page.goto('https://www.blogger.com/blog/posts/7162964317827704236?hl=ko',{waitUntil:'domcontentloaded',timeout:30000});
await page.fill('input[aria-label="검색"]','넷플릭스 성인인증');await page.press('input[aria-label="검색"]','Enter');
await page.waitForFunction(()=>decodeURIComponent(location.href).includes('넷플릭스 성인인증'),undefined,{timeout:15000});
console.log(JSON.stringify({spaceId:task.spaceId,stage:'searching'}));
