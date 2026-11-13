const fs=await import('node:fs/promises'), path=await import('node:path'), crypto=await import('node:crypto');
const base='Y:/antigravity-project/ego-light-adsense-info-blog', run=`${base}/26_1113/_blogger_runs/20261113-blogger-1419`;
for (const [order,name] of [[4,'노하우_앱스토어 국가변경'],[5,'노하우_코레일 승차권 조회'],[6,'노하우_모바일 티머니 환불']]) {
 const dir=`${base}/26_1113/${name}/웹조사`, pub=`${dir}/publish`, files=await fs.readdir(pub);
 const htmlPath=`${pub}/${files.find(x=>x.endsWith('_html콘텐츠.html'))}`, txtPath=`${pub}/${files.find(x=>x.endsWith('_제목메타디스크립션.txt'))}`;
 const html=await fs.readFile(htmlPath,'utf8'), txt=await fs.readFile(txtPath,'utf8');
 const blocks=txt.split(/(?=삽입 ID: IMG_\d+)/).slice(1).map(s=>s.split(/\n\[제외·보류 이미지\]/)[0]);
 const imgs=[];
 for(const b of blocks) {
   const id=b.match(/삽입 ID: (IMG_\d+)/)?.[1], p=b.match(/업로드 파일(?: 경로)?:\s*(.+)/)?.[1]?.trim();
   const raw=b.match(/원본 경로:\s*(.+)/)?.[1]?.trim() ?? b.match(/원본 파일번호 \/ 원본 파일:\s*\d+\s*\/\s*(.+)/)?.[1]?.trim();
   let file=null, error=null;
   try {let bytes=await fs.readFile(`${base}/${p}`); file={bytes:bytes.length,width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20),sha256:crypto.createHash('sha256').update(bytes).digest('hex')};}catch(e){error=String(e)}
   let rawExists=false; try{await fs.access(`${base}/${raw}`); rawExists=true}catch{}
   const slot=html.match(new RegExp(`<[^>]+data-image-id=["']${id}["'][\\s\\S]*?IMAGE_SLOT:${id} END`))?.[0] ?? '';
   imgs.push({id,path:p,raw,rawExists,file,error,tokenCount:html.split(`{{BLOGGER_IMAGE_URL_${id}}}`).length-1,htmlSlot:html.includes(`data-image-id="${id}"`),alt:b.match(/권장 alt:\s*(.+)/)?.[1],caption:b.match(/권장 캡션:\s*(.+)/)?.[1],evidence:b.match(/(?:출처명 \/ 실제 화면 URL \/ 확인일|출처):\s*(.+)/)?.[1],edit:b.match(/(?:채택 사유·편집|설명 및 채택 사유 \/ 편집):\s*(.+)/)?.[1],privacy:b.match(/가림·가독성 검수:\s*(.+)/)?.[1]});
 }
 const saved=`${run}/original-${order}`; await fs.mkdir(saved,{recursive:true}); await fs.copyFile(htmlPath,`${saved}/${path.basename(htmlPath)}`); await fs.copyFile(txtPath,`${saved}/${path.basename(txtPath)}`);
 for(const img of imgs){if(img.file) await fs.copyFile(`${base}/${img.path}`,`${saved}/${img.id}-${path.basename(img.path)}`);}
 const research=JSON.parse(await fs.readFile(`${dir}/research.json`,'utf8')), review=JSON.parse(await fs.readFile(`${dir}/evidence/review.json`,'utf8'));
 const info={order,name,at:new Date().toISOString(),htmlPath,txtPath,originalCount:imgs.length,images:imgs,research,review,htmlTokens:[...html.matchAll(/\{\{BLOGGER_IMAGE_URL_(IMG_\d+)\}\}/g)].map(x=>x[1])};
 await fs.writeFile(`${run}/images-${order}.json`,JSON.stringify(info,null,2));
 console.log(JSON.stringify({order,count:imgs.length,images:imgs,htmlTokens:info.htmlTokens}));
}
