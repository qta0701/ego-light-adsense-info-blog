for(const [row,id,ref] of [[48,18,'@201'],[50,20,'@178']]){const t=await taskSpace(id),p=t.page('p1');await p.click(ref);console.log('ROW',row,(await p.snapshot()).split('\n').slice(-32).join('\n'));}
{const t=await taskSpace(19),p=t.page('p1');await p.click('@195');console.log('ROW 49',(await p.snapshot()).split('\n').slice(-32).join('\n'));}
