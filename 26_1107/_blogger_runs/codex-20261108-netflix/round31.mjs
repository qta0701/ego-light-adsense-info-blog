const fs=await import('node:fs/promises');const root='Y:/antigravity-project/ego-light-adsense-info-blog/';
for(const [id,keyword] of [[7,'넷플릭스 한국 인기 영화 순위 확인 방법'],[8,'넷플릭스 오리지널 역대 영화 순위']]){
 const path=root+`26_1107/앱사용_${keyword}/웹조사/evidence/blogger-state.json`;const s=JSON.parse(await fs.readFile(path,'utf8'));const task=await taskSpace(id);const page=task.page('p1');
 await page.click('text="확인"');await page.waitForURL('**/blog/posts/**',{timeout:30000});
 s.publishObservedAt=new Date().toISOString();s.status='publish_clicked';await fs.writeFile(path,JSON.stringify(s,null,2),'utf8');
 console.log(JSON.stringify({row:s.row,status:s.status,postId:s.postId,snapshot:(await page.snapshot()).slice(-1800)}));
}
