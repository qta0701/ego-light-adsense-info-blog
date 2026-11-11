import { observePage } from '../../../tools/research_observe.mjs';

const task5 = await taskSpace(5);
const p5 = task5.page('p1');

// 1. Search Google for exact cs.kakao.com channel block help page
await p5.goto('https://www.google.com/search?q=' + encodeURIComponent('site:cs.kakao.com/helps_html 카카오톡 채널 추가 차단'), { timeout: 25000 });
const csHelpLinks = await p5.evaluate(() =>
  [...document.querySelectorAll('a')].filter(a => a.querySelector('h3'))
    .slice(0, 8).map(a => ({ title: a.innerText.slice(0, 200), url: a.href }))
);
console.log('csHelpLinks:', csHelpLinks);

if (csHelpLinks.length > 0) {
  await p5.goto(csHelpLinks[0].url, { timeout: 25000 });
  await p5.evaluate(() => new Promise(r => setTimeout(r, 800)));
  const obs = await observePage(p5, '26_1111/앱사용_카카오톡 광고 차단 방법/웹조사', 'official-cs-channel-help', { selector: 'body', maxChars: 4500, linksLimit: 8 });
  console.log('obs cs channel help:', obs.title, obs.url, obs.text.slice(0, 1500));
}

// 2. Also fetch the markdown version of kakaobusiness gitbook page to read all 3 tabs
await p5.goto('https://kakaobusiness.gitbook.io/main/ad/ads-safety/user-guard/adspolicy/inappropriate', { timeout: 25000 });
await p5.evaluate(() => new Promise(r => setTimeout(r, 800)));
const allTabsText = await p5.evaluate(async () => {
  const panels = [...document.querySelectorAll('[role="tabpanel"], .gitbook-tabs, [data-testid*="tab"]')].map(el => el.textContent);
  try {
    const r = await fetch('https://kakaobusiness.gitbook.io/main/ad/ads-safety/user-guard/adspolicy/inappropriate.md');
    const md = r.ok ? await r.text() : '';
    return { panels, md: md.slice(0, 4000) };
  } catch (e) {
    return { panels, err: e.message };
  }
});
console.log('allTabsText:', JSON.stringify(allTabsText, null, 2));

