const task=await taskSpace(25), page=task.page('p1');
const results=await page.evaluate(()=>Array.from(document.querySelectorAll('*')).filter(x=>x.innerText?.includes('Android에서 Instagram 앱을 사용하는 경우') && !Array.from(x.children).some(y=>y.innerText?.includes('Android에서 Instagram 앱을 사용하는 경우'))).map(x=>({tag:x.tagName,text:x.innerText,outer:x.outerHTML.slice(0,500)})));
console.log(results);
