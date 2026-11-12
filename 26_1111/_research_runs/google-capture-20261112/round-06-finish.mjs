const task = await taskSpace(29);
await task.finish({ keep: [] });
console.log({ spaceId: 29, finished: true });
