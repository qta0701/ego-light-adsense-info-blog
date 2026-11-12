const fs=await import('node:fs/promises');const path='Y:/antigravity-project/ego-light-adsense-info-blog/26_1111/앱사용_번개장터 카드 결제/웹조사/evidence/blogger-state.json';
const s=JSON.parse(await fs.readFile(path,'utf8'));s.sheetVerified={G:'ㅇ',H:s.publicUrl,L:'2026. 11. 12 오후 9:27:00',checkedAt:new Date().toISOString()};s.recovery.spaceFinishedAt=new Date().toISOString();await fs.writeFile(path,JSON.stringify(s,null,2)+'\n','utf8');
const task=await taskSpace(21);await task.finish({keep:[]});
