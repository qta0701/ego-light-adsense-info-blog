const p=(await taskSpace(24)).page('p1');console.log((await p.snapshot()).split('\n').slice(0,85).join('\n'));
