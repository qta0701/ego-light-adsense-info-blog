import { capture } from '../../tools/research_browser.mjs';
import fs from 'node:fs/promises';
const root='Y:/antigravity-project/ego-light-adsense-info-blog/';
const jobs=[
  {id:11,folder:'26_1113/은행_재테크_부산은행 환전/웹조사',needle:'환전금고안내'},
  {id:12,folder:'26_1113/은행_재테크_국민은행 환전신청/웹조사',needle:'환전신청'},
  {id:13,folder:'26_1113/은행_재테크_국민은행 통장사본 출력/웹조사',needle:'통장사본'}
];
for(const j of jobs){
 try {
  const t=await taskSpace(j.id), p=t.page('p1');
  const found=await p.evaluate((needle)=>{
   const a=[...document.querySelectorAll('a')].find(a=>a.querySelector('h3') && a.innerText.includes(needle));
   if(!a) return null; a.setAttribute('data-research-target','yes');
   a.scrollIntoView({block:'center'}); return {text:a.innerText,href:a.href};
  },j.needle);
  if(!found) throw Error('official result not found');
  const cap=await capture(p,j.folder,'01_search',['a[data-research-target="yes"]'],{width:1280,height:900});
  await p.click('a[data-research-target="yes"]');
  await p.waitForTimeout(1800);
  const data=await p.evaluate(()=>({url:location.href,title:document.title,text:document.body.innerText.slice(0,15000),links:[...document.querySelectorAll('a')].map(a=>({text:a.innerText.trim(),href:a.href})).filter(x=>x.text).slice(0,100)}));
  await fs.writeFile(root+j.folder+'/evidence/official-1.json',JSON.stringify(data,null,2));
  console.log(JSON.stringify({id:j.id,found,cap,url:data.url,title:data.title,text:data.text.slice(0,3500)}));
 }catch(e){console.log(JSON.stringify({id:j.id,error:String(e.stack||e)}));}
}
