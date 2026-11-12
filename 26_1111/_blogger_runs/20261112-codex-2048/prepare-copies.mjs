import fs from 'node:fs/promises';
import path from 'node:path';
const root='Y:/antigravity-project/ego-light-adsense-info-blog';
const run=path.join(root,'26_1111/_blogger_runs/20261112-codex-2048');
for (const [row,keyword] of [[44,'카카오톡 광고 차단 방법'],[45,'카카오톡 대화내용 복구'],[46,'코레일 내일로 패스']]) {
  const dir=path.join(root,`26_1111/앱사용_${keyword}/웹조사/publish`);
  const base=`앱사용_${keyword}`;
  const html=await fs.readFile(path.join(dir,`${base}_html콘텐츠.html`),'utf8');
  const txt=await fs.readFile(path.join(dir,`${base}_제목메타디스크립션.txt`),'utf8');
  await fs.writeFile(path.join(run,`original-${row}.html`),html);
  await fs.writeFile(path.join(run,`original-${row}.txt`),txt);
  const cleaned=html.replace(/<!-- IMAGE_SLOT:IMG_\d+ START -->[\s\S]*?<!-- IMAGE_SLOT:IMG_\d+ END -->\s*/g,'');
  if ((html.match(/IMAGE_SLOT:IMG_\d+ START/g)||[]).length!==3 || /BLOGGER_IMAGE_URL|IMAGE_SLOT|<img\b/i.test(cleaned)) throw Error(`Unexpected image structure ${row}`);
  const revised=txt.replace(/\[Blogger 이미지 업로드 추천 순서와 삽입 위치\][\s\S]*?(?=\[업로드 담당 에이전트 전달사항\])/,'[Blogger 이미지 업로드 추천 순서와 삽입 위치]\n채택 이미지 0개 / 제외 3개 / 대체 0개\n대표 이미지 및 업로드 순서: 없음\nIMG_01, IMG_02, IMG_03: 공식 문서 인쇄본의 공개 재사용 근거가 확인되지 않아 제외. 같은 키워드에 확인된 대체 이미지 없음. 본문 설명과 표 및 공식 링크로 핵심 안내를 제공함. 원본 HTML/TXT는 실행 디렉터리 original 파일에 보존.\n\n[제외·보류 이미지]\n01_official-print.png, 02_official-print.png, 03_official-print.png: 공개 재사용 근거 부족으로 제외.\n\n');
  if(revised===txt) throw Error(`TXT section missing ${row}`);
  await fs.writeFile(path.join(run,`publish-${row}.html`),cleaned);
  await fs.writeFile(path.join(run,`publish-${row}.txt`),revised);
  console.log(JSON.stringify({row,removed:3,htmlLength:cleaned.length}));
}
