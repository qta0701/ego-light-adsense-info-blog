const fs = await import('node:fs/promises');
const root='Y:/antigravity-project/ego-light-adsense-info-blog';
const base=`${root}/26_1113/_blogger_runs/20261113-blogger-1419`;
for (const [order,space,keyword] of [[13,43,'신한은행 간편조회'],[14,44,'신한은행 환전 방법'],[15,45,'하나은행 환율조회']]) {
 try {
  const ok=JSON.parse(await fs.readFile(`${base}/create-ok-${order}.json`,'utf8'));
  if(ok.decision!=='eligible_new'||ok.keyword!==keyword) throw Error('create authorization mismatch');
  const task=await taskSpace(space), page=task.page('p1');
  await page.click('loc=role:button[name="새 글 작성"]');
  await page.waitForSelector('input[aria-label="제목"]',{state:'visible',timeout:30000});
  const url=await page.url(), match=url.match(/\/post\/edit\/(\d+)\/(\d+)/);
  if(!match || match[1]!=='3013546958093270596') throw Error(`postId absent: ${url}`);
  const state={order,spaceId:space,keyword,blogId:match[1],postId:match[2],editorUrl:url,createdAt:new Date().toISOString(),stage:'created',images:[]};
  const path=`${root}/26_1113/은행_재테크_${keyword}/웹조사/evidence/blogger-state.json`;
  await fs.writeFile(path,JSON.stringify(state,null,2));
  await fs.writeFile(`${base}/state-${order}.json`,JSON.stringify(state,null,2));
  console.log(JSON.stringify({order,state,snapshot:await page.snapshot()}));
 }catch(e){console.log(JSON.stringify({order,error:String(e)}));}
}
