const fs=await import('node:fs/promises'); const base='Y:/antigravity-project/ego-light-adsense-info-blog/';const task=await taskSpace(36),page=task.page('p1');
const audit=JSON.parse(await fs.readFile(base+'26_1113/_blogger_runs/20261113-blogger-1419/inspection-8.json','utf8'));const file=base+'26_1113/노하우2_인스타그램 탈퇴방법/웹조사/evidence/blogger-state.json';let open=true;
for(const slot of audit.slots) {
  if(!open) {await page.click('loc=role:button[name="이미지 삽입"]');await page.waitForTimeout(1200);}
  await page.click('loc=role:menuitem[name="컴퓨터에서 업로드"]');await page.waitForSelector('text="찾아보기"',{timeout:30000});
  await page.setInputFiles('input[type=file]',[base+slot.path]);await page.waitForSelector('text="레이아웃 선택"',{timeout:60000});await page.click('text="원본 크기"');await page.click('text="확인"');
  const name=slot.path.split('/').at(-1);await page.waitForFunction(n=>[...document.querySelectorAll('.CodeMirror')].some(e=>e.CodeMirror?.getValue().includes(n)),name,{timeout:30000});
  const code=await page.evaluate(()=>[...document.querySelectorAll('.CodeMirror')].find(e=>e.CodeMirror)?.CodeMirror.getValue());const url=[...code.matchAll(/https:\/\/[^"\s]+/g)].map(x=>x[0]).find(u=>u.includes(name));if(!url) throw new Error('URL missing '+slot.id);
  const state=JSON.parse(await fs.readFile(file,'utf8'));state.images.push({id:slot.id,path:slot.path,url,uploadedAt:new Date().toISOString()});await fs.writeFile(file,JSON.stringify(state,null,2),'utf8');console.log(JSON.stringify({id:slot.id,url}));open=false;
}
