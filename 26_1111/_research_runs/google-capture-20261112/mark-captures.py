import hashlib
import json
import os
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

RUN = Path(__file__).resolve().parent
ROOT = RUN.parents[2]
PREVIOUS = RUN.parent / "dispatch-20261111"
DATE = "2026-11-12"
DATE_SUFFIX = "-20261112.json"
FONT = Path(os.environ.get("WINDIR", "C:/Windows")) / "Fonts/malgunbd.ttf"
RED = "#d91d26"
sys.path.insert(0, str(ROOT / "tools"))
from research_pipeline import check

GUIDE_NAMES = {
    47: ["korail-press"],
    48: ["daangn-packing", "daangn-delivery"],
    49: ["daangn-escrow"],
    54: ["taobao-app-route", "taobao-after-closure"],
}


def read(path):
    return json.loads(path.read_text(encoding="utf-8-sig"))


def write(path, text):
    pending = path.with_name(path.name + ".tmp")
    pending.write_text(text, encoding="utf-8")
    pending.replace(path)


def dump(path, data):
    write(path, json.dumps(data, ensure_ascii=False, indent=2) + "\n")


def digest(file):
    return hashlib.sha256(file.read_bytes()).hexdigest()


def capture_records(job, folder):
    names = ["google-official"] + GUIDE_NAMES.get(job["row"], [])
    for name in names:
        evidence = folder / "evidence" / (name + DATE_SUFFIX)
        if not evidence.exists():
            continue
        record = read(evidence)
        assert record["keyword"] == job["keyword"] and record["row"] == job["row"]
        assert record["method"] == "ego-browser Page.captureScreenshot fromSurface:true"
        if record["role"] == "search":
            assert record["verifiedBy"] == "clicked matching Google result"
        yield name, record, evidence


def render(folder, record, target):
    x, y, w, h = record["box"]
    with Image.open(folder / record["file"]) as original:
        original.load()
        raw = original.convert("RGB")
    assert raw.size == (record["pixelSize"]["width"], record["pixelSize"]["height"])
    assert x >= 0 and y >= 0 and x + w <= raw.width and y + h <= raw.height
    for rx, ry, rw, rh in record["accountRedactions"]:
        ImageDraw.Draw(raw).rectangle((rx - 5, ry - 5, rx + rw + 5, ry + rh + 5), fill="#eef1f4")
    is_search = record["role"] == "search"
    left = max(0, x - 65)
    right = min(raw.width, max(x + w + 24, left + 825))
    if record["row"] == 47 and not is_search:
        left, right = 0, raw.width
    top = 0 if is_search and y < 700 else max(0, y - 105)
    bottom = min(raw.height, max(top + 320, y + h + (130 if is_search else 245)))
    excerpt = raw.crop((left, top, right, bottom))
    gutter = 45 if x - left < 49 else 0
    canvas = Image.new("RGB", (excerpt.width + gutter, excerpt.height + 52), "white")
    canvas.paste(excerpt, (gutter, 0))
    draw = ImageDraw.Draw(canvas)
    x, y = x - left + gutter, y - top
    box = (max(5, x - 10), max(5, y - 8), min(canvas.width - 6, x + w + 10), min(excerpt.height - 5, y + h + 8))
    draw.rounded_rectangle(box, radius=8, outline=RED, width=5)
    mid = y + h // 2
    end = box[0] - 3
    badge = max(12, end - 37)
    draw.line((badge + 8, mid, end, mid), fill=RED, width=6)
    draw.polygon([(end, mid), (end - 13, mid - 9), (end - 13, mid + 9)], fill=RED)
    draw.ellipse((badge - 11, mid - 11, badge + 11, mid + 11), fill=RED)
    draw.text((badge, mid), "1", font=ImageFont.truetype(str(FONT), 15), fill="white", anchor="mm")
    label = f"Google 검색 · {record['keyword']} · 공식 결과" if is_search else record["caption"]
    font_size = 21
    font = ImageFont.truetype(str(FONT), font_size)
    while draw.textlength(label, font=font) > canvas.width - 26 and font_size > 12:
        font_size -= 1
        font = ImageFont.truetype(str(FONT), font_size)
    draw.text((13, excerpt.height + 12), label, font=font, fill="#26384d")
    canvas.save(target, optimize=True)


