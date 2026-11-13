const task=await taskSpace(23); const p=task.page('p1');
console.log(await p.evaluate(()=>Array.from(document.querySelectorAll('a')).filter(a=>a.textContent.trim()==='승차권 확인').map(a=>({outer:a.outerHTML,rect:a.getBoundingClientRect().toJSON()}))));
