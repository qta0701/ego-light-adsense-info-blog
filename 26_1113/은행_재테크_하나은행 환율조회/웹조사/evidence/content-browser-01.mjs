const task = await taskSpace("hana-rate-content-20261113-1401");
const page = task.page("p1");
console.log({spaceId: task.spaceId});
await page.goto("https://www.google.com/search?q=%ED%95%98%EB%82%98%EC%9D%80%ED%96%89+%ED%99%98%EC%9C%A8%EC%A1%B0%ED%9A%8C");
console.log(await page.snapshot());
