import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const runDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(runDir, "../../..");
const dispatch = JSON.parse(await fs.readFile(path.join(runDir, "dispatch.json"), "utf8"));
const jobs = new Map();
for (const section of dispatch.sections) {
  const manifest = JSON.parse(await fs.readFile(path.join(root, section.manifest), "utf8"));
  for (const job of manifest.jobs) jobs.set(job.row, job);
}

const sources = {
  44: [
    ["kakao-ad-guide", "https://kakaobusiness.gitbook.io/main/ad/ads-safety/user-guard/adspolicy/inappropriate"],
    ["kakao-ad-optout", "https://info.ad.daum.net/optoutko.do"],
  ],
  45: [
    ["kakao-backup", "https://cs.kakao.com/helps_html/1073209313"],
    ["samsung-backup", "https://www.samsungsvc.co.kr/solution/37959"],
  ],
  46: [["korail-pass", "https://www.korail.com/tour/freeTravel/railro/passIntro"]],
  53: [
    ["netflix-tv", "https://help.netflix.com/ko/node/23928"],
    ["netflix-devices", "https://help.netflix.com/ko/node/128180"],
  ],
  54: [
    ["taobao-account-path", "https://developer.alibaba.com/docs/doc.htm?articleId=121398&docType=1&source=search&treeId=129"],
    ["taobao-closure-terms", "https://terms.alicdn.com/legal-agreement/terms/common_platform_service/20240718141901967/20240718141901967.html"],
  ],
  55: [
    ["naver-pc", "https://help.naver.com/service/5640/contents/1435?osType=PC&lang=ko"],
    ["naver-mobile", "https://help.naver.com/service/5630/contents/1788?osType=COMMONOS"],
    ["naver-closure-notes", "https://help.naver.com/service/5640/contents/9545?lang=ko"],
  ],
};

const spaces = new Set((await listTaskSpaces()).filter(space => space.ownership === "agent").map(space => space.id));
for (const [row, links] of Object.entries(sources)) {
  const job = jobs.get(Number(row));
  const evidence = path.join(root, job.folder, "evidence");
  const state = JSON.parse(await fs.readFile(path.join(evidence, "browser.json"), "utf8"));
  // When an old Space has disappeared, use a fresh Space only for the missing work.
  const task = await taskSpace(spaces.has(state.spaceId) ? state.spaceId : job.spaceName);
  if (state.spaceId !== task.spaceId) {
    await fs.writeFile(path.join(evidence, "resume-space.json"), JSON.stringify({
      previousSpaceId: state.spaceId, spaceId: task.spaceId, page: "p1",
      reason: "Previous Space absent from listTaskSpaces",
    }, null, 2));
  }
  const page = task.page("p1");
  for (const [name, url] of links) {
    try {
      await page.goto(url, { timeout: 15000 });
      await page.waitForLoadState("domcontentloaded", { timeout: 10000 });
      const observed = await page.evaluate(() => ({
        url: location.href, title: document.title,
        excerpt: (document.querySelector("main") ?? document.body).innerText.trim().slice(0, 12000),
      }));
      if (!observed.excerpt) throw Error("Empty page");
      const pdf = await page.cdp("Page.printToPDF", {
        printBackground: true, paperWidth: 8.27, paperHeight: 11.69,
        marginTop: 0.45, marginBottom: 0.45, marginLeft: 0.45, marginRight: 0.45,
        displayHeaderFooter: false,
      }, { timeout: 12000 });
      await fs.writeFile(path.join(evidence, name + ".print.pdf"), Buffer.from(pdf.data, "base64"), { flag: "wx" });
      await fs.writeFile(path.join(evidence, name + ".print.json"), JSON.stringify({
        ...observed, spaceId: task.spaceId, method: "Page.printToPDF", checkedAt: new Date().toISOString(),
      }, null, 2), { flag: "wx" });
      console.log({ row, name, spaceId: task.spaceId, title: observed.title });
    } catch (error) {
      console.log({ row, name, error: error.message });
    }
  }
}
