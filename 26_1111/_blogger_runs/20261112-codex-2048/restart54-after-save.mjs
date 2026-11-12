const p=(await taskSpace(24)).page('p1');console.log('URL',await p.url());console.log((await p.snapshot()).split('\n').slice(0,65).join('\n'));
