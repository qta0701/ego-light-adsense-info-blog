import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { capture, inside, pool } from '../../../tools/research_browser.mjs';
import { observePage } from '../../../tools/research_observe.mjs';

const ROOT = fileURLToPath(new URL('../../../', import.meta.url));

async function writeJson(relPath, data) {
  const full = inside(ROOT, relPath);
  await fs.mkdir(path.dirname(full), { recursive: true });
  await fs.writeFile(full + '.tmp', JSON.stringify(data, null, 2), 'utf8');
  await fs.rename(full + '.tmp', full);
}

// Helper to tag a target element uniquely, scroll it into center, and verify it fits in viewport
async function markTargetForCapture(page, finderCode, arg, targetId = 'target-1') {
  return await page.evaluate(
    ({ finderCode, arg, targetId }) => {
      document.querySelectorAll('[data-ego-target]').forEach((el) => el.removeAttribute('data-ego-target'));
      const fn = new Function('arg', finderCode);
      let el = fn(arg);
      if (!el) return { ok: false, reason: 'Element not found' };
      el.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' });
      const v = window.visualViewport;
      const vw = v ? v.width : window.innerWidth;
      const vh = v ? v.height : window.innerHeight;
      let r = el.getBoundingClientRect();
      // If element height exceeds 70% of viewport, pick first heading or child inside it
      if (r.height > vh * 0.7) {
        const sub = el.querySelector('h1, h2, h3, h4, p, dt, strong, span') || el;
        el = sub;
        el.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' });
        r = el.getBoundingClientRect();
      }
      el.setAttribute('data-ego-target', targetId);
      return {
        ok: true,
        tag: el.tagName,
        text: (el.innerText || '').trim().slice(0, 120),
        rect: [r.x, r.y, r.width, r.height],
        vw,
        vh,
      };
    },
    { finderCode, arg, targetId }
  );
}

const jobs = [
  {
    row: 47,
    keyword: '코레일 승차권 변경',
    folder: '26_1111/앱사용_코레일 승차권 변경/웹조사',
    spaceId: 8,
  },
  {
    row: 48,
    keyword: '당근마켓 바로구매 택배',
    folder: '26_1111/앱사용_당근마켓 바로구매 택배/웹조사',
    spaceId: 9,
  },
  {
    row: 49,
    keyword: '당근마켓 안심결제',
    folder: '26_1111/앱사용_당근마켓 안심결제/웹조사',
    spaceId: 10,
  },
];

const results = await pool(jobs, 3, async (job) => {
  const task = await taskSpace(job.spaceId);
  const page = task.page('p1');
  const out = { row: job.row, keyword: job.keyword, spaceId: job.spaceId };

  // If row 49 had blocked status due to load timeout on Google search, recover search-1 evidence
  if (job.row === 49) {
    const url = await page.url();
    if (!url.includes('google.com/search')) {
      await page.goto('https://www.google.com/search?q=' + encodeURIComponent(job.keyword), { timeout: 30000 });
    }
    const snapshot = await page.snapshot();
    const excerpt = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      text: document.body.innerText.slice(0, 5000),
      candidates: [...document.querySelectorAll('a')]
        .filter((a) => a.querySelector('h3'))
        .slice(0, 10)
        .map((a) => ({ title: a.innerText.slice(0, 220), url: a.href })),
    }));
    await fs.writeFile(inside(ROOT, job.folder + '/evidence/search-1.snapshot.txt'), snapshot, 'utf8');
    await writeJson(job.folder + '/evidence/search-1.json', { query: job.keyword, ...excerpt });
    await writeJson(job.folder + '/evidence/browser.json', {
      spaceId: job.spaceId,
      page: 'p1',
      status: 'search_ready',
    });
    out.recoveredCandidates = excerpt.candidates;
  }

  // Ensure viewport is mobile 390x844 before finding search target
  await page.cdp('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await page.waitForTimeout(300);

  // Pick official search result h3 on Google search page
  let targetUrlPart = '';
  if (job.row === 47) targetUrlPart = 'info.korail.com/info/selectBbsNttView.do';
  if (job.row === 48) targetUrlPart = 'cs.kr.karrotmarket.com/wv/faqs/23084';
  if (job.row === 49) targetUrlPart = 'karrotmarket.com'; // or daangn.com

  const marked = await markTargetForCapture(
    page,
    `
      const anchors = [...document.querySelectorAll('a')].filter(a => a.querySelector('h3'));
      let found = anchors.find(a => a.href.includes(arg.targetUrlPart));
      if (!found && arg.row === 49) {
        found = anchors.find(a => a.href.includes('daangn.com') || a.href.includes('karrotmarket.com'));
      }
      if (!found) found = anchors[0];
      return found ? (found.querySelector('h3') || found) : null;
    `,
    { targetUrlPart, row: job.row },
    'target-1'
  );
  const selectedHref = await page.evaluate(() => {
    const el = document.querySelector('[data-ego-target="target-1"]');
    const a = el ? el.closest('a') : null;
    return a ? a.href : null;
  });
  out.searchMark = marked;
  out.selectedOfficialUrl = selectedHref;

  // Capture 01-search.png
  const capSearch = await capture(page, job.folder, '01-search', ['[data-ego-target="target-1"]'], {
    width: 390,
    height: 844,
  });
  out.capSearch = capSearch;

  // Navigate to the selected official URL and observe
  if (selectedHref) {
    try {
      await page.goto(selectedHref, { timeout: 25000 });
    } catch (e) {
      out.gotoWarning = String(e.message).slice(0, 200);
    }
    await page.waitForTimeout(1000);
    const obs = await observePage(page, job.folder, 'official-1', {
      selector: 'body',
      maxChars: 1500,
      linksLimit: 5,
    });
    out.official1 = obs;
  }

  return out;
});

console.log(JSON.stringify(results, null, 2));
