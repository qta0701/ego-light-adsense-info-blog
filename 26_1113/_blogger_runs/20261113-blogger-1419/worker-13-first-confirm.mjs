const fs=await import('node:fs/promises');
const task=await taskSpace(43),page=task.page('p1');
await page.click('text=원본 크기');
await page.click('loc=role:dialog[name="레이아웃 선택"] >> text=확인');
await page.waitForFunction(()=>[...document.querySelectorAll('.CodeMirror')].some(x=>x.CodeMirror && x.CodeMirror.getValue().includes('01_search.png')),undefined,{timeout:30000});
const val=await page.evaluate(()=>[...document.querySelectorAll('.CodeMirror')].find(x=>x.CodeMirror)?.CodeMirror.getValue());
console.log(val);
