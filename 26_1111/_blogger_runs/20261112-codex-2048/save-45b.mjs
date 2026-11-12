const t=await taskSpace(16),p=t.page('p1');console.log((await p.snapshot()).split('\n').filter(x=>/menuitem|변경사항/.test(x)).join('\n'));
