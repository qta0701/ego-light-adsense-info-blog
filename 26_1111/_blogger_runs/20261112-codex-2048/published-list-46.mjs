const t=await taskSpace(17);const p=t.page('p1');console.log('url',await p.url());console.log((await p.snapshot()).split('\n').filter(x=>/내일로|게시됨|6912395706096692937|보기|오류|게시/.test(x)).join('\n'));
