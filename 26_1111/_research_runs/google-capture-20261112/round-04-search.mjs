import { collect, jobs, matchesOfficialUrl, openSearch, readResearch, writeRun } from "./capture.mjs";

const task = await taskSpace(29);
const page = task.page("p1");
const hints = {
  44: { S1: ["광고 이용/신고 안내"], S2: ["카카오 맞춤형 광고 안내"] },
  45: { S1: ["대화 백업·복원", "대화를 백업하고 복원"], S2: ["카카오톡, 라인 메시지 앱 백업 및 복원 방법"] },
  46: { S1: ["패스 소개"] },
  47: { S1: ["승차권 변경 서비스 확대"] },
  48: { S1: ["바로구매 서비스는 무엇인가요"], S2: ["중고거래 '바로구매' 기능 도입"] },
  49: { S1: ["안심결제 서비스는 무엇인가요"], S2: ["당근페이로 안전하게 거래하기"] },
  50: { S1: ["GS25 반값택배가 뭔가요"], S2: ["편의점/방문 택배 편"] },
  51: { S1: ["카드/간편결제 편"], S2: ["WEB 에서 신용/체크카드 결제"] },
  52: { S1: ["넷플릭스 해지 방법"] },
  53: { S1: ["TCL TV에서 넷플릭스를 이용하는 방법"], S2: ["디바이스에서 로그아웃하는 방법"] },
  54: { S1: ["淘宝开放平台", "隐私政策"], S2: ["淘宝账号注销重要提醒"] },
  55: { S1: ["회원 탈퇴 방법 안내"], S2: ["회원 탈퇴 시 확인해야 하는 사항 안내"] },
  56: { S1: ["환불 요청 방법"], S2: ["Steam 환불"] },
  57: { S1: ["Apple에서 구입한 앱 또는 콘텐츠의 환불 요청하기"], S2: ["Apple에서 구입한 앱 또는 콘텐츠의 환불 상태 확인하기"] },
};

const refined = {
  44: ["카카오톡 광고 차단 방법 카카오비즈니스 광고 이용 신고 안내", "site:info.ad.daum.net 카카오 맞춤형 광고"],
  45: ["카카오톡 대화내용 복구 카카오 고객센터 대화를 백업하고 복원하려면"],
  46: ["코레일 내일로 패스 site:korail.com 패스 소개"],
  47: ["코레일 코레일톡 승차권 변경 서비스 확대 site:info.korail.com"],
  48: ["당근 바로구매 서비스는 무엇인가요 site:cs.kr.karrotmarket.com"],
  49: ["당근페이 안심결제 site:link.daangnpay.com"],
  50: ["번개장터 GS25 반값택배 site:help.bunjang.co.kr"],
  51: ["번개장터 카드 간편결제 활용 백서 site:bgzt.co.kr"],
  52: ["넷플릭스 해지 방법 site:help.netflix.com"],
  53: ["넷플릭스 디바이스에서 로그아웃하는 방법 site:help.netflix.com"],
  54: ["淘宝账号注销重要提醒 site:terms.alicdn.com", "淘宝 账户注销 121398 site:developer.alibaba.com"],
  55: ["네이버 회원 탈퇴 방법 안내 site:help.naver.com"],
  56: ["Steam 환불 요청 방법 site:help.steampowered.com"],
  57: ["Apple에서 구입한 앱 또는 콘텐츠의 환불 요청하기 site:support.apple.com"],
};

const summary = [];
for (const [row, job] of jobs) {
  const data = await readResearch(job);
  // For TV logout, the official remote-device guide is the closer match to the
  // existing results than a brand-specific TV manual.
  const sources = data.sources.filter(source => source.official);
  if (row === 53) sources.reverse();
  const attempts = [];
  summary.push({ row, attempts });
  for (const query of [job.keyword, ...refined[row]]) {
    try {
      const match = await openSearch(page, job, query, sources, hints[row]);
      if (!match.href) {
        attempts.push({ query, blocker: match.blocker, titles: match.candidates?.map(candidate => candidate.title) });
        if (match.blocker) break;
        continue;
      }
      await collect(page, job, "google-official-20261112", {
        role: "search", query, sourceId: match.source.id, sourceTitle: match.source.title,
        targetTitle: match.title, sourceUrl: match.source.url,
        caption: "Google 검색에서 실제로 연 공식 결과 · " + match.title,
      }, async selector => {
        const receipt = await page.click(selector, { label: "표시한 공식 검색 결과 열기" });
        const popup = receipt?.popups?.[0]?.label;
        const target = popup ? task.page(popup) : page;
        try {
          await target.waitForFunction(() => !["www.google.com", "www.google.co.kr"].includes(location.hostname), undefined, { timeout: 7000 });
          const targetUrl = await target.url();
          if (!matchesOfficialUrl(targetUrl, match.source.url)) {
            throw Error("Opened URL differs from visit evidence: " + targetUrl);
          }
          return { targetUrl, targetPageTitle: await target.title(), verifiedBy: "clicked matching Google result" };
        } finally {
          if (popup) await target.close();
        }
      });
      attempts.push({ query, status: "captured", sourceUrl: match.source.url });
      break;
    } catch (error) {
      attempts.push({ query, error: error.message });
    }
  }
  await writeRun("search-verification.json", summary);
  if (!attempts.some(attempt => attempt.status === "captured")) console.log(JSON.stringify({ row, attempts }));
  if (attempts.some(attempt => attempt.blocker)) break;
}
