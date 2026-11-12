for(const [row,id] of [[51,21],[52,22],[53,23]]) {const t=await taskSpace(id),p=t.page('p1');console.log('ROW',row,(await p.snapshot()).split('\n').slice(-55).join('\n'));}
