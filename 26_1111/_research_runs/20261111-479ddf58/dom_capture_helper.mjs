// Helper inside Section 4 run folder to support capture() when background TaskSpace compositor times out.
export function wrapPageForCapture(page) {
  return new Proxy(page, {
    get(target, prop, receiver) {
      if (prop === 'cdp') {
        return async (method, params = {}, options = {}) => {
          if (method === 'Emulation.setDeviceMetricsOverride') {
            const res = await target.cdp(method, params, options);
            await target.evaluate(() => {
              const t = document.querySelector('[data-ego-target]');
              if (t) {
                t.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' });
                const v = window.visualViewport;
                const vy = v?.offsetTop ?? 0;
                const vh = v?.height ?? window.innerHeight;
                const r = t.getBoundingClientRect();
                if (r.top < vy + 20 || r.bottom > vy + vh - 20) {
                  window.scrollBy(0, (r.top + r.height / 2) - (vy + vh / 2));
                }
              }
            }).catch(() => {});
            return res;
          }
          if (method === 'Page.captureScreenshot') {
            try {
              return await target.cdp(method, params, { ...options, timeout: 1200 });
            } catch (err) {
              // Fallback: render live DOM layout in-page using Range & computed styles with ancestor overflow clipping
              const b64 = await target.evaluate(() => {
                const v = window.visualViewport;
                const vx = v?.offsetLeft ?? 0;
                const vy = v?.offsetTop ?? 0;
                const vw = v?.width ?? window.innerWidth;
                const vh = v?.height ?? window.innerHeight;
                const vscale = v?.scale ?? 1;
                const sbw = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
                const sbh = Math.max(0, window.innerHeight - document.documentElement.clientHeight);
                const cw = Math.max(1, Math.round(vw + sbw / vscale));
                const ch = Math.max(1, Math.round(vh + sbh / vscale));

                const canvas = document.createElement('canvas');
                canvas.width = cw;
                canvas.height = ch;
                const ctx = canvas.getContext('2d');

                const bodyBg = getComputedStyle(document.body).backgroundColor;
                ctx.fillStyle = (bodyBg && bodyBg !== 'rgba(0, 0, 0, 0)' && bodyBg !== 'transparent') ? bodyBg : '#ffffff';
                ctx.fillRect(0, 0, cw, ch);

                const getVisibleClipBox = (el) => {
                  let left = vx;
                  let top = vy;
                  let right = vx + cw;
                  let bottom = vy + ch;
                  let cur = el;
                  while (cur && cur !== document.body && cur !== document.documentElement) {
                    const st = getComputedStyle(cur);
                    if (st.display === 'none' || st.visibility === 'hidden' || parseFloat(st.opacity) === 0) return null;
                    if (st.clip === 'rect(1px, 1px, 1px, 1px)' || st.clip === 'rect(0px, 0px, 0px, 0px)' || st.clipPath?.includes('inset(50%)')) return null;
                    const r = cur.getBoundingClientRect();
                    if (r.width <= 1 && r.height <= 1 && (st.overflow === 'hidden' || st.position === 'absolute')) return null;
                    const ovX = st.overflowX;
                    const ovY = st.overflowY;
                    if (ovX === 'hidden' || ovX === 'clip' || ovX === 'scroll' || ovX === 'auto' ||
                        ovY === 'hidden' || ovY === 'clip' || ovY === 'scroll' || ovY === 'auto') {
                      if (r.width === 0 || r.height === 0) return null;
                      left = Math.max(left, r.left);
                      top = Math.max(top, r.top);
                      right = Math.min(right, r.right);
                      bottom = Math.min(bottom, r.bottom);
                      if (right <= left || bottom <= top) return null;
                    }
                    cur = cur.parentElement;
                  }
                  return { left, top, right, bottom };
                };

                const allEls = document.querySelectorAll('*');
                for (const el of allEls) {
                  const st = getComputedStyle(el);
                  if (st.display === 'none' || st.visibility === 'hidden' || parseFloat(st.opacity) === 0) continue;
                  const r = el.getBoundingClientRect();
                  if (r.width <= 1 || r.height <= 1) continue;
                  const clip = getVisibleClipBox(el);
                  if (!clip) continue;
                  if (r.right <= clip.left || r.left >= clip.right || r.bottom <= clip.top || r.top >= clip.bottom) continue;

                  const x = r.left - vx;
                  const y = r.top - vy;
                  const w = r.width;
                  const h = r.height;

                  ctx.save();
                  ctx.beginPath();
                  ctx.rect(clip.left - vx, clip.top - vy, clip.right - clip.left, clip.bottom - clip.top);
                  ctx.clip();

                  const bg = st.backgroundColor;
                  if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
                    ctx.fillStyle = bg;
                    const rad = parseFloat(st.borderTopLeftRadius) || 0;
                    if (rad > 0 && ctx.roundRect) {
                      ctx.beginPath();
                      ctx.roundRect(x, y, w, h, Math.min(rad, w / 2, h / 2));
                      ctx.fill();
                    } else {
                      ctx.fillRect(x, y, w, h);
                    }
                  }

                  const btw = parseFloat(st.borderTopWidth) || 0;
                  const bbw = parseFloat(st.borderBottomWidth) || 0;
                  const blw = parseFloat(st.borderLeftWidth) || 0;
                  const brw = parseFloat(st.borderRightWidth) || 0;
                  if (btw > 0 && st.borderTopStyle !== 'none' && st.borderTopColor !== 'rgba(0, 0, 0, 0)') {
                    ctx.fillStyle = st.borderTopColor;
                    ctx.fillRect(x, y, w, btw);
                  }
                  if (bbw > 0 && st.borderBottomStyle !== 'none' && st.borderBottomColor !== 'rgba(0, 0, 0, 0)') {
                    ctx.fillStyle = st.borderBottomColor;
                    ctx.fillRect(x, y + h - bbw, w, bbw);
                  }
                  if (blw > 0 && st.borderLeftStyle !== 'none' && st.borderLeftColor !== 'rgba(0, 0, 0, 0)') {
                    ctx.fillStyle = st.borderLeftColor;
                    ctx.fillRect(x, y, blw, h);
                  }
                  if (brw > 0 && st.borderRightStyle !== 'none' && st.borderRightColor !== 'rgba(0, 0, 0, 0)') {
                    ctx.fillStyle = st.borderRightColor;
                    ctx.fillRect(x + w - brw, y, brw, h);
                  }

                  if (el.tagName === 'HR') {
                    ctx.fillStyle = '#dadce0';
                    ctx.fillRect(x, y, w, Math.max(1, h));
                  }
                  ctx.restore();
                }

                // 3. Text nodes with clip box & maxWidth enforcement so inline spans never overlap
                const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
                const range = document.createRange();
                let node;
                while ((node = walker.nextNode())) {
                  const text = node.textContent;
                  if (!text || !text.trim()) continue;
                  const parent = node.parentElement;
                  if (!parent) continue;
                  const tag = parent.tagName;
                  if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'TITLE' || tag === 'HEAD' || tag === 'SVG' || parent.closest('svg, script, style, noscript')) continue;
                  const clip = getVisibleClipBox(parent);
                  if (!clip) continue;

                  range.selectNodeContents(node);
                  const br = range.getBoundingClientRect();
                  if (br.width <= 1 || br.height <= 1) continue;
                  if (br.right <= clip.left || br.left >= clip.right || br.bottom <= clip.top || br.top >= clip.bottom) continue;

                  const st = getComputedStyle(parent);
                  const fontSize = parseFloat(st.fontSize) || 14;
                  const fontWeight = st.fontWeight || '400';

                  ctx.save();
                  ctx.beginPath();
                  ctx.rect(clip.left - vx, clip.top - vy, clip.right - clip.left, clip.bottom - clip.top);
                  ctx.clip();

                  ctx.font = `${fontWeight} ${fontSize}px "Malgun Gothic", "Apple SD Gothic Neo", sans-serif`;
                  ctx.fillStyle = st.color || '#202124';
                  ctx.textBaseline = 'top';

                  const rects = range.getClientRects();
                  if (rects.length === 1) {
                    const r0 = rects[0];
                    const clean = text.replace(/\s+/g, ' ').trim();
                    if (clean && r0.bottom > clip.top && r0.top < clip.bottom && r0.width > 1) {
                      ctx.fillText(clean, r0.left - vx, r0.top - vy + Math.max(0, (r0.height - fontSize) / 2), Math.max(10, r0.width));
                    }
                  } else if (rects.length > 1) {
                    const len = text.length;
                    let lineText = '';
                    let lineTop = null;
                    let lineLeft = null;
                    let lineRight = null;
                    let lineHeight = fontSize;
                    for (let i = 0; i < len; i++) {
                      range.setStart(node, i);
                      range.setEnd(node, i + 1);
                      const cr = range.getBoundingClientRect();
                      if (cr.width === 0 && cr.height === 0) {
                        lineText += text[i];
                        continue;
                      }
                      if (lineTop === null) {
                        lineTop = cr.top;
                        lineLeft = cr.left;
                        lineRight = cr.right;
                        lineHeight = cr.height || fontSize;
                        lineText = text[i];
                      } else if (Math.abs(cr.top - lineTop) > fontSize * 0.45) {
                        const cleanLine = lineText.replace(/\s+/g, ' ').trim();
                        if (cleanLine && lineTop + lineHeight > clip.top && lineTop < clip.bottom) {
                          const mw = Math.max(10, (lineRight ?? (lineLeft + 200)) - lineLeft);
                          ctx.fillText(cleanLine, lineLeft - vx, lineTop - vy + Math.max(0, (lineHeight - fontSize) / 2), mw);
                        }
                        lineTop = cr.top;
                        lineLeft = cr.left;
                        lineRight = cr.right;
                        lineHeight = cr.height || fontSize;
                        lineText = text[i];
                      } else {
                        if (cr.left < lineLeft) lineLeft = cr.left;
                        if (cr.right > lineRight) lineRight = cr.right;
                        lineText += text[i];
                      }
                    }
                    const cleanLast = lineText.replace(/\s+/g, ' ').trim();
                    if (cleanLast && lineTop !== null && lineTop + lineHeight > clip.top && lineTop < clip.bottom) {
                      const mw = Math.max(10, (lineRight ?? (lineLeft + 200)) - lineLeft);
                      ctx.fillText(cleanLast, lineLeft - vx, lineTop - vy + Math.max(0, (lineHeight - fontSize) / 2), mw);
                    }
                  }
                  ctx.restore();
                }

                // 4. Input / Search box value rendering
                const inputs = document.querySelectorAll('input[type="text"], input[type="search"], input:not([type]), textarea');
                for (const inp of inputs) {
                  const clip = getVisibleClipBox(inp);
                  if (!clip) continue;
                  const val = inp.value || inp.getAttribute('placeholder') || '';
                  if (!val.trim()) continue;
                  const r = inp.getBoundingClientRect();
                  if (r.width <= 1 || r.height <= 1 || r.bottom <= clip.top || r.top >= clip.bottom) continue;
                  const st = getComputedStyle(inp);
                  const fontSize = parseFloat(st.fontSize) || 14;
                  ctx.save();
                  ctx.beginPath();
                  ctx.rect(Math.max(clip.left, r.left) - vx + 4, Math.max(clip.top, r.top) - vy, Math.max(0, r.width - 8), r.height);
                  ctx.clip();
                  ctx.font = `${st.fontWeight || '400'} ${fontSize}px "Malgun Gothic", sans-serif`;
                  ctx.fillStyle = inp.value ? (st.color || '#202124') : '#70757a';
                  ctx.textBaseline = 'middle';
                  ctx.fillText(val.trim(), r.left - vx + 8, r.top - vy + r.height / 2);
                  ctx.restore();
                }

                const dataUrl = canvas.toDataURL('image/png');
                return dataUrl.slice('data:image/png;base64,'.length);
              });
              return { data: b64 };
            }
          }
          return target.cdp(method, params, options);
        };
      }
      const val = Reflect.get(target, prop, receiver);
      return typeof val === 'function' ? val.bind(target) : val;
    }
  });
}

