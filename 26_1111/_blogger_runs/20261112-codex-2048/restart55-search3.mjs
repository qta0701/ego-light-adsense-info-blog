const p=(await taskSpace(25)).page('p1');console.log((await p.snapshot({scope:'full_page'})).split('\n').filter(x=>/text "[^"<>]{5,100}"|게시물 없음/.test(x)).slice(-30).join('\n'));
