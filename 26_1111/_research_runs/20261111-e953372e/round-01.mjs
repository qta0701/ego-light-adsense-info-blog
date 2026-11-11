import { capture } from '../../../tools/research_browser.mjs';
import { observePage } from '../../../tools/research_observe.mjs';

async function smartCaptureSearch(page, folder, name, targetUrlPrefix) {
  // Try mobile viewport first; if Google desktop HTML overflows horizontally, use PC viewport 1280x900
  let viewport = { width: 390, height: 844 };
  await page.cdp('Emulation.setDeviceMetricsOverride', { ...viewport, deviceScaleFactor: 1, mobile: true });
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(() => r(true)))));

  const checkFit = await page.evaluate((prefix) => {
    for (const el of document.querySelectorAll('[data-ego-target]')) el.removeAttribute('data-ego-target');
    const links = [...document.querySelectorAll('#search a[href], #rso a[href], a[href]')].filter(a => {
      const h3 = a.querySelector('h3');
      return h3 && a.href && a.href.startsWith(prefix);
    });
    const a = links[0];
    if (!a) return { found: false };
    const h3 = a.querySelector('h3') || a;
    h3.scrollIntoView({ block: 'center', behavior: 'instant' });
    const r = h3.getBoundingClientRect();
    const vw = window.visualViewport ? window.visualViewport.width : window.innerWidth;
    const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    if (r.left >= 0 && r.top >= 40 && r.right <= vw && r.bottom <= vh && r.width > 0 && r.height > 0) {
      h3.setAttribute('data-ego-target', 'target-1');
      return { found: true, fitsMobile: true, rect: [r.x, r.y, r.width, r.height], vw, vh };
    }
    return { found: true, fitsMobile: false, rect: [r.x, r.y, r.width, r.height], vw, vh };
  }, targetUrlPrefix);

  if (!checkFit.found) {
    throw new Error('Could not find search link for prefix: ' + targetUrlPrefix);
  }

  if (!checkFit.fitsMobile) {
    viewport = { width: 1280, height: 900 };
    await page.cdp('Emulation.setDeviceMetricsOverride', { ...viewport, deviceScaleFactor: 1, mobile: false });
    await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(() => r(true)))));
    await page.evaluate((prefix) => {
      for (const el of document.querySelectorAll('[data-ego-target]')) el.removeAttribute('data-ego-target');
      const links = [...document.querySelectorAll('#search a[href], #rso a[href], a[href]')].filter(a => {
        const h3 = a.querySelector('h3');
        return h3 && a.href && a.href.startsWith(prefix);
      });
      const a = links[0];
      const h3 = a.querySelector('h3') || a;
      h3.scrollIntoView({ block: 'center', behavior: 'instant' });
      h3.setAttribute('data-ego-target', 'target-1');
    }, targetUrlPrefix);
  }

  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(() => r(true)))));
  return await capture(page, folder, name, ['[data-ego-target="target-1"]'], viewport);
}

async function inspectDomSummary(page) {
  return await page.evaluate(() => {
    const items = [];
    const els = document.querySelectorAll('h1, h2, h3, h4, button, a, .refund_section, .faq_text, section, ol, ul, table');
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.width > 20 && r.height > 12) {
        const text = (el.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 120);
        if (text) {
          items.push({
            tag: el.tagName.toLowerCase(),
            id: el.id || '',
            cls: (typeof el.className === 'string' ? el.className : '').slice(0, 60),
            href: el.href || '',
            text,
            w: Math.round(r.width),
            h: Math.round(r.height)
          });
        }
      }
      if (items.length >= 45) break;
    }
    return { url: location.href, title: document.title, items };
  });
}

const steamFolder = '26_1111/앱사용_스팀 환불 방법/웹조사';
const appleFolder = '26_1111/앱사용_애플 환불 요청/웹조사';

const [steamTask, appleTask] = await Promise.all([
  taskSpace(11),
  taskSpace(12)
]);

const steamPage = steamTask.page('p1');
const applePage = appleTask.page('p1');

// 1. Capture 01-search on both spaces (captureQueue serializes actual screenshot)
const steamSearchCap = await smartCaptureSearch(
  steamPage,
  steamFolder,
  '01-search',
  'https://help.steampowered.com/ko/faqs/view/784C-923B-A4A1-C825'
);

const appleSearchCap = await smartCaptureSearch(
  applePage,
  appleFolder,
  '01-search',
  'https://support.apple.com/ko-kr/118223'
);

// 2. Navigate & observe in parallel
const [steamInfo, appleInfo] = await Promise.all([
  (async () => {
    await steamPage.cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await steamPage.goto('https://help.steampowered.com/ko/faqs/view/784C-923B-A4A1-C825');
    await steamPage.waitForLoadState();
    const obs1 = await observePage(steamPage, steamFolder, '02-faq-how-to-refund', { selector: 'body', maxChars: 1500, linksLimit: 5 });
    const dom1 = await inspectDomSummary(steamPage);

    await steamPage.goto('https://store.steampowered.com/steam_refunds/?l=koreana');
    await steamPage.waitForLoadState();
    const obs2 = await observePage(steamPage, steamFolder, '03-policy-steam-refunds', { selector: 'body', maxChars: 1500, linksLimit: 5 });
    const dom2 = await inspectDomSummary(steamPage);

    await steamPage.goto('https://help.steampowered.com/ko/');
    await steamPage.waitForLoadState();
    const obs3 = await observePage(steamPage, steamFolder, '04-support-home', { selector: 'body', maxChars: 1500, linksLimit: 5 });
    const dom3 = await inspectDomSummary(steamPage);

    return { searchCap: steamSearchCap, obs1, dom1, obs2, dom2, obs3, dom3 };
  })(),
  (async () => {
    await applePage.cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await applePage.goto('https://support.apple.com/ko-kr/118223');
    await applePage.waitForLoadState();
    const obs1 = await observePage(applePage, appleFolder, '02-request-refund-guide', { selector: 'body', maxChars: 1500, linksLimit: 5 });
    const dom1 = await inspectDomSummary(applePage);

    await applePage.goto('https://support.apple.com/ko-kr/118224');
    await applePage.waitForLoadState();
    const obs2 = await observePage(applePage, appleFolder, '03-check-refund-status', { selector: 'body', maxChars: 1500, linksLimit: 5 });
    const dom2 = await inspectDomSummary(applePage);

    await applePage.goto('https://reportaproblem.apple.com/');
    await applePage.waitForLoadState();
    await applePage.waitForTimeout(1500);
    const obs3 = await observePage(applePage, appleFolder, '04-reportaproblem-entry', { selector: 'body', maxChars: 1500, linksLimit: 5 });
    const dom3 = await inspectDomSummary(applePage);

    return { searchCap: appleSearchCap, obs1, dom1, obs2, dom2, obs3, dom3 };
  })()
]);

console.log(JSON.stringify({ steamInfo, appleInfo }, null, 2));
