const fs=await import('node:fs/promises');const root='Y:/antigravity-project/ego-light-adsense-info-blog/';
for(const [spaceId,keyword] of [[7,'넷플릭스 한국 인기 영화 순위 확인 방법'],[8,'넷플릭스 오리지널 역대 영화 순위']]){
 const base=`26_1107/앱사용_${keyword}/웹조사/`,pub=root+base+'publish/',statePath=root+base+'evidence/blogger-state.json',htmlPath=pub+`앱사용_${keyword}_html콘텐츠.html`,txtPath=pub+`앱사용_${keyword}_제목메타디스크립션.txt`;
 const s=JSON.parse(await fs.readFile(statePath,'utf8'));let html=await fs.readFile(htmlPath,'utf8'),txt=await fs.readFile(txtPath,'utf8');
 for(const im of s.images)html=html.replace(`{{BLOGGER_IMAGE_URL_${im.id}}}`,im.url);
 const blocks=[...txt.matchAll(/삽입 ID: (IMG_\d+)\r?\n([\s\S]*?)(?=\r?\n삽입 ID:|\r?\n\[제외·보류 이미지\])/g)].map(m=>({id:m[1],alt:m[2].match(/권장 alt: (.+)/)?.[1].trim(),caption:m[2].match(/권장 캡션: (.+)/)?.[1].trim()}));
 const task=await taskSpace(spaceId);const page=task.page('p1');const check=await page.evaluate(({html,blocks,images})=>{const doc=new DOMParser().parseFromString(html,'text/html');const errs=[];for(const b of blocks){const slot=doc.querySelector(`[data-image-id="${b.id}"]`);const im=images.find(x=>x.id===b.id);if(!slot||slot.querySelector('img')?.getAttribute('src')!==im.url||slot.querySelector('img')?.getAttribute('alt')!==b.alt||slot.querySelector('.seo-image-caption')?.textContent.trim()!==b.caption)errs.push(b.id)}return {errs,images:doc.querySelectorAll('img').length,captions:doc.querySelectorAll('.seo-image-caption').length,tokens:html.includes('{{BLOGGER_IMAGE_URL_')};},{html,blocks,images:s.images});
 if(check.errs.length||check.tokens||check.images!==s.images.length||check.captions!==s.images.length)throw new Error(JSON.stringify({row:s.row,check}));
 await page.click('text="퍼머링크"');await page.waitForSelector('div[role="radio"][aria-label^="자동 퍼머링크"]',{state:'visible',timeout:10000});await page.focus('div[role="radio"][aria-label^="자동 퍼머링크"]');await page.press('div[role="radio"][aria-label^="자동 퍼머링크"]','Space');
 const auto=await page.evaluate(()=>document.querySelector('div[role="radio"][aria-label^="자동 퍼머링크"]')?.getAttribute('aria-checked'));if(auto!=='true')throw new Error(`${s.row} 자동 주소 선택 실패`);
 await page.click('loc=role:button[name="옵션 더보기"]');await page.waitForSelector('loc=role:menuitem[name="저장"]',{state:'visible',timeout:10000});await page.click('loc=role:menuitem[name="저장"]');
 await page.waitForSelector('[aria-label="변경사항이 저장되었습니다."]',{state:'visible',timeout:30000});
 s.status='draft_saved';s.savedAt=new Date().toISOString();s.metadata.permalinkApplied='automatic';s.metadata.permalinkReason='추천 슬러그가 재진입 후 유지되지 않음';s.check=check;
 await fs.writeFile(htmlPath,html,'utf8');
 for(const im of s.images){const re=new RegExp('(삽입 ID: '+im.id+'\\r?\\n[\\s\\S]*?업로드 상태: )미업로드(\\r?\\nBlogger 이미지 URL: )미업로드');if(!re.test(txt))throw new Error(`${s.row} ${im.id} TXT 치환 실패`);txt=txt.replace(re,(_,a,b)=>a+'업로드 완료'+b+im.url)}
 txt+=`\n\n[B 단계 저장 확인]\n초안 저장: 확인\nblogId: ${s.blogId}\npostId: ${s.postId}\n맞춤 슬러그: 저장 후 미유지, 자동 주소 적용\n선택 메타 출처: TXT\n미리보기: 미실행\n`;
 await fs.writeFile(txtPath,txt,'utf8');await fs.writeFile(statePath,JSON.stringify(s,null,2),'utf8');console.log(JSON.stringify({row:s.row,status:s.status,images:check.images,issues:check.errs,permalink:'automatic'}));
}
