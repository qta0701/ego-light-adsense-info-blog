const task=await taskSpace(26); const page=task.page('p1');
console.log(await page.evaluate(()=>[...document.querySelectorAll('tr')].filter(x=>x.innerText.includes('배송비')).map(x=>({html:x.outerHTML.slice(0,1200),index:[...document.querySelectorAll('tr')].indexOf(x)}))));
