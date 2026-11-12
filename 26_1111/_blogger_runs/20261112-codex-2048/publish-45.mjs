const t=await taskSpace(16),p=t.page('p1');await p.click('loc=role:button[name="게시"]');console.log((await p.snapshot()).split('\n').slice(-15).join('\n'));
