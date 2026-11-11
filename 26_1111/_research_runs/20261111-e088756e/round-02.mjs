import { pool } from '../../../tools/research_browser.mjs';
import { observePage } from '../../../tools/research_observe.mjs';

const jobs = [
  // Row 50: 번개장터 반값택배 (spaceId 16)
  async () => {
    const folder = '26_1111/앱사용_번개장터 반값택배/웹조사';
    const task = await taskSpace(16);
    const p = task.page('p1');
    const out = { row: 50 };

    // 1. Official FAQ 568: [택배서비스] GS25 반값택배가 뭔가요?
    await p.goto('https://help.bunjang.co.kr/faq/42/568', { timeout: 25000 });
    await p.waitForTimeout(1500);
    out.faq568 = await observePage(p, folder, 'official-faq-568', {
      selector: 'body',
      maxChars: 5000,
      linksLimit: 10,
    });
    out.faq568Imgs = await p.evaluate(() =>
      [...document.querySelectorAll('img')]
        .map((i) => ({ src: i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight }))
        .filter((i) => i.w > 80 && i.h > 80),
    );

    // 2. Official FAQ category 42 (택배서비스) list
    await p.goto('https://help.bunjang.co.kr/faq/42', { timeout: 25000 });
    await p.waitForTimeout(1500);
    out.faq42List = await observePage(p, folder, 'official-faq-42-list', {
      selector: 'body',
      maxChars: 5000,
      linksLimit: 10,
    });
    const faqLinks = await p.evaluate(() =>
      [...document.querySelectorAll('a[href*="/faq/"]')]
        .map((a) => ({ text: a.innerText.trim().slice(0, 120), href: a.href }))
        .filter((x) => x.text.length > 1),
    );
    out.faqLinks = faqLinks;

    // 3. Search Google for additional official Bunjang delivery pages (e.g. CU 알뜰택배 / 반값택배 / 편의점택배)
    await p.goto(
      'https://www.google.com/search?q=' + encodeURIComponent('site:help.bunjang.co.kr OR site:bgzt.co.kr 반값택배 OR 편의점택배'),
      { timeout: 25000 },
    );
    await p.waitForTimeout(1000);
    out.moreOfficialCandidates = await p.evaluate(() =>
      [...document.querySelectorAll('a')]
        .filter((a) => a.querySelector('h3'))
        .slice(0, 10)
        .map((a) => ({ title: a.innerText.slice(0, 200), url: a.href })),
    );

    // Return to FAQ 568
    await p.goto('https://help.bunjang.co.kr/faq/42/568', { timeout: 25000 });
    await p.waitForTimeout(1000);

    return out;
  },

  // Row 51: 번개장터 카드 결제 (spaceId 17)
  async () => {
    const folder = '26_1111/앱사용_번개장터 카드 결제/웹조사';
    const task = await taskSpace(17);
    const p = task.page('p1');
    const out = { row: 51 };

    // 1. Official Bunjang Guide Article 490: 카드/간편결제 편 - 활용 백서
    await p.goto('https://bgzt.co.kr/article/490', { timeout: 25000 });
    await p.waitForTimeout(1500);
    out.article490 = await observePage(p, folder, 'official-bgzt-article-490', {
      selector: 'body',
      maxChars: 5000,
      linksLimit: 10,
    });
    out.article490Imgs = await p.evaluate(() =>
      [...document.querySelectorAll('img')]
        .map((i) => ({ src: i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight }))
        .filter((i) => i.w > 100 && i.h > 100),
    );

    // 2. Official FAQ 572: WEB 에서 신용/체크카드 결제는 어떻게하나요?
    await p.goto('https://help.bunjang.co.kr/faq/3/572', { timeout: 25000 });
    await p.waitForTimeout(1500);
    out.faq572 = await observePage(p, folder, 'official-faq-572', {
      selector: 'body',
      maxChars: 5000,
      linksLimit: 10,
    });
    out.faq572Imgs = await p.evaluate(() =>
      [...document.querySelectorAll('img')]
        .map((i) => ({ src: i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight }))
        .filter((i) => i.w > 100 && i.h > 100),
    );

    // 3. Official FAQ 295: 법인카드로 결제 가능한가요?
    await p.goto('https://help.bunjang.co.kr/faq/3/295', { timeout: 25000 });
    await p.waitForTimeout(1500);
    out.faq295 = await observePage(p, folder, 'official-faq-295', {
      selector: 'body',
      maxChars: 5000,
      linksLimit: 10,
    });

    // 4. Official FAQ 3 (안전결제 목록)
    await p.goto('https://help.bunjang.co.kr/faq/3', { timeout: 25000 });
    await p.waitForTimeout(1500);
    out.faq3List = await observePage(p, folder, 'official-faq-3-list', {
      selector: 'body',
      maxChars: 5000,
      linksLimit: 10,
    });
    out.faq3Links = await p.evaluate(() =>
      [...document.querySelectorAll('a[href*="/faq/"]')]
        .map((a) => ({ text: a.innerText.trim().slice(0, 120), href: a.href }))
        .filter((x) => x.text.length > 1),
    );

    return out;
  },

  // Row 52: 넷플릭스 해지방법 (spaceId 18)
  async () => {
    const folder = '26_1111/앱사용_넷플릭스 해지방법/웹조사';
    const task = await taskSpace(18);
    const p = task.page('p1');
    const out = { row: 52 };

    // 1. Official Netflix Help Center node/407: 넷플릭스 해지 방법
    await p.goto('https://help.netflix.com/ko/node/407', { timeout: 25000 });
    await p.waitForTimeout(1500);
    out.node407 = await observePage(p, folder, 'official-netflix-407', {
      selector: 'body',
      maxChars: 5000,
      linksLimit: 10,
    });
    out.node407FullText = await p.evaluate(() => document.body.innerText);
    out.node407Links = await p.evaluate(() =>
      [...document.querySelectorAll('a[href]')]
        .map((a) => ({ text: a.innerText.trim().slice(0, 120), href: a.href }))
        .filter((x) => x.text.length > 1),
    );
    out.node407Imgs = await p.evaluate(() =>
      [...document.querySelectorAll('img')]
        .map((i) => ({ src: i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight }))
        .filter((i) => i.w > 50 && i.h > 50),
    );

    // 2. Official Netflix Cancel Plan entry page (before login)
    await p.goto('https://www.netflix.com/cancelplan', { timeout: 25000 });
    await p.waitForTimeout(1500);
    out.cancelPlanEntry = await observePage(p, folder, 'official-netflix-cancelplan-entry', {
      selector: 'body',
      maxChars: 4000,
      linksLimit: 10,
    });

    // 3. Official Netflix Help Center node/100625: 정보 삭제, 제거 및 보관
    await p.goto('https://help.netflix.com/ko/node/100625', { timeout: 25000 });
    await p.waitForTimeout(1500);
    out.node100625 = await observePage(p, folder, 'official-netflix-100625', {
      selector: 'body',
      maxChars: 4000,
      linksLimit: 10,
    });

    // Return to node/407
    await p.goto('https://help.netflix.com/ko/node/407', { timeout: 25000 });
    await p.waitForTimeout(1000);

    return out;
  },
];

const results = await pool(jobs, 3, (fn) => fn());
console.log(JSON.stringify(results, null, 2));
