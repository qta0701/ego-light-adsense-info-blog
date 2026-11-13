const fs=await import('node:fs/promises');
const path='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/이슈_앱스토어 로그아웃/웹조사/evidence/blogger-state.json';
const task=await taskSpace(35),page=task.page('p1');
await page.click('loc=role:button[name="확인"]');
const publishedObservedAt=new Date().toISOString();
const state=JSON.parse(await fs.readFile(path,'utf8'));state.stage='publish_requested';state.publishedObservedAt=publishedObservedAt;await fs.writeFile(path,JSON.stringify(state,null,2),'utf8');
console.log(JSON.stringify({publishedObservedAt}));
await page.waitForURL('**/blog/posts/**',{timeout:30000});
console.log((await page.snapshot()).slice(-5000));
