const task=await taskSpace(43),page=task.page('p1');
await page.setInputFiles('input[type=file]',['Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/은행_재테크_신한은행 간편조회/웹조사/publish/01_search.png']);
await page.waitForSelector('text=레이아웃 선택',{state:'visible',timeout:60000});
console.log(await page.snapshot());
