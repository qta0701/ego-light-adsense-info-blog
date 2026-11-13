const fs=await import('node:fs/promises'); const task=await taskSpace(34); const page=task.page('p1');
const root='Y:/antigravity-project/ego-light-adsense-info-blog/26_1113/노하우2_진학어플라이 회원가입/웹조사/';
const stateFile=root+'evidence/blogger-state.json';
for(const [id,path] of [['IMG_02','publish/blogger-images/05_signup_live_marked.png'],['IMG_03','publish/03_03_guide_agree.png'],['IMG_04','publish/04_04_guide_form.png']]) {
  await page.click('loc=role:button[name="이미지 삽입"]');
  await page.click('loc=role:menuitem[name="컴퓨터에서 업로드"]');
  await page.waitForSelector('text="찾아보기"',{timeout:30000});
  await page.setInputFiles('input[type=file]',[root+path]);
  await page.waitForSelector('text="레이아웃 선택"',{timeout:60000});
  await page.click('text="원본 크기"'); await page.click('text="확인"');
  const name=path.split('/').at(-1);
  await page.waitForFunction(n=>[...document.querySelectorAll('.CodeMirror')].some(e=>e.CodeMirror?.getValue().includes(n)),name,{timeout:30000});
  const code=await page.evaluate(()=>[...document.querySelectorAll('.CodeMirror')].find(e=>e.CodeMirror)?.CodeMirror.getValue());
  const urls=[...code.matchAll(/https:\/\/[^"\s]+/g)].map(x=>x[0]); const url=urls.find(u=>u.includes(name));
  if(!url) throw new Error(`${id} URL missing`);
  const state=JSON.parse(await fs.readFile(stateFile,'utf8')); state.images.push({id,path:root+path,url,uploadedAt:new Date().toISOString()}); await fs.writeFile(stateFile,JSON.stringify(state,null,2),'utf8');
  console.log(JSON.stringify({id,url}));
}
