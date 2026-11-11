import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { inside } from '../../../tools/research_browser.mjs';

const ROOT = fileURLToPath(new URL('../../../', import.meta.url));
const appleFolder = '26_1111/앱사용_애플 환불 요청/웹조사';

const t12 = await taskSpace(12);
const aP2 = t12.page('p2');

const pages = [
  'https://support.apple.com/ko-kr/118223',
  'https://support.apple.com/ko-kr/118224',
  'https://support.apple.com/ko-kr/108099',
  'https://support.apple.com/ko-kr/118428'
];

const allAppleImgs = [];
for (const u of pages) {
  await aP2.goto(u);
  await aP2.waitForLoadState();
  const imgs = await aP2.evaluate(() =>
    [...document.querySelectorAll('img')].map(i => ({
      pageUrl: location.href,
      src: i.src || i.getAttribute('src') || i.getAttribute('data-src') || '',
      alt: i.alt || ''
    })).filter(i => i.src && i.src.includes('cdsassets.apple.com'))
  );
  allAppleImgs.push(...imgs);
}

console.log(JSON.stringify(allAppleImgs, null, 2));
