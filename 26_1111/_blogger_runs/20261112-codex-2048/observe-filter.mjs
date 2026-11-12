for (const [row,id] of [[44,15],[45,16],[46,17]]) {
 const task=await taskSpace(id); const p=task.page('p1');
 const snap=await p.snapshot();
 console.log('ROW',row, snap.split('\n').filter(x=>/listitem|text "(카카오톡|기기변경|코레일|내일로|검색결과|검색 결과)|url=.*post\/edit/.test(x)).join('\n'));
}
