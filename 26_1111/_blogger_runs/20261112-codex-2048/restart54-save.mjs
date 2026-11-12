const p=(await taskSpace(24)).page('p1');
console.log((await p.snapshot({scope:'full_page'})).split('\n').filter(x=>/menuitem|저장/.test(x)).slice(-12).join('\n'));
