const fs=await import('node:fs/promises');
const root='Y:/antigravity-project/ego-light-adsense-info-blog',run=`${root}/26_1113/_blogger_runs/20261113-blogger-1419`;
const task=await taskSpace(35),page=task.page('p1');
await page.reload({waitUntil:'domcontentloaded',timeout:30000});await page.waitForSelector('input[aria-label="제목"]',{timeout:30000});
await page.click('text="퍼머링크"');await page.click('text="검색 설명"');
const result=await page.evaluate(()=>({title:document.querySelector('input[aria-label="제목"]')?.value,html:[...document.querySelectorAll('.CodeMirror')].find(x=>x.CodeMirror)?.CodeMirror.getValue(),description:document.querySelector('textarea[aria-label="검색 설명 입력"]')?.value,slug:document.querySelector('input[aria-label="맞춤 퍼머링크 입력"]')?.value,radio:[...document.querySelectorAll('[aria-label]')].filter(x=>x.getAttribute('aria-label')?.includes('맞춤 퍼머링크')).map(x=>({tag:x.tagName,role:x.getAttribute('role'),checked:x.getAttribute('aria-checked'),value:x.value})),labels:document.querySelector('textarea[aria-label="쉼표로 라벨을 구분하세요."]')?.value}));
const expected=await fs.readFile(`${run}/completed-1.html`,'utf8');const normalized=s=>s?.replace(/\r\n/g,'\n');
const out={...result,html:undefined,htmlLength:result.html?.length,bodyMatches:normalized(result.html)===normalized(expected),verifiedAt:new Date().toISOString()};
await fs.writeFile(`${run}/verify-1.json`,JSON.stringify(out,null,2),'utf8');console.log(JSON.stringify(out));
