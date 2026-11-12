const p=(await taskSpace(27)).page('p1');await p.click('loc=role:button[name="게시"]');console.log((await p.snapshot()).split('\n').slice(0,40).join('\n'));
