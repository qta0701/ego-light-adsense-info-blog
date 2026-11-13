const task=await taskSpace(46),page=task.page('p1');await page.hover('a[href="./blog/post/edit/1872124715220437079/7673303939056881825"]');
console.log((await page.snapshot()).slice(2500,6000));
console.log(JSON.stringify(await page.evaluate(()=>{const a=document.querySelector('a[href="./blog/post/edit/1872124715220437079/7673303939056881825"]');return a?.parentElement?.outerHTML.slice(0,18000)})));
