const fs=await import('node:fs/promises'),base='Y:/antigravity-project/ego-light-adsense-info-blog',run=`${base}/26_1113/_blogger_runs/20261113-blogger-1419`;
async function verify(order,name){
 const p=`${base}/26_1113/${name}/웹조사/evidence/blogger-state.json`,s=JSON.parse(await fs.readFile(p,'utf8')),task=await taskSpace(s.spaceId),page=task.page('p1');
 try{
  if(order===5)await page.goto(s.editorUrl,{waitUntil:'domcontentloaded',timeout:30000});
  await page.waitForFunction(()=>[...document.querySelectorAll('.CodeMirror')].some(x=>x.CodeMirror&&x.offsetParent!==null),undefined,{timeout:30000});
  await page.click('text="검색 설명"');await page.waitForSelector('textarea[aria-label="검색 설명 입력"]',{state:'visible',timeout:10000});const description=await page.evaluate(()=>document.querySelector('textarea[aria-label="검색 설명 입력"]').value);
  await page.click('text="퍼머링크"');await page.waitForSelector('div[role=radio][aria-label^="맞춤 퍼머링크"]',{state:'attached'});const permalink=await page.evaluate(()=>({custom:document.querySelector('div[role=radio][aria-label^="맞춤 퍼머링크"]').getAttribute('aria-checked'),auto:document.querySelector('div[role=radio][aria-label^="자동 퍼머링크"]').getAttribute('aria-checked'),value:document.querySelector('input[aria-label="맞춤 퍼머링크 입력"]')?.value}));
  await page.click('text="라벨"');await page.waitForSelector('textarea[aria-label="쉼표로 라벨을 구분하세요."]',{state:'visible',timeout:10000});
  const actual=await page.evaluate(()=>({title:document.querySelector('input[aria-label="제목"]').value,labels:document.querySelector('textarea[aria-label="쉼표로 라벨을 구분하세요."]').value,html:[...document.querySelectorAll('.CodeMirror')].find(x=>x.CodeMirror&&x.offsetParent!==null).CodeMirror.getValue()}));
  const expected=await fs.readFile(`${run}/completed-${order}.html`,'utf8'),norm=x=>x.replace(/\r\n/g,'\n');const images=await page.evaluate(h=>{const d=new DOMParser().parseFromString(h,'text/html');return [...d.querySelectorAll('[data-image-id]')].map(e=>({id:e.getAttribute('data-image-id'),src:e.querySelector('img')?.getAttribute('src'),alt:e.querySelector('img')?.getAttribute('alt'),caption:e.querySelector('figcaption,.seo-image-caption')?.textContent?.trim()}))},actual.html);
  const result={order,postId:s.postId,spaceId:s.spaceId,at:new Date().toISOString(),title:actual.title,description,labels:actual.labels,permalink,htmlEqual:norm(actual.html)===norm(expected),tokens:actual.html.includes('{{BLOGGER_IMAGE_URL_'),images};await fs.writeFile(`${run}/verify-draft-${order}.json`,JSON.stringify(result,null,2));console.log(JSON.stringify(result));
 }catch(e){await fs.writeFile(`${run}/verify-error-final-${order}.json`,JSON.stringify({order,error:String(e),at:new Date().toISOString(),snapshot:await page.snapshot()},null,2));console.log(JSON.stringify({order,error:String(e)}));}
}
await Promise.all([verify(5,'노하우_코레일 승차권 조회'),verify(6,'노하우_모바일 티머니 환불')]);
