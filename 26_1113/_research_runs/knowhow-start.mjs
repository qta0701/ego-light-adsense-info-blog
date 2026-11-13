import fs from 'node:fs/promises';
const root='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113';
for (const [row,keyword] of [[34,'앱스토어 국가변경'],[35,'코레일 승차권 조회'],[36,'모바일 티머니 환불']]) {
 const folder=`${root}/노하우_${keyword}/웹조사`;
 for(const d of ['raw','evidence','publish']) await fs.mkdir(`${folder}/${d}`,{recursive:true});
 await fs.writeFile(`${folder}/research.json`,'{}','utf8');
 try {
  const t=await taskSpace(`knowhow-1-${row}-20261113`),p=t.page('p1');
  await fs.writeFile(`${folder}/evidence/browser.json`,JSON.stringify({spaceId:t.spaceId,page:'p1',status:'searching'},null,2));
  await p.goto('https://www.google.com/search?q='+encodeURIComponent(keyword));
  const data=await p.evaluate(()=>({url:location.href,title:document.title,text:document.body.innerText.slice(0,5000),candidates:[...document.querySelectorAll('a')].filter(a=>a.querySelector('h3')).slice(0,10).map(a=>({title:a.innerText,url:a.href}))}));
  await fs.writeFile(`${folder}/evidence/search-1.json`,JSON.stringify(data,null,2),'utf8');
  console.log(JSON.stringify({row,spaceId:t.spaceId,...data}));
 } catch(e){console.log(JSON.stringify({row,error:String(e)}));}
}
