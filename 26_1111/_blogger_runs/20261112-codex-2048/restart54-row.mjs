const p=(await taskSpace(24)).page('p1');console.log((await p.snapshot({scope:'full_page'})).split('\n').filter(x=>/타오바오|688946/.test(x)).join('\n'));
