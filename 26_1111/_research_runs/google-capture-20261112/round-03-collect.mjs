import { collect, jobs, openGuide, openSearch, readResearch, writeRun } from "./capture.mjs";

const task = await taskSpace(29);
const page = task.page("p1");
const refined = {
  44: ["카카오톡 광고 차단 방법 카카오비즈니스 광고 이용 신고 안내", "site:kakaobusiness.gitbook.io 광고 이용 신고 안내 카카오 비즈보드", "site:info.ad.daum.net 카카오 맞춤형 광고"],
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

const guides = {
  47: [
    ["korail-press", "S1", "승차권 변경 서비스 확대", "코레일 보도자료에서 승차권 변경 서비스 확대 확인"],
  ],
  48: [
    ["daangn-packing", "S1", "바로구매 택배/포장 방법", "당근 바로구매 택배 포장 및 발송 안내", "https://daangn.com/wv/faqs/24607?from_kind=instant_buy"],
    ["daangn-delivery", "S1", "바로구매 배송 유의사항은 무엇인가요?", "당근 바로구매 택배 규격과 배송 유의사항", "https://daangn.com/wv/faqs/23132?from_kind=instant_buy"],
  ],
  49: [
    ["daangn-escrow", "S1", "안심결제 서비스는 무엇인가요?", "당근 고객센터에서 구매확정과 결제대금 전달 방식 확인"],
  ],
  54: [
    ["taobao-app-route", "S1", "账户与安全-注销账户", "알리바바 공식 문서의 타오바오 앱 탈퇴 메뉴"],
    ["taobao-after-closure", "S2", "注销您的淘宝账号将导致", "타오바오 계정 탈퇴 후 계정과 서비스 이용에 생기는 변경"],
  ],
};

const summary = [];
for (const [row, job] of jobs) {
  const data = await readResearch(job);
  const sources = data.sources.filter(source => source.official);
  const result = { row, search: [], guides: [] };
  summary.push(result);
  for (const query of [job.keyword, ...refined[row]]) {
    try {
      const match = await openSearch(page, job, query, sources);
      if (!match.href) {
        result.search.push({ query, ...match });
        if (match.blocker) break;
        continue;
      }
      await collect(page, job, "google-official-20261112", {
        role: "search", query, sourceId: match.source.id, sourceTitle: match.source.title,
        targetTitle: match.title, targetUrl: match.href, sourceUrl: match.source.url,
        caption: "Google 검색에서 실제 확인한 공식 결과 · " + match.title,
      });
      result.search.push({ query, href: match.href, status: "captured" });
      break;
    } catch (error) {
      result.search.push({ query, error: error.message });
    }
  }
  if (result.search.some(entry => entry.blocker)) break;
  for (const [name, id, phrase, caption, relatedUrl] of guides[row] ?? []) {
    const source = sources.find(s => s.id === id);
    const url = relatedUrl ?? source.url;
    try {
      const text = await openGuide(page, url, phrase);
      if (!text) throw Error("No bounded element for observed phrase");
      await collect(page, job, name + "-20261112", {
        role: "guide", sourceId: id, sourceTitle: source.title, targetTitle: text, targetUrl: url,
        sourceUrl: url, caption,
      });
      result.guides.push({ name, status: "captured" });
    } catch (error) {
      result.guides.push({ name, error: error.message });
    }
  }
  await writeRun("capture-attempts.json", summary);
  if (!result.search.some(entry => entry.status === "captured") || result.guides.some(entry => entry.error)) {
    console.log(JSON.stringify({ row, status: "needs_followup", search: result.search.map(({ candidates, ...attempt }) => attempt), guides: result.guides }));
  }
}
