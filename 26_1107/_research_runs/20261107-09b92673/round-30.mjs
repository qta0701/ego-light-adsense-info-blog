const t=await taskSpace(1),p=t.page('p1');await p.goto('https://www.netflix.com/tudum/top10/south-korea');await p.click('loc=role:button[name="The Ultimate Duo"]');
console.log(JSON.stringify({text:(await p.evaluate(()=>document.body.innerText)).slice(-3000),snapshot:(await p.snapshot()).slice(-6000)}));
