const fs=await import('node:fs/promises');
const root='Y:/antigravity-project/ego-light-adsense-info-blog',run=`${root}/26_1113/_blogger_runs/20261113-blogger-1419`;
for(const [order,space,keyword] of [[11,41,'국민은행 환전신청'],[12,42,'국민은행 통장사본 출력']]){
const page=(await taskSpace(space)).page('p1'),sp=`${root}/26_1113/은행_재테크_${keyword}/웹조사/evidence/blogger-state.json`;
let state=JSON.parse(await fs.readFile(sp,'utf8'));const manifest=JSON.parse(await fs.readFile(`${run}/images-${order}.json`,'utf8'));let first=true;
try {for(const slot of manifest.slots){
 if(state.images.some(x=>x.id===slot.id))continue;
 if(!first){await page.click('loc=role:button[name="이미지 삽입"]');await page.snapshot();await page.waitForTimeout(700);}first=false;
 await page.click('loc=role:menuitem[name="컴퓨터에서 업로드"]');await page.waitForSelector('text=찾아보기',{state:'visible',timeout:12000});
 await page.setInputFiles('input[type=file]',[`${root}/${slot.path}`]);await page.waitForSelector('text=레이아웃 선택',{timeout:30000});await page.click('text="원본 크기"');await page.click('text="확인"');
 const filename=slot.path.split('/').at(-1);await page.waitForFunction(name=>document.querySelector('.CodeMirror')?.CodeMirror?.getValue().includes(name),filename,{timeout:20000});
 const html=await page.evaluate(()=>document.querySelector('.CodeMirror').CodeMirror.getValue());const url=[...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(x=>x[1]).find(x=>x.includes(filename));if(!url)throw Error('URL missing '+slot.id);
 state.images.push({id:slot.id,path:slot.path,url,uploadedAt:new Date().toISOString()});state.stage='uploading';delete state.error;state.updatedAt=new Date().toISOString();await fs.writeFile(sp,JSON.stringify(state,null,2));console.log(JSON.stringify({order,id:slot.id}));
}}catch(e){state.stage='upload_error';state.error=String(e);await fs.writeFile(sp,JSON.stringify(state,null,2));console.log(JSON.stringify({order,error:String(e),snapshot:await page.snapshot()}));}}
