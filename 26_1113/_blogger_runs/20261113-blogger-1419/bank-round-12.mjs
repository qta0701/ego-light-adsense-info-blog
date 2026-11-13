const fs=await import('node:fs/promises');
const root='Y:/antigravity-project/ego-light-adsense-info-blog';
const run=`${root}/26_1113/_blogger_runs/20261113-blogger-1419`;
for (const [order,space,keyword] of [[10,40,'부산은행 환전'],[11,41,'국민은행 환전신청'],[12,42,'국민은행 통장사본 출력']]) {
 const page=(await taskSpace(space)).page('p1');
 const statePath=`${root}/26_1113/은행_재테크_${keyword}/웹조사/evidence/blogger-state.json`;
 let state=JSON.parse(await fs.readFile(statePath,'utf8'));
 const manifest=JSON.parse(await fs.readFile(`${run}/images-${order}.json`,'utf8'));
 try {
  for (const slot of manifest.slots) {
   if(state.images.some(x=>x.id===slot.id)) continue;
   if(!(order===10 && slot.id==='IMG_01')) {
    await page.click('loc=role:button[name="이미지 삽입"]');
    await page.click('loc=role:menuitem[name="컴퓨터에서 업로드"]');
    await page.waitForSelector('input[type=file]',{state:'attached',timeout:15000});
    await page.setInputFiles('input[type=file]',[`${root}/${slot.path}`]);
    await page.waitForSelector('text=레이아웃 선택',{timeout:30000});
    await page.click('text="원본 크기"');
    await page.click('text="확인"');
   }
   const filename=slot.path.split('/').at(-1);
   await page.waitForFunction(name=>document.querySelector('.CodeMirror')?.CodeMirror?.getValue().includes(name),filename,{timeout:20000});
   const html=await page.evaluate(()=>document.querySelector('.CodeMirror').CodeMirror.getValue());
   const srcs=[...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(x=>x[1]);
   const url=srcs.find(x=>x.includes(encodeURIComponent(filename))||x.includes(filename));
   if(!url) throw Error(`no URL for ${slot.id} ${filename}`);
   state.images.push({id:slot.id,path:slot.path,url,uploadedAt:new Date().toISOString()}); state.stage='uploading';state.updatedAt=new Date().toISOString();
   await fs.writeFile(statePath,JSON.stringify(state,null,2));
   console.log(JSON.stringify({order,id:slot.id,urlSaved:true}));
  }
 } catch(e) {state.stage='upload_error';state.error=String(e);state.updatedAt=new Date().toISOString();await fs.writeFile(statePath,JSON.stringify(state,null,2));console.log(JSON.stringify({order,error:String(e),snapshot:await page.snapshot()}));}
}
