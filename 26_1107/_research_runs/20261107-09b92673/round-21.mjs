import {observePage} from '../../../tools/research_observe.mjs';
const t=await taskSpace(3),p=t.page('p1');
await p.click('text="입력하신 정보가 맞지 않습니다. 입력하신 항목을 확인하신 후 수정해 주세요."');
console.log(JSON.stringify(await observePage(p,'26_1107/앱사용_넷플릭스 성인인증 방법/웹조사','errors-expanded',{selector:'body',maxChars:3500,linksLimit:5})));
