const p=(await taskSpace(25)).page('p1');console.log((await p.snapshot({scope:'full_page'})).split('\n').filter(x=>/네이버 회원 탈퇴|6479330267838733063/.test(x)).join('\n'));
