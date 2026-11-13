const task=await taskSpace(46),page=task.page('p1');
await page.setInputFiles('input[type=file]',['Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/노하우_앱스토어 국가변경/웹조사/publish/02_02_conditions.png']);
await page.waitForSelector('text=레이아웃 선택',{state:'visible',timeout:30000});
console.log(await page.snapshot());
