const t=await taskSpace(3),p=t.page('p1');console.log(await p.snapshot({scope:'full_page'}));
