const t=await taskSpace(15),p=t.page('p1');console.log((await p.snapshot()).split('\n').filter(x=>/저장|menuitem|메뉴/.test(x)).join('\n'));
