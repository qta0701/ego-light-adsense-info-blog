import fs from 'node:fs/promises';
const t=await taskSpace(13),p=t.page('p5');const d=await p.evaluate(()=>({url:location.href,title:document.title,text:document.body.innerText}));await fs.writeFile('Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/은행_재테크_국민은행 통장사본 출력/웹조사/evidence/pc-thirdparty.json',JSON.stringify(d,null,2));console.log(JSON.stringify(d).slice(0,11000));
