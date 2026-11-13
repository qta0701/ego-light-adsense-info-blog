const task=await taskSpace(35),page=task.page('p1');
await page.setInputFiles('input[type=file]',['Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/이슈_앱스토어 로그아웃/웹조사/publish/02_guide.png']);
await page.waitForSelector('text=레이아웃 선택',{timeout:30000});
console.log(await page.snapshot());
