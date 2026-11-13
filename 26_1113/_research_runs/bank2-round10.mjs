import {observePage} from '../../tools/research_observe.mjs';
for(const x of [
 {id:16,from:'p1',ref:'@20',row:19,folder:'26_1113/은행_재테크_하나은행 환율조회/웹조사'},
 {id:14,from:'p2',ref:'@9',row:17,folder:'26_1113/은행_재테크_신한은행 간편조회/웹조사'},
 {id:15,from:'p2',ref:'@27',row:18,folder:'26_1113/은행_재테크_신한은행 환전 방법/웹조사'}]) {
 const task=await taskSpace(x.id),p=task.page(x.from); const receipt=await p.click(x.ref);
 const q=receipt.popups?.length?task.page(receipt.popups[0].label):p;
 await q.waitForLoadState();
 console.log(JSON.stringify({row:x.row,page:q.label,snapshot:(await q.snapshot()).slice(0,7500)}));
 console.log(JSON.stringify({row:x.row,evidence:await observePage(q,x.folder,x.row===19?'official-1':'official-2',{maxChars:2500})}));
}