def add_entry(folder, job, additions):
    publish = folder / "publish"
    research_file = folder / "research.json"
    index_file = publish / "index.json"
    review_file = folder / "evidence/review.json"
    data, index, review = read(research_file), read(index_file), read(review_file)
    markdown = publish / index[-1]
    text = markdown.read_text(encoding="utf-8-sig")
    new = [entry for entry in additions if entry["publishFile"] not in index]
    if not new:
        return
    for item in new:
        source = RUN / "staged" / f'{job["row"]}-{item["publishFile"]}'
        destination = publish / item["publishFile"]
        if destination.exists():
            assert digest(destination) == digest(source), destination
        else:
            with destination.open("xb") as image:
                image.write(source.read_bytes())
    previous_explanation = (
        "Google 검색 결과의 화면 캡처가 타임아웃되어 결과 링크의 빨간 표식 이미지는 확보하지 못했습니다. "
        "공식 안내의 원본 이미지 또는 브라우저 인쇄본 발췌를 첨부합니다."
    )
    if any(item["role"] == "search" for item in new):
        text = text.replace(previous_explanation, "2026-11-12에 Google 검색에서 공식 링크를 다시 열어 목적지를 확인하고, 빨간 표식이 있는 실제 검색 화면 캡처를 추가했습니다.")
        text = text.replace(
            "아래 순서로 해당 설명 다음에 배치합니다.",
            "보강한 Google 검색 캡처는 도입부에 배치하고, 나머지는 각 이미지가 설명하는 절차 뒤에 배치합니다.",
        )
    block = ["## 보강한 캡처", ""]
    for item in new:
        block.extend([
            f'### {item["caption"]}',
            "",
            f'- 배치 위치 및 원본 · {"도입부" if item["role"] == "search" else "해당 단계 또는 조건 설명 다음"} · `{item["file"]}` → `{item["publishFile"]}`',
            f'- [{item["sourceTitle"]}]({item["targetUrl"]}) · {DATE}',
        ])
        if item["role"] == "search":
            block.append(f'- [실제 Google 검색 화면]({item["url"]}) · 검색어 `{item["query"]}`')
        block.extend(["", f'![{item["caption"]}]({item["publishFile"]})', ""])
    text = text.replace("## 출처 및 확인일", "\n".join(block) + "\n## 출처 및 확인일", 1)
    write(markdown, text)
    previous_images = data["images"]
    search = [item for item in new if item["role"] == "search"]
    guides = [item for item in new if item["role"] == "guide"]
    data["images"] = search + previous_images + guides
    if search:
        data["exceptionReason"] = data["exceptionReason"].replace(
            previous_explanation, "2026-11-12에 실제 Google 검색 캡처를 추가했습니다. 기존 공식 예시 이미지와 인쇄본 발췌도 함께 제공합니다."
        )
        data["searchCaptureQueries"] = [item["query"] for item in search]
        data.setdefault("initialQueries", data["queries"])
        data["queries"] = data["searchCaptureQueries"]
    dump(research_file, data)
    index = [item["publishFile"] for item in data["images"]] + [index[-1]]
    dump(index_file, index)
    review.update(
        rawImages=sum(path.suffix.lower() in (".png", ".jpg", ".jpeg", ".webp") for path in (folder / "raw").iterdir()),
        publishedImages=len(data["images"]),
        markedGoogleSearch=bool(search) or review.get("markedGoogleSearch", False),
        captureSupplement={"date": DATE, "publishedFiles": [item["publishFile"] for item in new], "visualReviewed": True},
        researchSha256=digest(research_file),
        artifactHashes={f"publish/{name}": digest(publish / name) for name in index + ["index.json"]},
        sourceImageHashes={item["file"]: digest(folder / item["file"]) for item in data["images"]},
        limitations=data["exceptionReason"],
        automaticValidationErrors=check(folder, data),
    )
    for item in new:
        with Image.open(publish / item["publishFile"]) as image:
            review["imageSizes"][item["publishFile"]] = list(image.size)
        review["imageKinds"][item["kind"]] = review["imageKinds"].get(item["kind"], 0) + 1
    dump(review_file, review)


def main():
    mode = sys.argv[1]
    summary = []
    for job in read(PREVIOUS / "resumption-review.json")["jobs"]:
        row = job["row"]
        folder = ROOT / job["folder"]
        additions = []
        for name, record, evidence in capture_records(job, folder):
            record["publishFile"] = name + "-marked.png"
            record["kind"] = "ego-browser 실제 캡처에 표식 편집"
            record["checkedAt"] = DATE
            record["alt"] = record["caption"]
            record["boxes"] = [record["box"]]
            record["evidence"] = evidence.relative_to(folder).as_posix()
            if record["role"] == "guide":
                record["sourceTitle"] = record["title"] + " · " + record["caption"]
            additions.append(record)
            stage = RUN / "staged" / f'{row}-{record["publishFile"]}'
            if mode == "stage":
                stage.parent.mkdir(exist_ok=True)
                render(folder, record, stage)
        if mode == "publish":
            add_entry(folder, job, additions)
        data = read(folder / "research.json")
        summary.append({"row": row, "folder": job["folder"], "keyword": job["keyword"], "new": len(additions),
                        "markedSearch": any(item["role"] == "search" for item in additions),
                        "publishCount": len(data["images"])})
    dump(RUN / (mode + "-summary.json"), summary)
    print(json.dumps(summary, ensure_ascii=False))


if __name__ == "__main__":
    main()
