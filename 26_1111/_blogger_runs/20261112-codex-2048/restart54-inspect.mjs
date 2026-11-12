const p=(await taskSpace(24)).page('p1');console.log((await p.snapshot({scope:'full_page'})).split('\n').slice(-65).join('\n'));
