const t=await taskSpace(1);const p=t.page('p2');
console.log('BEFORE',await p.evaluate(()=>({w:innerWidth,h:innerHeight,dpr:devicePixelRatio,ua:navigator.userAgent})));
await p.cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
console.log('AFTER CDP',await p.cdp('Runtime.evaluate',{expression:'JSON.stringify({w:innerWidth,h:innerHeight,dpr:devicePixelRatio})',returnByValue:true}));
console.log('AFTER EVAL',await p.evaluate(()=>({w:innerWidth,h:innerHeight,dpr:devicePixelRatio})));
console.log(await p.snapshot());
const fs=await import('node:fs/promises');const shot=await p.cdp('Page.captureScreenshot',{format:'png'});await fs.writeFile('Y:/antigravity-project/ego-light-adsense-info-blog/26_1106/_research_session/mobile-test.png',Buffer.from(shot.data,'base64'));
