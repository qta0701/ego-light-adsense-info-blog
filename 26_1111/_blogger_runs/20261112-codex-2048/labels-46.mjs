const t=await taskSpace(17);const p=t.page('p1');
await p.click('@177');console.log((await p.snapshot()).split('\n').slice(-35).join('\n'));
