import { observePage } from '../../../tools/research_observe.mjs';

async function inspectDomSummary(page) {
  return await page.evaluate(() => {
    const items = [];
    const els = document.querySelectorAll('h1, h2, h3, h4, button, a, .refund_section, .faq_text, section, ol, ul, table, p, div.help_purchase_row, .help_wizard_button');
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.width > 20 && r.height > 12 && r.height < 600) {
        const text = (el.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 120);
        if (text && text.length >= 2) {
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

async function getOrCreateP2(task) {
  const pages = await task.pages();
  const existing = pages.find(p => p.label === 'p2');
  if (existing) return existing;
  return await task.newPage();
}

const [steamP2, appleP2] = await Promise.all([
  getOrCreateP2(steamTask),
  getOrCreateP2(appleTask)
]);

const [steamInfo, appleInfo] = await Promise.all([
  (async () => {
    await steamP2.goto('https://help.steampowered.com/ko/faqs/view/784C-923B-A4A1-C825');
    await steamP2.waitForLoadState();
    const obs1 = await observePage(steamP2, steamFolder, '02-faq-how-to-refund', { selector: 'body', maxChars: 2000, linksLimit: 8 });
    const dom1 = await inspectDomSummary(steamP2);

    await steamP2.goto('https://store.steampowered.com/steam_refunds/?l=koreana');
    await steamP2.waitForLoadState();
    const obs2 = await observePage(steamP2, steamFolder, '03-policy-steam-refunds', { selector: 'body', maxChars: 2500, linksLimit: 8 });
    const dom2 = await inspectDomSummary(steamP2);

    await steamP2.goto('https://help.steampowered.com/ko/');
    await steamP2.waitForLoadState();
    const obs3 = await observePage(steamP2, steamFolder, '04-support-home', { selector: 'body', maxChars: 1500, linksLimit: 8 });
    const dom3 = await inspectDomSummary(steamP2);

    await steamP2.goto('https://help.steampowered.com/ko/wizard/HelpWithPurchase');
    await steamP2.waitForLoadState();
    const obs4 = await observePage(steamP2, steamFolder, '05-help-with-purchase', { selector: 'body', maxChars: 1500, linksLimit: 8 });
    const dom4 = await inspectDomSummary(steamP2);

    return { obs1, dom1, obs2, dom2, obs3, dom3, obs4, dom4 };
  })(),
  (async () => {
    await appleP2.goto('https://support.apple.com/ko-kr/118223');
    await appleP2.waitForLoadState();
    const obs1 = await observePage(appleP2, appleFolder, '02-request-refund-guide', { selector: 'body', maxChars: 2500, linksLimit: 8 });
    const dom1 = await inspectDomSummary(appleP2);

    await appleP2.goto('https://support.apple.com/ko-kr/118224');
    await appleP2.waitForLoadState();
    const obs2 = await observePage(appleP2, appleFolder, '03-check-refund-status', { selector: 'body', maxChars: 2500, linksLimit: 8 });
    const dom2 = await inspectDomSummary(appleP2);

    await appleP2.goto('https://support.apple.com/ko-kr/billing');
    await appleP2.waitForLoadState();
    const obs3 = await observePage(appleP2, appleFolder, '04-billing-support', { selector: 'body', maxChars: 1500, linksLimit: 8 });
    const dom3 = await inspectDomSummary(appleP2);

    await appleP2.goto('https://reportaproblem.apple.com/');
    await appleP2.waitForLoadState();
    await appleP2.waitForTimeout(1500);
    const obs4 = await observePage(appleP2, appleFolder, '05-reportaproblem-entry', { selector: 'body', maxChars: 1500, linksLimit: 8 });
    const dom4 = await inspectDomSummary(appleP2);

    return { obs1, dom1, obs2, dom2, obs3, dom3, obs4, dom4 };
  })()
]);

console.log(JSON.stringify({ steamInfo, appleInfo }, null, 2));
