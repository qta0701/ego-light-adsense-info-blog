const t=await taskSpace(3),p=t.page('p1');
console.log(JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('p')].filter(e=>e.innerText.trim()).map(e=>({text:e.innerText.slice(0,120),html:e.outerHTML.slice(0,600)})))));
