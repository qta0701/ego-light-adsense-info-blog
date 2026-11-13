const fs=await import('node:fs/promises');
const root='Y:/antigravity-project/ego-light-adsense-info-blog';
const run=`${root}/26_1113/_blogger_runs/20261113-blogger-1419`;
for (const [order,id,keyword,start] of [[1,35,'앱스토어 로그아웃',1],[2,37,'코레일 민원접수',0],[3,38,'테무 회원탈퇴',0]]) {
 const path=`${root}/26_1113/이슈_${keyword}/웹조사/evidence/blogger-state.json`;
 try {
  const manifest=JSON.parse(await fs.readFile(`${run}/ready-create-${order}.json`,'utf8'));
  const task=await taskSpace(id),page=task.page('p1');
  for (const img of manifest.images.slice(start)) {
   await page.click('loc=role:button[name="이미지 삽입"]');
   await page.click('loc=role:menuitem[name="컴퓨터에서 업로드"]');
   await page.waitForSelector('text=찾아보기',{timeout:15000});
   await page.setInputFiles('input[type=file]',[img.upload.replaceAll('\\','/')]);
   await page.waitForSelector('text=레이아웃 선택',{timeout:30000});
   await page.click('text="원본 크기"');
   await page.click('loc=role:button[name="확인"]');
   const filename=img.upload.split(/[\\/]/).pop();
   await page.waitForFunction(f=>[...document.querySelectorAll('.CodeMirror')].some(x=>x.CodeMirror?.getValue().includes(f)),filename,{timeout:30000});
   const html=await page.evaluate(()=>[...document.querySelectorAll('.CodeMirror')].find(x=>x.CodeMirror)?.CodeMirror.getValue());
   const tags=[...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/gi)].map(x=>x[1]);
   const url=tags.find(x=>x.includes(filename));
   if(!url)throw Error(`Could not map ${img.id} ${filename}`);
   const state=JSON.parse(await fs.readFile(path,'utf8'));
   state.images.push({id:img.id,file:img.upload,url,uploadedAt:new Date().toISOString()});
   state.stage='uploading';
   await fs.writeFile(path,JSON.stringify(state,null,2),'utf8');
   console.log(JSON.stringify({order,id:img.id,url,uploaded:state.images.length}));
  }
 } catch(e) {console.log(JSON.stringify({order,error:String(e),resume:'check current editor and state before retry'}));}
}
