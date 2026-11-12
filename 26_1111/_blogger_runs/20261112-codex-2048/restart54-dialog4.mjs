const p=(await taskSpace(24)).page('p1');console.log((await p.snapshot({scope:'full_page'})).split('\n').filter(x=>/dialog|확인|취소|게시/.test(x)).slice(-12).join('\n'));
