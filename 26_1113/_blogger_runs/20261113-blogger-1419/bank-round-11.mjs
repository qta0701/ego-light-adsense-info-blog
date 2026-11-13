const page=(await taskSpace(40)).page('p1');
await page.waitForFunction(()=>document.querySelector('.CodeMirror')?.CodeMirror?.getValue().includes('02_guide.png'),undefined,{timeout:15000});
const content=await page.evaluate(()=>document.querySelector('.CodeMirror').CodeMirror.getValue());
console.log(content);
