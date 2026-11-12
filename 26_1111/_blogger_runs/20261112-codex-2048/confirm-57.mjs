const fs=await import('node:fs/promises'),file='Y:/antigravity-project/ego-light-adsense-info-blog/26_1111/앱사용_애플 환불 요청/웹조사/evidence/blogger-state.json',s=JSON.parse(await fs.readFile(file,'utf8')),p=(await taskSpace(27)).page('p1');
s.publishRequestedAt=new Date().toISOString();await fs.writeFile(file,JSON.stringify(s,null,2));
await p.click('@243');await p.waitForURL('**/blog/posts/**',{timeout:30000});console.log('URL',await p.url());
