import fs from 'node:fs/promises';
import {pngSize} from '../../../tools/research_browser.mjs';
const p=(await taskSpace(3)).page('p1');
console.log(JSON.stringify({dom:await p.evaluate(()=>({width:innerWidth,height:innerHeight,dpr:devicePixelRatio,visual:{x:visualViewport.offsetLeft,y:visualViewport.offsetTop,w:visualViewport.width,h:visualViewport.height,scale:visualViewport.scale}})),metrics:await p.cdp('Page.getLayoutMetrics',{})}));
for(const fromSurface of [true,false]){const shot=await p.cdp('Page.captureScreenshot',{format:'png',fromSurface,captureBeyondViewport:false});const bytes=Buffer.from(shot.data,'base64');await fs.writeFile(new URL(`diagnostic-${fromSurface}.png`,import.meta.url),bytes);console.log(JSON.stringify({fromSurface,png:pngSize(bytes)}));}
