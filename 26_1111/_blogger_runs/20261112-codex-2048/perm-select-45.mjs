const t=await taskSpace(16),p=t.page('p1');await p.click('@311');console.log((await p.snapshot()).split('\n').slice(-27).join('\n'));
