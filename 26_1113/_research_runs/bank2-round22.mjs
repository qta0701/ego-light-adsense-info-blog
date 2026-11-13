const t=await taskSpace(16),p=t.page('p2');
await p.selectOption('select[name="curCd"]',{value:'USD'});
console.log((await p.snapshot({scope:'full_page'})).slice(6000,10500));
