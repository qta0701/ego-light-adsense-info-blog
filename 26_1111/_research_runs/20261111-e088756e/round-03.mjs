import { pool } from '../../../tools/research_browser.mjs';
import { observePage } from '../../../tools/research_observe.mjs';

const jobs = [
  // Row 50: 번개장터 반값택배 (spaceId 16)
  async () => {
    const folder = '26_1111/앱사용_번개장터 반값택배/웹조사';
    const rawDir = 'Y:/antigravity-project/ego-light-adsense-info-blog/' + folder + '/raw';
    const task = await taskSpace(16);
    const p = task.page('p1');
    const out = { row: 50, savedImages: [] };

    // 1. Visit bgzt.co.kr/article/522 (번개장터 활용백서 : 편의점/방문 택배 편)
    await p.goto('https://bgzt.co.kr/article/522', { timeout: 25000 });
    await p.waitForTimeout(1500);
    out.article522 = await observePage(p, folder, 'official-bgzt-article-522', {
      selector: 'body',
      maxChars: 5500,
      linksLimit: 10,
    });
    const imgs522 = await p.evaluate(() =>
      [...document.querySelectorAll('img')]
        .map((i) => ({ src: i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight }))
        .filter((i) => i.w > 150 && i.h > 150 && i.src.includes('media.bunjang.co.kr')),
    );
    out.imgs522 = imgs522;

    // Download up to 8 unique article 522 images (excluding thumbnails at bottom)
    const uniqueSrcs = [...new Set(imgs522.filter((i) => i.alt !== 'thumbnail').map((i) => i.src))].slice(0, 8);
    for (let idx = 0; idx < uniqueSrcs.length; idx++) {
      const savePath = `${rawDir}/official-522-${idx + 1}.jpg`;
      try {
        await p.fetch(uniqueSrcs[idx], { saveAs: savePath });
        out.savedImages.push({ file: `raw/official-522-${idx + 1}.jpg`, url: uniqueSrcs[idx] });
      } catch (e) {
        out.savedImages.push({ error: e.message, url: uniqueSrcs[idx] });
      }
    }

    // 2. Visit related FAQs: 579 (CU 반값택배), 455 (택배서비스 안내), 660 (택배사별 비용), 741 (수령 QR코드)
    const faqList = [
      { id: '579', url: 'https://help.bunjang.co.kr/faq/42/579' },
      { id: '455', url: 'https://help.bunjang.co.kr/faq/42/455' },
      { id: '660', url: 'https://help.bunjang.co.kr/faq/42/660' },
      { id: '741', url: 'https://help.bunjang.co.kr/faq/42/741' },
    ];
    out.faqs = {};
    for (const f of faqList) {
      await p.goto(f.url, { timeout: 25000 });
      await p.waitForTimeout(1000);
      out.faqs[f.id] = await observePage(p, folder, `official-faq-${f.id}`, {
        selector: 'body',
        maxChars: 5000,
        linksLimit: 5,
      });
      const fImgs = await p.evaluate(() =>
        [...document.querySelectorAll('img')]
          .map((i) => ({ src: i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight }))
          .filter((i) => i.w > 100 && i.h > 100),
      );
      if (fImgs.length) out.faqs[f.id].imgs = fImgs;
    }

    return out;
  },

  // Row 51: 번개장터 카드 결제 (spaceId 17)
  async () => {
    const folder = '26_1111/앱사용_번개장터 카드 결제/웹조사';
    const rawDir = 'Y:/antigravity-project/ego-light-adsense-info-blog/' + folder + '/raw';
    const task = await taskSpace(17);
    const p = task.page('p1');
    const out = { row: 51, savedImages: [] };

    // 1. Download official images from bgzt.co.kr/article/490
    await p.goto('https://bgzt.co.kr/article/490', { timeout: 25000 });
    await p.waitForTimeout(1200);
    const imgs490 = await p.evaluate(() =>
      [...document.querySelectorAll('img')]
        .map((i) => ({ src: i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight }))
        .filter((i) => i.w > 150 && i.h > 150 && i.alt !== 'thumbnail' && i.src.includes('media.bunjang.co.kr')),
    );
    const unique490 = [...new Set(imgs490.map((i) => i.src))].slice(0, 8);
    for (let idx = 0; idx < unique490.length; idx++) {
      const savePath = `${rawDir}/official-490-${idx + 1}.jpg`;
      try {
        await p.fetch(unique490[idx], { saveAs: savePath });
        out.savedImages.push({ file: `raw/official-490-${idx + 1}.jpg`, url: unique490[idx] });
      } catch (e) {
        out.savedImages.push({ error: e.message, url: unique490[idx] });
      }
    }

    // 2. Also download FAQ 572 image
    await p.goto('https://help.bunjang.co.kr/faq/3/572', { timeout: 25000 });
    await p.waitForTimeout(1000);
    try {
      await p.fetch('https://media.bunjang.co.kr/images/nocrop/1246608134.jpg', {
        saveAs: `${rawDir}/official-faq-572-1.jpg`,
      });
      out.savedImages.push({
        file: 'raw/official-faq-572-1.jpg',
        url: 'https://media.bunjang.co.kr/images/nocrop/1246608134.jpg',
      });
    } catch (e) {
      out.savedImages.push({ error: e.message });
    }

    // 3. Search Google for specific FAQ URLs on help.bunjang.co.kr for card fee, installment, card points, card registration
    await p.goto(
      'https://www.google.com/search?q=' +
        encodeURIComponent('site:help.bunjang.co.kr/faq/3 수수료 OR 할부 OR 포인트 OR 간편결제'),
      { timeout: 25000 },
    );
    await p.waitForTimeout(1000);
    const moreCardFaqs = await p.evaluate(() =>
      [...document.querySelectorAll('a')]
        .filter((a) => a.querySelector('h3'))
        .slice(0, 8)
        .map((a) => ({ title: a.innerText.slice(0, 200), url: a.href })),
    );
    out.moreCardFaqs = moreCardFaqs;

    out.extraFaqs = {};
    for (let i = 0; i < Math.min(4, moreCardFaqs.length); i++) {
      const u = moreCardFaqs[i].url;
      if (u.includes('help.bunjang.co.kr/faq/')) {
        await p.goto(u, { timeout: 25000 });
        await p.waitForTimeout(1000);
        const key = u.split('/').pop();
        out.extraFaqs[key] = await observePage(p, folder, `official-faq-${key}`, {
          selector: 'body',
          maxChars: 4000,
          linksLimit: 5,
        });
      }
    }

    return out;
  },

  // Row 52: 넷플릭스 해지방법 (spaceId 18)
  async () => {
    const folder = '26_1111/앱사용_넷플릭스 해지방법/웹조사';
    const rawDir = 'Y:/antigravity-project/ego-light-adsense-info-blog/' + folder + '/raw';
    const task = await taskSpace(18);
    const p = task.page('p1');
    const out = { row: 52, savedImages: [] };

    await p.goto('https://help.netflix.com/ko/node/407', { timeout: 25000 });
    await p.waitForTimeout(1500);

    // Expand all accordions/details on node/407 so their content is visible and rendered
    await p.evaluate(() => {
      document.querySelectorAll('[aria-expanded="false"], summary, .accordion-trigger, h2, h3').forEach((el) => {
        try {
          el.click();
        } catch {}
      });
    });
    await p.waitForTimeout(800);

    out.node407Expanded = await observePage(p, folder, 'official-netflix-407-expanded', {
      selector: 'body',
      maxChars: 6000,
      linksLimit: 10,
    });

    // Also extract all textContent of sections/accordions even if CSS hidden
    out.node407AllDomText = await p.evaluate(() => {
      const main = document.querySelector('.kb-article, main, article, body');
      return main ? main.textContent.replace(/\s+/g, ' ').trim().slice(0, 8000) : '';
    });

    // Download the 2 official webp guide images on node/407
    const imgs407 = await p.evaluate(() =>
      [...document.querySelectorAll('img')]
        .map((i) => ({ src: i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight }))
        .filter((i) => i.src.includes('sprinklr.com') || i.src.includes(' KO-Netflix')),
    );
    for (let idx = 0; idx < imgs407.length; idx++) {
      const savePath = `${rawDir}/official-netflix-407-${idx + 1}.webp`;
      try {
        await p.fetch(imgs407[idx].src, { saveAs: savePath });
        out.savedImages.push({
          file: `raw/official-netflix-407-${idx + 1}.webp`,
          url: imgs407[idx].src.split('?')[0],
          alt: imgs407[idx].alt,
        });
      } catch (e) {
        out.savedImages.push({ error: e.message });
      }
    }

    // Visit node/41049 (청구 및 결제) and node/2070 (재가입)
    for (const nid of ['41049', '2070']) {
      await p.goto(`https://help.netflix.com/ko/node/${nid}`, { timeout: 25000 });
      await p.waitForTimeout(1200);
      out[`node${nid}`] = await observePage(p, folder, `official-netflix-${nid}`, {
        selector: 'body',
        maxChars: 5000,
        linksLimit: 8,
      });
    }

    return out;
  },
];

const results = await pool(jobs, 3, (fn) => fn());
console.log(JSON.stringify(results, null, 2));
