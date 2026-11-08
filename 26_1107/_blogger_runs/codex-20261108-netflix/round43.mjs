const task=await taskSpace(12);const page=task.page('p1');const post='7132914960626169988';
const row=await page.evaluate(post=>{const a=document.querySelector(`a[href="./blog/post/edit/7162964317827704236/${post}"]`);const row=a?.parentElement;return {text:row?.innerText,url:row?.querySelector('a[aria-label="보기"]')?.href}},post);console.log(JSON.stringify(row));
