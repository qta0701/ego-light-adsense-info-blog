const fs=await import('node:fs/promises');
for(const x of [{id:14,label:'p2',folder:'26_1113/은행_재테크_신한은행 간편조회/웹조사'}, {id:16,label:'p2',folder:'26_1113/은행_재테크_하나은행 환율조회/웹조사'}]) {
 const t=await taskSpace(x.id),p=t.page(x.label); const s=await p.snapshot({scope:'full_page'});
 await fs.writeFile('Y:/antigravity-project/ego-light-adsense-info-blog/'+x.folder+'/evidence/official-full.snapshot.txt',s,'utf8');
 console.log(JSON.stringify({id:x.id,snapshot:s.slice(-11000)}));
}
