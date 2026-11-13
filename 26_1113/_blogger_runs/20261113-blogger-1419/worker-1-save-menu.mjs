const task=await taskSpace(35),page=task.page('p1');
const s=await page.snapshot({scope:'full_page'});console.log(s.split('\n').filter(x=>/저장|menuitem/.test(x)).join('\n'));
