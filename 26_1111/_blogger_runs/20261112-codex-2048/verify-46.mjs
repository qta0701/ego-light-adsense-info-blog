const fs=await import('node:fs/promises');const t=await taskSpace(17);const p=t.page('p1');
await p.click('loc=role:button[name="돌아가기"]');
await p.waitForURL('**/blog/posts/**');
await p.goto('https://www.blogger.com/blog/post/edit/7162964317827704236/6912395706096692937?hl=ko');
const data=await p.evaluate(()=>({title:document.querySelector('input[aria-label="제목"]')?.value,description:document.querySelector('textarea[aria-label="검색 설명 입력"]')?.value,labels:document.querySelector('textarea[aria-label="쉼표로 라벨을 구분하세요."]')?.value,html:document.querySelector('.CodeMirror')?.CodeMirror?.getValue(),body:document.body.innerText.slice(-1000)}));
const expected=await fs.readFile('Y:/antigravity-project/ego-light-adsense-info-blog/26_1111/_blogger_runs/20261112-codex-2048/publish-46.html','utf8');
console.log({title:data.title,description:data.description,labels:data.labels,htmlLength:data.html?.length,expectedLength:expected.length,same:data.html?.trim()===expected.trim(),tokens:/BLOGGER_IMAGE_URL|IMAGE_SLOT|<img\b/.test(data.html||''),body:data.body});
if(data.title!=='코레일 내일로 패스 가격·구매 방법·KTX 좌석 지정'||data.html?.trim()!==expected.trim()) throw Error('draft mismatch');
const file='Y:/antigravity-project/ego-light-adsense-info-blog/26_1111/앱사용_코레일 내일로 패스/웹조사/evidence/blogger-state.json';const state=JSON.parse(await fs.readFile(file,'utf8'));state.status='draft_saved';state.draftVerifiedAt=new Date().toISOString();state.imageCounts={uploaded:0,excluded:3,replaced:0};await fs.writeFile(file,JSON.stringify(state,null,2));
