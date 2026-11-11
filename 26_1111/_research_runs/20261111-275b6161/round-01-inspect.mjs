import fs from 'node:fs/promises';
import { capture, inside, pool } from '../../../tools/research_browser.mjs';
import { observePage } from '../../../tools/research_observe.mjs';

const ROOT = 'y:/antigravity-project/ego-light-adsense-info-blog';

async function writeJson(p, data) {
  await fs.mkdir(p.substring(0, p.lastIndexOf('/')), { recursive: true });
  await fs.writeFile(p, JSON.stringify(data, null, 2), 'utf8');
}

// Helper to mark a single element, scroll it into center, and verify it fits in viewport
async function markAndScroll(page, finderFn, arg, attrVal = 'target-1') {
  return await page.evaluate(({ fnStr, arg, attrVal }) => {
    for (const old of document.querySelectorAll(`[data-ego-target="${attrVal}"]`)) {
      old.removeAttribute('data-ego-target');
    }
    const fn = new Function('arg', `return (${fnStr})(arg);`);
    const el = fn(arg);
    if (!el) return { found: false };
    el.setAttribute('data-ego-target', attrVal);
    el.scrollIntoView({ block: 'center', behavior: 'instant' });
    const r = el.getBoundingClientRect();
    return {
      found: true,
      tag: el.tagName,
      text: (el.innerText || '').trim().slice(0, 120),
      rect: [r.x, r.y, r.width, r.height],
      vh: window.innerHeight,
      vw: window.innerWidth
    };
  }, { fnStr: finderFn.toString(), arg, attrVal });
}

const tasks = [
  // Job 1: Row 44 - 카카오톡 광고 차단 방법 (spaceId 5)
  async () => {
    const folder = '26_1111/앱사용_카카오톡 광고 차단 방법/웹조사';
    const task = await taskSpace(5);
    const p = task.page('p1');
    // Search with 고객센터 to get official cs.kakao.com links in Google search
    await p.goto('https://www.google.com/search?q=' + encodeURIComponent('카카오톡 광고 차단 방법 카카오 고객센터'), { timeout: 25000 });
    const excerpt = await p.evaluate(() => ({
      url: location.href,
      title: document.title,
      candidates: [...document.querySelectorAll('a')].filter(a => a.querySelector('h3'))
        .slice(0, 10).map(a => ({ title: a.innerText.slice(0, 220), url: a.href }))
    }));
    await writeJson(`${ROOT}/${folder}/evidence/search-official.json`, excerpt);
    return { row: 44, candidates: excerpt.candidates };
  },

  // Job 2: Row 45 - 카카오톡 대화내용 복구 (spaceId 6)
  async () => {
    const folder = '26_1111/앱사용_카카오톡 대화내용 복구/웹조사';
    const task = await taskSpace(6);
    const p = task.page('p1');
    await p.cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await p.evaluate(() => new Promise(r => setTimeout(r, 300)));

    // Mark the official cs.kakao.com h3 on Google search results
    const marked = await markAndScroll(p, () => {
      const links = [...document.querySelectorAll('a')].filter(a => a.querySelector('h3'));
      const target = links.find(a => a.href.includes('cs.kakao.com')) || links.find(a => a.href.includes('samsungsvc.co.kr'));
      return target ? (target.querySelector('h3') || target) : null;
    });

    let searchCap = null;
    if (marked.found) {
      await p.evaluate(() => new Promise(r => setTimeout(r, 300)));
      searchCap = await capture(p, folder, '01-search', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });
    }

    // Navigate to official Kakao CS page for 대화 백업·복원
    await p.goto('https://cs.kakao.com/helps_html/1073209313', { timeout: 25000 });
    await p.evaluate(() => new Promise(r => setTimeout(r, 800)));
    const obs = await observePage(p, folder, 'kakao-backup-help', { selector: 'body', maxChars: 3000, linksLimit: 10 });
    const headings = await p.evaluate(() => {
      return [...document.querySelectorAll('h1, h2, h3, h4, strong, dt, .title, .tit_help, button, a')]
        .map(el => ({ tag: el.tagName, cls: el.className, text: (el.innerText || '').trim().slice(0, 100) }))
        .filter(x => x.text.length > 1)
        .slice(0, 60);
    });
    return { row: 45, marked, searchCap, obsTitle: obs.title, obsUrl: obs.url, obsText: obs.text.slice(0, 1500), headings };
  },

  // Job 3: Row 46 - 코레일 내일로 패스 (spaceId 7)
  async () => {
    const folder = '26_1111/앱사용_코레일 내일로 패스/웹조사';
    const task = await taskSpace(7);
    const p = task.page('p1');
    const curUrl = await p.url();
    if (!curUrl.includes('google.com/search')) {
      await p.goto('https://www.google.com/search?q=' + encodeURIComponent('코레일 내일로 패스'), { timeout: 25000 });
    }
    const snapshot = await p.snapshot();
    const excerpt = await p.evaluate(() => ({
      url: location.href,
      title: document.title,
      text: document.body.innerText.slice(0, 5000),
      candidates: [...document.querySelectorAll('a')].filter(a => a.querySelector('h3'))
        .slice(0, 10).map(a => ({ title: a.innerText.slice(0, 220), url: a.href }))
    }));
    await fs.writeFile(`${ROOT}/${folder}/evidence/search-1.snapshot.txt`, snapshot, 'utf8');
    await writeJson(`${ROOT}/${folder}/evidence/search-1.json`, { query: '코레일 내일로 패스', ...excerpt });
    await writeJson(`${ROOT}/${folder}/evidence/browser.json`, { spaceId: 7, page: 'p1', status: 'search_ready' });
    return { row: 46, candidates: excerpt.candidates };
  }
];

const res = await pool(tasks, 3, fn => fn());
console.log(JSON.stringify(res, null, 2));

