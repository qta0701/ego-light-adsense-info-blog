const fs=await import('node:fs/promises'),base='Y:/antigravity-project/ego-light-adsense-info-blog',p=`${base}/26_1113/노하우_앱스토어 국가변경/웹조사/evidence/blogger-state.json`;
const s=JSON.parse(await fs.readFile(p,'utf8')),task=await taskSpace(s.spaceId),page=task.page('p1');
await page.click('loc=role:menuitem[name="컴퓨터에서 업로드"]');
await page.waitForSelector('input[type=file]',{state:'attached',timeout:20000});
console.log(await page.snapshot());
