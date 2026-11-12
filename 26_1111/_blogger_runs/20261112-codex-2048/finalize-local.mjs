import fs from 'node:fs/promises';import path from 'node:path';
const root='Y:/antigravity-project/ego-light-adsense-info-blog',run=path.join(root,'26_1111/_blogger_runs/20261112-codex-2048');
for(const [row,keyword] of [[44,'카카오톡 광고 차단 방법'],[45,'카카오톡 대화내용 복구'],[46,'코레일 내일로 패스']]){
 const base=`앱사용_${keyword}`,dir=path.join(root,`26_1111/${base}/웹조사/publish`),statefile=path.join(root,`26_1111/${base}/웹조사/evidence/blogger-state.json`);
 const s=JSON.parse(await fs.readFile(statefile,'utf8'));if(row===46)s.publishedAt='2026-11-12T20:56:00+09:00';s.sheetVerified={G:'ㅇ',H:s.publicUrl,L:s.publishedAt};s.finalHtml=`26_1111/${base}/웹조사/publish/${base}_html콘텐츠.html`;s.finalMeta=`26_1111/${base}/웹조사/publish/${base}_제목메타디스크립션.txt`;
 const html=await fs.readFile(path.join(run,`publish-${row}.html`),'utf8');let txt=await fs.readFile(path.join(run,`publish-${row}.txt`),'utf8');
 txt=txt.replace(/^작업 상태:.*$/m,'작업 상태: 공개 발행 완료 / 이미지 0개');txt=txt.replace(/^발행 전 확인할 사실·이미지·광고 설정:.*$/m,'발행 확인: 이미지 재사용 근거 부족으로 기존 세 이미지를 제외했고 본문 설명과 공식 링크로 안내합니다. 광고·제휴 설정은 변경하지 않았습니다.');
 txt=txt.replace(/\[업로드 담당 에이전트 전달사항\][\s\S]*$/,'[Blogger 발행 결과]\n'+`runId: 20261112-codex-2048\nspaceId: ${s.spaceId}\nblogId: ${s.blogId}\npostId: ${s.postId}\neditorUrl: ${s.editorUrl}\n공개 URL: ${s.publicUrl}\n실제 발행 시각: ${s.publishedAt}\n퍼머링크: 추천 슬러그가 유지되지 않아 Blogger 자동 주소 사용\n이미지: 업로드 0 / 제외 3 / 대체 0\n시트 G/H/L: ㅇ / 위 URL / 위 발행 시각, 재조회 확인\n원본 HTML/TXT: 실행 디렉터리 original-${row}.html / original-${row}.txt\n`);
 await fs.writeFile(path.join(run,`publish-${row}.txt`),txt);await fs.writeFile(path.join(dir,`${base}_html콘텐츠.html`),html);await fs.writeFile(path.join(dir,`${base}_제목메타디스크립션.txt`),txt);await fs.writeFile(statefile,JSON.stringify(s,null,2));console.log({row,url:s.publicUrl});
}
