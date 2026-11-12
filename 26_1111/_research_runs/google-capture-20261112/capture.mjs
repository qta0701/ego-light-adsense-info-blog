import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pngSize, screenshotGeometry } from "../../../tools/research_browser.mjs";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const run = path.dirname(fileURLToPath(import.meta.url));
const oldRun = path.join(root, "26_1111/_research_runs/dispatch-20261111");
const dispatch = JSON.parse(await fs.readFile(path.join(oldRun, "dispatch.json"), "utf8"));
export const jobs = new Map();
for (const section of dispatch.sections) {
  const manifest = JSON.parse(await fs.readFile(path.join(root, section.manifest), "utf8"));
  for (const job of manifest.jobs) jobs.set(job.row, job);
}

export async function prepare(page) {
  const { windowId, bounds } = await page.cdp("Browser.getWindowForTarget");
  if (bounds.windowState === "minimized") {
    await page.cdp("Browser.setWindowBounds", { windowId, bounds: { windowState: "normal" } });
  }
  const current = await page.cdp("Browser.getWindowForTarget");
  if (current.bounds.windowState === "minimized") throw Error("TaskSpace window remains minimized");
  return { initial: bounds, current: current.bounds };
}

function geometryState(selector) {
  const target = document.querySelector(selector);
  if (!target) throw Error("Observed target disappeared");
  const rect = node => {
    const r = node.getBoundingClientRect();
    return [r.x, r.y, r.width, r.height];
  };
  const v = visualViewport;
  const visual = { x: v.offsetLeft, y: v.offsetTop, width: v.width, height: v.height, scale: v.scale };
  const account = [...document.querySelectorAll('a[href*="accounts.google.com/SignOutOptions"], [aria-label^="Google 계정"], [aria-label^="Google Account"]')]
    .map(rect).filter(([x, y, w, h]) => x >= visual.x && y >= visual.y && w > 0 && h > 0
      && x + w <= visual.x + visual.width && y + h <= visual.y + visual.height);
  return {
    url: location.href, title: document.title, width: innerWidth, height: innerHeight,
    scrollX, scrollY, devicePixelRatio, visual,
    scrollbar: { width: innerWidth - document.documentElement.clientWidth, height: innerHeight - document.documentElement.clientHeight },
    targets: [rect(target), ...account],
  };
}

