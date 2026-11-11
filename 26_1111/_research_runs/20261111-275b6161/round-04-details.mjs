import { pool } from '../../../tools/research_browser.mjs';
import { observePage } from '../../../tools/research_observe.mjs';

const tasks = [
  // Row 44: 카카오톡 광고 차단 방법 (spaceId 5)
  async () => {
    const folder = '26_1111/앱사용_카카오톡 광고 차단 방법/웹조사';
    const task = await taskSpace(5);
    const p = task.page('p1');

    await p.goto('https://kakaobusiness.gitbook.io/main/ad/ads-safety/user-guard/adspolicy/inappropriate', { timeout: 25000 });
    await p.evaluate(() => new Promise(r => setTimeout(r, 1000)));

    // Click '카카오톡 채널 메시지' tab
    await p.evaluate(() => {
      const btn = [...document.querySelectorAll('button, [role="tab"], div, span')].find(el => el.innerText?.trim() === '카카오톡 채널 메시지');
      if (btn) btn.click();
    });
    await p.evaluate(() => new Promise(r => setTimeout(r, 500)));
    const obsChannelTab = await observePage(p, folder, 'official-kakaobusiness-channel-tab', { selector: 'body', maxChars: 3500, linksLimit: 5 });

    // Click '디스플레이 광고' tab
    await p.evaluate(() => {
      const btn = [...document.querySelectorAll('button, [role="tab"], div, span')].find(el => el.innerText?.trim() === '디스플레이 광고');
      if (btn) btn.click();
    });
    await p.evaluate(() => new Promise(r => setTimeout(r, 500)));
    const obsDisplayTab = await observePage(p, folder, 'official-kakaobusiness-display-tab', { selector: 'body', maxChars: 3500, linksLimit: 5 });

    // Also search on cs.kakao.com directly
    await p.goto('https://cs.kakao.com/helps?service=8&Query=' + encodeURIComponent('채널 차단'), { timeout: 25000 });
    await p.evaluate(() => new Promise(r => setTimeout(r, 1000)));
    const obsCsSearch = await observePage(p, folder, 'official-cs-kakao-search', { selector: 'body', maxChars: 3000, linksLimit: 10 });

    return { row: 44, channelTabChars: obsChannelTab.totalChars, displayTabChars: obsDisplayTab.totalChars, csLinks: obsCsSearch.links };
  },

  // Row 45: 카카오톡 대화내용 복구 (spaceId 6)
  async () => {
    const folder = '26_1111/앱사용_카카오톡 대화내용 복구/웹조사';
    const task = await taskSpace(6);
    const p = task.page('p1');

    // Check images on samsungsvc.co.kr/solution/37959
    const imgs = await p.evaluate(() =>
      [...document.querySelectorAll('img')].map(i => ({ src: i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight }))
        .filter(i => i.w > 200 && i.h > 200)
    );

    return { row: 45, samsungImgs: imgs };
  },

  // Row 46: 코레일 내일로 패스 (spaceId 7)
  async () => {
    const folder = '26_1111/앱사용_코레일 내일로 패스/웹조사';
    const task = await taskSpace(7);
    const p = task.page('p1');

    await p.goto('https://www.korail.com/tour/freeTravel/railro/passIntro', { timeout: 25000 });
    await p.evaluate(() => new Promise(r => setTimeout(r, 1000)));

    // Click '좌석지정안내' tab or find its href/onclick
    const tabInfo = await p.evaluate(() => {
      const els = [...document.querySelectorAll('a, button, li')].filter(el => el.innerText?.includes('좌석지정안내') || el.innerText?.includes('내일로 2.0구매'));
      return els.map(e => ({ tag: e.tagName, text: e.innerText.trim(), href: e.href || '', onclick: e.getAttribute('onclick') || '' }));
    });

    await p.evaluate(() => {
      const el = [...document.querySelectorAll('a, button, li')].find(e => e.innerText?.trim() === '좌석지정안내');
      if (el) el.click();
    });
    await p.evaluate(() => new Promise(r => setTimeout(r, 1000)));
    const obsSeat = await observePage(p, folder, 'official-korail-seatguide', { selector: 'body', maxChars: 4500, linksLimit: 8 });

    // Check images on passIntro / seatguide
    const imgs = await p.evaluate(() =>
      [...document.querySelectorAll('img')].map(i => ({ src: i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight }))
        .filter(i => i.w >= 200 && i.h >= 200)
    );

    return { row: 46, tabInfo, seatUrl: obsSeat.url, seatText: obsSeat.text.slice(0, 2000), korailImgs: imgs };
  }
];

const results = await pool(tasks, 3, fn => fn());
console.log(JSON.stringify(results, null, 2));

