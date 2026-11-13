const fs=await import('node:fs/promises');
const t=await taskSpace(16),p=t.page('p2');await p.click('@44');
const s=await p.snapshot({scope:'full_page'});
await fs.writeFile('Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/은행_재테크_하나은행 환율조회/웹조사/evidence/usd-query.snapshot.txt',s,'utf8');
console.log(s.slice(7400,11000));
