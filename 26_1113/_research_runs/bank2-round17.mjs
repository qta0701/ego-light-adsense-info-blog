import {capture} from '../../tools/research_browser.mjs';
const v={width:1280,height:900};
async function prep(p){await p.cdp('Emulation.setDeviceMetricsOverride',{...v,deviceScaleFactor:1,mobile:false});}
async function selector(p,text,tag){return p.evaluate(({text,tag})=>{const e=[...document.querySelectorAll(tag)].find(x=>x.innerText.trim()===text&&x.getBoundingClientRect().width);if(!e)throw Error('target not found: '+text); e.scrollIntoView({block:'center'});const a=[];let n=e;while(n&&n.nodeType===1){let s=n.localName;if(n.id){s+='#'+CSS.escape(n.id);a.unshift(s);break;}let i=1;for(let x=n.previousElementSibling;x;x=x.previousElementSibling)if(x.localName===n.localName)i++;a.unshift(s+`:nth-of-type(${i})`);n=n.parentElement;}return a.join(' > ');},{text,tag});}
async function shot(p,f,n,s){console.log(JSON.stringify({n,...await capture(p,f,n,s?[s]:[],v)}));}
{
 const t=await taskSpace(14),p=t.page('p2'),f='26_1113/은행_재테크_신한은행 간편조회/웹조사'; await prep(p);
 console.log((await p.snapshot()).slice(-1600));
 const s=await selector(p,'계좌조회','a'); await shot(p,f,'04_account',s);
}
{
 const t=await taskSpace(15),p=t.page('p2'),f='26_1113/은행_재테크_신한은행 환전 방법/웹조사';await prep(p);
 let s=await selector(p,'인터넷환전신청','a');await shot(p,f,'03_application',s);
 s=await selector(p,'환전서류 및 이용방법','h2,h3,h4');await shot(p,f,'04_documents',s);
 const article=t.page('p3');await prep(article);
 s=await selector(article,"📱모바일로 24시간 간편하게, '쏠편한 환전'",'h2');await shot(article,f,'05_mobile',s);
 s=await selector(article,'📌쏠편한 환전 통화별 환율 우대율 및 한도','h3');await shot(article,f,'06_limits',s);
}
{
 const t=await taskSpace(16),p=t.page('p2'),f='26_1113/은행_재테크_하나은행 환율조회/웹조사';await prep(p);
 for(const [name,y] of [['02_form',250],['03_rates',650],['04_notes',3100]]){
  await p.evaluate(y=>window.scrollTo(0,y),y);await shot(p,f,name,null);
 }
}
