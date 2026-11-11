import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { capture, inside, pool } from '../../../tools/research_browser.mjs';
import { observePage } from '../../../tools/research_observe.mjs';

const ROOT = fileURLToPath(new URL('../../../', import.meta.url));

async function writeJson(p, data) {
  await fs.mkdir(path.dirname(p), { recursive: true });
  await fs.writeFile(p + '.tmp', JSON.stringify(data, null, 2), 'utf8');
  await fs.rename(p + '.tmp', p);
}

let serialQueue = Promise.resolve();
function serialize(fn) {
  const res = serialQueue.then(fn);
  serialQueue = res.catch(() => {});
  return res;
}

async function prepAndCapture(page, folder, name, targetFinderFn, arg, viewport = { width: 390, height: 844 }) {
  return serialize(async () => {
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

// Inspect Row 52 safely
async function inspectAndRecoverRow52() {
  try {
    const folder = '26_1111/앱사용_넷플릭스 해지방법/웹조사';
    const task = await taskSpace(18);
    const p = task.page('p1');
    const info = await p.evaluate(() => ({
      url: location.href,
      title: document.title,
      readyState: document.readyState,
      text: document.body ? document.body.innerText.slice(0, 1500) : '',
      h3Count: document.querySelectorAll('h3').length,
      linksCount: document.querySelectorAll('a[href]').length,
    }));
    console.log('Row 52 current page info:', JSON.stringify(info));
    if (info.h3Count > 0) {
      const snapshot = await p.snapshot();
      const excerpt = await p.evaluate(() => ({
        url: location.href,
        title: document.title,
        text: document.body.innerText.slice(0, 5000),
        candidates: [...document.querySelectorAll('a')]
          .filter((a) => a.querySelector('h3'))
          .slice(0, 10)
          .map((a) => ({ title: a.innerText.slice(0, 220), url: a.href })),
      }));
      await fs.writeFile(inside(ROOT, folder + '/evidence/search-1.snapshot.txt'), snapshot, 'utf8');
      await writeJson(inside(ROOT, folder + '/evidence/search-1.json'), { query: '넷플릭스 해지방법', ...excerpt });
      await writeJson(inside(ROOT, folder + '/evidence/browser.json'), {
        spaceId: 18,
        page: 'p1',
        status: 'search_ready',
      });
      return { recovered: true, candidates: excerpt.candidates };
    }
    return { recovered: false, info };
  } catch (e) {
    return { recovered: false, error: e.message };
  }
}

const r52 = await inspectAndRecoverRow52();
console.log('Row 52 status:', JSON.stringify(r52));

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
];

if (r52.recovered) {
  jobs.push({
    row: 52,
    spaceId: 18,
    folder: '26_1111/앱사용_넷플릭스 해지방법/웹조사',
    searchMatch: 'help.netflix.com',
  });
}

const results = await pool(jobs, 3, async (job) => {
  try {
    const task = await taskSpace(job.spaceId);
    const page = task.page('p1');

    // Check if 01-search already exists
    let searchShot;
    try {
      const existing = JSON.parse(await fs.readFile(inside(ROOT, job.folder + '/evidence/01-search.json'), 'utf8'));
      searchShot = { file: 'raw/01-search.png', boxes: existing.boxes, url: existing.url, existed: true };
    } catch {
      searchShot = await prepAndCapture(page, job.folder, '01-search', prepareSearchTarget, job.searchMatch, {
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
