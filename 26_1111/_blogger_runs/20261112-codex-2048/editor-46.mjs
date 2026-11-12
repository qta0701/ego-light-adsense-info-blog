const fs=await import('node:fs/promises'); const t=await taskSpace(17); const p=t.page('p1');
console.log('URL',await p.url());
const url=await p.url(); const m=url.match(/\/post\/edit\/(\d+)\/(\d+)/);
if(m){const state={row:46,blogId:m[1],postId:m[2],editorUrl:url,status:'created',spaceId:17,createdAt:new Date().toISOString()}; await fs.writeFile('Y:/antigravity-project/ego-light-adsense-info-blog/26_1111/앱사용_코레일 내일로 패스/웹조사/evidence/blogger-state.json',JSON.stringify(state,null,2)); console.log(state);}
console.log(await p.snapshot());
