import {observePage} from '../../tools/research_observe.mjs';
for(const [id,row,title,folder] of [[15,18,'환전가이드-환전이용안내','26_1113/은행_재테크_신한은행 환전 방법/웹조사'],[16,19,'환율/외화예금 금리','26_1113/은행_재테크_하나은행 환율조회/웹조사']]){
 const task=await taskSpace(id), search=task.page('p1');
 const receipt=await search.click(`loc=css:a:has-text("${title}")`);
 const p=receipt.popups?.length ? task.page(receipt.popups[0].label) : search;
 await p.waitForLoadState();
 console.log(JSON.stringify({row,page:p.label,snapshot:(await p.snapshot()).slice(0,6500)}));
 console.log(JSON.stringify({row,evidence:await observePage(p,folder,'official-1',{maxChars:2500})}));
}
