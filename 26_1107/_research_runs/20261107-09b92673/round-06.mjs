const ts=await Promise.all([1,2,3].map(id=>taskSpace(id)));
console.log(JSON.stringify(await Promise.all(ts.map(async t=>{const p=t.page('p1');return {id:t.spaceId,buttons:await p.evaluate(()=>[...document.querySelectorAll('button,summary')].map(e=>({text:e.innerText,aria:e.getAttribute('aria-label')})).filter(x=>x.text||x.aria).slice(-30))};}))));
