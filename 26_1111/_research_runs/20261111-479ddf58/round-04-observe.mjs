import { observePage } from '../../../tools/research_observe.mjs';

const out = {};

// 1. Space 13: 넷플릭스 아코디언/탭 내부 텍스트 추출
try {
  const folder53 = '26_1111/앱사용_넷플릭스 로그아웃 티비/웹조사';
  const task13 = await taskSpace(13);
  const p13 = task13.page('p1');
  await p13.goto('https://help.netflix.com/ko/node/128180', { timeout: 25000 });
  await p13.waitForTimeout(1000);
  // Make all hidden accordion content visible in DOM so innerText and rendering include them!
  const full128180 = await p13.evaluate(() => {
    document.querySelectorAll('*').forEach(el => {
      const st = getComputedStyle(el);
      if (el.classList.contains('accordion-content') || el.classList.contains('c-wrapper') || st.display === 'none') {
        if (el.innerText || el.textContent) {
          // Only unhide content blocks inside article/main
          if (el.closest('article, main, .kb-article, .help-content, .page-block')) {
            el.style.display = 'block';
            el.style.visibility = 'visible';
            el.style.height = 'auto';
            el.style.overflow = 'visible';
          }
        }
      }
    });
    return document.body.innerText.slice(0, 6000);
  });
  await observePage(p13, folder53, 'netflix-128180-expanded', { selector: 'body', maxChars: 6000, linksLimit: 10 });

  await p13.goto('https://help.netflix.com/ko/node/23928', { timeout: 25000 });
  await p13.waitForTimeout(1000);
  const full23928 = await p13.evaluate(() => {
    document.querySelectorAll('*').forEach(el => {
      const st = getComputedStyle(el);
      if (st.display === 'none' && el.closest('article, main, .kb-article, .help-content, .page-block')) {
        el.style.display = 'block';
        el.style.visibility = 'visible';
        el.style.height = 'auto';
      }
    });
    return document.body.innerText.slice(0, 6000);
  });
  await observePage(p13, folder53, 'netflix-23928-expanded', { selector: 'body', maxChars: 6000, linksLimit: 10 });

  out.row53 = { full128180, full23928 };
} catch (e) {
  out.row53 = { error: e.message };
}

// 2. Space 14: 타오바오 공식 백과/장호/메인 확인
try {
  const folder54 = '26_1111/앱사용_타오바오 탈퇴 방법/웹조사';
  const task14 = await taskSpace(14);
  const p14 = task14.page('p1');

  await p14.goto('https://bk.taobao.com/k/taobaozhanghao_488/551c80860ad7191fe1d59b23428e7799.html', { timeout: 25000 });
  await p14.waitForTimeout(1500);
  const obsBk = await observePage(p14, folder54, 'taobao-bk-official', { selector: 'body', maxChars: 5000, linksLimit: 10 });

  await p14.goto('https://jianghu.taobao.com/detail/47750_76664095', { timeout: 25000 });
  await p14.waitForTimeout(1500);
  const obsJh = await observePage(p14, folder54, 'taobao-jianghu-official', { selector: 'body', maxChars: 5000, linksLimit: 10 });

  out.row54 = {
    bkUrl: obsBk.url, bkTitle: obsBk.title, bkText: obsBk.text,
    jhUrl: obsJh.url, jhTitle: obsJh.title, jhText: obsJh.text
  };
} catch (e) {
  out.row54 = { error: e.message };
}

// 3. Space 15: 네이버 탈퇴 주의사항(9545) 확인
try {
  const folder55 = '26_1111/앱사용_네이버회원탈퇴하는방법/웹조사';
  const task15 = await taskSpace(15);
  const p15 = task15.page('p1');

  await p15.goto('https://help.naver.com/service/5640/contents/9545?lang=ko', { timeout: 25000 });
  await p15.waitForTimeout(2000);
  const obs9545 = await observePage(p15, folder55, 'naver-help-9545', { selector: 'body', maxChars: 6000, linksLimit: 10 });

  out.row55 = { obs9545Text: obs9545.text };
} catch (e) {
  out.row55 = { error: e.message };
}

console.log(JSON.stringify(out, null, 2));
