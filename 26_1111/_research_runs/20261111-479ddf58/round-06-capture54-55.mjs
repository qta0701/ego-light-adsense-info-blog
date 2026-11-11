import fs from 'node:fs/promises';
import { inside, capture } from '../../../tools/research_browser.mjs';
import { wrapPageForCapture, sanitizeDomBeforeCapture, tagTargetByText } from './dom_capture_helper.mjs';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../../../', import.meta.url));
const results = { row53: {}, row54: {}, row55: {} };

// === Row 53: 넷플릭스 로그아웃 티비 (spaceId 13) ===
{
  const folder = '26_1111/앱사용_넷플릭스 로그아웃 티비/웹조사';
  const rawDir = inside(ROOT, folder + '/raw');
  for (const f of await fs.readdir(rawDir).catch(() => [])) {
    await fs.unlink(rawDir + '/' + f).catch(() => {});
  }
  const task = await taskSpace(13);
  const rawPage = task.page('p1');
  const p = wrapPageForCapture(rawPage);

  await rawPage.goto('https://www.google.com/search?q=' + encodeURIComponent('넷플릭스 로그아웃 티비'), { timeout: 25000 });
  await rawPage.cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await rawPage.waitForTimeout(800);
  await sanitizeDomBeforeCapture(rawPage);
  await rawPage.evaluate(() => {
    document.querySelectorAll('[data-ego-target]').forEach(el => el.removeAttribute('data-ego-target'));
    const anchors = [...document.querySelectorAll('a')].filter(a => a.href.includes('help.netflix.com/ko/node/128180') && a.querySelector('h3'));
    const target = anchors[0]?.querySelector('h3') || document.querySelector('h3');
    target.setAttribute('data-ego-target', 'target-1');
    target.scrollIntoView({ block: 'center', behavior: 'instant' });
  });
  await rawPage.waitForTimeout(200);
  results.row53.c01 = await capture(p, folder, '01-search', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });

  await rawPage.goto('https://help.netflix.com/ko/node/23928', { timeout: 25000 });
  await rawPage.cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await rawPage.waitForTimeout(800);
  await sanitizeDomBeforeCapture(rawPage);
  await rawPage.evaluate(() => {
    const tabLabels = [...document.querySelectorAll('label')];
    const logoutTab = tabLabels.find(l => l.innerText?.trim() === '넷플릭스에서 로그아웃');
    if (logoutTab) logoutTab.click();
    document.querySelectorAll('[data-type="tabs-tab-content"], [data-type="collapsible-section-detail"]').forEach(el => {
      el.style.display = 'block';
      el.style.visibility = 'visible';
    });
  });
  await rawPage.waitForTimeout(300);

  await tagTargetByText(rawPage, ['하단에서 고객 지원, 로그아웃을 차례로 선택한 다음', '넷플릭스를 통해 로그아웃']);
  await rawPage.waitForTimeout(200);
  results.row53.c02 = await capture(p, folder, '02-step1', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });

  await tagTargetByText(rawPage, ['리모컨을 사용하여 다음 버튼을 이 순서대로 누릅니다', '위쪽, 위쪽, 아래쪽, 아래쪽, 왼쪽, 오른쪽']);
  await rawPage.waitForTimeout(200);
  results.row53.c03 = await capture(p, folder, '03-step2', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });

  await rawPage.goto('https://help.netflix.com/ko/node/128180', { timeout: 25000 });
  await rawPage.cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await rawPage.waitForTimeout(800);
  await sanitizeDomBeforeCapture(rawPage);

  await rawPage.evaluate(() => {
    const details = [...document.querySelectorAll('[data-type="collapsible-section-detail"]')];
    if (details[0]) { details[0].style.display = 'block'; details[0].style.visibility = 'visible'; }
  });
  await tagTargetByText(rawPage, ['단일 디바이스에서 로그아웃']);
  await rawPage.waitForTimeout(200);
  results.row53.c04 = await capture(p, folder, '04-step3', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });

  await rawPage.evaluate(() => {
    const details = [...document.querySelectorAll('[data-type="collapsible-section-detail"]')];
    if (details[0]) details[0].style.display = 'none';
    if (details[1]) { details[1].style.display = 'block'; details[1].style.visibility = 'visible'; }
    if (details[2]) { details[2].style.display = 'block'; details[2].style.visibility = 'visible'; }
  });
  await tagTargetByText(rawPage, ['모든 디바이스에서 로그아웃']);
  await rawPage.waitForTimeout(200);
  results.row53.c05 = await capture(p, folder, '05-step4', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });
}

