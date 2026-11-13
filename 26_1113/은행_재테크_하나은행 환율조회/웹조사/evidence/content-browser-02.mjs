const task = await taskSpace(28);
const page = task.page("p1");
await page.goto("https://www.kebhana.com/cont/mall/mall15/mall1501/index.jsp");
console.log((await page.snapshot()).slice(0, 12000));
