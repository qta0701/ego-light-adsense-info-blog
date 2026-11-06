import {capture} from '../../../tools/research_browser.mjs';
import {observePage} from '../../../tools/research_observe.mjs';
const k=(await taskSpace(3)).page('p1'),kf='26_1106/앱사용_코레일 승차권 전달/웹조사';
await k.click('loc=role:button[name="승차권이용"]');console.log(JSON.stringify({id:3,obs:await observePage(k,kf,'use-faq',{selector:'body',maxChars:2400,linksLimit:3}),snap:(await k.snapshot()).slice(-5000)}));
const d=(await taskSpace(4)).page('p1');console.log(JSON.stringify({id:4,dom:await d.evaluate(()=>({headings:[...document.querySelectorAll('h1,h2,h3')].map(e=>({html:e.outerHTML})),images:[...document.querySelectorAll('img')].map(e=>{const r=e.getBoundingClientRect();return {tag:e.tagName,box:[r.x,r.y,r.width,r.height]};})}))}));
