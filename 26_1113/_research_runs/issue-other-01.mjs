import fs from 'node:fs/promises';
for(const [row,keyword] of [[31,'코레일 민원접수'],[32,'테무 회원탈퇴']]){
 const t=await taskSpace('issue-1-'+row+'-20261113');const p=t.page('p1');
 const dir='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/이슈_'+keyword+'/웹조사';
 await fs.writeFile(dir+'/evidence/browser.json',JSON.stringify({spaceId:t.spaceId,page:'p1',status:'searching'},null,2));
 await p.goto('https://www.google.com/search?q='+encodeURIComponent(keyword));
 const r=await p.evaluate(()=>({url:location.href,text:document.body.innerText.slice(0,3000),links:[...document.querySelectorAll('a')].filter(a=>a.querySelector('h3')).slice(0,8).map(a=>({text:a.innerText,url:a.href}))}));
 await fs.writeFile(dir+'/evidence/search-1.json',JSON.stringify({query:keyword,...r},null,2));
 console.log(row,t.spaceId,JSON.stringify(r.links));
}
