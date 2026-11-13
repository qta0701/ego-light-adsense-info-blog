const task=await taskSpace(35),page=task.page('p1');
const s=await page.snapshot({scope:'full_page'});console.log(JSON.stringify({url:await page.url(),matching:s.split('\n').filter((x,i,a)=>x.includes('4970818560955615714')||x.includes('앱스토어 로그아웃')||x.includes('게시됨')).slice(0,15),snapshot:s.slice(0,3000)}));
