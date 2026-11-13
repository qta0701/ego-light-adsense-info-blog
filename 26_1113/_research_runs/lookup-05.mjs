const task = await taskSpace(4);
try {
  await task.waitForControl({timeout: 45000, interval: 2000});
  console.log('Agent control returned');
  console.log(await task.page('p1').snapshot());
} catch (error) {
  console.log('Waiting for user sign-in and control return:', error.message);
}
