import {observePage} from '../../tools/research_observe.mjs';
const t=await taskSpace(10),p=t.page('p2'),f='26_1113/노하우2_배민클럽 환불/웹조사';
await p.waitForLoadState();console.log(JSON.stringify({home:await p.info(),observation:await observePage(p,f,'official-home')}));
await p.goto('https://kooltip.com/baemin-club-cancel/');
console.log(JSON.stringify({secondary:await p.info(),observation:await observePage(p,f,'secondary')}));
