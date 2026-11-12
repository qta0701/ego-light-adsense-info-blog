const p=(await taskSpace(26)).page('p1');console.log((await p.snapshot()).split('\n').slice(-65).join('\n'));
