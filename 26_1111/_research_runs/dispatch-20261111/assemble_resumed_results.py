import hashlib
import json
import re
import shutil
import subprocess
from pathlib import Path
from tempfile import TemporaryDirectory

from PIL import Image, ImageDraw, ImageFont

RUN = Path(__file__).resolve().parent
ROOT = RUN.parents[2]
DATE = "2026-11-12"
FONT = Path("C:/Windows/Fonts/malgun.ttf")

# Page and crop coordinates are from visual inspection of the actual PDF render.
PRINTS = {
    44: [
        ("kakao-ad-guide", 3, (.06, .035, .96, .69), "S1", "카카오 비즈보드 광고와 노출 빈도 조정 안내"),
        ("kakao-ad-guide", 7, (.06, .17, .95, .43), "S1", "Android·iOS의 기기 식별자 설정 안내"),
        ("kakao-ad-optout", 2, (.035, .175, .97, .416), "S2", "카카오 맞춤형 광고의 동의·거부 선택"),
    ],
    45: [
        ("kakao-backup", 1, (.06, .145, .93, .368), "S1", "카카오톡의 무료 임시 백업 방법"),
        ("kakao-backup", 1, (.06, .382, .93, .65), "S1", "무료 백업에서 복원하는 방법과 14일 복원 기한"),
        ("kakao-backup", 1, (.06, .659, .93, .94), "S1", "톡클라우드 백업·복원과 이전 데이터 백업 확인"),
    ],
    46: [
        ("korail-pass", 2, (.06, .04, .94, .62), "S1", "내일로 패스 요금·이용열차·좌석 지정 조건"),
        ("korail-pass", 2, (.06, .54, .94, .95), "S1", "패스 이용 방법과 구매 기간"),
        ("korail-pass", 3, (.06, .07, .94, .50), "S1", "이용 전 확인할 내일로 패스 주의사항"),
    ],
    53: [
        ("netflix-devices", 1, (.06, .11, .80, .79), "S2", "공식 도움말 예시에서 스마트 TV 항목 찾기"),
        ("netflix-devices", 2, (.14, .03, .76, .43), "S2", "개별 TV의 로그아웃 항목 선택"),
        ("netflix-devices", 3, (.14, .03, .76, .70), "S2", "모든 디바이스 로그아웃과 확인 화면 예시"),
    ],
    54: [
        ("taobao-closure-terms", 1, (.06, .058, .94, .452), "S2", "타오바오 계정 해지 전 거래·분쟁·미납 확인 안내"),
    ],
    55: [
        ("naver-pc", 2, (.06, .085, .94, .59), "S1", "네이버ID 화면의 회원 탈퇴 항목과 공식 주의 문구"),
        ("naver-mobile", 1, (.06, .52, .94, .85), "S1", "네이버앱에서 회원 탈퇴 메뉴로 이동하는 경로"),
        ("naver-closure-notes", 2, (.06, .085, .94, .90), "S2", "탈퇴 후 개인형 데이터·게시물·재가입 주의사항"),
    ],
}

ASSETS = {
    47: [
        ("official-01-comparison.jpg", "S1", "승차권 변경 서비스 개선 전후 비교"),
        ("official-02-app-screens.jpg", "S1", "코레일톡 승차권 변경 메뉴와 열차 선택"),
    ],
    48: [("official-01-instant-buy.jpg", "S2", "당근의 바로구매 공개 안내와 앱 예시")],
    49: [
        ("official-03-escrow-app.jpg", "S2", "당근페이 안심결제 앱 예시"),
        ("official-01-escrow-flow.png", "S2", "구매자와 판매자의 안심결제 거래 흐름"),
    ],
    50: [
        ("official-522-1.jpg", "S2", "번개장터 앱에서 배송 예약에 진입하는 예시", "01_official_intro.jpg"),
        ("official-522-4.jpg", "S2", "편의점택배 예약 화면에서 선불·예약 항목 확인", "04_official_prepaid.jpg"),
        ("official-522-5.jpg", "S2", "택배기에서 예약번호를 사용해 예약 접수하는 예시", "05_official_postbox.jpg"),
    ],
    51: [
        (f"official-490-{number + 1}.jpg", "S1", caption, f"{number:02d}_official_{name}.jpg")
        for number, (name, caption) in enumerate([
            ("buy_btn", "상품 상세에서 구매하기 선택"), ("general_card", "결제 화면에서 일반 카드 항목 선택"),
            ("installment", "카드사와 할부 옵션 확인"), ("pay_confirm", "결제 전에 금액과 결제수단 확인"),
            ("easy_register", "간편결제 카드 등록 위치"), ("easy_manage", "간편결제 카드 관리 메뉴"),
            ("easy_pay", "간편결제에서 결제 확인 위치"),
        ], 1)
    ],
    52: [
        (f"official-netflix-407-{source}.webp", "S1", caption, f"{number:02d}_official_{name}.webp")
        for number, (source, name, caption) in enumerate([
            (1, "cancel_step1", "멤버십 관리에서 해지 항목 펼치기"),
            (2, "cancel_step2", "해지 완료하기 버튼 확인"),
            (4, "pause_step1", "일시정지 대상 계정의 일시정지 메뉴"),
            (5, "pause_step2", "한 달 일시정지 옵션 확인"),
            (7, "pause_extend", "일시정지 연장 항목 확인"),
            (8, "pause_resume", "일시정지 해제 항목 확인"),
        ], 1)
    ],
}

