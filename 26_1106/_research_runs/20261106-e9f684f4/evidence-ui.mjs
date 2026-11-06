import {capture} from '../../../tools/research_browser.mjs';
const k=(await taskSpace(3)).page('p1');try{console.log(JSON.stringify({id:3,capture:await capture(k,'26_1106/앱사용_코레일 승차권 전달/웹조사','02_login',['h2'],{width:1100,height:900})}));}catch(e){console.log(JSON.stringify({id:3,error:String(e)}));}
const d=(await taskSpace(4)).page('p1');console.log(JSON.stringify({id:4,snap:(await d.snapshot()).slice(0,6500)}));
