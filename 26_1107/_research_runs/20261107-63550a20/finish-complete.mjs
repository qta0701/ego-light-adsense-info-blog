import {finishJob} from '../../../tools/research_browser.mjs';
for(const folder of ['26_1107/앱사용_당근마켓 전국검색/웹조사','26_1107/앱사용_번개장터 계좌거래/웹조사']){
 await finishJob(folder); console.log('finished',folder);
}
