import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = 'y:/antigravity-project/ego-light-adsense-info-blog';
const RUN_DIR = path.join(ROOT, '26_1111/_research_runs/20261111-e088756e');
const sleep = ms => new Promise(r => setTimeout(r, ms));

// Clean up temporary diagnostic files in RUN_DIR
for (const tmp of ['diag-capture.mjs', 'diag-capture2.mjs', 'diag-capture3.mjs', 'diag-capture4.mjs', 'test-false.png']) {
  await fs.unlink(path.join(RUN_DIR, tmp)).catch(() => {});
}

// 1. Download missing Netflix official images (1 & 2) from spaceId 18 and clean up duplicate icon files (3, 6, 9)
{
  const folder = path.join(ROOT, '26_1111/앱사용_넷플릭스 해지방법/웹조사');
  const rawDir = path.join(folder, 'raw');
  for (const dup of ['official-netflix-407-3.webp', 'official-netflix-407-6.webp', 'official-netflix-407-9.webp']) {
    await fs.unlink(path.join(rawDir, dup)).catch(() => {});
  }

  const ts = await taskSpace(18);
  const p = await ts.page('p1');
  await p.goto('https://help.netflix.com/ko/node/407');
  await sleep(1500);
  await p.evaluate(() => {
    document.querySelectorAll('h3, [role="button"], summary, .accordion-header').forEach(el => {
      try { el.click(); } catch {}
    });
  });
  await sleep(800);

  const imgUrls = await p.evaluate(() => {
    return Array.from(document.querySelectorAll('img'))
      .map(img => ({
        alt: (img.alt || '').trim(),
        src: img.currentSrc || img.src || img.getAttribute('src') || ''
      }))
      .filter(x => x.src.startsWith('http'));
  });

  console.log('Netflix article images found:', imgUrls.length);
  for (const item of imgUrls) {
    let outName = null;
    if (item.src.includes('KO-Netflix_manage_membership_c.webp')) outName = 'official-netflix-407-1.webp';
    else if (item.src.includes('KO-Netflix_manage_membership_f.webp')) outName = 'official-netflix-407-2.webp';
    if (outName) {
      const res = await fetch(item.src);
      if (res.ok) {
        const ab = await res.arrayBuffer();
        const buf = Buffer.from(ab);
        await fs.writeFile(path.join(rawDir, outName), buf);
        console.log('Saved', outName, buf.length);
      } else {
        console.log('Fetch failed', outName, res.status);
      }
    }
  }
}