// === Row 54: 타오바오 탈퇴 방법 (spaceId 14) ===
{
  const folder = '26_1111/앱사용_타오바오 탈퇴 방법/웹조사';
  const rawDir = inside(ROOT, folder + '/raw');
  for (const f of await fs.readdir(rawDir).catch(() => [])) {
    await fs.unlink(rawDir + '/' + f).catch(() => {});
  }
  const task = await taskSpace(14);
  const rawPage = task.page('p1');
  const p = wrapPageForCapture(rawPage);

  await rawPage.goto('https://www.google.com/search?q=' + encodeURIComponent('淘宝 注销账户 site:taobao.com'), { timeout: 25000 });
  await rawPage.cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await rawPage.waitForTimeout(800);

  const suppExcerpt = await rawPage.evaluate(() => ({
    query: '淘宝 注销账户 site:taobao.com',
    url: location.href,
    title: document.title,
    candidates: [...document.querySelectorAll('a')].filter(a => a.querySelector('h3')).slice(0, 8).map(a => ({ title: a.innerText.slice(0, 200), url: a.href }))
  }));
  await fs.writeFile(inside(ROOT, folder + '/evidence/search-official.json'), JSON.stringify(suppExcerpt, null, 2), 'utf8');

  await sanitizeDomBeforeCapture(rawPage);
  await rawPage.evaluate(() => {
    document.querySelectorAll('[data-ego-target]').forEach(el => el.removeAttribute('data-ego-target'));
    const anchors = [...document.querySelectorAll('a')].filter(a => a.href.includes('bk.taobao.com') && a.querySelector('h3'));
    const target = anchors[0]?.querySelector('h3') || document.querySelector('h3');
    target.setAttribute('data-ego-target', 'target-1');
    target.scrollIntoView({ block: 'center', behavior: 'instant' });
  });
  await rawPage.waitForTimeout(200);
  results.row54.c01 = await capture(p, folder, '01-search', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });

  await rawPage.goto('https://bk.taobao.com/k/taobaozhanghao_488/551c80860ad7191fe1d59b23428e7799.html', { timeout: 25000 });
  await rawPage.cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await rawPage.waitForTimeout(1000);
  await sanitizeDomBeforeCapture(rawPage);

  // 02-step1: Main title / Step 1
  await tagTargetByText(rawPage, ['淘宝账号如何注销', '一、']);
  await rawPage.waitForTimeout(200);
  results.row54.c02 = await capture(p, folder, '02-step1', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });

  // 03-step2: Section 二 (找到正确的入口：进入“我的淘宝” -> 账户设置 / 账户与安全)
  await tagTargetByText(rawPage, ['找到正确的入口：进入“我的淘宝”', '账户与安全']);
  await rawPage.waitForTimeout(200);
  results.row54.c03 = await capture(p, folder, '03-step2', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });

  // 04-step3: Section 三 & 四 (提交注销申请：按照指引填写必要信息)
  await tagTargetByText(rawPage, ['提交注销申请：按照指引填写必要信息', '审核过程：耐心等待审核结果']);
  await rawPage.waitForTimeout(200);
  results.row54.c04 = await capture(p, folder, '04-step3', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });

  // 05-step4: Section 五 (注意事项：注销前的准备工作)
  await tagTargetByText(rawPage, ['注意事项：注销前的准备工作', '1. 处理未完成的交易']);
  await rawPage.waitForTimeout(200);
  results.row54.c05 = await capture(p, folder, '05-step4', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });
}