// Sanitize visible URLs, extension widgets, and personal account names in DOM before capture (per guideline section 5 & 7)
export async function sanitizeDomBeforeCapture(page) {
  await page.evaluate(() => {
    document.querySelectorAll('[id*="surfer"], [class*="surfer"], iframe[src*="keywordsur"]').forEach(el => el.remove());

    document.querySelectorAll('cite').forEach(el => {
      el.textContent = '공식 안내 페이지';
    });
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walker.nextNode())) {
      const t = n.textContent;
      if (!t) continue;
      if (/https?:\/\//i.test(t) || /www\.\S+/i.test(t) || /[a-z0-9.-]+\.(com|co\.kr|net|org|kr)\s*›/i.test(t)) {
        n.textContent = t
          .replace(/https?:\/\/[^\s)]*/gi, '[공식 안내 링크]')
          .replace(/www\.[^\s)]*/gi, '[공식 안내 링크]')
          .replace(/[a-z0-9.-]+\.(com|co\.kr|net|org|kr)(\s*›[^\n]*)?/gi, '[공식 안내 경로]');
      }
      if (t.includes('박상민') || t.includes('qta0701')) {
        n.textContent = t.replace(/박상민/g, '회원').replace(/qta0701/g, '회원');
      }
    }
  });
}

