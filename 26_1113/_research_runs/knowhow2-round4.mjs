import {observePage} from '../../tools/research_observe.mjs';
for(const [id,label,key] of [[8,'p3','진학어플라이 회원가입'],[9,'p2','인스타그램 탈퇴방법']]){
 let t=await taskSpace(id),p=t.page(label);
 try{
  if(id===9) await p.click('loc=role:button[name="채팅 닫기"]');
  console.log(JSON.stringify({id,info:await p.info(),snapshot:(await p.snapshot()).slice(0,13000),dom:await p.evaluate(()=>({headings:[...document.querySelectorAll('h1,h2,h3,ol')].map((e,i)=>({i,tag:e.tagName,text:e.innerText.slice(0,250),html:e.outerHTML.slice(0,400)})).slice(0,25)}))}));
  if(id===8) console.log(JSON.stringify({id,observation:await observePage(p,`26_1113/노하우2_${key}/웹조사`,'signup')}));
 }catch(e){console.log(JSON.stringify({id,error:String(e)}));}
}
