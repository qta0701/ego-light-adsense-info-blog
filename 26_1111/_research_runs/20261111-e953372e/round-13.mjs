import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { inside } from '../../../tools/research_browser.mjs';
import { observePage } from '../../../tools/research_observe.mjs';

const ROOT = fileURLToPath(new URL('../../../', import.meta.url));
const steamFolder = '26_1111/앱사용_스팀 환불 방법/웹조사';
const appleFolder = '26_1111/앱사용_애플 환불 요청/웹조사';

const steamDownloads = [
  { name: '02-step1-purchases.png', url: 'https://clan.fastly.steamstatic.com/images//1976/6f967e94debf76224f64be8702356c61ea3208eb.png' },
  { name: '03-step2-select-game.png', url: 'https://clan.fastly.steamstatic.com/images//1976/8d142de6ff6125f0696f79638caa5b1a6b84a674.png' },
  { name: '04-step3-select-problem.png', url: 'https://support.steampowered.com/images/faq/refunds/3Refund_selectProblem.png' },
  { name: '05-step4-request-refund.png', url: 'https://support.steampowered.com/images/faq/refunds/4Refund_requestRefund.png' },
  { name: '06-step5-refund-form.png', url: 'https://support.steampowered.com/images/faq/refunds/5Refund_requestForm.png' }
];

const steamSaved = [];
for (const d of steamDownloads) {
  const dest = path.join(inside(ROOT, steamFolder), 'raw', d.name);
  const res = await fetch(d.url);
  if (res.ok) {
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(dest, buf);
    steamSaved.push({ name: d.name, url: d.url, bytes: buf.length });
  } else {
    steamSaved.push({ name: d.name, url: d.url, status: res.status });
  }
}

const t12 = await taskSpace(12);
const aP2 = t12.page('p2');

const applePages = [
  'https://support.apple.com/ko-kr/118223',
  'https://support.apple.com/ko-kr/118224',
  'https://support.apple.com/ko-kr/118428',
  'https://support.apple.com/ko-kr/108099'
];

const appleFoundImgs = [];
for (const u of applePages) {
  await aP2.goto(u);
  await aP2.waitForLoadState();
  if (u.endsWith('118428')) {
    await observePage(aP2, appleFolder, '06-cancel-subscription', { selector: 'body', maxChars: 2000, linksLimit: 5 });
  } else if (u.endsWith('108099')) {
    await observePage(aP2, appleFolder, '07-purchase-history', { selector: 'body', maxChars: 2000, linksLimit: 5 });
  }
  const imgs = await aP2.evaluate(() =>
    [...document.querySelectorAll('img')]
      .map(i => ({ pageUrl: location.href, src: i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight }))
      .filter(i => i.w >= 200 && i.h >= 200)
  );
  appleFoundImgs.push(...imgs);
}

console.log(JSON.stringify({ steamSaved, appleFoundImgs }, null, 2));
