import fs from 'node:fs/promises';
import path from 'node:path';
const root='Y:/antigravity-project/ego-light-adsense-info-blog',run=path.join(root,'26_1111/_blogger_runs/20261112-codex-2048');
for(const [row,keyword,count] of [[48,'당근마켓 바로구매 택배',1],[49,'당근마켓 안심결제',2],[50,'번개장터 반값택배',2]]) {
 const base=`앱사용_${keyword}`, dir=path.join(root,'26_1111',base,'웹조사/publish');
 let html=await fs.readFile(path.join(dir,`${base}_html콘텐츠.html`),'utf8');
 let txt=await fs.readFile(path.join(dir,`${base}_제목메타디스크립션.txt`),'utf8');
 await fs.writeFile(path.join(run,`original-${row}.html`),html);await fs.writeFile(path.join(run,`original-${row}.txt`),txt);
 const found=[...html.matchAll(/<!-- IMAGE_SLOT:(IMG_\d+) START -->[\s\S]*?<!-- IMAGE_SLOT:\1 END -->\s*/g)];if(found.length!==count)throw Error(`slot mismatch ${row}`);
 html=html.replace(/<!-- IMAGE_SLOT:(IMG_\d+) START -->[\s\S]*?<!-- IMAGE_SLOT:\1 END -->\s*/g,'');
 if(row===48)html=html.replace('당근이 기능을 처음 공개했을 때의 예시 화면에서, 판매자는 가운데 화면의 거래 정보 아래 ‘바로구매 가능’을 켭니다.','판매글의 거래 정보에서 ‘바로구매 가능’을 켭니다.');
 if(row===49)html=html.replace(' 2024년 출시 당시 당근이 공개한 화면에서 채팅방 상단의 당근페이 버튼과 메뉴의 안심결제 항목을 볼 수 있습니다.','').replace(' 당근페이 공식 안내의 삽화는 결제하는 구매자와 물품을 보내는 판매자를 보여줍니다.','');
 if(row===50)html=html.replace(' 아래는 배송 예약 버튼의 위치를 보여 주는 번개장터 공식 안내 이미지입니다.','');
 if(/BLOGGER_IMAGE_URL|IMAGE_SLOT|<img\b/i.test(html))throw Error(`remaining image ${row}`);
 txt=txt.replace(/\[Blogger 이미지 업로드 추천 순서와 삽입 위치\][\s\S]*?(?=\[업로드 담당 에이전트 전달사항\])/,`[Blogger 이미지 업로드 추천 순서와 삽입 위치]\n채택 0개 / 이번 실행 제외 ${count}개 / 대체 0개. ${found.map(x=>x[1]).join(', ')}: 공개 재사용 근거 부족, 확인된 대체 이미지 없음. 슬롯과 캡션 및 참조 문구 제거. 설명·표·공식 링크로 핵심 안내 유지. 원본은 실행 폴더 original-${row}에 보존. 기존 원고의 별도 제외 후보는 원본 기록 참조.\n\n`);
 await fs.writeFile(path.join(run,`publish-${row}.html`),html);await fs.writeFile(path.join(run,`publish-${row}.txt`),txt);console.log({row,count,htmlLength:html.length});
}
