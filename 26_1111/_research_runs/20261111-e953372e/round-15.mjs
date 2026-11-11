import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { inside } from '../../../tools/research_browser.mjs';

const ROOT = fileURLToPath(new URL('../../../', import.meta.url));
const steamFolder = '26_1111/앱사용_스팀 환불 방법/웹조사';
const appleFolder = '26_1111/앱사용_애플 환불 요청/웹조사';

const appleDownloads = [
  {
    name: '02-step1-report-a-problem.png',
    url: 'https://cdsassets.apple.com/live/7WUAS350/images/ios/locale/ko-kr/ios-26-iphone-16-pro-safari-report-a-problem.png',
    pageUrl: 'https://support.apple.com/ko-kr/118223'
  },
  {
    name: '03-step2-apple-receipt-email.png',
    url: 'https://cdsassets.apple.com/live/7WUAS350/images/macos/tahoe/macos-tahoe-26-receipt-from-apple.png',
    pageUrl: 'https://support.apple.com/ko-kr/118223'
  },
  {
    name: '04-step3-iphone-subscriptions.png',
    url: 'https://cdsassets.apple.com/live/7WUAS350/images/ios/locale/ko-kr/ios-27-iphone-17-pro-settings-name-subscriptions.png',
    pageUrl: 'https://support.apple.com/ko-kr/118428'
  },
  {
    name: '05-step4-mac-subscriptions.png',
    url: 'https://cdsassets.apple.com/live/7WUAS350/images/macos/golden-gate/macos-27-golden-gate-app-store-name-account-settings-subscriptions.png',
    pageUrl: 'https://support.apple.com/ko-kr/118428'
  },
  {
    name: '06-step5-windows-subscriptions.png',
    url: 'https://cdsassets.apple.com/live/7WUAS350/images/apple-account/locale/ko-kr/windows-11-apple-music-for-windows-account-view-my-account-settings-subscriptions-manage.png',
    pageUrl: 'https://support.apple.com/ko-kr/118428'
  }
];

const appleSaved = [];
for (const d of appleDownloads) {
  const dest = path.join(inside(ROOT, appleFolder), 'raw', d.name);
  const res = await fetch(d.url);
  if (res.ok) {
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(dest, buf);
    appleSaved.push({ name: d.name, url: d.url, pageUrl: d.pageUrl, bytes: buf.length });
  } else {
    appleSaved.push({ name: d.name, url: d.url, status: res.status });
  }
}

// Also record live DOM target coordinates on p1 (Google Search) and p2 (official guides) for both spaces
const [t11, t12] = await Promise.all([taskSpace(11), taskSpace(12)]);
const sP1 = t11.page('p1');
const aP1 = t12.page('p1');

async function getSearchTargetMeta(page, prefix) {
  await page.cdp('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(() => r(true)))));
  return await page.evaluate((pref) => {
    const links = [...document.querySelectorAll('#search a[href], #rso a[href], a[href]')].filter(a => {
      const h3 = a.querySelector('h3');
      return h3 && a.href && a.href.startsWith(pref);
    });
    const a = links[0];
    if (!a) return null;
    const h3 = a.querySelector('h3') || a;
    h3.scrollIntoView({ block: 'center', behavior: 'instant' });
    const r = h3.getBoundingClientRect();
    return {
      url: location.href,
      title: document.title,
      targetUrl: a.href,
      targetText: h3.innerText.trim(),
      viewport: { width: innerWidth, height: innerHeight },
      scroll: { scrollX, scrollY },
      cssBox: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
      checkedAt: new Date().toISOString()
    };
  }, prefix);
}

const steamSearchMeta = await getSearchTargetMeta(sP1, 'https://help.steampowered.com/ko/faqs/view/784C-923B-A4A1-C825');
const appleSearchMeta = await getSearchTargetMeta(aP1, 'https://support.apple.com/ko-kr/118223');

await fs.writeFile(
  path.join(inside(ROOT, steamFolder), 'evidence', '01-search.target.json'),
  JSON.stringify(steamSearchMeta, null, 2),
  'utf8'
);
await fs.writeFile(
  path.join(inside(ROOT, appleFolder), 'evidence', '01-search.target.json'),
  JSON.stringify(appleSearchMeta, null, 2),
  'utf8'
);

console.log(JSON.stringify({ appleSaved, steamSearchMeta, appleSearchMeta }, null, 2));
