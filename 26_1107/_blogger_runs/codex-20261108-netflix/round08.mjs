const fs=await import('node:fs/promises');const root='Y:/antigravity-project/ego-light-adsense-info-blog/';
const task=await taskSpace(7);const page=task.page('p1');const state=JSON.parse(await fs.readFile(root+'26_1107/앱사용_넷플릭스 한국 인기 영화 순위 확인 방법/웹조사/evidence/blogger-state.json','utf8'));
await page.setInputFiles('input[type=file]',[root+state.images[0].file]);
await page.waitForSelector('text="레이아웃 선택"',{state:'visible',timeout:30000});
console.log(await page.snapshot());
