const fs=await import('node:fs/promises');const run='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/_blogger_runs/20261113-blogger-1419';
const a=JSON.parse(await fs.readFile(`${run}/publish-ok-3.json`,'utf8'));
if(a.order!==3||a.postId!=='3309230941235339576'||a.blogId!=='694192108971227039'||!a.serialized||a.H!=='blank'||a.L!=='blank')throw Error('invalid authorization');
const task=await taskSpace(38),page=task.page('p1');await page.click('loc=role:button[name="게시"]');
const snap=await page.snapshot();if(!snap.includes('글을 게시하시겠습니까?'))throw Error('Publish dialog missing');
await page.click('loc=role:button[name="확인"]');const at=new Date().toISOString();
const path='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/이슈_테무 회원탈퇴/웹조사/evidence/blogger-state.json';const state=JSON.parse(await fs.readFile(path,'utf8'));state.stage='publish_requested';state.publishedObservedAt=at;await fs.writeFile(path,JSON.stringify(state,null,2),'utf8');
await page.waitForURL('**/blog/posts/**',{timeout:30000});console.log(JSON.stringify({order:3,publishedObservedAt:at,url:await page.url()}));
