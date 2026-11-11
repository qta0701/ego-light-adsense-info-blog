import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { inside, pool } from '../../../tools/research_browser.mjs';
import { observePage } from '../../../tools/research_observe.mjs';

const ROOT = fileURLToPath(new URL('../../../', import.meta.url));

async function downloadFile(url, relDest) {
  const full = inside(ROOT, relDest);
  await fs.mkdir(path.dirname(full), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) return { url, relDest, ok: false, status: res.status };
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(full, buf);
  return { url, relDest, ok: true, bytes: buf.length };
}

const jobs = [
  // Row 47: 코레일 승차권 변경 (spaceId 8)
  async () => {
    const folder = '26_1111/앱사용_코레일 승차권 변경/웹조사';
    const task = await taskSpace(8);
    const p = task.page('p1');
    await p.acceptDialog().catch(() => {});
    const out = { row: 47, downloads: [] };

    out.downloads.push(
      await downloadFile(
        'https://info.korail.com/crosseditor_u/binary/images/000022/%EC%8A%B9%EC%B0%A8%EA%B6%8C_%EB%B3%80%EA%B2%BD_%EC%84%9C%EB%B9%84%EC%8A%A4_%EA%B0%9C%EC%84%A0_%EC%A0%84%C2%B7%ED%9B%84_%EB%B9%84%EA%B5%90.jpg',
        folder + '/raw/official-01-comparison.jpg'
      )
    );
    out.downloads.push(
      await downloadFile(
        'https://info.korail.com/crosseditor_u/binary/images/000022/%EC%BD%94%EB%A0%88%EC%9D%BC%ED%86%A1_%EC%8A%B9%EC%B0%A8%EA%B6%8C_%EB%B3%80%EA%B2%BD_%EC%84%9C%EB%B9%84%EC%8A%A4_%EA%B4%80%EB%A0%A8_%EC%83%81%EC%84%B8_%ED%99%94%EB%A9%B4.jpg',
        folder + '/raw/official-02-app-screens.jpg'
      )
    );

    for (const idx of [12, 7]) {
      await p.goto(`https://info.korail.com/info/selectBbsNttList.do?bbsNo=205&key=817&pageIndex=${idx}`, {
        timeout: 25000,
      });
      await p.waitForTimeout(800);
      await p.evaluate(() => {
        document.querySelectorAll('[style*="display: none"], [style*="display:none"], dd, .answer, .faq_a, div, li').forEach((el) => {
          if (getComputedStyle(el).display === 'none') el.style.display = 'block';
        });
      });
      await p.waitForTimeout(400);
      out[`faqExpanded${idx}`] = await observePage(p, folder, `official-korail-faq${idx}-expanded`, {
        selector: 'body',
        maxChars: 6000,
        linksLimit: 5,
      });
    }

    await p.goto('https://www.google.com/search?q=' + encodeURIComponent('코레일 승차권 변경'), { timeout: 25000 });
    return out;
  },

  // Row 48: 당근마켓 바로구매 택배 (spaceId 9)
  async () => {
    const folder = '26_1111/앱사용_당근마켓 바로구매 택배/웹조사';
    const task = await taskSpace(9);
    const p = task.page('p1');
    await p.acceptDialog().catch(() => {});
    const out = { row: 48, downloads: [], extraFaqs: [] };

    out.downloads.push(
      await downloadFile(
        'https://prismic-image-proxy.krrt.io/karrot/aMtQK2GNHVfTPV6k_PR_%EB%B0%94%EB%A1%9C%EA%B5%AC%EB%A7%A4_2.jpg?auto=compress%2Cformat&fit=max&q=100&w=4320&h=2430',
        folder + '/raw/official-01-instant-buy.jpg'
      )
    );

    const faqUrls = [
      { name: 'faq-23085-items', url: 'https://daangn.com/wv/faqs/23085?from_kind=instant_buy' },
      { name: 'faq-24607-packing', url: 'https://daangn.com/wv/faqs/24607?from_kind=instant_buy' },
      { name: 'faq-23234-payout', url: 'https://daangn.com/wv/faqs/23234?from_kind=instant_buy' },
      { name: 'faq-23267-compensation', url: 'https://daangn.com/wv/faqs/23267?from_kind=instant_buy' },
      { name: 'faq-28372-cancel', url: 'https://daangn.com/wv/faqs/28372?from_kind=instant_buy' },
      { name: 'faq-23132-shipping-notes', url: 'https://daangn.com/wv/faqs/23132?from_kind=instant_buy' },
    ];

    for (const item of faqUrls) {
      await p.goto(item.url, { timeout: 25000 });
      await p.waitForTimeout(600);
      const obs = await observePage(p, folder, `official-daangn-${item.name}`, {
        selector: 'body',
        maxChars: 4500,
        linksLimit: 5,
      });
      const imgs = await p.evaluate(() =>
        [...document.querySelectorAll('img')]
          .map((i) => ({ src: i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight }))
          .filter((i) => i.w > 100 && i.h > 100)
      );
      out.extraFaqs.push({ name: item.name, obs, imgs });
    }

    await p.goto('https://www.google.com/search?q=' + encodeURIComponent('당근마켓 바로구매 택배'), { timeout: 25000 });
    return out;
  },

  // Row 49: 당근마켓 안심결제 (spaceId 10)
  async () => {
    const folder = '26_1111/앱사용_당근마켓 안심결제/웹조사';
    const task = await taskSpace(10);
    const p = task.page('p1');
    await p.acceptDialog().catch(() => {});
    const out = { row: 49, downloads: [], extraFaqs: [] };

    out.downloads.push(
      await downloadFile(
        'https://link.daangnpay.com/static/image/escrow/about_section_1_2.png',
        folder + '/raw/official-01-escrow-flow.png'
      )
    );
    out.downloads.push(
      await downloadFile(
        'https://link.daangnpay.com/static/image/escrow/credit_card@x2.png',
        folder + '/raw/official-02-escrow-card.png'
      )
    );
    out.downloads.push(
      await downloadFile(
        'https://prismic-image-proxy.krrt.io/karrot/Zw8NxIF3NbkBXe8w_%5B%EC%9D%B4%EB%AF%B8%EC%A7%801%5D%EB%8B%B9%EA%B7%BC%ED%8E%98%EC%9D%B4%EC%95%88%EC%8B%AC%EA%B2%B0%EC%A0%9C%EC%98%A4%ED%94%88.jpg?auto=compress%2Cformat&fit=max&q=100&w=4320&h=2430',
        folder + '/raw/official-03-escrow-app.jpg'
      )
    );

    await p.goto('https://www.daangn.com/wv/faqs?q=%EC%95%88%EC%8B%AC%EA%B2%B0%EC%A0%9C&from_tag=true', {
      timeout: 25000,
    });
    await p.waitForTimeout(800);
    out.escrowTagList = await observePage(p, folder, 'official-daangn-escrow-tag-list', {
      selector: 'body',
      maxChars: 5000,
      linksLimit: 10,
    });
    const tagLinks = await p.evaluate(() =>
      [...document.querySelectorAll('a[href*="/faqs/"]')].map((a) => ({
        text: a.innerText.trim().slice(0, 120),
        href: a.href,
      }))
    );
    out.tagLinks = tagLinks;

    for (let i = 0; i < Math.min(5, tagLinks.length); i++) {
      await p.goto(tagLinks[i].href, { timeout: 25000 });
      await p.waitForTimeout(600);
      const obs = await observePage(p, folder, `official-daangn-escrow-tag-${i + 1}`, {
        selector: 'body',
        maxChars: 4000,
        linksLimit: 5,
      });
      out.extraFaqs.push(obs);
    }

    await p.goto('https://www.google.com/search?q=' + encodeURIComponent('당근마켓 안심결제'), { timeout: 25000 });
    return out;
  },
];

const results = await pool(jobs, 3, (fn) => fn());
console.log(JSON.stringify(results, null, 2));
