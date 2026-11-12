const p=(await taskSpace(24)).page('p1');await p.click('text="퍼머링크"');console.log((await p.snapshot({scope:'full_page'})).split('\n').slice(-50).join('\n'));
