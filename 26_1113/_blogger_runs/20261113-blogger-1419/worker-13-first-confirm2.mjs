const fs=await import('node:fs/promises');
const task=await taskSpace(43),page=task.page('p1');
console.log(await page.snapshot({scope:'subtree',root:'@270'}));
await page.click('@283');
await page.waitForFunction(()=>[...document.querySelectorAll('.CodeMirror')].some(x=>x.CodeMirror && x.CodeMirror.getValue().includes('01_search.png')),undefined,{timeout:30000});
const val=await page.evaluate(()=>[...document.querySelectorAll('.CodeMirror')].find(x=>x.CodeMirror)?.CodeMirror.getValue());
console.log(val);
