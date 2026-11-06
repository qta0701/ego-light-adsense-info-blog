const task = await taskSpace('app-keywords-20261106-research');
const p = task.page('p1');
await p.goto('https://www.google.com/search?q=' + encodeURIComponent('카카오톡 무료 이모티콘'));
console.log({spaceId:task.spaceId});
console.log(await p.snapshot());
