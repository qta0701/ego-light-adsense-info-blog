import { pool } from '../../../tools/research_browser.mjs';
import { observePage } from '../../../tools/research_observe.mjs';

const jobs = [
  // Row 47: 코레일 승차권 변경 (spaceId 8)
  async () => {
    const folder = '26_1111/앱사용_코레일 승차권 변경/웹조사';
    const task = await taskSpace(8);
    const p = task.page('p1');
    const out = { row: 47 };

    // 1. Official Korail press release on KorailTalk ticket change service expansion
    await p.goto(
      'https://info.korail.com/info/selectBbsNttView.do?key=911&bbsNo=199&nttNo=26163&searchCtgry=&searchCnd=all&searchKrwd=&integrDeptCode=&pageIndex=1',
      { timeout: 25000 }
    );
    await p.waitForTimeout(1000);
    out.obsPress = await observePage(p, folder, 'official-korail-press', {
      selector: 'body',
      maxChars: 5000,
      linksLimit: 10,
    });
    out.pressImgs = await p.evaluate(() =>
      [...document.querySelectorAll('img')]
        .map((i) => ({ src: i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight }))
        .filter((i) => i.w > 100 && i.h > 100)
    );

    // 2. Official Korail FAQ
    await p.goto('https://info.korail.com/info/selectBbsNttList.do?bbsNo=205&key=817&pageIndex=12', {
      timeout: 25000,
    });
    await p.waitForTimeout(1000);
    out.obsFaq12 = await observePage(p, folder, 'official-korail-faq12', {
      selector: 'body',
      maxChars: 5000,
      linksLimit: 10,
    });

    // 3. Search on Korail FAQ for '변경' or '여행변경'
    await p.goto(
      'https://info.korail.com/info/selectBbsNttList.do?bbsNo=205&key=817&searchCnd=all&searchKrwd=' +
        encodeURIComponent('승차권 변경'),
      { timeout: 25000 }
    );
    await p.waitForTimeout(1000);
    out.obsFaqSearch = await observePage(p, folder, 'official-korail-faq-search', {
      selector: 'body',
      maxChars: 5000,
      linksLimit: 10,
    });

    return out;
  },

  // Row 48: 당근마켓 바로구매 택배 (spaceId 9)
  async () => {
    const folder = '26_1111/앱사용_당근마켓 바로구매 택배/웹조사';
    const task = await taskSpace(9);
    const p = task.page('p1');
    const out = { row: 48 };

    // 1. Official FAQ 23084: 바로구매 서비스는 무엇인가요?
    await p.goto('https://cs.kr.karrotmarket.com/wv/faqs/23084', { timeout: 25000 });
    await p.waitForTimeout(1000);
    out.obsFaqMain = await observePage(p, folder, 'official-karrot-faq-23084', {
      selector: 'body',
      maxChars: 5000,
      linksLimit: 10,
    });
    out.faqMainLinks = await p.evaluate(() =>
      [...document.querySelectorAll('a[href]')].map((a) => ({ text: a.innerText.trim().slice(0, 120), href: a.href }))
    );

    // 2. Official FAQ list kind=instant_buy
    await p.goto('https://daangn.com/wv/faqs?kind=instant_buy', { timeout: 25000 });
    await p.waitForTimeout(1000);
    out.obsFaqList = await observePage(p, folder, 'official-daangn-instant-buy-list', {
      selector: 'body',
      maxChars: 5000,
      linksLimit: 10,
    });
    const subLinks = await p.evaluate(() =>
      [...document.querySelectorAll('a[href*="/faqs/"]')].map((a) => ({
        text: a.innerText.trim().slice(0, 120),
        href: a.href,
      }))
    );
    out.subLinks = subLinks;

    // Visit up to 3 sub-FAQs
    out.subFaqs = [];
    for (let i = 0; i < Math.min(3, subLinks.length); i++) {
      await p.goto(subLinks[i].href, { timeout: 25000 });
      await p.waitForTimeout(800);
      const subObs = await observePage(p, folder, `official-daangn-instant-sub-${i + 1}`, {
        selector: 'body',
        maxChars: 4000,
        linksLimit: 5,
      });
      out.subFaqs.push(subObs);
    }

    // 3. Official Daangn Press Release
    await p.goto(
      'https://about.daangn.com/company/pr/archive/%EB%8B%B9%EA%B7%BC-%EC%A4%91%EA%B3%A0%EA%B1%B0%EB%9E%98-%EB%B0%94%EB%A1%9C%EA%B5%AC%EB%A7%A4-%EA%B8%B0%EB%8A%A5-%EB%8F%84%EC%9E%85/',
      { timeout: 25000 }
    );
    await p.waitForTimeout(1000);
    out.obsPress = await observePage(p, folder, 'official-daangn-press-instant-buy', {
      selector: 'body',
      maxChars: 5000,
      linksLimit: 5,
    });
    out.pressImgs = await p.evaluate(() =>
      [...document.querySelectorAll('img')]
        .map((i) => ({ src: i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight }))
        .filter((i) => i.w > 150 && i.h > 150)
    );

    return out;
  },

  // Row 49: 당근마켓 안심결제 (spaceId 10)
  async () => {
    const folder = '26_1111/앱사용_당근마켓 안심결제/웹조사';
    const task = await taskSpace(10);
    const p = task.page('p1');
    const out = { row: 49 };

    // 1. Official FAQ 14009: 안심결제 서비스는 무엇인가요?
    await p.goto('https://www.daangn.com/wv/faqs/14009', { timeout: 25000 });
    await p.waitForTimeout(1000);
    out.obsFaq14009 = await observePage(p, folder, 'official-daangn-faq-14009', {
      selector: 'body',
      maxChars: 5000,
      linksLimit: 10,
    });
    const subLinks = await p.evaluate(() =>
      [...document.querySelectorAll('a[href*="/faqs/"]')].map((a) => ({
        text: a.innerText.trim().slice(0, 120),
        href: a.href,
      }))
    );
    out.subLinks = subLinks;

    // Visit up to 3 related sub-FAQs
    out.subFaqs = [];
    for (let i = 0; i < Math.min(3, subLinks.length); i++) {
      await p.goto(subLinks[i].href, { timeout: 25000 });
      await p.waitForTimeout(800);
      const subObs = await observePage(p, folder, `official-daangn-escrow-sub-${i + 1}`, {
        selector: 'body',
        maxChars: 4000,
        linksLimit: 5,
      });
      out.subFaqs.push(subObs);
    }

    // 2. Official DaangnPay Escrow Guide
    await p.goto('https://link.daangnpay.com/escrow/about', { timeout: 25000 });
    await p.waitForTimeout(1000);
    out.obsEscrowAbout = await observePage(p, folder, 'official-daangnpay-escrow-about', {
      selector: 'body',
      maxChars: 5000,
      linksLimit: 10,
    });
    out.escrowImgs = await p.evaluate(() =>
      [...document.querySelectorAll('img')]
        .map((i) => ({ src: i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight }))
        .filter((i) => i.w > 100 && i.h > 100)
    );

    // 3. Official Daangn Press Release on Escrow
    await p.goto(
      'https://about.daangn.com/company/pr/archive/%EB%8B%B9%EA%B7%BC%ED%8E%98%EC%9D%B4-%EC%A4%91%EA%B3%A0%EA%B1%B0%EB%9E%98-%EC%95%88%EC%8B%AC%EA%B2%B0%EC%A0%9C-%EA%B8%B0%EB%8A%A5-%EB%8F%84%EC%9E%85/',
      { timeout: 25000 }
    );
    await p.waitForTimeout(1000);
    out.obsPress = await observePage(p, folder, 'official-daangn-press-escrow', {
      selector: 'body',
      maxChars: 5000,
      linksLimit: 5,
    });
    out.pressImgs = await p.evaluate(() =>
      [...document.querySelectorAll('img')]
        .map((i) => ({ src: i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight }))
        .filter((i) => i.w > 150 && i.h > 150)
    );

    return out;
  },
];

const results = await pool(jobs, 3, (fn) => fn());
console.log(JSON.stringify(results, null, 2));
