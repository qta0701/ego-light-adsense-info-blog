const fs=await import('node:fs/promises');const root='Y:/antigravity-project/ego-light-adsense-info-blog/';
for(const [id,keyword] of [[7,'넷플릭스 한국 인기 영화 순위 확인 방법'],[8,'넷플릭스 오리지널 역대 영화 순위']]){
 const base=`26_1107/앱사용_${keyword}/웹조사/`,statePath=root+base+'evidence/blogger-state.json',txtPath=root+base+`publish/앱사용_${keyword}_제목메타디스크립션.txt`;const s=JSON.parse(await fs.readFile(statePath,'utf8'));
 s.sheet={G:'ㅇ',H:s.url,L:'2026-11-08 23:45:00 KST',verified:true};s.status='published';await fs.writeFile(statePath,JSON.stringify(s,null,2),'utf8');
 let txt=await fs.readFile(txtPath,'utf8');txt+=`\n공개 발행 확인: ${s.url}\n실제 발행 시각: ${s.publishedAt}\nG/H/L: ㅇ / 실제 URL / 2026-11-08 23:45:00 KST (재조회 확인)\n이미지 로딩: ${s.images.length}개 확인\n`;await fs.writeFile(txtPath,txt,'utf8');
}
const base='26_1107/앱사용_넷플릭스 성인인증 방법/웹조사/';const collision={row:55,keyword:'넷플릭스 성인인증 방법',folder:base,blogId:'7162964317827704236',spaceId:12,status:'blocked_existing_published_candidate',existingPostId:'7132914960626169988',existingTitle:'넷플릭스 성인인증 방법 오류 코드 tvq-pm-103 해결법 총정리',existingUrl:'https://app.supportimes.com/2026/09/netflix-age-verify-guide.html',reason:'동일 키워드 공개 글 존재; 요청에 기존 글 ID가 없어 같은 글로 단정하거나 재개하지 않음',sheet:{G:'빈 셀',H:'빈 셀',L:'빈 셀',verified:true}};
await fs.writeFile(root+base+'evidence/blogger-state.json',JSON.stringify(collision,null,2),'utf8');
const txtPath=root+base+'publish/앱사용_넷플릭스 성인인증 방법_제목메타디스크립션.txt';let txt=await fs.readFile(txtPath,'utf8');txt+=`\n\n[B 단계 보류]\n기존 공개 글 후보: ${collision.existingTitle}\npostId: ${collision.existingPostId}\nURL: ${collision.existingUrl}\n동일 원고 여부 미확인; 신규 생성 및 시트 기록 보류.\n`;await fs.writeFile(txtPath,txt,'utf8');
for(const id of [7,8,12]){const task=await taskSpace(id);await task.finish({keep:[]});console.log(JSON.stringify({spaceId:id,finished:true}));}
