const fs=await import('node:fs/promises');const task=await taskSpace(34),page=task.page('p1');
await page.focus('div[role=radio][aria-label^="자동 퍼머링크"]');await page.press('div[role=radio][aria-label^="자동 퍼머링크"]','Space');
await page.waitForFunction(()=>document.querySelector('div[role=radio][aria-label^="자동 퍼머링크"]')?.getAttribute('aria-checked')==='true',undefined,{timeout:10000});
await page.waitForFunction(()=>!!document.querySelector('[aria-label="변경사항이 저장되었습니다."]'),undefined,{timeout:30000});
const file='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/노하우2_진학어플라이 회원가입/웹조사/evidence/blogger-state.json';const state=JSON.parse(await fs.readFile(file,'utf8'));state.verification.permalink={mode:'auto',reason:'custom slug did not persist on reload'};await fs.writeFile(file,JSON.stringify(state,null,2),'utf8');console.log('auto selected and saved');
