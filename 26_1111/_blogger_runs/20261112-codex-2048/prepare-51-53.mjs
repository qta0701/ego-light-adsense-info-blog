import fs from 'node:fs/promises';
import path from 'node:path';
const root='Y:/antigravity-project/ego-light-adsense-info-blog', run=path.join(root,'26_1111/_blogger_runs/20261112-codex-2048');
for(const [row,keyword,count] of [[51,'번개장터 카드 결제',5],[52,'넷플릭스 해지방법',6],[53,'넷플릭스 로그아웃 티비',3]]) {
  const base=`앱사용_${keyword}`,dir=path.join(root,'26_1111',base,'웹조사/publish');
  let html=await fs.readFile(path.join(dir,`${base}_html콘텐츠.html`),'utf8');
  let txt=await fs.readFile(path.join(dir,`${base}_제목메타디스크립션.txt`),'utf8');
  await fs.writeFile(path.join(run,`original-${row}.html`),html); await fs.writeFile(path.join(run,`original-${row}.txt`),txt);
  const slots=[...html.matchAll(/<!-- IMAGE_SLOT:(IMG_\d+) START -->[\s\S]*?<!-- IMAGE_SLOT:\1 END -->\s*/g)];
  if(slots.length!==count) throw Error(`slot mismatch ${row}: ${slots.length}`);
  html=html.replace(/<!-- IMAGE_SLOT:(IMG_\d+) START -->[\s\S]*?<!-- IMAGE_SLOT:\1 END -->\s*/g,'');
  if(row===51) html=html.replace('아래 앱 화면은 2025년 8월에 공개된 번개장터 공식 활용백서의 예시입니다. 안내 문서는 2026년 11월 12일에 다시 확인했습니다. 화면 속 금액·적립 문구·할부 기간은 예시로 보고, 실제 조건은 본인의 결제 화면에서 확인하세요.','안내 문서는 2026년 11월 12일에 다시 확인했습니다. 실제 금액과 할부 조건은 본인의 결제 화면에서 확인하세요.').replace(' 예시 화면의 영수증 이메일은 선택 항목이므로 이메일로 받고 싶을 때 입력하세요.','');
  if(row===52) html=html.replace('위 이미지는 넷플릭스 고객센터의 화면 예시이며, 계정별 메뉴는 결제 방식이나 멤버십 상태에 따라 달라질 수 있습니다.','계정별 메뉴는 결제 방식이나 멤버십 상태에 따라 달라질 수 있습니다.');
  if(row===53) html=html.replace('아래 예시의 <strong>스마트 TV 카드 오른쪽에 있는 아래쪽 화살표</strong>','<strong>스마트 TV 카드 오른쪽에 있는 아래쪽 화살표</strong>').replace(' 아래 예시에서는 스마트 TV 항목 안에 로그아웃 버튼이 보입니다.','').replace('위 이미지는 고객 센터에 공개된 예시이며, 실제 계정의 기기 목록과 로그아웃 처리 결과는 확인 범위에 포함되지 않습니다.','실제 계정의 기기 목록과 로그아웃 처리 결과는 확인 범위에 포함되지 않습니다.');
  if(/BLOGGER_IMAGE_URL|IMAGE_SLOT|<img\b/i.test(html)) throw Error(`remaining image ${row}`);
  const section=/\[Blogger 이미지 업로드 추천 순서와 삽입 위치\][\s\S]*?(?=\[제외·보류 이미지\])/;
  if(!section.test(txt)) throw Error(`missing section ${row}`);
  txt=txt.replace(section,`[Blogger 이미지 업로드 추천 순서와 삽입 위치]\n채택 0개 / 이번 실행 제외 ${count}개 / 대체 0개. ${slots.map(s=>s[1]).join(', ')}: 공개 재사용 근거 부족 및 적합한 대체 이미지 없음. 해당 슬롯·토큰·캡션과 이미지 의존 문구를 삭제하고 본문과 공식 링크로 핵심 절차를 유지함. 원본 HTML/TXT는 실행 폴더 original-${row}에 보존.\n\n`);
  txt+=`\n[2026-11-12 B 발행용 사본 결정]\n채택 0개, 제외 ${count}개, 대체 0개. 이 섹션이 이전 이미지 업로드 및 미리보기 지시보다 우선합니다.\n`;
  await fs.writeFile(path.join(run,`publish-${row}.html`),html); await fs.writeFile(path.join(run,`publish-${row}.txt`),txt);
  console.log({row,removed:slots.map(s=>s[1]),htmlLength:html.length});
}