export async function collect(page, job, name, details, verify = async () => ({})) {
  const selector = '[data-ego-capture-target="1"]';
  const window = await prepare(page);
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const before = await page.evaluate(geometryState, selector);
  const shot = await page.cdp("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: false }, { timeout: 6000 });
  const after = await page.evaluate(geometryState, selector);
  const bytes = Buffer.from(shot.data, "base64");
  const geometry = screenshotGeometry(before, after, pngSize(bytes));
  const raw = `raw/${name}.png`;
  const record = {
    row: job.row, keyword: job.keyword, title: before.title, url: before.url,
    capturedAt: new Date().toISOString(), method: "ego-browser Page.captureScreenshot fromSurface:true",
    viewport: before.visual, devicePixelRatio: before.devicePixelRatio, window,
    pixelSize: geometry.pixelSize, box: geometry.boxes[0], accountRedactions: geometry.boxes.slice(1),
    file: raw, ...details,
  };
  Object.assign(record, await verify(selector));
  await fs.writeFile(path.join(root, job.folder, raw), bytes, { flag: "wx" });
  await fs.writeFile(path.join(root, job.folder, "evidence", name + ".json"), JSON.stringify(record, null, 2), { flag: "wx" });
  console.log(JSON.stringify({ row: job.row, name, title: record.targetTitle, box: record.box, redactions: record.accountRedactions.length }));
}

export async function openSearch(page, job, query, sources, hints = {}) {
  await page.goto("https://www.google.com/search?q=" + encodeURIComponent(query), { timeout: 15000 });
  await page.waitForSelector("h3", { timeout: 5000 }).catch(() => {});
  return await page.evaluate(({ urls, hints }) => {
    if (!["www.google.com", "www.google.co.kr"].includes(location.hostname) || location.pathname !== "/search") {
      return { blocker: location.hostname + location.pathname };
    }
    const key = value => {
      try {
        let url = new URL(value, location.href);
        if (url.hostname === location.hostname && url.pathname === "/url") {
          url = new URL(url.searchParams.get("q") || url.searchParams.get("url"));
        }
        const params = [...url.searchParams].filter(([k, v]) => v && !["utm_source", "utm_medium", "utm_campaign", "from_kind", "lang", "source", "l"].includes(k));
        params.sort(([a],[b]) => a.localeCompare(b));
        return [url.hostname.replace(/^www\./, ""), decodeURIComponent(url.pathname.replace(/\/$/, "")), JSON.stringify(params)].join("|");
      } catch { return null; }
    };
    const links = [...document.querySelectorAll("#search a[href], #rso a[href]")]
      .filter(a => a.querySelector("h3") && !a.closest("#tads, #bottomads, [data-text-ad], .commercial-unit-desktop-top"));
    const candidates = links.map(a => ({ href: a.href, title: a.querySelector("h3").innerText }));
    const hit = urls.map(source => [source, links.find(a => {
      if (key(a.href) === key(source.url)) return true;
      const url = new URL(a.href);
      if (url.hostname !== location.hostname || url.pathname !== "/goto") return false;
      const host = new URL(source.url).hostname.replace(/^www\./, "");
      const heading = a.querySelector("h3").innerText.trim();
      const cite = a.querySelector("cite")?.innerText ?? "";
      return cite.includes(host) && hints[source.id]?.some(hint => heading.includes(hint));
    })]).find(([, anchor]) => anchor);
    if (!hit) return { candidates: candidates.slice(0, 8) };
    const [source, anchor] = hit;
    const title = anchor.querySelector("h3");
    title.setAttribute("data-ego-capture-target", "1");
    if (title.getBoundingClientRect().bottom > innerHeight - 180) {
      title.scrollIntoView({ block: "center", behavior: "instant" });
    }
    return { source, href: anchor.href, title: title.innerText };
  }, { urls: sources, hints });
}

export function matchesOfficialUrl(actual, expected) {
  const key = input => {
    const url = new URL(input);
    const params = [...url.searchParams].filter(([k, v]) => v && !["utm_source", "utm_medium", "utm_campaign", "from_kind", "lang", "source", "l"].includes(k));
    params.sort(([a],[b]) => a.localeCompare(b));
    return [url.hostname.replace(/^www\./, ""), decodeURIComponent(url.pathname.replace(/\/$/, "")), JSON.stringify(params)].join("|");
  };
  return key(actual) === key(expected);
}

export async function openGuide(page, url, phrase) {
  await page.goto(url, { timeout: 15000 });
  await page.waitForFunction(text => document.body.innerText.replace(/\s+/g, " ").includes(text), phrase, { timeout: 6500 });
  return await page.evaluate(text => {
    const nodes = [...document.querySelectorAll("h1,h2,h3,h4,p,li,strong,span,div,td")].filter(node => {
      const rect = node.getBoundingClientRect();
      const content = node.innerText?.trim().replace(/\s+/g, " ");
      return rect.width > 25 && rect.height > 9 && rect.height < 250
        && content?.includes(text) && content.length <= 390;
    });
    nodes.sort((a, b) => a.innerText.length - b.innerText.length || a.getBoundingClientRect().width - b.getBoundingClientRect().width);
    const hit = nodes[0];
    if (!hit) return null;
    hit.setAttribute("data-ego-capture-target", "1");
    hit.scrollIntoView({ block: "center", behavior: "instant" });
    return hit.innerText.trim().slice(0, 390);
  }, phrase);
}

export const readResearch = async job => JSON.parse(await fs.readFile(path.join(root, job.folder, "research.json"), "utf8"));
export const writeRun = async (name, data) => fs.writeFile(path.join(run, name), JSON.stringify(data, null, 2));
