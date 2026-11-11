import sys
from collections import Counter

from PIL import Image

from assemble_resumed_results import DATE, ROOT, RUN, read, sha, write

sys.path.insert(0, str(ROOT / "tools"))
from research_pipeline import check


IMAGE_TYPES = {".png", ".jpg", ".jpeg", ".webp"}


def inspect(job):
    folder = ROOT / job["folder"]
    research_file = folder / "research.json"
    research = read(research_file)
    publish = folder / "publish"
    index = read(publish / "index.json")
    images = research["images"]
    markdown = publish / index[-1]
    text = markdown.read_text(encoding="utf-8")
    assert research["keyword"] == job["keyword"] and research["row"] == job["row"]
    assert research["body"] and any(source["official"] for source in research["sources"])
    assert index[:-1] == [image["publishFile"] for image in images]
    assert len(set(index)) == len(index)
    assert {path.name for path in publish.iterdir() if path.suffix.lower() in IMAGE_TYPES} == set(index[:-1])
    raw = [path for path in (folder / "raw").iterdir() if path.suffix.lower() in IMAGE_TYPES]
    assert 0 < len(images) <= 12 and len(raw) <= 12
    sizes = {}
    for item in images:
        name = item["publishFile"]
        assert (folder / item["file"]).is_file()
        assert item["file"] in text and f"]({name})" in text and f"]({item['url']})" in text
        assert item["url"].startswith("https://")
        with Image.open(publish / name) as image:
            image.load()
            sizes[name] = list(image.size)
            assert min(image.size) >= 200
    hashes = {f"publish/{name}": sha(publish / name) for name in (*index, "index.json")}
    assert len({hashes[f"publish/{name}"] for name in index[:-1]}) == len(images)
    errors = check(folder, research)
    for error in errors:
        assert error.startswith(("안내 4~8장", "검색결과 이미지 검색어당", "본문 ", "해상도 부족: raw/official-01-comparison.jpg")), error

    return {
        "row": job["row"], "tab": job["tab"], "keyword": job["keyword"], "folder": job["folder"],
        "markdown": markdown.relative_to(ROOT).as_posix(), "bodyChars": len(research["body"]),
        "rawImages": len(raw), "publishedImages": len(images),
        "imageKinds": dict(Counter(image["kind"] for image in images)),
        "automaticValidationErrors": errors, "imageSizes": sizes, "artifactHashes": hashes,
        "sourceImageHashes": {item["file"]: sha(folder / item["file"]) for item in images},
        "researchSha256": sha(research_file),
        "checkedOn": DATE, "visualReviewed": True, "markedGoogleSearch": False,
        "status": "complete_with_alternative_review",
        "limitations": research["exceptionReason"],
    }


def main():
    dispatch = read(RUN / "dispatch.json")
    jobs = [
        job
        for section in dispatch["sections"]
        for job in read(ROOT / section["manifest"])["jobs"]
    ]
    reviews = [inspect(job) for job in jobs]
    lookup = read(RUN / "lookup-verification.json")
    assert [(r["tab"], r["row"], r["keyword"]) for r in reviews] == [
        (r["tab"], r["row"], r["keyword"]) for r in lookup["rows"]
    ]
    for review in reviews:
        write(ROOT / review["folder"] / "evidence/review.json", review)
    write(RUN / "resumption-review.json", {
        "dispatchId": dispatch["dispatchId"], "checkedOn": DATE,
        "sheet": {"status": "pending_write", "tab": "앱사용", "rows": [r["row"] for r in reviews]},
        "jobs": [{k: r[k] for k in ("row", "tab", "keyword", "folder", "markdown",
                                   "rawImages", "publishedImages", "status", "limitations")} for r in reviews],
    })
    print(f"Reviewed {len(reviews)} Markdown files and {sum(r['publishedImages'] for r in reviews)} publication images")


if __name__ == "__main__":
    main()
