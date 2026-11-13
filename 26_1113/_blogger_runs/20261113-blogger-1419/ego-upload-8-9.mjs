const fs=await import('node:fs/promises'); const base='Y:/antigravity-project/ego-light-adsense-info-blog/';
for(const [order,space,keyword] of [[8,36,'인스타그램 탈퇴방법'],[9,39,'배민클럽 환불']]) {
  const task=await taskSpace(space),page=task.page('p1');
  const audit=JSON.parse(await fs.readFile(`${base}26_1113/_blogger_runs/20261113-blogger-1419/inspection-${order}.json`,'utf8'));
  const stateFile=`${base}26_1113/노하우2_${keyword}/웹조사/evidence/blogger-state.json`;
  for(const slot of audit.slots) {
    await page.click('loc=role:button[name="이미지 삽입"]');
    await page.waitForSelector('loc=role:menuitem[name="포토"]',{state:'visible',timeout:30000});
    await page.click('loc=role:menuitem[name="컴퓨터에서 업로드"]');
    await page.waitForSelector('text="찾아보기"',{timeout:30000});
    await page.setInputFiles('input[type=file]',[base+slot.path]); await page.waitForSelector('text="레이아웃 선택"',{timeout:60000});
    await page.click('text="원본 크기"'); await page.click('text="확인"');
    const name=slot.path.split('/').at(-1);
    await page.waitForFunction(n=>[...document.querySelectorAll('.CodeMirror')].some(e=>e.CodeMirror?.getValue().includes(n)),name,{timeout:30000});
    const code=await page.evaluate(()=>[...document.querySelectorAll('.CodeMirror')].find(e=>e.CodeMirror)?.CodeMirror.getValue());
    const url=[...code.matchAll(/https:\/\/[^"\s]+/g)].map(x=>x[0]).find(u=>u.includes(name)); if(!url) throw new Error(`${order} ${slot.id} URL missing`);
    const state=JSON.parse(await fs.readFile(stateFile,'utf8')); state.images.push({id:slot.id,path:slot.path,url,uploadedAt:new Date().toISOString()}); await fs.writeFile(stateFile,JSON.stringify(state,null,2),'utf8');
    console.log(JSON.stringify({order,id:slot.id,url}));
  }
}
