const t=await taskSpace(17);const p=t.page('p1');console.log((await p.snapshot()).split('\n').slice(-70).join('\n'));
