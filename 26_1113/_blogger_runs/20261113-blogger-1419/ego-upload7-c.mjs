const task=await taskSpace(34); const page=task.page('p1');
await page.setInputFiles('input[type=file]',['Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/노하우2_진학어플라이 회원가입/웹조사/publish/01_01_search.png']);
await page.waitForSelector('text="레이아웃 선택"',{timeout:60000});
console.log(await page.snapshot());