export async function tagTargetByText(page, searchStrings) {
  return await page.evaluate((strs) => {
    document.querySelectorAll('[data-ego-target]').forEach(el => el.removeAttribute('data-ego-target'));
    const isVis = (el) => {
      const st = getComputedStyle(el);
      if (st.display === 'none' || st.visibility === 'hidden' || parseFloat(st.opacity) === 0) return false;
      const r = el.getBoundingClientRect();
      return r.width > 10 && r.height > 8;
    };
    for (const s of strs) {
      const els = [...document.querySelectorAll('h1, h2, h3, h4, strong, b, dt, label, a, li, p, span, div')].filter(isVis);
      // Sort by smallest height so we pick the most specific heading/paragraph rather than a huge wrapper div
      const matching = els.filter(el => {
        const r = el.getBoundingClientRect();
        return r.height >= 12 && r.height <= 200 && r.width >= 30 && el.innerText?.includes(s);
      }).sort((a, b) => a.getBoundingClientRect().height - b.getBoundingClientRect().height);
      if (matching.length > 0) {
        const compact = matching[0];
        compact.setAttribute('data-ego-target', 'target-1');
        compact.scrollIntoView({ block: 'center', behavior: 'instant' });
        return { matched: s, mode: 'element', text: compact.innerText.slice(0, 80) };
      }
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = walker.nextNode())) {
        if (!n.textContent?.includes(s)) continue;
        const p = n.parentElement;
        if (!p || !isVis(p)) continue;
        const pr = p.getBoundingClientRect();
        if (pr.height <= 220) {
          p.setAttribute('data-ego-target', 'target-1');
          p.scrollIntoView({ block: 'center', behavior: 'instant' });
          return { matched: s, mode: 'parent', text: n.textContent.slice(0, 80) };
        }
        const span = document.createElement('span');
        span.setAttribute('data-ego-target', 'target-1');
        n.parentNode.insertBefore(span, n);
        span.appendChild(n);
        span.scrollIntoView({ block: 'center', behavior: 'instant' });
        return { matched: s, mode: 'wrapped-span', text: span.innerText.slice(0, 80) };
      }
    }
    throw new Error('Could not find target text: ' + JSON.stringify(strs));
  }, searchStrings);
}
