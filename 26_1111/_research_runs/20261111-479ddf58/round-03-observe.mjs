import { observePage } from '../../../tools/research_observe.mjs';

const out = {};

// 1. Space 13: 넷플릭스 로그아웃 티비
try {
  const folder53 = '26_1111/앱사용_넷플릭스 로그아웃 티비/웹조사';
  const task13 = await taskSpace(13);
  const p13 = task13.page('p1');
  await p13.goto('https://help.netflix.com/ko/node/128180', { timeout: 25000 });
  await p13.waitForTimeout(1500);
  // Expand all accordions/details if any
  await p13.evaluate(() => {
    document.querySelectorAll('details').forEach(d => { d.open = true; });
    document.querySelectorAll('[aria-expanded="false"]').forEach(b => { try { b.click(); } catch {} });
  });
  await p13.waitForTimeout(500);
  const obs1 = await observePage(p13, folder53, 'netflix-128180', { selector: 'body', maxChars: 6000, linksLimit: 10 });

  await p13.goto('https://help.netflix.com/ko/node/23928', { timeout: 25000 });
  await p13.waitForTimeout(1000);
  const obs2 = await observePage(p13, folder53, 'netflix-23928', { selector: 'body', maxChars: 4000, linksLimit: 5 });

  out.row53 = { obs1Text: obs1.text, obs1Links: obs1.links, obs2Text: obs2.text };
} catch (e) {
  out.row53 = { error: e.message };
}

// 2. Space 14: 타오바오 탈퇴 방법
try {
  const folder54 = '26_1111/앱사용_타오바오 탈퇴 방법/웹조사';
  const task14 = await taskSpace(14);
  const p14 = task14.page('p1');

  await p14.goto('https://world.taobao.com/helper/knowledge.htm?kid=13415078', { timeout: 25000 });
  await p14.waitForTimeout(1500);
  const obs1 = await observePage(p14, folder54, 'taobao-kid-13415078', { selector: 'body', maxChars: 5000, linksLimit: 10 });

  await p14.goto('https://world.taobao.com/helper/knowledge.htm?kid=6647181', { timeout: 25000 });
  await p14.waitForTimeout(1500);
  const obs2 = await observePage(p14, folder54, 'taobao-kid-6647181', { selector: 'body', maxChars: 5000, linksLimit: 10 });

  await p14.goto('https://world.taobao.com/helper/list.htm?cid=9201647', { timeout: 25000 });
  await p14.waitForTimeout(1500);
  const obs3 = await observePage(p14, folder54, 'taobao-cid-9201647', { selector: 'body', maxChars: 4000, linksLimit: 10 });

  out.row54 = {
    obs1Url: obs1.url, obs1Title: obs1.title, obs1Text: obs1.text,
    obs2Url: obs2.url, obs2Title: obs2.title, obs2Text: obs2.text,
    obs3Url: obs3.url, obs3Title: obs3.title, obs3Text: obs3.text
  };
} catch (e) {
  out.row54 = { error: e.message };
}

// 3. Space 15: 네이버회원탈퇴하는방법
try {
  const folder55 = '26_1111/앱사용_네이버회원탈퇴하는방법/웹조사';
  const task15 = await taskSpace(15);
  const p15 = task15.page('p1');

  await p15.goto('https://help.naver.com/service/5640/contents/1435?osType=PC&lang=ko', { timeout: 25000 });
  await p15.waitForTimeout(2000);
  const obs1 = await observePage(p15, folder55, 'naver-help-1435', { selector: 'body', maxChars: 5000, linksLimit: 10 });

  await p15.goto('https://help.naver.com/service/5630/contents/1788', { timeout: 25000 });
  await p15.waitForTimeout(2000);
  const obs2 = await observePage(p15, folder55, 'naver-help-1788', { selector: 'body', maxChars: 5000, linksLimit: 10 });

  await p15.goto('https://help.naver.com/service/5640/category/3875?lang=ko', { timeout: 25000 });
  await p15.waitForTimeout(2000);
  const obs3 = await observePage(p15, folder55, 'naver-category-3875', { selector: 'body', maxChars: 5000, linksLimit: 10 });

  out.row55 = {
    obs1Text: obs1.text, obs1Links: obs1.links,
    obs2Text: obs2.text, obs2Links: obs2.links,
    obs3Text: obs3.text, obs3Links: obs3.links
  };
} catch (e) {
  out.row55 = { error: e.message };
}

console.log(JSON.stringify(out, null, 2));
