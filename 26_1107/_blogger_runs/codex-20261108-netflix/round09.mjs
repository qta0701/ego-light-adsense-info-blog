const fs=await import('node:fs/promises');const root='Y:/antigravity-project/ego-light-adsense-info-blog/';const path=root+'26_1107/앱사용_넷플릭스 한국 인기 영화 순위 확인 방법/웹조사/evidence/blogger-state.json';
const task=await taskSpace(7);const page=task.page('p1');
await page.click('text="원본 크기"');await page.click('text="확인"');
await page.waitForFunction(()=>{const e=[...document.querySelectorAll('.CodeMirror')].find(x=>x.offsetWidth&&x.CodeMirror);return e&&e.CodeMirror.getValue().includes('01_search.png')},undefined,{timeout:30000});
const code=await page.evaluate(()=>[...document.querySelectorAll('.CodeMirror')].find(x=>x.offsetWidth&&x.CodeMirror).CodeMirror.getValue());
const urls=[...code.matchAll(/(?:src|href)="(https:[^"]+)"/g)].map(x=>x[1]);const url=urls.find(x=>x.includes('01_search.png'));if(!url)throw new Error('업로드 URL 식별 실패');
const s=JSON.parse(await fs.readFile(path,'utf8'));s.images[0].url=url;s.status='uploading';await fs.writeFile(path,JSON.stringify(s,null,2),'utf8');console.log(JSON.stringify({row:53,id:s.images[0].id,uploaded:true,codeLength:code.length}));
