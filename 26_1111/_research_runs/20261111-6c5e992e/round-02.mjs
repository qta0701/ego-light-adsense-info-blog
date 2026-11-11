import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { capture, inside, pool } from '../../../tools/research_browser.mjs';
import { observePage } from '../../../tools/research_observe.mjs';

const ROOT = fileURLToPath(new URL('../../../', import.meta.url));

let lockChain = Promise.resolve();
function withSerialCapture(fn) {
  const res = lockChain.then(fn);
  lockChain = res.catch(() => {});
  return res;
}

async function ensureActiveWindowAndTab(task, page) {
  try {
    const win = await task.cdp('Browser.getWindowForTarget', {});
    if (win && win.windowId && win.bounds && win.bounds.windowState === 'minimized') {
      await task.cdp('Browser.setWindowBounds', {
        windowId: win.windowId,
        bounds: { windowState: 'normal' },
      });
    }
  } catch {}
  try {
    await page.cdp('Page.bringToFront', {});
  } catch {}
  await page.waitForTimeout(200);
}

async function safeCapture(task, page, folder, name, finderCode, arg, viewport = { width: 390, height: 844 }) {
  return await withSerialCapture(async () => {
    await ensureActiveWindowAndTab(task, page);
    await page.cdp('Emulation.setDeviceMetricsOverride', {
      ...viewport,
      deviceScaleFactor: 1,
      mobile: viewport.width < 600,
    });
    await page.waitForTimeout(250);

    const marked = await page.evaluate(
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
        if (r.height > vh * 0.7) {
          const sub = el.querySelector('h1, h2, h3, h4, p, dt, strong, span, a') || el;
          el = sub;
          el.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' });
          r = el.getBoundingClientRect();
        }
        el.setAttribute('data-ego-target', targetId);
        const a = el.closest('a') || el.querySelector('a');
        return {
          ok: true,
          tag: el.tagName,
          text: (el.innerText || '').trim().slice(0, 120),
          href: a ? a.href : null,
          rect: [r.x, r.y, r.width, r.height],
        };
      },
      { finderCode, arg, targetId: 'target-1' }
    );

    if (!marked.ok) {
      throw new Error(`Mark failed for ${folder}/${name}: ${marked.reason}`);
    }

    const cap = await capture(page, folder, name, ['[data-ego-target="target-1"]'], viewport);
    return { marked, cap };
  });
}

const jobs = [
  {
    row: 47,
    keyword: '코레일 승차권 변경',
    folder: '26_1111/앱사용_코레일 승차권 변경/웹조사',
    spaceId: 8,
    searchTargetUrlPart: 'info.korail.com/info/selectBbsNttView.do',
    officialUrls: [
      'https://info.korail.com/info/selectBbsNttView.do?key=911&bbsNo=199&nttNo=26163&searchCtgry=&searchCnd=all&searchKrwd=&integrDeptCode=&pageIndex=1',
      'https://info.korail.com/info/selectBbsNttList.do?bbsNo=205&key=817&pageIndex=12',
    ],
  },
  {
    row: 48,
    keyword: '당근마켓 바로구매 택배',
    folder: '26_1111/앱사용_당근마켓 바로구매 택배/웹조사',
    spaceId: 9,
    searchTargetUrlPart: 'cs.kr.karrotmarket.com/wv/faqs/23084',
    officialUrls: [
      'https://cs.kr.karrotmarket.com/wv/faqs/23084',
      'https://daangn.com/wv/faqs?kind=instant_buy',
      'https://about.daangn.com/company/pr/archive/%EB%8B%B9%EA%B7%BC-%EC%A4%91%EA%B3%A0%EA%B1%B0%EB%9E%98-%EB%B0%94%EB%A1%9C%EA%B5%AC%EB%A7%A4-%EA%B8%B0%EB%8A%A5-%EB%8F%84%EC%9E%85/',
    ],
  },
  {
    row: 49,
    keyword: '당근마켓 안심결제',
    folder: '26_1111/앱사용_당근마켓 안심결제/웹조사',
    spaceId: 10,
    searchTargetUrlPart: 'daangn.com/wv/faqs/14009',
    officialUrls: [
      'https://www.daangn.com/wv/faqs/14009',
      'https://link.daangnpay.com/escrow/about',
      'https://about.daangn.com/company/pr/archive/%EB%8B%B9%EA%B7%BC%ED%8E%98%EC%9D%B4-%EC%A4%91%EA%B3%A0%EA%B1%B0%EB%9E%98-%EC%95%88%EC%8B%AC%EA%B2%B0%EC%A0%9C-%EA%B8%B0%EB%8A%A5-%EB%8F%84%EC%9E%85/',
    ],
  },
];

const results = await pool(jobs, 3, async (job) => {
  const task = await taskSpace(job.spaceId);
  const page = task.page('p1');
  const out = { row: job.row, keyword: job.keyword, spaceId: job.spaceId, observed: [] };

  // Make sure we are on Google search page first for 01-search.png
  const curUrl = await page.url();
  if (!curUrl.includes('google.com/search')) {
    await page.goto('https://www.google.com/search?q=' + encodeURIComponent(job.keyword), { timeout: 25000 });
    await page.waitForTimeout(500);
  }

  const searchRes = await safeCapture(
    task,
    page,
    job.folder,
    '01-search',
    `
      const anchors = [...document.querySelectorAll('a')].filter(a => a.querySelector('h3'));
      let found = anchors.find(a => a.href.includes(arg.targetUrlPart));
      if (!found) {
        found = anchors.find(a => a.href.includes('korail.com') || a.href.includes('daangn.com') || a.href.includes('karrotmarket.com') || a.href.includes('daangnpay.com'));
      }
      if (!found) found = anchors[0];
      return found ? (found.querySelector('h3') || found) : null;
    `,
    { targetUrlPart: job.searchTargetUrlPart }
  );
  out.searchCapture = searchRes;

  // Now visit and observe each official URL so we can plan 02-step1 ~ 05-step4
  for (let i = 0; i < job.officialUrls.length; i++) {
    const u = job.officialUrls[i];
    try {
      await page.goto(u, { timeout: 25000 });
    } catch (e) {
      out.observed.push({ url: u, gotoWarn: String(e.message).slice(0, 150) });
    }
    await page.waitForTimeout(800);
    try {
      const obs = await observePage(page, job.folder, `official-${i + 1}`, {
        selector: 'body',
        maxChars: 1500,
        linksLimit: 5,
      });
      const headings = await page.evaluate(() =>
        [...document.querySelectorAll('h1, h2, h3, h4, dt, strong, button, a, p, li, th, td')]
          .map((el) => ({
            tag: el.tagName,
            text: (el.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 100),
            href: el.href || null,
          }))
          .filter((x) => x.text.length >= 4)
          .slice(0, 40)
      );
      out.observed.push({ url: await page.url(), obs, headings });
    } catch (e) {
      out.observed.push({ url: u, obsErr: String(e.message).slice(0, 200) });
    }
  }

  return out;
});

console.log(JSON.stringify(results, null, 2));
