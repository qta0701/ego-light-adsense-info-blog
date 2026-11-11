import path from 'node:path';
import { resumeJob, capture, finishJob } from '../../../tools/research_browser.mjs';

const ROOT = 'y:/antigravity-project/ego-light-adsense-info-blog';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function tagTarget(page, fn, attrVal = 'target-1') {
  return await page.evaluate(({ fnSrc, attrVal }) => {
    document.querySelectorAll('[data-ego-target]').forEach(el => el.removeAttribute('data-ego-target'));
    const finder = new Function('return (' + fnSrc + ')')();
    const el = finder();
    if (!el) return null;
    el.setAttribute('data-ego-target', attrVal);
    el.scrollIntoView({ block: 'center', behavior: 'instant' });
    const r = el.getBoundingClientRect();
    return { tag: el.tagName, text: (el.innerText || '').slice(0, 80), rect: { x: r.x, y: r.y, w: r.width, h: r.height } };
  }, { fnSrc: fn.toString(), attrVal });
}

// Run after restoring ego.exe window from minimized state on Windows desktop
async function runRow50() {
  const folder = path.join(ROOT, '26_1111/앱사용_번개장터 반값택배/웹조사');
  const { page } = await resumeJob(folder);
  const vp = { width: 390, height: 844 };

  await page.goto('https://www.google.com/search?q=' + encodeURIComponent('번개장터 반값택배'));
  await sleep(1500);
  await tagTarget(page, () => Array.from(document.querySelectorAll('a h3')).find(el => (el.innerText || '').includes('GS25 반값택배')) || document.querySelector('a h3'));
  await sleep(300);
  await capture(page, folder, '01-search', ['[data-ego-target="target-1"]'], vp);

  await page.goto('https://help.bunjang.co.kr/faq/42/568');
  await sleep(1500);
  await tagTarget(page, () => Array.from(document.querySelectorAll('h1, h2, h3, div, p')).find(el => (el.innerText || '').includes('GS25 반값택배가 뭔가요')));
  await sleep(300);
  await capture(page, folder, '02-step1', ['[data-ego-target="target-1"]'], vp);

  await page.goto('https://help.bunjang.co.kr/faq/42/579');
  await sleep(1500);
  await tagTarget(page, () => Array.from(document.querySelectorAll('h1, h2, h3, div, p')).find(el => (el.innerText || '').includes('CU 반값택배가 뭔가요')));
  await sleep(300);
  await capture(page, folder, '03-step2', ['[data-ego-target="target-1"]'], vp);

  await page.goto('https://help.bunjang.co.kr/faq/42/660');
  await sleep(1500);
  await tagTarget(page, () => Array.from(document.querySelectorAll('h1, h2, h3, div, p')).find(el => (el.innerText || '').includes('택배사별 비용은 얼마 인가요')));
  await sleep(300);
  await capture(page, folder, '04-step3', ['[data-ego-target="target-1"]'], vp);

  await page.goto('https://help.bunjang.co.kr/faq/42/741');
  await sleep(1500);
  await tagTarget(page, () => Array.from(document.querySelectorAll('h1, h2, h3, div, p')).find(el => (el.innerText || '').includes('편의점 반값택배 수령 QR코드')));
  await sleep(300);
  await capture(page, folder, '05-step4', ['[data-ego-target="target-1"]'], vp);

  await finishJob(folder);
}

async function runRow51() {
  const folder = path.join(ROOT, '26_1111/앱사용_번개장터 카드 결제/웹조사');
  const { page } = await resumeJob(folder);
  const vp = { width: 390, height: 844 };

  await page.goto('https://www.google.com/search?q=' + encodeURIComponent('번개장터 카드 결제'));
  await sleep(1500);
  await tagTarget(page, () => Array.from(document.querySelectorAll('a h3')).find(el => (el.innerText || '').includes('카드/간편결제 편')) || document.querySelector('a h3'));
  await sleep(300);
  await capture(page, folder, '01-search', ['[data-ego-target="target-1"]'], vp);

  await page.goto('https://bgzt.co.kr/article/490');
  await sleep(1500);
  await tagTarget(page, () => Array.from(document.querySelectorAll('h1, h2, h3, p')).find(el => (el.innerText || '').includes('신용/체크카드 결제 방법')));
  await sleep(300);
  await capture(page, folder, '02-step1', ['[data-ego-target="target-1"]'], vp);

  await tagTarget(page, () => Array.from(document.querySelectorAll('h1, h2, h3, p')).find(el => (el.innerText || '').includes('번개장터 간편결제')));
  await sleep(300);
  await capture(page, folder, '03-step2', ['[data-ego-target="target-1"]'], vp);

  await page.goto('https://help.bunjang.co.kr/faq/3/572');
  await sleep(1500);
  await tagTarget(page, () => Array.from(document.querySelectorAll('h1, h2, h3, div, p')).find(el => (el.innerText || '').includes('WEB 에서 신용/체크카드 결제는 어떻게하나요')));
  await sleep(300);
  await capture(page, folder, '04-step3', ['[data-ego-target="target-1"]'], vp);

  await page.goto('https://help.bunjang.co.kr/faq/3/296');
  await sleep(1500);
  await tagTarget(page, () => Array.from(document.querySelectorAll('h1, h2, h3, div, p')).find(el => (el.innerText || '').includes('구매할 때 안전결제 수수료는 어떻게 되나요')));
  await sleep(300);
  await capture(page, folder, '05-step4', ['[data-ego-target="target-1"]'], vp);

  await finishJob(folder);
}

async function runRow52() {
  const folder = path.join(ROOT, '26_1111/앱사용_넷플릭스 해지방법/웹조사');
  const { page } = await resumeJob(folder);
  const vp = { width: 390, height: 844 };

  await page.goto('https://www.google.com/search?q=' + encodeURIComponent('넷플릭스 해지방법'));
  await sleep(1500);
  await tagTarget(page, () => Array.from(document.querySelectorAll('a h3')).find(el => (el.innerText || '').includes('넷플릭스 해지 방법')) || document.querySelector('a h3'));
  await sleep(300);
  await capture(page, folder, '01-search', ['[data-ego-target="target-1"]'], vp);

  await page.goto('https://help.netflix.com/ko/node/407');
  await sleep(1500);
  await tagTarget(page, () => document.querySelector('h1'));
  await sleep(300);
  await capture(page, folder, '02-step1', ['[data-ego-target="target-1"]'], vp);

  await tagTarget(page, () => Array.from(document.querySelectorAll('h2, h3')).find(el => (el.innerText || '').includes('기타 안내')));
  await sleep(300);
  await capture(page, folder, '03-step2', ['[data-ego-target="target-1"]'], vp);

  await tagTarget(page, () => Array.from(document.querySelectorAll('h2, h3')).find(el => (el.innerText || '').includes('멤버십 일시정지')));
  await sleep(300);
  await capture(page, folder, '04-step3', ['[data-ego-target="target-1"]'], vp);

  await page.goto('https://www.netflix.com/cancelplan');
  await sleep(1500);
  await tagTarget(page, () => document.querySelector('h1') || document.querySelector('button[type="submit"]'));
  await sleep(300);
  await capture(page, folder, '05-step4', ['[data-ego-target="target-1"]'], vp);

  await finishJob(folder);
}

await Promise.all([runRow50(), runRow51(), runRow52()]);
