const fs=await import('node:fs/promises');
const base='Y:/antigravity-project/ego-light-adsense-info-blog', run=`${base}/26_1113/_blogger_runs/20261113-blogger-1419`;
for (const [order,name] of [[4,'노하우_앱스토어 국가변경'],[5,'노하우_코레일 승차권 조회'],[6,'노하우_모바일 티머니 환불']]) {
 try {
  const ok=JSON.parse(await fs.readFile(`${run}/create-ok-${order}.json`,'utf8')); if(ok.decision!=='eligible_new') throw Error('Not eligible');
  const statePath=`${base}/26_1113/${name}/웹조사/evidence/blogger-state.json`, state=JSON.parse(await fs.readFile(statePath,'utf8'));
  if(state.postId) throw Error('postId already exists');
  const task=await taskSpace(state.spaceId), page=task.page('p1');
  await page.click('loc=role:button[name="새 글 작성"]');
  await page.waitForSelector('input[aria-label="제목"]',{state:'visible',timeout:30000});
  const url=await page.url(), match=url.match(/\/blog\/post\/edit\/\d+\/(\d+)/); if(!match) throw Error(`No postId in ${url}`);
  Object.assign(state,{postId:match[1],editorUrl:url,stage:'created',createdAt:new Date().toISOString()});
  await fs.writeFile(statePath,JSON.stringify(state,null,2));
  console.log(JSON.stringify({order,postId:state.postId,url,snapshot:await page.snapshot()}));
 } catch(e){console.log(JSON.stringify({order,error:String(e)}));}
}
