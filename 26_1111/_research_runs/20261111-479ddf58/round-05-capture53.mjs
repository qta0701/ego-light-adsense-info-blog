import fs from 'node:fs/promises';
import { inside, capture } from '../../../tools/research_browser.mjs';
import { wrapPageForCapture, sanitizeDomBeforeCapture } from './dom_capture_helper.mjs';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../../../', import.meta.url));
const folder = '26_1111/앱사용_넷플릭스 로그아웃 티비/웹조사';
const rawDir = inside(ROOT, folder + '/raw');
for (const f of await fs.readdir(rawDir).catch(() => [])) {
  await fs.unlink(rawDir + '/' + f).catch(() => {});
}

const task = await taskSpace(13);
const rawPage = task.page('p1');
const p = wrapPageForCapture(rawPage);
const results = {};

// 1. 01-search: Google search for 넷플릭스 로그아웃 티비
await rawPage.goto('https://www.google.com/search?q=' + encodeURIComponent('넷플릭스 로그아웃 티비'), { timeout: 25000 });
await rawPage.cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await rawPage.waitForTimeout(800);
await sanitizeDomBeforeCapture(rawPage);
await rawPage.evaluate(() => {
  document.querySelectorAll('[data-ego-target]').forEach(el => el.removeAttribute('data-ego-target'));
  // Collapse or hide Google AI overview block if it pushes official results or overlaps
  const anchors = [...document.querySelectorAll('a')].filter(a => a.href.includes('help.netflix.com/ko/node/128180') && a.querySelector('h3'));
  const target = anchors[0]?.querySelector('h3') || document.querySelector('h3');
  target.setAttribute('data-ego-target', 'target-1');
  target.scrollIntoView({ block: 'center', behavior: 'instant' });
});
await rawPage.waitForTimeout(300);
results.c01 = await capture(p, folder, '01-search', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });

// 2. 02-step1 & 03-step2 on https://help.netflix.com/ko/node/23928
await rawPage.goto('https://help.netflix.com/ko/node/23928', { timeout: 25000 });
await rawPage.cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await rawPage.waitForTimeout(1000);
await sanitizeDomBeforeCapture(rawPage);

// Switch to the '넷플릭스에서 로그아웃' tab and open its collapsible sections
await rawPage.evaluate(() => {
  // Click the '넷플릭스에서 로그아웃' tab label if present
  const tabLabels = [...document.querySelectorAll('label')];
  const logoutTab = tabLabels.find(l => l.innerText?.trim() === '넷플릭스에서 로그아웃');
  if (logoutTab) logoutTab.click();
  document.querySelectorAll('[data-type="tabs-tab-content"], [data-type="collapsible-section-detail"]').forEach(el => {
    el.style.display = 'block';
    el.style.visibility = 'visible';
  });
});
await rawPage.waitForTimeout(400);

// 02-step1: Target the TV app direct logout step ('하단에서 고객 지원, 로그아웃을 차례로 선택한 다음 예를 선택합니다.')
await rawPage.evaluate(() => {
  document.querySelectorAll('[data-ego-target]').forEach(el => el.removeAttribute('data-ego-target'));
  const ok = el => {
    const r = el.getBoundingClientRect();
    return r.width > 20 && r.height > 10 && r.height < 220;
  };
  const candidates = [...document.querySelectorAll('li, p, label, h2, h3, h4')].filter(ok);
  const target = candidates.find(el => el.innerText?.includes('하단에서 고객 지원, 로그아웃을 차례로 선택한 다음'))
    || candidates.find(el => el.innerText?.includes('넷플릭스를 통해 로그아웃'));
  target.setAttribute('data-ego-target', 'target-1');
  target.scrollIntoView({ block: 'center', behavior: 'instant' });
});
await rawPage.waitForTimeout(300);
results.c02 = await capture(p, folder, '02-step1', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });

// 03-step2: Target the directional remote key sequence ('위쪽, 위쪽, 아래쪽, 아래쪽, 왼쪽, 오른쪽...')
await rawPage.evaluate(() => {
  document.querySelectorAll('[data-ego-target]').forEach(el => el.removeAttribute('data-ego-target'));
  const ok = el => {
    const r = el.getBoundingClientRect();
    return r.width > 20 && r.height > 10 && r.height < 220;
  };
  const candidates = [...document.querySelectorAll('li, p, strong')].filter(ok);
  const target = candidates.find(el => el.innerText?.includes('리모컨을 사용하여 다음 버튼을 이 순서대로 누릅니다'))
    || candidates.find(el => el.innerText?.includes('위쪽, 위쪽, 아래쪽, 아래쪽, 왼쪽, 오른쪽'));
  target.setAttribute('data-ego-target', 'target-1');
  target.scrollIntoView({ block: 'center', behavior: 'instant' });
});
await rawPage.waitForTimeout(300);
results.c03 = await capture(p, folder, '03-step2', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });

// 3. 04-step3 & 05-step4 on https://help.netflix.com/ko/node/128180
await rawPage.goto('https://help.netflix.com/ko/node/128180', { timeout: 25000 });
await rawPage.cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await rawPage.waitForTimeout(1000);
await sanitizeDomBeforeCapture(rawPage);

// 04-step3: Expand '단일 디바이스에서 로그아웃'
await rawPage.evaluate(() => {
  document.querySelectorAll('[data-ego-target]').forEach(el => el.removeAttribute('data-ego-target'));
  const details = [...document.querySelectorAll('[data-type="collapsible-section-detail"]')];
  if (details[0]) { details[0].style.display = 'block'; details[0].style.visibility = 'visible'; }
  const ok = el => {
    const r = el.getBoundingClientRect();
    return r.width > 20 && r.height > 10 && r.height < 200;
  };
  const candidates = [...document.querySelectorAll('label[data-type="collapsible-section-summary"], li, p, h2, h3')].filter(ok);
  const target = candidates.find(el => el.innerText?.includes('단일 디바이스에서 로그아웃'));
  target.setAttribute('data-ego-target', 'target-1');
  target.scrollIntoView({ block: 'center', behavior: 'instant' });
});
await rawPage.waitForTimeout(300);
results.c04 = await capture(p, folder, '04-step3', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });

// 05-step4: Expand '모든 디바이스에서 로그아웃' & '계정에 로그인된 디바이스 확인'
await rawPage.evaluate(() => {
  document.querySelectorAll('[data-ego-target]').forEach(el => el.removeAttribute('data-ego-target'));
  const details = [...document.querySelectorAll('[data-type="collapsible-section-detail"]')];
  if (details[0]) details[0].style.display = 'none';
  if (details[1]) { details[1].style.display = 'block'; details[1].style.visibility = 'visible'; }
  if (details[2]) { details[2].style.display = 'block'; details[2].style.visibility = 'visible'; }
  const ok = el => {
    const r = el.getBoundingClientRect();
    return r.width > 20 && r.height > 10 && r.height < 200;
  };
  const candidates = [...document.querySelectorAll('label[data-type="collapsible-section-summary"], li, p, h2, h3')].filter(ok);
  const target = candidates.find(el => el.innerText?.includes('모든 디바이스에서 로그아웃'));
  target.setAttribute('data-ego-target', 'target-1');
  target.scrollIntoView({ block: 'center', behavior: 'instant' });
});
await rawPage.waitForTimeout(300);
results.c05 = await capture(p, folder, '05-step4', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });

console.log(JSON.stringify(results, null, 2));
