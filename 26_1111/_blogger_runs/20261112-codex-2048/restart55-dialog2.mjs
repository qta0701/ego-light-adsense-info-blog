const p=(await taskSpace(25)).page('p1');await p.click('loc=role:button[name="게시"]');console.log((await p.snapshot({scope:'full_page'})).split('\n').slice(-16).join('\n'));
