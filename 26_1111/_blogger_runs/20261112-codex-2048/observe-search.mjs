for (const [row,id] of [[44,15],[45,16],[46,17]]) {
 const task=await taskSpace(id); const p=task.page('p1');
 console.log('ROW',row,'URL',await p.url(),await p.evaluate(() => ({text:document.body.innerText.slice(-3500), items:[...document.querySelectorAll('[role=listitem]')].map(e=>e.innerText.slice(0,250))})));
}
