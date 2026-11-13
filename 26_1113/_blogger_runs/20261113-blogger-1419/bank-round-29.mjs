const p=(await taskSpace(40)).page('p1');await p.click('loc=role:button[name="게시"]');console.log((await p.snapshot()).slice(-2500));
