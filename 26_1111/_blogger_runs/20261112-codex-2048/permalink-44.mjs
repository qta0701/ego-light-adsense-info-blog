const t=await taskSpace(15);const p=t.page('p1');await p.click('@217');console.log((await p.snapshot()).split('\n').slice(-30).join('\n'));
