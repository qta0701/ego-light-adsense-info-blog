const task=await taskSpace(34),page=task.page('p1');
console.log((await page.snapshot()).split('\n').filter(x=>/저장|menuitem/.test(x)).join('\n'));
