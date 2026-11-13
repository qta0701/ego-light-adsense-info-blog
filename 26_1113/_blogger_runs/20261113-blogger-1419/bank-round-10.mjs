const page=(await taskSpace(40)).page('p1');
await page.click('@338');
console.log(JSON.stringify({content:await page.evaluate(()=>[...document.querySelectorAll('.CodeMirror')].map(x=>x.CodeMirror?.getValue()))}));
