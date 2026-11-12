const fs=await import('node:fs/promises');const t=await taskSpace(17);const p=t.page('p1');await p.click('@223');
const file='Y:/antigravity-project/ego-light-adsense-info-blog/26_1111/앱사용_코레일 내일로 패스/웹조사/evidence/blogger-state.json';const s=JSON.parse(await fs.readFile(file,'utf8'));s.publishRequestedAt=new Date().toISOString();await fs.writeFile(file,JSON.stringify(s,null,2));
console.log('url',await p.url());console.log((await p.snapshot()).split('\n').slice(-90).join('\n'));
