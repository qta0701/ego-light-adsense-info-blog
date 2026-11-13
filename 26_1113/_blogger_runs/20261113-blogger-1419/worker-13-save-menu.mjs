const task=await taskSpace(43),page=task.page('p1');const s=await page.snapshot();console.log(s.split('\n').filter(x=>/저장|menuitem/.test(x)).join('\n'));
