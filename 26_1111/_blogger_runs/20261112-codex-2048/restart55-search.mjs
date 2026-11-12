const p=(await taskSpace(25)).page('p1');console.log('URL',await p.url());console.log((await p.snapshot()).split('\n').slice(-35).join('\n'));
