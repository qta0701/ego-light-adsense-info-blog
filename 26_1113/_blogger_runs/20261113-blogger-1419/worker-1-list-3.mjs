const task=await taskSpace(38),page=task.page('p1');const s=await page.snapshot({scope:'full_page'});
console.log(JSON.stringify({url:await page.url(),matches:s.split('\n').filter(x=>x.includes('테무 회원탈퇴')||x.includes('3309230941235339576')||x.includes('게시됨')).slice(0,12)}));
