const fs=await import('node:fs/promises'); const task=await taskSpace(34),page=task.page('p1');
const root='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/노하우2_진학어플라이 회원가입/웹조사/';
const state=JSON.parse(await fs.readFile(root+'evidence/blogger-state.json','utf8'));
let html=await fs.readFile(root+'publish/노하우2_진학어플라이 회원가입_html콘텐츠.html','utf8');
if(state.images.length!==4) throw new Error('image count mismatch');
for(const image of state.images) {const token=`{{BLOGGER_IMAGE_URL_${image.id}}}`; if(!html.includes(token)) throw new Error(`missing ${token}`); html=html.replaceAll(token,image.url);}
if(html.includes('{{BLOGGER_IMAGE_URL_')) throw new Error('unresolved token');
await fs.writeFile('Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-blogger-1419/final-7.html',html,'utf8');
await page.fill('input[aria-label="제목"]','진학어플라이 회원가입 방법: 통합회원 선택부터 입력까지');
await page.evaluate(content=>{const e=[...document.querySelectorAll('.CodeMirror')].find(e=>e.CodeMirror && e.offsetParent); if(!e) throw new Error('visible CodeMirror missing');e.CodeMirror.setValue(content);e.CodeMirror.save();},html);
await page.fill('textarea[aria-label="쉼표로 라벨을 구분하세요."]','진학어플라이, 원서접수, 회원가입'); await page.keyboard.type(','); await page.keyboard.press('Tab');
await page.click('text="퍼머링크"'); await page.click('text="검색 설명"');
console.log(await page.snapshot());
