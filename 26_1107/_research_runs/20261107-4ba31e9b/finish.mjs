import {finishJob} from '../../../tools/research_browser.mjs';
for(const folder of ['26_1107/앱사용_넷플릭스 한국 인기 영화 순위 확인 방법/웹조사','26_1107/앱사용_넷플릭스 오리지널 역대 영화 순위/웹조사']){await finishJob(folder);console.log('finished',folder);}
