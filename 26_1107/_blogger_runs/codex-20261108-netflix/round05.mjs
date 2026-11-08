const fs=await import('node:fs/promises');
const root='Y:/antigravity-project/ego-light-adsense-info-blog/';
const jobs=[[53,'넷플릭스 한국 인기 영화 순위 확인 방법',5],[54,'넷플릭스 오리지널 역대 영화 순위',6]];
const spaces=await listTaskSpaces();
for (const [row,keyword,count] of jobs) {
 const base=`26_1107/앱사용_${keyword}/웹조사/`; const pub=root+base+'publish/';
 const txt=await fs.readFile(pub+`앱사용_${keyword}_제목메타디스크립션.txt`,'utf8');
 const html=await fs.readFile(pub+`앱사용_${keyword}_html콘텐츠.html`,'utf8');
 const blocks=[...txt.matchAll(/삽입 ID: (IMG_\d+)\r?\n([\s\S]*?)(?=\r?\n삽입 ID:|\r?\n\[제외·보류 이미지\])/g)];
 if(blocks.length!==count) throw new Error(`${row} 이미지 블록 수 불일치 ${blocks.length}`);
 const images=[];
 for(const [_,id,b] of blocks){
   const rel=b.match(/업로드 파일 경로\(프로젝트 상대경로, 확장자 포함\): (.+)/)?.[1].trim();
   const filename=b.match(/정확한 이미지 파일명: \d+ \/ (.+)/)?.[1].trim();
   if(!rel||!filename||!rel.endsWith('/'+filename)||!rel.startsWith(base+'publish/')) throw new Error(`${row} ${id} 경로 불일치`);
   await fs.access(root+rel);
   if(html.split(`{{BLOGGER_IMAGE_URL_${id}}}`).length!==2||!html.includes(`data-image-id="${id}"`)) throw new Error(`${row} ${id} 슬롯 불일치`);
   if(!/권장 alt: .+/.test(b)||!/권장 캡션: .+/.test(b)||!b.includes('Blogger 이미지 URL: 미업로드')) throw new Error(`${row} ${id} 메타 불일치`);
   images.push({id,file:rel});
 }
 const s=spaces.find(x=>x.name===`codex-20261108-netflix-${row}`); const task=await taskSpace(s.id); const page=task.page('p1');
 await page.click('loc=role:button[name="새 글 작성"]');
 await page.waitForSelector('input[aria-label="제목"]',{state:'visible',timeout:30000});
 const editorUrl=await page.url(); const postId=editorUrl.match(/\/blog\/post\/edit\/\d+\/(\d+)/)?.[1];
 if(!postId) throw new Error(`${row} 글 ID 확인 실패`);
 const state={row,keyword,folder:base,spaceId:s.id,blogId:'7162964317827704236',postId,editorUrl,status:'created',images};
 await fs.writeFile(root+base+'evidence/blogger-state.json',JSON.stringify(state,null,2),'utf8');
 console.log(JSON.stringify({row,spaceId:s.id,postId,images:images.length,snapshot:await page.snapshot()}));
}
