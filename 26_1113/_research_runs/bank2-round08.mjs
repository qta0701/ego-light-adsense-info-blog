const t=await taskSpace(16); console.log((await t.page('p1').snapshot()).slice(0,10000));
