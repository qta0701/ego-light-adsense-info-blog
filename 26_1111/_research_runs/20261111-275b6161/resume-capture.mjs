import fs from 'node:fs/promises';
import { capture, pool } from '../../../tools/research_browser.mjs';

const ROOT = 'y:/antigravity-project/ego-light-adsense-info-blog';

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
    return { found: true, rect: [r.x, r.y, r.width, r.height] };
  }, { fnStr: finderFn.toString(), arg, attrVal });
}

// Quick preflight check to see if ego.exe window is unminimized and can capture
const preTask = await taskSpace(5);
const prePage = preTask.page('p1');
try {
  await prePage.cdp('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false }, { timeout: 4000 });
  console.log('Preflight captureScreenshot OK! Proceeding with full capture for rows 44, 45, 46...');
} catch (e) {
  console.error('PREFLIGHT_BLOCKED:', e.message);
  process.exit(2);
}

const jobs = [
  // Row 44: 카카오톡 광고 차단 방법 (spaceId 5)
  async () => {
    const folder = '26_1111/앱사용_카카오톡 광고 차단 방법/웹조사';
    const vp = { width: 390, height: 844 };
    const task = await taskSpace(5);
    const p = task.page('p1');
    await p.cdp('Emulation.setDeviceMetricsOverride', { ...vp, deviceScaleFactor: 1, mobile: true });

    // 01-search
    await p.goto('https://www.google.com/search?q=' + encodeURIComponent('카카오톡 광고 차단 방법 카카오 고객센터'), { timeout: 25000 });
    await p.evaluate(() => new Promise(r => setTimeout(r, 500)));
    await markAndScroll(p, () => {
      const a = [...document.querySelectorAll('a')].find(x => x.querySelector('h3') && x.href.includes('kakaobusiness.gitbook.io'));
      return a ? (a.querySelector('h3') || a) : document.querySelector('h3');
    });
    const c1 = await capture(p, folder, '01-search', ['[data-ego-target="target-1"]'], vp);

    // 02-step1: 카카오 비즈보드
    await p.goto('https://kakaobusiness.gitbook.io/main/ad/ads-safety/user-guard/adspolicy/inappropriate', { timeout: 25000 });
    await p.evaluate(() => new Promise(r => setTimeout(r, 800)));
    await markAndScroll(p, () => [...document.querySelectorAll('h2, h3, p, div')].find(e => e.innerText?.includes('1.2 특정 광고 노출 빈도수 조정 안내')) || document.querySelector('h1'));
    const c2 = await capture(p, folder, '02-step1', ['[data-ego-target="target-1"]'], vp);

    // 03-step2: 카카오톡 채널 메시지 탭
    await p.evaluate(() => {
      const btn = [...document.querySelectorAll('button, [role="tab"], div, span')].find(el => el.innerText?.trim() === '카카오톡 채널 메시지');
      if (btn) btn.click();
    });
    await p.evaluate(() => new Promise(r => setTimeout(r, 500)));
    await markAndScroll(p, () => [...document.querySelectorAll('[role="tab"], button, p, strong')].find(e => e.innerText?.includes('카카오톡 채널 메시지')) || document.querySelector('h1'));
    const c3 = await capture(p, folder, '03-step2', ['[data-ego-target="target-1"]'], vp);

    // 04-step3: 카카오 맞춤형 광고 안내 (5. 이용자 통제권 행사 방법)
    await p.goto('https://info.ad.daum.net/optoutko.do', { timeout: 25000 });
    await p.evaluate(() => new Promise(r => setTimeout(r, 800)));
    await markAndScroll(p, () => [...document.querySelectorAll('h2, h3, strong, dt, p')].find(e => e.innerText?.includes('5. 이용자 통제권 행사 방법')) || document.querySelector('h1'));
    const c4 = await capture(p, folder, '04-step3', ['[data-ego-target="target-1"]'], vp);

    // 05-step4: 기기 식별자 기반 맞춤형 광고 차단 (Android/iOS)
    await p.goto('https://kakaobusiness.gitbook.io/main/ad/ads-safety/user-guard/adspolicy/inappropriate', { timeout: 25000 });
    await p.evaluate(() => new Promise(r => setTimeout(r, 800)));
    await markAndScroll(p, () => [...document.querySelectorAll('h3, h4, strong, p')].find(e => e.innerText?.includes('기기 식별자 기반 맞춤형 광고 차단')) || document.querySelector('h1'));
    const c5 = await capture(p, folder, '05-step4', ['[data-ego-target="target-1"]'], vp);

    return { row: 44, captures: [c1, c2, c3, c4, c5] };
  },

  // Row 45: 카카오톡 대화내용 복구 (spaceId 6)
  async () => {
    const folder = '26_1111/앱사용_카카오톡 대화내용 복구/웹조사';
    const vp = { width: 390, height: 844 };
    const task = await taskSpace(6);
    const p = task.page('p1');
    await p.cdp('Emulation.setDeviceMetricsOverride', { ...vp, deviceScaleFactor: 1, mobile: true });

    // 01-search
    await p.goto('https://www.google.com/search?q=' + encodeURIComponent('카카오톡 대화내용 복구'), { timeout: 25000 });
    await p.evaluate(() => new Promise(r => setTimeout(r, 500)));
    await markAndScroll(p, () => {
      const a = [...document.querySelectorAll('a')].find(x => x.querySelector('h3') && x.href.includes('cs.kakao.com/helps_html/1073209313'));
      return a ? (a.querySelector('h3') || a) : document.querySelector('h3');
    });
    const c1 = await capture(p, folder, '01-search', ['[data-ego-target="target-1"]'], vp);

    // 02-step1: 무료 백업 방법
    await p.goto('https://cs.kakao.com/helps_html/1073209313', { timeout: 25000 });
    await p.evaluate(() => new Promise(r => setTimeout(r, 800)));
    await markAndScroll(p, () => [...document.querySelectorAll('p, strong, div, h2, h3')].find(e => e.innerText?.trim().startsWith('■ 무료 백업 방법')) || document.querySelector('h1'));
    const c2 = await capture(p, folder, '02-step1', ['[data-ego-target="target-1"]'], vp);

    // 03-step2: 무료 백업 후 복원 방법
    await markAndScroll(p, () => [...document.querySelectorAll('p, strong, div, h2, h3')].find(e => e.innerText?.trim().startsWith('■ 무료 백업 후 복원 방법')) || document.querySelector('h1'));
    const c3 = await capture(p, folder, '03-step2', ['[data-ego-target="target-1"]'], vp);

    // 04-step3: 톡클라우드 백업 후 복원 방법
    await markAndScroll(p, () => [...document.querySelectorAll('p, strong, div, h2, h3')].find(e => e.innerText?.trim().startsWith('■ 톡클라우드로 백업 후 복원 방법')) || document.querySelector('h1'));
    const c4 = await capture(p, folder, '04-step3', ['[data-ego-target="target-1"]'], vp);

    // 05-step4: 삼성전자서비스 개별 대화 내용 저장 방법 (txt파일)
    await p.goto('https://www.samsungsvc.co.kr/solution/37959', { timeout: 25000 });
    await p.evaluate(() => new Promise(r => setTimeout(r, 800)));
    await markAndScroll(p, () => [...document.querySelectorAll('h2, h3, strong, p')].find(e => e.innerText?.includes('개별 대화 내용 저장 방법')) || document.querySelector('h1'));
    const c5 = await capture(p, folder, '05-step4', ['[data-ego-target="target-1"]'], vp);

    return { row: 45, captures: [c1, c2, c3, c4, c5] };
  },

  // Row 46: 코레일 내일로 패스 (spaceId 7)
  async () => {
    const folder = '26_1111/앱사용_코레일 내일로 패스/웹조사';
    const vp = { width: 1280, height: 900 };
    const task = await taskSpace(7);
    const p = task.page('p1');
    await p.cdp('Emulation.setDeviceMetricsOverride', { ...vp, deviceScaleFactor: 1, mobile: false });

    // 01-search
    await p.goto('https://www.google.com/search?q=' + encodeURIComponent('코레일 내일로 패스'), { timeout: 25000 });
    await p.evaluate(() => new Promise(r => setTimeout(r, 500)));
    await markAndScroll(p, () => {
      const a = [...document.querySelectorAll('a')].find(x => x.querySelector('h3') && x.href.includes('korail.com/tour/freeTravel/railro/passIntro'));
      return a ? (a.querySelector('h3') || a) : document.querySelector('h3');
    });
    const c1 = await capture(p, folder, '01-search', ['[data-ego-target="target-1"]'], vp);

    // 02-step1: 패스가격 (ADULT / YOUTH)
    await p.goto('https://www.korail.com/tour/freeTravel/railro/passIntro', { timeout: 25000 });
    await p.evaluate(() => new Promise(r => setTimeout(r, 800)));
    await markAndScroll(p, () => [...document.querySelectorAll('th, td, dt, h3, h4, strong, p')].find(e => e.innerText?.trim() === '패스가격') || document.querySelector('h3'));
    const c2 = await capture(p, folder, '02-step1', ['[data-ego-target="target-1"]'], vp);

    // 03-step2: 이용방법 및 구매기간
    await markAndScroll(p, () => [...document.querySelectorAll('th, td, dt, h3, h4, strong, p')].find(e => e.innerText?.trim() === '이용방법') || document.querySelector('h3'));
    const c3 = await capture(p, folder, '03-step2', ['[data-ego-target="target-1"]'], vp);

    // 04-step3: 주의사항 (30배 부가운임 및 반환 수수료)
    await markAndScroll(p, () => [...document.querySelectorAll('th, td, dt, h3, h4, strong, p')].find(e => e.innerText?.trim() === '주의사항') || document.querySelector('h3'));
    const c4 = await capture(p, folder, '04-step3', ['[data-ego-target="target-1"]'], vp);

    // 05-step4: 좌석지정안내 탭 (STEP 1 & STEP 2)
    await p.evaluate(() => {
      const el = [...document.querySelectorAll('a, button, li')].find(e => e.innerText?.trim() === '좌석지정안내');
      if (el) el.click();
    });
    await p.evaluate(() => new Promise(r => setTimeout(r, 800)));
    await markAndScroll(p, () => [...document.querySelectorAll('h3, h4, strong, p, div')].find(e => e.innerText?.includes('구매 및 좌석지정 방법')) || document.querySelector('h3'));
    const c5 = await capture(p, folder, '05-step4', ['[data-ego-target="target-1"]'], vp);

    return { row: 46, captures: [c1, c2, c3, c4, c5] };
  }
];

const res = await pool(jobs, 3, fn => fn());
console.log(JSON.stringify(res, null, 2));

