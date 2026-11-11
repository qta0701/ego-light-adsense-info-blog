import fs from 'node:fs/promises';
import { inside, capture } from '../../../tools/research_browser.mjs';
import { observePage } from '../../../tools/research_observe.mjs';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../../../', import.meta.url));

async function writeJson(p, data) {
  await fs.mkdir(new URL('.', 'file:///' + p.replace(/\\/g, '/')), { recursive: true }).catch(() => {});
  await fs.writeFile(p, JSON.stringify(data, null, 2), 'utf8');
}

// 1. Row 53: 넷플릭스 로그아웃 티비 (spaceId 13)
async function handle53() {
  const folder = '26_1111/앱사용_넷플릭스 로그아웃 티비/웹조사';
  const task = await taskSpace(13);
  const p = task.page('p1');
  await p.cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await p.waitForTimeout(500);

  const tagged = await p.evaluate(() => {
    document.querySelectorAll('[data-ego-target]').forEach(el => el.removeAttribute('data-ego-target'));
    const anchors = [...document.querySelectorAll('a')].filter(a => a.href.includes('help.netflix.com/ko/node/128180') && a.querySelector('h3'));
    const target = anchors[0]?.querySelector('h3') || anchors[0];
    if (!target) return false;
    target.setAttribute('data-ego-target', 'target-1');
    target.scrollIntoView({ block: 'center', behavior: 'instant' });
    return true;
  });
  await p.waitForTimeout(500);
  let searchCap = null;
  if (tagged) {
    searchCap = await capture(p, folder, '01-search', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });
  }

  await p.goto('https://help.netflix.com/ko/node/128180', { timeout: 25000 });
  await p.waitForTimeout(1500);
  const obs = await observePage(p, folder, 'official-main', { selector: 'body', maxChars: 4000, linksLimit: 10 });
  const structure = await p.evaluate(() => {
    return [...document.querySelectorAll('h1, h2, h3, h4, summary, button, .accordion-header, [role="button"], [role="tab"]')].map((el, idx) => ({
      idx,
      tag: el.tagName,
      text: el.innerText?.trim()?.slice(0, 120),
      rect: el.getBoundingClientRect().toJSON()
    })).filter(x => x.text);
  });
  return { row: 53, searchCap, obsText: obs.text, obsLinks: obs.links, structure: structure.slice(0, 40) };
}

// 2. Row 55: 네이버회원탈퇴하는방법 (spaceId 15)
async function handle55() {
  const folder = '26_1111/앱사용_네이버회원탈퇴하는방법/웹조사';
  const task = await taskSpace(15);
  const p = task.page('p1');
  const url = await p.url();
  if (!url.includes('google.com/search')) {
    await p.goto('https://www.google.com/search?q=' + encodeURIComponent('네이버회원탈퇴하는방법'), { timeout: 25000 });
  }
  await p.waitForTimeout(1500);
  const snapshot = await p.snapshot();
  const excerpt = await p.evaluate(() => ({
    url: location.href,
    title: document.title,
    text: document.body.innerText.slice(0, 5000),
    candidates: [...document.querySelectorAll('a')].filter(a => a.querySelector('h3'))
      .slice(0, 10).map(a => ({ title: a.innerText.slice(0, 220), url: a.href }))
  }));
  await fs.writeFile(inside(ROOT, folder + '/evidence/search-1.snapshot.txt'), snapshot, 'utf8');
  await writeJson(inside(ROOT, folder + '/evidence/search-1.json'), { query: '네이버회원탈퇴하는방법', ...excerpt });
  await writeJson(inside(ROOT, folder + '/evidence/browser.json'), { spaceId: 15, page: 'p1', status: 'search_ready' });

  // Check if there is an official naver help link in candidates
  await p.cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await p.waitForTimeout(500);
  const officialTag = await p.evaluate(() => {
    document.querySelectorAll('[data-ego-target]').forEach(el => el.removeAttribute('data-ego-target'));
    const anchors = [...document.querySelectorAll('a')].filter(a => a.querySelector('h3') && (a.href.includes('help.naver.com') || a.href.includes('nid.naver.com')));
    const target = anchors[0]?.querySelector('h3');
    if (!target) return null;
    target.setAttribute('data-ego-target', 'target-1');
    target.scrollIntoView({ block: 'center', behavior: 'instant' });
    return { href: anchors[0].href, title: target.innerText };
  });
  let searchCap = null;
  let obs = null;
  let structure = null;
  if (officialTag) {
    await p.waitForTimeout(500);
    searchCap = await capture(p, folder, '01-search', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });
    await p.goto(officialTag.href, { timeout: 25000 });
    await p.waitForTimeout(2000);
    obs = await observePage(p, folder, 'official-main', { selector: 'body', maxChars: 4000, linksLimit: 10 });
    structure = await p.evaluate(() => {
      return [...document.querySelectorAll('h1, h2, h3, h4, strong, dt, button, a')].map((el, idx) => ({
        idx,
        tag: el.tagName,
        text: el.innerText?.trim()?.slice(0, 120),
        href: el.href || undefined
      })).filter(x => x.text && x.text.length > 2);
    });
  }
  return { row: 55, candidates: excerpt.candidates, officialTag, searchCap, obsText: obs?.text, obsLinks: obs?.links, structure: structure?.slice(0, 40) };
}

// 3. Row 54: 타오바오 탈퇴 방법 (spaceId 14)
async function handle54() {
  const folder = '26_1111/앱사용_타오바오 탈퇴 방법/웹조사';
  const task = await taskSpace(14);
  const p = task.page('p1');
  // Let's check all links on current google search page (including AI overview links or further down)
  const allLinks = await p.evaluate(() => {
    return [...document.querySelectorAll('a[href]')].map(a => ({
      text: a.innerText?.trim()?.slice(0, 100),
      href: a.href,
      hasH3: !!a.querySelector('h3')
    })).filter(a => a.href && !a.href.includes('google.com') && a.text);
  });
  return { row: 54, allLinks: allLinks.slice(0, 30) };
}

const results = await Promise.allSettled([handle53(), handle54(), handle55()]);
console.log(JSON.stringify(results, null, 2));