# Apple support's demo account and receipt are masked in publication copies.
APPLE_MASKS = {
    2: [(.19, .297, .81, .341)],
    3: [(.09, .025, .47, .19), (.11, .385, .58, .515), (.10, .62, .62, .83)],
    4: [(.28, .252, .73, .545)],
    5: [(.29, .161, .65, .263), (.307, .272, .337, .327), (.615, .283, .696, .324), (.015, .821, .17, .897)],
}


def read(path):
    return json.loads(path.read_text(encoding="utf-8-sig"))


def write(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def preserve_previous(folder):
    archive = folder / "evidence/previous-publish"
    archive.mkdir(exist_ok=True)
    for path in (folder / "publish").glob("*"):
        destination = archive / path.name
        if path.is_file() and not destination.exists():
            shutil.copy2(path, destination)
    for name in ("research.json", "validation.json", "evidence/review.json"):
        path = folder / name
        backup = archive / ("previous-" + path.name)
        if path.is_file() and not backup.exists():
            shutil.copy2(path, backup)
    return archive


def coordinates(rect, size):
    width, height = size
    return tuple(round(factor * dimension) for factor, dimension in zip(rect, (width, height, width, height)))


def caption_image(image, file, label):
    image.thumbnail((1450, 1700), Image.Resampling.LANCZOS)
    result = Image.new("RGB", (max(image.width, 920), image.height + 60), "white")
    result.paste(image.convert("RGB"), (0, 0))
    ImageDraw.Draw(result).text((15, image.height + 15), label, fill="#24334a", font=ImageFont.truetype(str(FONT), 23))
    result.save(file, optimize=True)


def assemble(job, drafts):
    folder = ROOT / job["folder"]
    publish = folder / "publish"
    publish.mkdir(exist_ok=True)
    archive = preserve_previous(folder)
    research = read(archive / "previous-research.json")
    row = job["row"]
    research.update(drafts.get(str(row), {}))
    body = re.split(r"(?m)^## 6\. 편집 메모와 이미지별 활용 정보", research["body"])[0].strip()
    body = re.sub(r" +\([^()\n]*`[^`\n]+\.(?:png|jpe?g|webp)`[^()\n]*\)", "", body)
    sources = {item["id"]: item for item in research["sources"]}
    images = []

    def register(raw, name, source_id, caption, kind, **extra):
        source = sources[source_id]
        images.append({
            "role": "reference", "file": raw, "publishFile": name,
            "sourceId": source_id, "sourceTitle": source["title"], "url": source["url"],
            "caption": caption, "alt": caption, "kind": kind,
            "checkedAt": DATE if kind == "브라우저 인쇄본 발췌" else source["checkedAt"], **extra,
        })

    for number, (pdf, page, crop, source_id, caption) in enumerate(PRINTS.get(row, []), 1):
        raw = f"raw/print-{pdf}-{page}-{number:02d}.png"
        name = f"{number:02d}_official-print.png"
        pdf_path = folder / "evidence" / (pdf + ".print.pdf")
        observed = read(pdf_path.with_suffix(".json"))
        with TemporaryDirectory() as tmp:
            prefix = Path(tmp) / "page"
            subprocess.run(["pdftoppm.exe", "-f", str(page), "-l", str(page), "-scale-to", "1650",
                            "-singlefile", "-png", str(pdf_path), str(prefix)],
                           capture_output=True, check=True)
            with Image.open(prefix.with_suffix(".png")) as rendered:
                excerpt = rendered.crop(coordinates(crop, rendered.size))
                excerpt.save(folder / raw)
                caption_image(excerpt, publish / name, f"{number:02d}  {caption} · 공식 문서 인쇄본")
        register(raw, name, source_id, caption, "브라우저 인쇄본 발췌",
                 url=observed["url"], original=f"evidence/{pdf_path.name} {page}쪽")

    for number, (raw_name, source_id, caption, *existing) in enumerate(ASSETS.get(row, []), 1):
        raw = "raw/" + raw_name
        name = existing[0] if existing else f"{number:02d}_{raw_name}"
        if row == 47 and number == 1:
            name = f"{number:02d}_korail-comparison.png"
            with Image.open(folder / raw) as original:
                comparison = original.resize((1200, 258), Image.Resampling.LANCZOS)
            caption_image(comparison, publish / name, "01  승차권 변경 서비스 개선 전후 비교 · 코레일 보도자료")
        else:
            shutil.copy2(folder / raw, publish / name)
        if row == 49 and number == 1:
            register(raw, name, source_id, caption, "공식 다운로드 이미지",
                     sourceTitle="당근 공식 보도자료 · 당근페이 안심결제 오픈",
                     url="https://about.daangn.com/company/pr/archive/당근페이-중고거래-안심결제-기능-도입/",
                     downloadUrl="https://prismic-image-proxy.krrt.io/karrot/Zw8NxIF3NbkBXe8w_%5B%EC%9D%B4%EB%AF%B8%EC%A7%801%5D%EB%8B%B9%EA%B7%BC%ED%8E%98%EC%9D%B4%EC%95%88%EC%8B%AC%EA%B2%B0%EC%A0%9C%EC%98%A4%ED%94%88.jpg?auto=compress%2Cformat&fit=max&q=100&w=4320&h=2430")
        else:
            register(raw, name, source_id, caption, "공식 다운로드 이미지")

    if row in (56, 57):
        for number, item in enumerate(research["images"], 2):
            name = f"{number:02d}_guide.png"
            mask = APPLE_MASKS.get(number, []) if row == 57 else []
            if mask:
                with Image.open(archive / name) as existing:
                    result = existing.convert("RGB")
                for rectangle in mask:
                    ImageDraw.Draw(result).rectangle(coordinates(rectangle, result.size), fill="#e5e7eb")
                result.save(publish / name, optimize=True)
            else:
                shutil.copy2(archive / name, publish / name)
            extra = {"redactionsNormalized": mask} if mask else {}
            if row == 57 and number in (4, 5, 6):
                extra.update(sourceTitle="Apple 지원 · Apple 구독 취소하기", url="https://support.apple.com/ko-kr/118428")
            register(item["file"], name, item["sourceId"], item["caption"], "공식 예시 이미지에 표식 편집", **extra)

    selected = {item["publishFile"] for item in images}
    for path in publish.iterdir():
        if path.suffix.lower() in (".jpg", ".jpeg", ".webp", ".png") and path.name not in selected:
            # Exact file, with preserved copy checked before removing it from the publication set.
            if sha(path) != sha(archive / path.name):
                raise ValueError(f"Archived image differs: {path}")
            path.unlink()

    notes = ["Google 검색 결과의 화면 캡처가 타임아웃되어 결과 링크의 빨간 표식 이미지는 확보하지 못했습니다. "
             "공식 안내의 원본 이미지 또는 브라우저 인쇄본 발췌를 첨부합니다."]
    if row in (53, 54):
        notes.append("이전에 저장된 DOM 재구성 이미지는 근거 폴더와 원본 경로에 보존하고 발행 목록에서 제외했습니다.")
    if row == 45:
        notes.append("삼성전자서비스 관련 문서는 기존 수집본을 참조했습니다. 이번 재조회에서는 시스템 점검 화면이 표시됐습니다.")
    if row == 50:
        notes.append("일반·방문택배 예시와 발송인·수취인 정보가 들어간 예시는 발행 목록에서 제외했습니다.")
    if row == 57:
        notes.append("Apple 공식 예시 계정의 이름·이메일·영수증 식별 정보는 발행 이미지에서 가렸습니다.")
    title = f'{job["tab"]}_{job["keyword"]}_웹조사결과.md'
    sections = [f'# {job["keyword"]} 웹조사 결과', f'조사 시작일 {research["date"]} · 보완일 {DATE} · {job["tab"]} {row}행',
                body, "## 캡처와 자료 범위", "\n\n".join(notes),
                "## 이미지 사용 순서", "아래 순서로 해당 설명 다음에 배치합니다."]
    for number, item in enumerate(images, 1):
        sections.append(f'{number}. **{item["caption"]}** · {item["kind"]}  \n'
                        f'   원본 `{item["file"]}` → 발행 `{item["publishFile"]}`  \n'
                        + (f'   인쇄 원본 `{item["original"]}`  \n' if "original" in item else "")
                        + f'   [{item["sourceTitle"]}]({item["url"]}) · {item["checkedAt"]}'
                        + (f' · [다운로드 원본]({item["downloadUrl"]})' if "downloadUrl" in item else "")
                        + "\n\n"
                        f'   ![{item["alt"]}]({item["publishFile"]})')
    sections.append("## 출처 및 확인일")
    for source in sources.values():
        sections.append(f'- [{source["id"]} · {source["title"]}]({source["url"]}) · {source["checkedAt"]}')
        sections.extend(f'  - [{link["title"]}]({link["url"]})' for link in source.get("relatedUrls", []))
    (publish / title).write_text("\n\n".join(sections) + "\n", encoding="utf-8")
    write(publish / "index.json", [*(item["publishFile"] for item in images), title])
    research.update(body=body, images=images, visualReviewed=False, exceptionReason=" ".join(notes))
    write(folder / "research.json", research)
    print(row, len(body), len(images))


def main():
    drafts = read(RUN / "resumed-drafts.json")
    for section in read(RUN / "dispatch.json")["sections"]:
        for job in read(ROOT / section["manifest"])["jobs"]:
            assemble(job, drafts)


if __name__ == "__main__":
    main()
