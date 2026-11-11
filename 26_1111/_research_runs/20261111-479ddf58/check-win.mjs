const withTimeout = (p, ms, label) => Promise.race([
  p,
  new Promise((_, rej) => setTimeout(() => rej(new Error('Timeout: ' + label)), ms))
]);
const task13 = await taskSpace(13);
const p13 = task13.page('p1');

try {
  const bf = await withTimeout(p13.cdp('HeadlessExperimental.beginFrame', { screenshot: { format: 'png' } }), 3000, 'beginFrame');
  console.log('beginFrame:', bf ? 'OK' : 'null');
} catch (e) {
  console.log('beginFrame err:', e.message);
}
