const p=(await taskSpace(25)).page('p1');console.log((await p.snapshot({scope:'full_page'})).split('\n').slice(-16).join('\n'));
