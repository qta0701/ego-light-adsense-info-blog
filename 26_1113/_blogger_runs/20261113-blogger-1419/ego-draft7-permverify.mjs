const fs=await import('node:fs/promises');const task=await taskSpace(34),page=task.page('p1');
await page.waitForFunction(()=>!!document.querySelector('[aria-label="변경사항이 저장되었습니다."]'),undefined,{timeout:30000});await page.reload({waitUntil:'domcontentloaded',timeout:30000});
await page.waitForFunction(()=>document.querySelector('input[aria-label="제목"]')?.value,undefined,{timeout:30000});
await page.click('text="퍼머링크"');await page.waitForSelector('div[role=radio][aria-label^="맞춤 퍼머링크"]',{timeout:10000});
const value=await page.evaluate(()=>({radio:document.querySelector('div[role=radio][aria-label^="맞춤 퍼머링크"]')?.getAttribute('aria-checked'),value:document.querySelector('input[aria-label="맞춤 퍼머링크 입력"]')?.value}));console.log(JSON.stringify(value));
const file='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/노하우2_진학어플라이 회원가입/웹조사/evidence/blogger-state.json';const state=JSON.parse(await fs.readFile(file,'utf8'));state.verification.permalink=value;await fs.writeFile(file,JSON.stringify(state,null,2),'utf8');
