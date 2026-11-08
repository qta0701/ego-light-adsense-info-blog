const fs=await import('node:fs/promises');const root='Y:/antigravity-project/ego-light-adsense-info-blog/';
for(const [id,k] of [[7,'넷플릭스 한국 인기 영화 순위 확인 방법'],[8,'넷플릭스 오리지널 역대 영화 순위']]){
 const state=JSON.parse(await fs.readFile(root+`26_1107/앱사용_${k}/웹조사/evidence/blogger-state.json`,'utf8'));const task=await taskSpace(id);const page=task.page('p1');
 const saved=await page.evaluate(()=>{const e=document.querySelector('[aria-label="변경사항이 저장되었습니다."]');return !!(e&&e.getBoundingClientRect().width&&e.getBoundingClientRect().height)});if(!saved)throw new Error(`${state.row} 저장 표시 없음`);
 await page.goto(state.editorUrl,{waitUntil:'domcontentloaded',timeout:30000});await page.waitForSelector('input[aria-label="제목"]',{state:'visible',timeout:30000});
 await page.waitForFunction(()=>[...document.querySelectorAll('.CodeMirror')].some(x=>x.offsetWidth&&x.CodeMirror),undefined,{timeout:30000});
 const data=await page.evaluate(()=>({title:document.querySelector('input[aria-label="제목"]')?.value,html:[...document.querySelectorAll('.CodeMirror')].find(x=>x.offsetWidth&&x.CodeMirror).CodeMirror.getValue(),inputs:[...document.querySelectorAll('input,textarea,[role=radio]')].map(x=>({tag:x.tagName,label:x.getAttribute('aria-label'),value:x.value,checked:x.getAttribute('aria-checked')})).filter(x=>x.label&&/라벨|검색 설명|퍼머링크/.test(x.label))}));
 const expected=await fs.readFile(root+`26_1107/앱사용_${k}/웹조사/publish/앱사용_${k}_html콘텐츠.html`,'utf8');let html=expected;for(const im of state.images)html=html.replace(`{{BLOGGER_IMAGE_URL_${im.id}}}`,im.url);
 const norm=x=>x.replace(/\r\n/g,'\n');const issues=[];if(norm(data.html)!==norm(html))issues.push('본문 불일치');if(data.title!==state.metadata.title)issues.push('제목 불일치');
 console.log(JSON.stringify({row:state.row,issues,htmlLength:data.html.length,imageCount:(data.html.match(/<img\b/g)||[]).length,inputs:data.inputs}));
}
