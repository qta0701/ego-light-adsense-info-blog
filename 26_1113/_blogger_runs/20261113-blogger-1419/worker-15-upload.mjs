const fs=await import('node:fs/promises'),root='Y:/antigravity-project/ego-light-adsense-info-blog',base=`${root}/26_1113/_blogger_runs/20261113-blogger-1419`,keyword='하나은행 환율조회';
const task=await taskSpace(45),page=task.page('p1'),path=`${root}/26_1113/은행_재테크_${keyword}/웹조사/evidence/blogger-state.json`,state=JSON.parse(await fs.readFile(path,'utf8')),audit=JSON.parse(await fs.readFile(`${base}/image-audit-15.json`,'utf8'));
for(const slot of audit.slots){
 const name=slot.file.split('\\').pop().split('/').pop();
 await page.click('loc=role:button[name="이미지 삽입"]');await page.waitForTimeout(500);await page.click('loc=role:menuitem[name="컴퓨터에서 업로드"]');await page.waitForSelector('input[type=file]',{state:'attached',timeout:30000});
 await page.setInputFiles('input[type=file]',[slot.file]);await page.waitForSelector('text=레이아웃 선택',{state:'visible',timeout:60000});await page.click('text="원본 크기"');await page.click('text="확인"');
 await page.waitForFunction(name=>[...document.querySelectorAll('.CodeMirror')].some(x=>x.CodeMirror?.getValue().includes(name)),name,{timeout:30000});const val=await page.evaluate(()=>[...document.querySelectorAll('.CodeMirror')].find(x=>x.CodeMirror)?.CodeMirror.getValue());const url=[...val.matchAll(/src="(https:\/\/blogger\.googleusercontent\.com\/[^"]+)"/g)].map(x=>x[1]).find(x=>x.endsWith('/'+name));if(!url)throw Error(`missing URL ${slot.id}`);
 state.images.push({id:slot.id,file:name,url,uploadedAt:new Date().toISOString()});state.stage='uploading';await fs.writeFile(path,JSON.stringify(state,null,2));await fs.writeFile(`${base}/state-15.json`,JSON.stringify(state,null,2));console.log(JSON.stringify({id:slot.id,url}));await page.waitForTimeout(500);
}
