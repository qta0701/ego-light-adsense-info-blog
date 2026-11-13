const fs=await import('node:fs/promises'), base='Y:/antigravity-project/ego-light-adsense-info-blog', p=`${base}/26_1113/노하우_앱스토어 국가변경/웹조사/evidence/blogger-state.json`;
const s=JSON.parse(await fs.readFile(p,'utf8')),task=await taskSpace(s.spaceId),page=task.page('p1'); let first=true;
for(const img of s.images.filter(x=>!x.url)) {
 try {
  if(!first){await page.click('loc=role:button[name="이미지 삽입"]'); await page.waitForSelector('loc=role:menuitem[name="컴퓨터에서 업로드"]',{state:'visible',timeout:10000});}
  first=false; await page.click('loc=role:menuitem[name="컴퓨터에서 업로드"]');
  try{await page.waitForSelector('input[type=file]',{state:'attached',timeout:4000});}catch(e){const snap=await page.snapshot(); if(!snap.includes('menuitem "컴퓨터에서 업로드"'))throw e; await page.click('loc=role:menuitem[name="컴퓨터에서 업로드"]'); await page.waitForSelector('input[type=file]',{state:'attached',timeout:15000});}
  await page.setInputFiles('input[type=file]',[`${base}/${img.path}`]); await page.waitForSelector('text=레이아웃 선택',{state:'visible',timeout:30000}); await page.click('text="원본 크기"'); await page.click('loc=role:button[name="확인"]');
  const filename=img.path.split('/').pop(); await page.waitForFunction((f)=>[...document.querySelectorAll('.CodeMirror')].some(x=>x.CodeMirror?.getValue().includes(f)),filename,{timeout:20000});
  const val=await page.evaluate(()=>[...document.querySelectorAll('.CodeMirror')].find(x=>x.CodeMirror)?.CodeMirror.getValue()); img.url=[...val.matchAll(/https:\/\/[^"\s<>]+/g)].map(x=>x[0]).find(x=>x.includes(filename)); if(!img.url) throw Error('URL not identified');
  img.uploadedAt=new Date().toISOString(); s.updatedAt=img.uploadedAt; await fs.writeFile(p,JSON.stringify(s,null,2)); console.log(JSON.stringify({id:img.id,url:img.url,at:img.uploadedAt}));
 }catch(e){console.log(JSON.stringify({id:img.id,error:String(e),snapshot:await page.snapshot()}));break;}
}
