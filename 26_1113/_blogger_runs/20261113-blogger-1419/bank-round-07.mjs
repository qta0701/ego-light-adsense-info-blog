const page=(await taskSpace(40)).page('p1');
await page.setInputFiles('input[type=file]',['Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/은행_재테크_부산은행 환전/웹조사/publish/02_guide.png']);
await page.waitForSelector('text=레이아웃 선택',{timeout:30000});
console.log(await page.snapshot());
