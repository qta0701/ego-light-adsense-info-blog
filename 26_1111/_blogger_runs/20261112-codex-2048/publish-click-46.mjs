const t=await taskSpace(17);const p=t.page('p1');await p.click('loc=role:button[name="게시"]');console.log((await p.snapshot()).split('\n').slice(-50).join('\n'));
