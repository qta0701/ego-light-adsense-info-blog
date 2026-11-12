for(const [row,id] of [[48,18],[49,19],[50,20]]){const t=await taskSpace(id),p=t.page('p1');console.log('ROW',row,(await p.snapshot()).split('\n').slice(-45).join('\n'));}
