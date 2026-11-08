const spaces=await listTaskSpaces();
for(const row of [53,54]) {const s=spaces.find(x=>x.name===`codex-20261108-netflix-${row}`);const task=await taskSpace(s.id);const page=task.page('p1'); const snap=await page.snapshot();console.log(JSON.stringify({row,spaceId:s.id,tail:snap.slice(snap.lastIndexOf('listbox "글/페이지 상태 선택"'))}));}
