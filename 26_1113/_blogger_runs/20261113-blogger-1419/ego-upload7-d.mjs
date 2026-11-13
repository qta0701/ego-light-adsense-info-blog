const fs=await import('node:fs/promises'); const task=await taskSpace(34); const page=task.page('p1');
await page.click('text="원본 크기"'); await page.click('text="확인"');
await page.waitForFunction(() => [...document.querySelectorAll('.CodeMirror')].some(e => e.CodeMirror?.getValue().includes('01_01_search')),undefined,{timeout:30000});
const code=await page.evaluate(() => [...document.querySelectorAll('.CodeMirror')].find(e=>e.CodeMirror)?.CodeMirror.getValue());
const url=code.match(/https:\/\/[^"\s]+(?:01_01_search[^"\s]*)/);
console.log(JSON.stringify({code,url:url?.[0]}));
if(!url) throw new Error('uploaded URL missing');
const file='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/노하우2_진학어플라이 회원가입/웹조사/evidence/blogger-state.json';
const state=JSON.parse(await fs.readFile(file,'utf8')); state.images.push({id:'IMG_01',url:url[0],uploadedAt:new Date().toISOString()}); await fs.writeFile(file,JSON.stringify(state,null,2),'utf8');
