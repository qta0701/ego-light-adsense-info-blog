const p=(await taskSpace(26)).page('p1');console.log((await p.snapshot({scope:'full_page'})).split('\n').filter(x=>/스팀 환불 방법|8492600626028722143/.test(x)).join('\n'));
