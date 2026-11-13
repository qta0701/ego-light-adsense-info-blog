import {observePage} from '../../tools/research_observe.mjs';
let t=await taskSpace(8), p=t.page('p1');
try {let r=await p.click('loc=css:h3[id="_i432asy8HJOAvr0PuYblgQU_63"]');console.log(JSON.stringify({id:8,r,tabs:await t.tabs()}));}catch(e){console.log(String(e));}
for(const [id,label,key] of [[8,'p2','진학어플라이 회원가입'],[9,'p2','인스타그램 탈퇴방법']]){
 try {let task=await taskSpace(id),page=task.page(label);await page.waitForLoadState();console.log(JSON.stringify({id,info:await page.info(),snapshot:(await page.snapshot()).slice(0,12000),observation:await observePage(page,`26_1113/노하우2_${key}/웹조사`,'official-1')}));}catch(e){console.log(JSON.stringify({id,error:String(e)}));}
}
