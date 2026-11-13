const fs=await import('node:fs/promises'),root='Y:/antigravity-project/ego-light-adsense-info-blog',base=`${root}/26_1113/_blogger_runs/20261113-blogger-1419`;
const task=await taskSpace(43),page=task.page('p1'),audit=JSON.parse(await fs.readFile(`${base}/image-audit-13.json`,'utf8')),state=JSON.parse(await fs.readFile(`${base}/state-13.json`,'utf8'));
let html=await fs.readFile(audit.html,'utf8');for(const img of state.images) html=html.replace(`{{BLOGGER_IMAGE_URL_${img.id}}}`,img.url);if(html.includes('{{BLOGGER_IMAGE_URL_')||state.images.length!==audit.adoptedCount)throw Error('missing image');
await fs.writeFile(`${base}/completed-13.html`,html);
await page.fill('input[aria-label="제목"]','신한은행 간편조회 방법: 계좌조회 로그인과 이용 범위');
await page.evaluate(html=>{const cm=[...document.querySelectorAll('.CodeMirror')].find(x=>x.CodeMirror)?.CodeMirror;if(!cm)throw Error('editor missing');cm.setValue(html);cm.save();},html);
await page.fill('textarea[aria-label="쉼표로 라벨을 구분하세요."]','은행, 신한은행, 계좌조회');await page.keyboard.type(',');await page.keyboard.press('Tab');
await page.click('text="검색 설명"');await page.click('text="퍼머링크"');console.log(await page.snapshot());
