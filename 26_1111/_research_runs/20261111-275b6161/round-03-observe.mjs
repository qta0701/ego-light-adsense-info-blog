import { pool } from '../../../tools/research_browser.mjs';
import { observePage } from '../../../tools/research_observe.mjs';

const tasks = [
  // Row 44: 카카오톡 광고 차단 방법 (spaceId 5)
  async () => {
    const folder = '26_1111/앱사용_카카오톡 광고 차단 방법/웹조사';
    const task = await taskSpace(5);
    const p = task.page('p1');

    // 1. Search cs.kakao.com for 카카오톡 채널 차단
    await p.goto('https://www.google.com/search?q=' + encodeURIComponent('site:cs.kakao.com 카카오톡 채널 차단 광고'), { timeout: 25000 });
    const csLinks = await p.evaluate(() =>
      [...document.querySelectorAll('a')].filter(a => a.querySelector('h3'))
        .slice(0, 8).map(a => ({ title: a.innerText.slice(0, 200), url: a.href }))
    );

    // 2. Visit Kakao Business official ad block/report guide
    await p.goto('https://kakaobusiness.gitbook.io/main/ad/ads-safety/user-guard/adspolicy/inappropriate', { timeout: 25000 });
    await p.evaluate(() => new Promise(r => setTimeout(r, 1000)));
    const obsBiz = await observePage(p, folder, 'official-kakaobusiness-adblock', { selector: 'body', maxChars: 4500, linksLimit: 8 });

    // 3. Visit Kakao tailored ad opt-out official page
    await p.goto('https://info.ad.daum.net/optoutko.do', { timeout: 25000 });
    await p.evaluate(() => new Promise(r => setTimeout(r, 800)));
    const obsOptout = await observePage(p, folder, 'official-kakao-optout', { selector: 'body', maxChars: 4500, linksLimit: 8 });

    // 4. If cs.kakao.com link exists, visit first one
    let obsCs = null;
    if (csLinks.length > 0) {
      await p.goto(csLinks[0].url, { timeout: 25000 });
      await p.evaluate(() => new Promise(r => setTimeout(r, 800)));
      obsCs = await observePage(p, folder, 'official-kakao-cs-channel', { selector: 'body', maxChars: 4500, linksLimit: 8 });
    }

    return { row: 44, csLinks, obsBiz, obsOptout, obsCs };
  },

  // Row 45: 카카오톡 대화내용 복구 (spaceId 6)
  async () => {
    const folder = '26_1111/앱사용_카카오톡 대화내용 복구/웹조사';
    const task = await taskSpace(6);
    const p = task.page('p1');

    // 1. Visit cs.kakao.com/helps_html/1073209313
    await p.goto('https://cs.kakao.com/helps_html/1073209313', { timeout: 25000 });
    await p.evaluate(() => new Promise(r => setTimeout(r, 1000)));
    const obsKakao = await observePage(p, folder, 'official-kakao-backup', { selector: 'body', maxChars: 5000, linksLimit: 10 });
    const imgsKakao = await p.evaluate(() =>
      [...document.querySelectorAll('img')].map(img => ({ src: img.src, alt: img.alt, w: img.naturalWidth, h: img.naturalHeight }))
    );

    // 2. Visit Samsung Service official guide
    await p.goto('https://www.samsungsvc.co.kr/solution/37959', { timeout: 25000 });
    await p.evaluate(() => new Promise(r => setTimeout(r, 1000)));
    const obsSamsung = await observePage(p, folder, 'official-samsung-backup', { selector: 'body', maxChars: 5000, linksLimit: 10 });

    return { row: 45, obsKakao, imgsKakao, obsSamsung };
  },

  // Row 46: 코레일 내일로 패스 (spaceId 7)
  async () => {
    const folder = '26_1111/앱사용_코레일 내일로 패스/웹조사';
    const task = await taskSpace(7);
    const p = task.page('p1');

    // 1. Visit Korail Railro passIntro
    await p.goto('https://www.korail.com/tour/freeTravel/railro/passIntro', { timeout: 25000 });
    await p.evaluate(() => new Promise(r => setTimeout(r, 1000)));
    const obsKorail = await observePage(p, folder, 'official-korail-passintro', { selector: 'body', maxChars: 5000, linksLimit: 10 });
    const subLinks = await p.evaluate(() =>
      [...document.querySelectorAll('a')].filter(a => a.href.includes('railro') || a.innerText.includes('내일로') || a.innerText.includes('패스'))
        .map(a => ({ text: a.innerText.trim().slice(0, 100), href: a.href }))
        .slice(0, 20)
    );

    // 2. Visit Korail monthTour or tour main
    await p.goto('https://www.korail.com/tour/touristIntor/tourEvent/monthTour', { timeout: 25000 });
    await p.evaluate(() => new Promise(r => setTimeout(r, 1000)));
    const obsTour = await observePage(p, folder, 'official-korail-monthtour', { selector: 'body', maxChars: 3500, linksLimit: 8 });

    return { row: 46, obsKorail, subLinks, obsTour };
  }
];

const results = await pool(tasks, 3, fn => fn());
console.log(JSON.stringify(results, null, 2));

