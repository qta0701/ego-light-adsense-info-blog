const fs=await import('node:fs/promises');
const path='Y:/antigravity-project/ego-light-adsense-info-blog/26_1111/앱사용_번개장터 카드 결제/웹조사/evidence/blogger-state.json';
const state=JSON.parse(await fs.readFile(path,'utf8')); state.status='recovery_draft_saved'; state.recovery={approved:true,revertedAt:new Date().toISOString(),previousUrl:state.publicUrl,previousPublishedTime:'2026-11-12T21:27:00+09:00',proposedSlug:'blog-post_565',proposedUrl:'https://app.supportimes.com/2026/11/blog-post_565.html',proposedUrlChecked:'404 before republishing',requestedSlug:'bunjang-card-payment-guide',requestedSlugPersisted:false};
await fs.writeFile(path,JSON.stringify(state,null,2)+'\n','utf8');
const task=await taskSpace(21); const page=task.page('p1');
await page.click('loc=role:button[name="게시"]'); console.log((await page.snapshot()).slice(-2000));
