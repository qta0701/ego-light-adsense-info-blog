const task = await taskSpace('keyword-lookup-20261113-codex');
const page = task.page('p1');
console.log({spaceId: task.spaceId});
await page.goto('https://docs.google.com/spreadsheets/d/1KAnq9pvZ7VYFJOAQ_25cM8EjaDFUX5Z6x9jfCCtTf7s/edit');
console.log(await page.snapshot());
