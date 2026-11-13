const fs=await import('node:fs/promises');
for(const [order,row,keyword,space] of [[8,35,'인스타그램 탈퇴방법',36],[9,36,'배민클럽 환불',39]]) {
  const task=await taskSpace(space); const page=task.page('p1');
  await page.click('loc=role:button[name="새 글 작성"]');
  await page.waitForURL('**/blog/post/edit/**',{timeout:30000});
  await page.waitForSelector('input[aria-label="제목"]',{timeout:30000});
  const editorUrl=await page.url(); const m=editorUrl.match(/\/blog\/post\/edit\/(\d+)\/(\d+)/);
  if(!m) throw new Error(`postId missing: ${editorUrl}`);
  const state={order,tab:'노하우2',row,keyword,spaceId:space,blogId:m[1],postId:m[2],editorUrl,status:'created',createdAt:new Date().toISOString(),images:[]};
  await fs.writeFile(`Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/노하우2_${keyword}/웹조사/evidence/blogger-state.json`,JSON.stringify(state,null,2),'utf8');
  console.log(JSON.stringify(state));
}
