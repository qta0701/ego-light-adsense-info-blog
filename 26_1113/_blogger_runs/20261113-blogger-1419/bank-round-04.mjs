const fs=await import('node:fs/promises');
const root='Y:/antigravity-project/ego-light-adsense-info-blog';
for (const [order,space,keyword] of [[10,40,'부산은행 환전'],[11,41,'국민은행 환전신청'],[12,42,'국민은행 통장사본 출력']]) {
 const page=(await taskSpace(space)).page('p1');
 const statePath=`${root}/26_1113/은행_재테크_${keyword}/웹조사/evidence/blogger-state.json`;
 try {
  await page.click('loc=role:button[name="새 글 작성"]');
  await page.waitForSelector('input[aria-label="제목"]',{state:'visible',timeout:30000});
  const editorUrl=await page.url(); const postId=editorUrl.match(/\/post\/edit\/\d+\/(\d+)/)?.[1];
  if(!postId) throw Error(`postId missing from ${editorUrl}`);
  const state=JSON.parse(await fs.readFile(statePath,'utf8')); Object.assign(state,{postId,editorUrl,stage:'created',createdAt:new Date().toISOString()});
  await fs.writeFile(statePath,JSON.stringify(state,null,2));
  console.log(JSON.stringify({order,postId,editorUrl,snapshot:await page.snapshot()}));
 } catch(e){console.log(JSON.stringify({order,error:String(e),url:await page.url(),snapshot:await page.snapshot()}));}
}
