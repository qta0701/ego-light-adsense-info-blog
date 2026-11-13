for (const order of [7, 8, 9]) {
  try {
    const task = await taskSpace(`20261113-blogger-1419-order-${order}`);
    const page = task.page('p1');
    console.log(JSON.stringify({order, spaceId:task.spaceId, url:await page.url(), snapshot:await page.snapshot()}));
  } catch(error) { console.log(JSON.stringify({order,error:String(error)})); }
}
