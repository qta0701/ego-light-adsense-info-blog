const p=(await taskSpace(27)).page('p1');console.log((await p.snapshot()).split('\n').slice(0,80).join('\n'));
