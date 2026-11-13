const fs=await import('node:fs/promises'),base='Y:/antigravity-project/ego-light-adsense-info-blog',run=`${base}/26_1113/_blogger_runs/20261113-blogger-1419`;
async function runOne(order,name){
 const p=`${base}/26_1113/${name}/웹조사/evidence/blogger-state.json`,s=JSON.parse(await fs.readFile(p,'utf8')),info=JSON.parse(await fs.readFile(`${run}/images-${order}.json`,'utf8'));if(s.images.some(x=>!x.url))throw Error('Missing image');
 const txt=await fs.readFile(info.txtPath,'utf8'),title=txt.match(/최종 추천 제목:\s*(.+)/)[1],description=txt.match(/최종 추천 메타디스크립션:\s*(.+)/)[1],labels=txt.match(/라벨 제안:\s*(.+)/)[1],slug=txt.match(/최종 추천 슬러그:\s*(.+)/)[1];
 let html=await fs.readFile(info.htmlPath,'utf8');for(const img of s.images)html=html.replaceAll(`{{BLOGGER_IMAGE_URL_${img.id}}}`,img.url);if(html.includes('{{BLOGGER_IMAGE_URL_'))throw Error('Remaining token');await fs.writeFile(`${run}/completed-${order}.html`,html);
 const task=await taskSpace(s.spaceId),page=task.page('p1');
 try {
  await page.fill('input[aria-label="제목"]',title);await page.click('text="퍼머링크"');await page.waitForSelector('div[role=radio][aria-label^="맞춤 퍼머링크"]',{state:'attached',timeout:10000});await page.focus('div[role=radio][aria-label^="맞춤 퍼머링크"]');await page.press('div[role=radio][aria-label^="맞춤 퍼머링크"]','Space');await page.waitForSelector('input[aria-label="맞춤 퍼머링크 입력"]',{state:'visible',timeout:10000});await page.fill('input[aria-label="맞춤 퍼머링크 입력"]',slug);
  await page.click('text="검색 설명"');await page.waitForSelector('textarea[aria-label="검색 설명 입력"]',{state:'visible',timeout:10000});await page.fill('textarea[aria-label="검색 설명 입력"]',description);
  await page.click('text="라벨"');await page.waitForSelector('textarea[aria-label="쉼표로 라벨을 구분하세요."]',{state:'visible',timeout:10000});await page.fill('textarea[aria-label="쉼표로 라벨을 구분하세요."]',labels);await page.keyboard.type(',');await page.keyboard.press('Tab');
  await page.evaluate((value)=>{const el=[...document.querySelectorAll('.CodeMirror')].find(x=>x.CodeMirror&&x.offsetParent!==null);if(!el)throw Error('No editor');el.CodeMirror.setValue(value);el.CodeMirror.save();},html);
  Object.assign(s,{metadata:{title,description,labels,slug,source:'txt'},stage:'content-entered',updatedAt:new Date().toISOString()});await fs.writeFile(p,JSON.stringify(s,null,2));
  await page.click('loc=role:button[name="옵션 더보기"]');await page.waitForSelector('loc=role:menuitem[name="저장"]',{state:'visible',timeout:10000});await page.click('loc=role:menuitem[name="저장"]');
  await page.waitForFunction(()=>!!document.querySelector('[aria-label="변경사항이 저장되었습니다."]'),undefined,{timeout:30000});
  s.stage='saved_pending_verification';s.saveObservedAt=new Date().toISOString();await fs.writeFile(p,JSON.stringify(s,null,2));console.log(JSON.stringify({order,postId:s.postId,stage:s.stage,at:s.saveObservedAt}));
 }catch(e){const snap=await page.snapshot();await fs.writeFile(`${run}/body-error-${order}.json`,JSON.stringify({order,error:String(e),at:new Date().toISOString(),snapshot:snap},null,2));console.log(JSON.stringify({order,error:String(e)}));}
}
await Promise.all([runOne(5,'노하우_코레일 승차권 조회'),runOne(6,'노하우_모바일 티머니 환불')]);
