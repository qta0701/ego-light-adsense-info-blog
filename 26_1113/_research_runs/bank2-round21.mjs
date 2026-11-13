const t=await taskSpace(16),p=t.page('p2');
console.log(JSON.stringify(await p.evaluate(()=>{const d=document.querySelector('#bankIframe').contentDocument;const s=d.querySelector('select[name=curCd]');return [...s.options].slice(0,8).map(o=>({label:o.text,value:o.value}));})));
