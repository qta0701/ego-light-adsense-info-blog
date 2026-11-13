const task=await taskSpace(46),page=task.page('p1');await page.hover('text="앱스토어 국가변경 방법: 아이폰 설정과 변경 전 준비"');
console.log((await page.snapshot()).slice(3000,6000));
console.log(JSON.stringify(await page.evaluate(()=>{const a=document.querySelector('a[href="./blog/post/edit/1872124715220437079/7673303939056881825"]');return a?.parentElement?.outerHTML.slice(0,18000)})));
