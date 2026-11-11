import { capture } from '../../../tools/research_browser.mjs';
const task = await taskSpace(8);
const page = task.page('p1');
console.log('1. Calling page.screenshot() first to see if SDK activates view...');
const tmpShot = await page.screenshot();
console.log('tmpShot:', tmpShot);
console.log('2. Now marking target and calling capture()...');
await page.evaluate(() => {
  document.querySelectorAll('[data-ego-target]').forEach((el) => el.removeAttribute('data-ego-target'));
  const anchors = [...document.querySelectorAll('a')].filter((a) => a.querySelector('h3'));
  const found = anchors.find((a) => a.href.includes('info.korail.com/info/selectBbsNttView.do')) || anchors[0];
  const h3 = found.querySelector('h3') || found;
  h3.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' });
  h3.setAttribute('data-ego-target', 'target-1');
});
const res = await capture(page, '26_1111/앱사용_코레일 승차권 변경/웹조사', '01-search', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });
console.log('capture result:', res);
