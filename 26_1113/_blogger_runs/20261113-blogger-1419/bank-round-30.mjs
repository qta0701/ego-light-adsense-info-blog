const fs=await import('node:fs/promises');const root='Y:/antigravity-project/ego-light-adsense-info-blog',sp=`${root}/26_1113/은행_재테크_부산은행 환전/웹조사/evidence/blogger-state.json`;let s=JSON.parse(await fs.readFile(sp,'utf8'));const p=(await taskSpace(40)).page('p1');
await p.click('@434');s.publishRequestedAt=new Date().toISOString();s.stage='publish_requested';await fs.writeFile(sp,JSON.stringify(s,null,2));
await p.waitForURL('https://www.blogger.com/blog/posts/3013546958093270596*',{timeout:30000});console.log((await p.snapshot()).slice(0,6000));
