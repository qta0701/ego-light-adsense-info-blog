const fs=await import('node:fs/promises'),file='Y:/antigravity-project/ego-light-adsense-info-blog/26_1111/앱사용_애플 환불 요청/웹조사/evidence/blogger-state.json';
const t=await taskSpace(27);await t.finish({keep:[]});
const s=JSON.parse(await fs.readFile(file,'utf8'));s.sheet={G:'ㅇ',H:s.publicUrl,L:'2026-11-12 21:58:00 KST',verifiedAt:new Date().toISOString()};s.claimReleased=true;s.spaceFinishedAt=new Date().toISOString();s.status='complete';await fs.writeFile(file,JSON.stringify(s,null,2));console.log(JSON.stringify({spaceId:27,spaceFinishedAt:s.spaceFinishedAt,status:s.status}));
