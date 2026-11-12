const t=await taskSpace(16),p=t.page('p1');console.log((await p.snapshot()).split('\n').slice(-35).join('\n'));
