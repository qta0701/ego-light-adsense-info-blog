for (const [order,id] of [[1,35],[2,37],[3,38]]) {
 const task=await taskSpace(id),page=task.page('p1');
 console.log(JSON.stringify({order,snapshot:(await page.snapshot()).slice(-3500)}));
}
