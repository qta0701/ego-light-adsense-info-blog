import {capture} from '../../../tools/research_browser.mjs';
const task = await taskSpace(20);
const page = task.page('p1');
await page.evaluate(() => document.querySelector('.right_text ul.bu.dl').scrollIntoView({block:'center'}));
console.log(await capture(page,'26_1113/이슈_코레일 민원접수/웹조사','06_post',['.right_text ul.bu.dl'],{width:1000,height:700}));
