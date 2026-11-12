const t=await taskSpace(15);const p=t.page('p1');console.log((await p.snapshot()).split('\n').slice(-55).join('\n'));
