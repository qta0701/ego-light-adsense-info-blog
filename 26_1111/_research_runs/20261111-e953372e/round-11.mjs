const [t11, t12] = await Promise.all([taskSpace(11), taskSpace(12)]);
const sP2 = t11.page('p2');
const aP2 = t12.page('p2');

await sP2.goto('https://help.steampowered.com/ko/faqs/view/784C-923B-A4A1-C825');
await sP2.waitForLoadState();
const steamImgs = await sP2.evaluate(() => [...document.querySelectorAll('img')].map(i => ({ src: i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight })));

await aP2.goto('https://support.apple.com/ko-kr/118223');
await aP2.waitForLoadState();
const appleImgs = await aP2.evaluate(() => [...document.querySelectorAll('img')].map(i => ({ src: i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight })));

console.log(JSON.stringify({ steamImgs, appleImgs }, null, 2));
