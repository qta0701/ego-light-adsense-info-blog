const fs=await import('node:fs/promises'),root='Y:/antigravity-project/ego-light-adsense-info-blog';
for(const [row,id,k,n] of [[51,21,'번개장터 카드 결제',5],[52,22,'넷플릭스 해지방법',6],[53,23,'넷플릭스 로그아웃 티비',3]]) {
 const t=await taskSpace(id),p=t.page('p1'); await p.click('loc=role:button[name="새 글 작성"]'); await p.waitForURL('**/blog/post/edit/**');
 const url=await p.url(),m=url.match(/\/post\/edit\/(\d+)\/(\d+)/); if(!m) throw Error('missing post ID');
 const s={row,keyword:k,blogId:m[1],postId:m[2],editorUrl:url,status:'created',spaceId:id,createdAt:new Date().toISOString(),imageCounts:{uploaded:0,excluded:n,replaced:0}};
 const dir=`${root}/26_1111/앱사용_${k}/웹조사/evidence`;await fs.mkdir(dir,{recursive:true});await fs.writeFile(`${dir}/blogger-state.json`,JSON.stringify(s,null,2));console.log(s);
 await p.waitForSelector('loc=css:input[aria-label="제목"]');console.log('ROW',row,(await p.snapshot()).split('\n').slice(0,130).join('\n'));
}
