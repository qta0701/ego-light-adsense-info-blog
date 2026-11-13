const fs=await import('node:fs/promises');
const root='Y:/antigravity-project/ego-light-adsense-info-blog',base=`${root}/26_1113/_blogger_runs/20261113-blogger-1419`,keyword='신한은행 간편조회';
const task=await taskSpace(43),page=task.page('p1'),path=`${root}/26_1113/은행_재테크_${keyword}/웹조사/evidence/blogger-state.json`;
const state=JSON.parse(await fs.readFile(path,'utf8'));
for (const [i,[id,name]] of [['IMG_02','03_guide.png'],['IMG_03','02_guide.png'],['IMG_04','04_guide.png']].entries()) {
 if(i>0){await page.click('loc=role:button[name="이미지 삽입"]'); await page.waitForSelector('loc=role:menuitem[name="컴퓨터에서 업로드"]',{state:'visible'});}
 await page.click('loc=role:menuitem[name="컴퓨터에서 업로드"]');
 await page.waitForSelector('input[type=file]',{state:'attached',timeout:30000});
 await page.setInputFiles('input[type=file]',[`${root}/26_1113/은행_재테크_${keyword}/웹조사/publish/${name}`]);
 await page.waitForSelector('text=레이아웃 선택',{state:'visible',timeout:60000});
 await page.click('text="원본 크기"');await page.click('text="확인"');
 await page.waitForFunction(name=>[...document.querySelectorAll('.CodeMirror')].some(x=>x.CodeMirror && x.CodeMirror.getValue().includes(name)),name,{timeout:30000});
 const value=await page.evaluate(()=>[...document.querySelectorAll('.CodeMirror')].find(x=>x.CodeMirror)?.CodeMirror.getValue());
 const url=[...value.matchAll(/src="(https:\/\/blogger\.googleusercontent\.com\/[^"]+)"/g)].map(x=>x[1]).find(x=>x.endsWith('/'+name));if(!url)throw Error(`URL missing ${id}`);
 state.images.push({id,file:name,url,uploadedAt:new Date().toISOString()});
 await fs.writeFile(path,JSON.stringify(state,null,2));await fs.writeFile(`${base}/state-13.json`,JSON.stringify(state,null,2));console.log(JSON.stringify({id,url}));
}
