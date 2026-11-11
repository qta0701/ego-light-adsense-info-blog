import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { capture, inside, pool } from '../../../tools/research_browser.mjs';
import { observePage } from '../../../tools/research_observe.mjs';

const ROOT = fileURLToPath(new URL('../../../', import.meta.url));

let serialQueue = Promise.resolve();
function serialize(fn) {
  const res = serialQueue.then(fn);
  serialQueue = res.catch(() => {});
  return res;
}

async function ensureWindowReady(task, page) {
  try {
    const win = await task.cdp('Browser.getWindowForTarget', { targetId: page.targetId });
    if (win?.bounds?.windowState === 'minimized') {
      await task.cdp('Browser.setWindowBounds', { windowId: win.windowId, bounds: { windowState: 'normal' } });
      await page.waitForTimeout(200);
    }
  } catch (e) {
    // fallback if targetId not accepted
    try {
      const win = await task.cdp('Browser.getWindowForTarget', {});
      if (win?.bounds?.windowState === 'minimized') {
        await task.cdp('Browser.setWindowBounds', { windowId: win.windowId, bounds: { windowState: 'normal' } });
        await page.waitForTimeout(200);
      }
    } catch {}
  }
  try {
    await page.cdp('Page.bringToFront');
    await page.waitForTimeout(200);
  } catch {}
}

async function prepAndCapture(task, page, folder, name, targetFinderFn, arg, viewport = { width: 390, height: 844 }) {
  return serialize(async () => {
    await ensureWindowReady(task, page);
    await page.cdp('Emulation.setDeviceMetricsOverride', {
      ...viewport,
      deviceScaleFactor: 1,
      mobile: viewport.width < 600,
    });
    await page.waitForTimeout(300);
    const prepInfo = await page.evaluate(targetFinderFn, arg);
    await page.waitForTimeout(300);
    const shot = await capture(page, folder, name, ['[data-ego-target="target-1"]'], viewport);
    return { ...shot, prepInfo };
  });
}

const prepareSearchTarget = (urlSubstr) => {
  document.querySelectorAll('[data-ego-target]').forEach((el) => el.removeAttribute('data-ego-target'));
  const anchors = [...document.querySelectorAll('a[href]')].filter((a) => a.querySelector('h3'));
  let match = anchors.find((a) => a.href.includes(urlSubstr));
  if (!match) {
    match = anchors.find(
      (a) =>
        a.href.includes('help.bunjang.co.kr') ||
        a.href.includes('bgzt.co.kr') ||
        a.href.includes('help.netflix.com'),
    );
  }
  if (!match) throw new Error('No matching official search result link for: ' + urlSubstr);
  const h3 = match.querySelector('h3') || match;
  h3.setAttribute('data-ego-target', 'target-1');
  h3.scrollIntoView({ block: 'center', behavior: 'instant' });
  const r = h3.getBoundingClientRect();
  return { matchedUrl: match.href, matchedTitle: h3.innerText.trim(), rect: [r.x, r.y, r.width, r.height] };
};

const jobs = [
  {
    row: 50,
    spaceId: 16,
    folder: '26_1111/앱사용_번개장터 반값택배/웹조사',
    searchMatch: 'help.bunjang.co.kr/faq/42/568',
  },
  {
    row: 51,
    spaceId: 17,
    folder: '26_1111/앱사용_번개장터 카드 결제/웹조사',
    searchMatch: 'bgzt.co.kr/article/490',
  },
  {
    row: 52,
    spaceId: 18,
    folder: '26_1111/앱사용_넷플릭스 해지방법/웹조사',
    searchMatch: 'help.netflix.com/ko/node/407',
  },
];

const results = await pool(jobs, 3, async (job) => {
  try {
    const task = await taskSpace(job.spaceId);
    const page = task.page('p1');

    let searchShot;
    try {
      const existing = JSON.parse(await fs.readFile(inside(ROOT, job.folder + '/evidence/01-search.json'), 'utf8'));
      searchShot = { file: 'raw/01-search.png', boxes: existing.boxes, url: existing.url, existed: true };
    } catch {
      searchShot = await prepAndCapture(task, page, job.folder, '01-search', prepareSearchTarget, job.searchMatch, {
        width: 390,
        height: 844,
      });
    }

    const targetUrl =
      searchShot.prepInfo?.matchedUrl ||
      (job.row === 50
        ? 'https://help.bunjang.co.kr/faq/42/568'
        : job.row === 51
          ? 'https://bgzt.co.kr/article/490'
          : 'https://help.netflix.com/ko/node/407');

    await page.goto(targetUrl, { timeout: 30000 });
    await page.waitForTimeout(1500);

    const obs = await observePage(page, job.folder, 'official-main', {
      selector: 'body',
      maxChars: 1500,
      linksLimit: 5,
    });

    const structure = await page.evaluate(() => {
      const headings = [
        ...document.querySelectorAll('h1, h2, h3, h4, strong, b, dt, .title, [class*="title"], [class*="Title"]'),
      ]
        .map((el) => ({
          tag: el.tagName,
          text: el.innerText.trim().slice(0, 120),
          rect: (() => {
            const r = el.getBoundingClientRect();
            return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)];
          })(),
        }))
        .filter((x) => x.text.length > 1 && x.rect[2] > 0 && x.rect[3] > 0)
        .slice(0, 30);
      const links = [...document.querySelectorAll('a[href]')]
        .map((a) => ({ text: a.innerText.trim().slice(0, 100), href: a.href }))
        .filter((x) => x.text.length > 1)
        .slice(0, 25);
      return { url: location.href, title: document.title, headings, links };
    });

    return {
      row: job.row,
      searchShot,
      obsSummary: { url: obs.url, title: obs.title, totalChars: obs.totalChars, textPreview: obs.text.slice(0, 600) },
      structure,
    };
  } catch (e) {
    return { row: job.row, error: e.message };
  }
});

console.log(JSON.stringify(results, null, 2));
