"""Blog Material Collector using chrome-agent (sderosiaux/chrome-agent).

Usage:
  python tools/collect_blog_material.py <URL> [output_file.md]
"""

import sys
from datetime import datetime
from pathlib import Path

# Add project root to path
PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from tools.browser_agents import RustChromeAgent


def collect_material(url: str, output_path: str | None = None) -> Path:
    agent = RustChromeAgent(browser_name="blog-collector")

    print(f"[*] Navigating to: {url}", flush=True)
    nav_result = agent.goto(url, inspect=False)

    print("[*] Reading article body via Readability...", flush=True)
    article_body = agent.read_article()

    print("[*] Extracting structured repeating records...", flush=True)
    records = agent.extract_records(limit=10)

    # Get page title via JS eval
    title_data = agent.eval_js("document.title")
    title = title_data.get("result", url) if isinstance(title_data, dict) else str(title_data)

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    markdown_content = f"""# [자료 수집] {title}

- **출처 URL**: {url}
- **수집 일시**: {timestamp}
- **도구**: chrome-agent (Rust / Readability Engine)

---

## 1. 본문 내용 (Readability)

{article_body}

---

## 2. 구조화 추출 레코드 (Extract)

```
{records}
```

---

> [!NOTE]
> 이 문서는 `tools/collect_blog_material.py`를 통해 자동 수집되었습니다.
> 블로그 포스팅 작성 시 본문 요약 및 정보 인용에 활용하세요.
"""

    if output_path:
        out_file = Path(output_path)
    else:
        safe_date = datetime.now().strftime("%y%m%d_%H%M%S")
        out_dir = PROJECT_ROOT / "26_1106"
        out_dir.mkdir(parents=True, exist_ok=True)
        out_file = out_dir / f"material_{safe_date}.md"

    out_file.write_text(markdown_content, encoding="utf-8")
    print(f"[+] Material successfully saved to: {out_file}")
    return out_file


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python tools/collect_blog_material.py <URL> [output_file.md]")
        sys.exit(1)

    target_url = sys.argv[1]
    save_dest = sys.argv[2] if len(sys.argv) > 2 else None
    collect_material(target_url, save_dest)
