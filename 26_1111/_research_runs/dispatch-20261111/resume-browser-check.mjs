const task = await taskSpace(19);
const page = task.page("p1");
const item = await page.evaluate(() => {
  const labels = [...document.querySelectorAll('[role="menubar"] *')];
  return labels.filter(el => el.children.length === 0 && el.textContent.trim() === "🔍 키워드 조회")
    .map(el => {
      const rect = el.getBoundingClientRect();
      return [rect.x + rect.width / 2, rect.y + rect.height / 2];
    });
});
console.log({ spaceId: task.spaceId, item });
if (item.length === 1) {
  await page.mouse.click(...item[0], { label: "키워드 조회 메뉴 열기" });
  console.log((await page.snapshot()).split("\n").filter(line => /팝업|키워드 조회/.test(line)).slice(0, 15).join("\n"));
}
