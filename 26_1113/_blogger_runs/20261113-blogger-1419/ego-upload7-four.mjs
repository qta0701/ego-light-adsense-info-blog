const fs=await import('node:fs/promises'); const task=await taskSpace(34); const page=task.page('p1');
const root='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/노하우2_진학어플라이 회원가입/웹조사/'; const path='publish/04_04_guide_form.png';
await page.click('loc=role:menuitem[name="컴퓨터에서 업로드"]'); await page.waitForSelector('text="찾아보기"',{timeout:30000});
await page.setInputFiles('input[type=file]',[root+path]); await page.waitForSelector('text="레이아웃 선택"',{timeout:60000});
await page.click('text="원본 크기"'); await page.click('text="확인"');
await page.waitForFunction(()=>[...document.querySelectorAll('.CodeMirror')].some(e=>e.CodeMirror?.getValue().includes('04_04_guide_form.png')),undefined,{timeout:30000});
const code=await page.evaluate(()=>[...document.querySelectorAll('.CodeMirror')].find(e=>e.CodeMirror)?.CodeMirror.getValue());
const url=[...code.matchAll(/https:\/\/[^"\s]+/g)].map(x=>x[0]).find(u=>u.includes('04_04_guide_form.png')); if(!url) throw new Error('URL missing');
const file=root+'evidence/blogger-state.json'; const state=JSON.parse(await fs.readFile(file,'utf8')); state.images.push({id:'IMG_04',path:root+path,url,uploadedAt:new Date().toISOString()}); await fs.writeFile(file,JSON.stringify(state,null,2),'utf8'); console.log(JSON.stringify({url}));
