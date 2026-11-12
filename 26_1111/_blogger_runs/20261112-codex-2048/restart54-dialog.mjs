const p=(await taskSpace(24)).page('p1');console.log((await p.snapshot({scope:'full_page'})).split('\n').filter(x=>/dialog|게시|확인|취소/.test(x)).slice(-25).join('\n'));
