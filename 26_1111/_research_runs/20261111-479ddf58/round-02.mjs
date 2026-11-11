import fs from 'node:fs/promises';
import { inside, capture } from '../../../tools/research_browser.mjs';
import { observePage } from '../../../tools/research_observe.mjs';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../../../', import.meta.url));

async function ensureVisible(task, page) {
  try {
    const win = await task.cdp('Browser.getWindowForTarget', { targetId: page.targetId });
    if (win?.bounds?.windowState === 'minimized') {
      await task.cdp('Browser.setWindowBounds', { windowId: win.windowId, bounds: { windowState: 'normal' } });
    }
  } catch (e) {
    console.log('window check err:', e.message);
  }
  try {
    await page.cdp('Page.bringToFront');
  } catch (e) {
    console.log('bringToFront err:', e.message);
  }
}

const out = {};

// 1. Space 13 (넷플릭스 로그아웃 티비)
try {
  const folder53 = '26_1111/앱사용_넷플릭스 로그아웃 티비/웹조사';
  const task13 = await taskSpace(13);
  const p13 = task13.page('p1');
  await ensureVisible(task13, p13);
  const curUrl13 = await p13.url();
  if (!curUrl13.includes('google.com/search')) {
    await p13.goto('https://www.google.com/search?q=' + encodeURIComponent('넷플릭스 로그아웃 티비'), { timeout: 25000 });
  }
  await p13.cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await p13.waitForTimeout(500);
  const tagged13 = await p13.evaluate(() => {
    document.querySelectorAll('[data-ego-target]').forEach(el => el.removeAttribute('data-ego-target'));
    const anchors = [...document.querySelectorAll('a')].filter(a => a.href.includes('help.netflix.com/ko/node/128180') && a.querySelector('h3'));
    const target = anchors[0]?.querySelector('h3');
    if (!target) return false;
    target.setAttribute('data-ego-target', 'target-1');
    target.scrollIntoView({ block: 'center', behavior: 'instant' });
    return true;
  });
  await p13.waitForTimeout(500);
  let cap13 = null;
  if (tagged13) {
    await ensureVisible(task13, p13);
    cap13 = await capture(p13, folder53, '01-search', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });
  }
  await p13.goto('https://help.netflix.com/ko/node/128180', { timeout: 25000 });
  await p13.waitForTimeout(1500);
  const obs13 = await observePage(p13, folder53, 'official-main', { selector: 'body', maxChars: 4500, linksLimit: 10 });
  const struct13 = await p13.evaluate(() => {
    return [...document.querySelectorAll('h1, h2, h3, h4, summary, button, a, p, li')].map((el, idx) => ({
      idx,
      tag: el.tagName,
      text: el.innerText?.trim()?.slice(0, 100),
      h: Math.round(el.getBoundingClientRect().height)
    })).filter(x => x.text && x.h > 10 && x.h < 500);
  });
  out.row53 = { cap13, obsText: obs13.text, obsLinks: obs13.links, structCount: struct13.length, structSample: struct13.slice(0, 50) };
} catch (e) {
  out.row53 = { error: e.message, stack: e.stack };
}

// 2. Space 15 (네이버회원탈퇴하는방법)
try {
  const folder55 = '26_1111/앱사용_네이버회원탈퇴하는방법/웹조사';
  const task15 = await taskSpace(15);
  const p15 = task15.page('p1');
  await ensureVisible(task15, p15);
  const curUrl15 = await p15.url();
  if (!curUrl15.includes('google.com/search')) {
    await p15.goto('https://www.google.com/search?q=' + encodeURIComponent('네이버회원탈퇴하는방법'), { timeout: 25000 });
  }
  await p15.cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await p15.waitForTimeout(500);
  const tagged15 = await p15.evaluate(() => {
    document.querySelectorAll('[data-ego-target]').forEach(el => el.removeAttribute('data-ego-target'));
    const anchors = [...document.querySelectorAll('a')].filter(a => a.querySelector('h3') && a.href.includes('help.naver.com'));
    const target = anchors[0]?.querySelector('h3');
    if (!target) return null;
    target.setAttribute('data-ego-target', 'target-1');
    target.scrollIntoView({ block: 'center', behavior: 'instant' });
    return anchors[0].href;
  });
  await p15.waitForTimeout(500);
  let cap15 = null;
  if (tagged15) {
    await ensureVisible(task15, p15);
    cap15 = await capture(p15, folder55, '01-search', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });
    await p15.goto(tagged15, { timeout: 25000 });
    await p15.waitForTimeout(2000);
  }
  const obs15 = await observePage(p15, folder55, 'official-main', { selector: 'body', maxChars: 4500, linksLimit: 10 });
  const struct15 = await p15.evaluate(() => {
    return [...document.querySelectorAll('h1, h2, h3, h4, strong, dt, button, a, p, li, div.title')].map((el, idx) => ({
      idx,
      tag: el.tagName,
      text: el.innerText?.trim()?.slice(0, 100),
      href: el.href || undefined,
      h: Math.round(el.getBoundingClientRect().height)
    })).filter(x => x.text && x.h > 10 && x.h < 400);
  });
  out.row55 = { tagged15, cap15, obsText: obs15.text, obsLinks: obs15.links, structSample: struct15.slice(0, 50) };
} catch (e) {
  out.row55 = { error: e.message, stack: e.stack };
}

// 3. Space 14 (타오바오 탈퇴 방법) - explore official search
try {
  const folder54 = '26_1111/앱사용_타오바오 탈퇴 방법/웹조사';
  const task14 = await taskSpace(14);
  const p14 = task14.page('p1');
  await ensureVisible(task14, p14);
  await p14.goto('https://www.google.com/search?q=' + encodeURIComponent('타오바오 탈퇴 방법 site:taobao.com'), { timeout: 25000 });
  await p14.waitForTimeout(1500);
  const q1 = await p14.evaluate(() => [...document.querySelectorAll('a')].filter(a => a.querySelector('h3')).map(a => ({ title: a.innerText.slice(0, 150), url: a.href })));

  await p14.goto('https://www.google.com/search?q=' + encodeURIComponent('淘宝 注销账户 site:taobao.com'), { timeout: 25000 });
  await p14.waitForTimeout(1500);
  const q2 = await p14.evaluate(() => [...document.querySelectorAll('a')].filter(a => a.querySelector('h3')).map(a => ({ title: a.innerText.slice(0, 150), url: a.href })));

  out.row54 = { q1, q2 };
} catch (e) {
  out.row54 = { error: e.message, stack: e.stack };
}

console.log(JSON.stringify(out, null, 2));
