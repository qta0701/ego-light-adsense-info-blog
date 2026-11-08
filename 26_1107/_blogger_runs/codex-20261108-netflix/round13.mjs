const fs=await import('node:fs/promises');const root='Y:/antigravity-project/ego-light-adsense-info-blog/';const path=root+'26_1107/앱사용_넷플릭스 오리지널 역대 영화 순위/웹조사/evidence/blogger-state.json';
const s=JSON.parse(await fs.readFile(path,'utf8'));const task=await taskSpace(8);const page=task.page('p1');let menuOpen=true;
for(const im of s.images){if(im.url)continue;
 if(!menuOpen)await page.click('loc=role:button[name="이미지 삽입"]');menuOpen=false;
 await page.click('loc=role:menuitem[name="컴퓨터에서 업로드"]');
 await page.waitForSelector('input[type=file]',{state:'attached',timeout:15000});await page.setInputFiles('input[type=file]',[root+im.file]);
 await page.waitForSelector('text="레이아웃 선택"',{state:'visible',timeout:30000});await page.click('text="원본 크기"');await page.click('text="확인"');
 const filename=im.file.split('/').pop();await page.waitForFunction(f=>{const e=[...document.querySelectorAll('.CodeMirror')].find(x=>x.offsetWidth&&x.CodeMirror);return e&&e.CodeMirror.getValue().includes(f)},filename,{timeout:30000});
 const code=await page.evaluate(()=>[...document.querySelectorAll('.CodeMirror')].find(x=>x.offsetWidth&&x.CodeMirror).CodeMirror.getValue());
 const url=[...code.matchAll(/(?:src|href)="(https:[^"]+)"/g)].map(x=>x[1]).find(x=>x.includes(filename));if(!url)throw new Error(`${im.id} URL 식별 실패`);
 im.url=url;await fs.writeFile(path,JSON.stringify(s,null,2),'utf8');console.log(JSON.stringify({row:54,id:im.id,uploaded:true}));
 await page.waitForFunction(()=>![...document.querySelectorAll('[role="dialog"]')].some(x=>x.offsetWidth&&x.offsetHeight),undefined,{timeout:10000});
}
