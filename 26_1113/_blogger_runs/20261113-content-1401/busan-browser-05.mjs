const task=await taskSpace(26); const page=task.page('p1');
console.log(await page.evaluate(()=>{const r=[...document.querySelectorAll('tr')].find(x=>x.innerText.includes('배송 건당 10,000원'));let x=r;return Array.from({length:5},()=>{let z={tag:x.tagName,id:x.id,cls:x.className,index:[...x.parentElement.children].indexOf(x)+1};x=x.parentElement;return z})}));
