for(const id of [7,8]){const task=await taskSpace(id);const page=task.page('p1');console.log(JSON.stringify({id,url:await page.url(),snapshot:(await page.snapshot()).slice(-4000)}));}
