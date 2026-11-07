import {capture} from '../../../tools/research_browser.mjs';
const t=await taskSpace(3),p=t.page('p1');
console.log('form',JSON.stringify(await capture(p,'26_1107/앱사용_넷플릭스 성인인증 방법/웹조사','guide-form',['h1'],{width:900,height:700})));
