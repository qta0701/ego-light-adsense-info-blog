const fs=await import('node:fs/promises');
const run='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-blogger-1419';
for (const [order,row,keyword,id] of [[2,31,'코레일 민원접수',37],[3,32,'테무 회원탈퇴',38]]) {
 try {
  const approval=JSON.parse(await fs.readFile(`${run}/create-ok-${order}.json`,'utf8'));
  if(approval.order!==order||approval.keyword!==keyword||approval.decision!=='eligible_new') throw Error('Unexpected approval');
  const task=await taskSpace(id),page=task.page('p1');
  await page.click('loc=role:button[name="새 글 작성"]');
  await page.waitForURL('**/blog/post/edit/**',{timeout:30000});
  const editorUrl=await page.url(),match=editorUrl.match(/\/blog\/post\/edit\/(\d+)\/(\d+)/);
  if(!match||match[1]!=='694192108971227039') throw Error(`Unexpected editor URL: ${editorUrl}`);
  const state={order,tab:'이슈',row,keyword,spaceId:id,blogId:match[1],postId:match[2],editorUrl,createdAt:new Date().toISOString(),stage:'created',images:[]};
  await fs.writeFile(`Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/이슈_${keyword}/웹조사/evidence/blogger-state.json`,JSON.stringify(state,null,2),'utf8');
  await page.waitForSelector('input[aria-label="제목"]',{timeout:30000});
  console.log(JSON.stringify(state));
 } catch(e) {console.log(JSON.stringify({order,error:String(e)}));}
}
