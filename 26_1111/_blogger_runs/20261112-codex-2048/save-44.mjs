const t=await taskSpace(15),p=t.page('p1');await p.fill('@218','kakaotalk-ad-blocking-guide');await p.press('@218','Tab');
await p.click('loc=role:button[name="옵션 더보기"]');console.log((await p.snapshot()).split('\n').slice(0,100).join('\n'));