// === Row 55: 네이버회원탈퇴하는방법 (spaceId 15) ===
{
  const folder = '26_1111/앱사용_네이버회원탈퇴하는방법/웹조사';
  const rawDir = inside(ROOT, folder + '/raw');
  for (const f of await fs.readdir(rawDir).catch(() => [])) {
    await fs.unlink(rawDir + '/' + f).catch(() => {});
  }
  const task = await taskSpace(15);
  const rawPage = task.page('p1');
  const p = wrapPageForCapture(rawPage);

  await rawPage.goto('https://www.google.com/search?q=' + encodeURIComponent('네이버회원탈퇴하는방법'), { timeout: 25000 });
  await rawPage.cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await rawPage.waitForTimeout(800);
  await sanitizeDomBeforeCapture(rawPage);
  await rawPage.evaluate(() => {
    document.querySelectorAll('[data-ego-target]').forEach(el => el.removeAttribute('data-ego-target'));
    const anchors = [...document.querySelectorAll('a')].filter(a => a.href.includes('help.naver.com/service/5640/contents/1435') && a.querySelector('h3'));
    const target = anchors[0]?.querySelector('h3') || document.querySelector('h3');
    target.setAttribute('data-ego-target', 'target-1');
    target.scrollIntoView({ block: 'center', behavior: 'instant' });
  });
  await rawPage.waitForTimeout(200);
  results.row55.c01 = await capture(p, folder, '01-search', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });

  // 02-step1: https://help.naver.com/service/5640/contents/1435?osType=PC&lang=ko
  await rawPage.goto('https://help.naver.com/service/5640/contents/1435?osType=PC&lang=ko', { timeout: 25000 });
  await rawPage.cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await rawPage.waitForTimeout(1200);
  await sanitizeDomBeforeCapture(rawPage);
  await tagTargetByText(rawPage, ['1. 네이버 홈에서 네이버ID를 클릭합니다', '회원 탈퇴 방법 안내']);
  await rawPage.waitForTimeout(200);
  results.row55.c02 = await capture(p, folder, '02-step1', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });

  // 03-step2: https://help.naver.com/service/5630/contents/1788
  await rawPage.goto('https://help.naver.com/service/5630/contents/1788', { timeout: 25000 });
  await rawPage.cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await rawPage.waitForTimeout(1200);
  await sanitizeDomBeforeCapture(rawPage);
  await tagTargetByText(rawPage, ['네이버 홈 > 메뉴(≡) > 설정 > 별명 >', '네이버 회원 탈퇴 방법']);
  await rawPage.waitForTimeout(200);
  results.row55.c03 = await capture(p, folder, '03-step2', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });

  // 04-step3 & 05-step4: https://help.naver.com/service/5640/contents/9545?lang=ko
  await rawPage.goto('https://help.naver.com/service/5640/contents/9545?lang=ko', { timeout: 25000 });
  await rawPage.cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await rawPage.waitForTimeout(1200);
  await sanitizeDomBeforeCapture(rawPage);

  await tagTargetByText(rawPage, ['2. Npay, 부동산 중개업소, 애드포스트 등의 서비스를 먼저', '1. (구) 단체 아이디의 관리자를 위임한 후']);
  await rawPage.waitForTimeout(200);
  results.row55.c04 = await capture(p, folder, '04-step3', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });

  await tagTargetByText(rawPage, ['탈퇴 후 바로 다시 가입할 수 있나요?', '7. 네이버 인증서 서비스 해지 후 탈퇴하세요']);
  await rawPage.waitForTimeout(200);
  results.row55.c05 = await capture(p, folder, '05-step4', ['[data-ego-target="target-1"]'], { width: 390, height: 844 });
}

console.log(JSON.stringify(results, null, 2));
