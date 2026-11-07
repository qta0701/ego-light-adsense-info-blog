const t=await taskSpace(1),p=t.page('p1');console.log(JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('img[alt]')].map(e=>e.alt).filter(Boolean).slice(0,120))));
