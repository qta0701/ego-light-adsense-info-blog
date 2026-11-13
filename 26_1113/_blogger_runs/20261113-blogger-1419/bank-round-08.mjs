const page=(await taskSpace(40)).page('p1');
await page.click('text="원본 크기"');
await page.click('loc=role:dialog[name="레이아웃 선택"] >> text="확인"');
const content=await page.evaluate(()=>[...document.querySelectorAll('.CodeMirror')].map(x=>x.CodeMirror?.getValue()));
console.log(JSON.stringify({content,snapshot:await page.snapshot()}));
