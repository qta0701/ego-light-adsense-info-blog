import {capture} from '../../tools/research_browser.mjs';
let t=await taskSpace(8),p=t.page('p3'),f='26_1113/노하우2_진학어플라이 회원가입/웹조사';
for(const [name,alt] of [['02_guide_choice','통합회원 가입 설명'],['03_guide_agree','통합회원 동의페이지 설명'],['04_guide_form','휴대폰번호가 있는 경우 설명']]){
 try{await p.evaluate(a=>document.querySelector(`img[alt="${a}"]`).scrollIntoView({block:'center'}),alt);console.log(JSON.stringify({name,result:await capture(p,f,name,[`img[alt="${alt}"]`],{width:1280,height:1000})}));}catch(e){console.log(JSON.stringify({name,error:String(e)}));}
}
t=await taskSpace(9);p=t.page('p2');
console.log(JSON.stringify({id:9,info:await p.info(),snapshot:(await p.snapshot()).slice(0,4000),dom:await p.evaluate(()=>({url:location.href,headings:document.querySelectorAll('h2').length,ols:document.querySelectorAll('ol').length,body:document.body.innerText.slice(0,500)}))}));
