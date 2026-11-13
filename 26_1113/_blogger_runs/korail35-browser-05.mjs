const task=await taskSpace(23);const p=task.page('p1');
console.log(await p.evaluate(()=>[...document.querySelectorAll('a[href="/ticket/myticket/list"]')].map(a=>({outer:a.outerHTML,parent:a.parentElement.outerHTML.slice(0,1200),rect:a.getBoundingClientRect().toJSON()}))));
