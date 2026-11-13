const fs=await import('node:fs/promises');
const root='Y:/antigravity-project/ego-light-adsense-info-blog',run=`${root}/26_1113/_blogger_runs/20261113-blogger-1419`;
const jobs=[
 [2,37,'코레일 민원접수','코레일 민원접수 방법 온라인 고객의 소리와 역 방문 안내','코레일 민원접수 온라인 신청과 고객의 소리 조회, 본인인증, 역 방문 및 우편·팩스 접수 방법 안내','korail-customer-complaint','생활정보, 철도, 코레일, 민원'],
 [3,38,'테무 회원탈퇴','테무 회원탈퇴 방법: 앱과 웹 계정 삭제 및 취소 안내','테무 회원탈퇴를 앱과 웹에서 요청하는 경로와 삭제 처리 기간, 기한 전 취소 안내를 공식 자료로 확인하세요.','temu-account-deletion-guide','테무, 회원탈퇴, 계정관리']];
for(const [order,id,keyword,title,description,slug,labels] of jobs){
 try{
  const manifest=JSON.parse(await fs.readFile(`${run}/ready-create-${order}.json`,'utf8'));
  const path=`${root}/26_1113/이슈_${keyword}/웹조사/evidence/blogger-state.json`,state=JSON.parse(await fs.readFile(path,'utf8'));
  if(state.images.length!==manifest.originalImageCount)throw Error('Image count incomplete');
  let html=await fs.readFile(manifest.html,'utf8');for(const img of state.images)html=html.replaceAll(`{{BLOGGER_IMAGE_URL_${img.id}}}`,img.url);
  if(html.includes('{{BLOGGER_IMAGE_URL_'))throw Error('unresolved token');await fs.writeFile(`${run}/completed-${order}.html`,html,'utf8');
  const task=await taskSpace(id),page=task.page('p1');
  await page.fill('input[aria-label="제목"]',title);
  await page.evaluate(value=>{const cm=[...document.querySelectorAll('.CodeMirror')].find(x=>x.CodeMirror)?.CodeMirror;if(!cm)throw Error('no editor');cm.setValue(value);cm.save();},html);
  await page.fill('textarea[aria-label="쉼표로 라벨을 구분하세요."]',labels);await page.keyboard.type(',');await page.keyboard.press('Tab');
  await page.click('text="검색 설명"');await page.waitForTimeout(400);await page.fill('textarea[aria-label="검색 설명 입력"]',description);
  await page.click('text="퍼머링크"');await page.waitForTimeout(500);
  await page.focus('div[role="radio"][aria-label^="맞춤 퍼머링크"]');await page.keyboard.press('Space');
  await page.focus('input[aria-label="맞춤 퍼머링크 입력"]');await page.keyboard.press('ControlOrMeta+A');await page.keyboard.type(slug);await page.keyboard.press('Tab');
  await page.click('loc=role:button[name="옵션 더보기"]');await page.waitForTimeout(500);await page.click('loc=role:menuitem[name="저장"]');
  await page.waitForSelector('[aria-label="변경사항이 저장되었습니다."]',{timeout:30000});await page.reload({waitUntil:'domcontentloaded',timeout:30000});await page.waitForSelector('input[aria-label="제목"]',{timeout:30000});
  await page.click('text="퍼머링크"');await page.click('text="검색 설명"');
  const result=await page.evaluate(()=>({title:document.querySelector('input[aria-label="제목"]')?.value,html:[...document.querySelectorAll('.CodeMirror')].find(x=>x.CodeMirror)?.CodeMirror.getValue(),description:document.querySelector('textarea[aria-label="검색 설명 입력"]')?.value,slug:document.querySelector('input[aria-label="맞춤 퍼머링크 입력"]')?.value,radios:[...document.querySelectorAll('div[role="radio"][aria-label*="퍼머링크"]')].map(x=>({label:x.getAttribute('aria-label'),checked:x.getAttribute('aria-checked')})),labels:document.querySelector('textarea[aria-label="쉼표로 라벨을 구분하세요."]')?.value}));
  const norm=s=>s?.replace(/\r\n/g,'\n');let out={...result,html:undefined,htmlLength:result.html?.length,bodyMatches:norm(result.html)===norm(html),expectedTitle:title,expectedDescription:description,expectedSlug:slug,verifiedAt:new Date().toISOString()};
  await fs.writeFile(`${run}/verify-${order}.json`,JSON.stringify(out,null,2),'utf8');
  console.log(JSON.stringify({order,...out}));
 }catch(e){console.log(JSON.stringify({order,error:String(e),resume:'inspect editor before any retry'}));}
}
