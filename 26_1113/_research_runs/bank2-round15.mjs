for(const x of [{id:14,p:'p2'},{id:15,p:'p2'},{id:15,p:'p3'},{id:16,p:'p2'}]){
 const t=await taskSpace(x.id),p=t.page(x.p);
 console.log(JSON.stringify({id:x.id,page:x.p,info:await p.evaluate(()=>({url:location.href,viewport:[innerWidth,innerHeight], items:[...document.querySelectorAll('h1,h2,h3,h4,a,iframe')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.height}).map(e=>({tag:e.tagName,text:e.innerText?.trim().slice(0,65),id:e.id,cls:e.className,rect:[...['x','y','width','height'].map(k=>Math.round(e.getBoundingClientRect()[k]))]})).filter(e=>e.tag==='IFRAME'||/로그인|계좌조회|환전|이용|환율/.test(e.text)).slice(0,28)}))}));
}
