"""AdSense & Network Health Inspector using chrome-agent (captivus CDP client).

Inspects a blog or web page for:
- Google AdSense script loading (adsbygoogle.js)
- Publisher ID detection (ca-pub-...)
- Ad slot configuration and fill status (ins.adsbygoogle, data-ad-status)
- Network request success/failure for Google ad domains
- Concrete recommendations for AdSense optimization and policy compliance

Usage:
  python tools/check_adsense_network.py <URL> [--headless]
"""

import asyncio
import json
import os
import subprocess
import sys
import tempfile
import urllib.request
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List

# Add project root to sys.path
PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from chrome_agent.cdp_client import CDPClient


def get_free_port() -> int:
    import socket
    with socket.socket() as s:
        s.bind(("", 0))
        return s.getsockname()[1]


async def inspect_adsense(url: str, headless: bool = True) -> Dict[str, Any]:
    port = get_free_port()
    user_data_dir = os.path.join(tempfile.gettempdir(), f"chrome-adsense-check-{port}")
    os.makedirs(user_data_dir, exist_ok=True)

    chrome_path = os.path.expandvars(r"%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe")
    if not os.path.exists(chrome_path):
        chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

    cmd = [
        chrome_path,
        f"--remote-debugging-port={port}",
        f"--user-data-dir={user_data_dir}",
        "--no-first-run",
        "--no-default-browser-check",
    ]
    if headless:
        cmd.append("--headless=new")

    # Start Chrome process with detached flags to avoid console lock
    creationflags = 0
    if sys.platform == "win32":
        creationflags = subprocess.DETACHED_PROCESS | subprocess.CREATE_NEW_PROCESS_GROUP

    process = subprocess.Popen(
        cmd,
        stdin=subprocess.DEVNULL,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        creationflags=creationflags,
    )

    ws_url = None
    for _ in range(30):
        await asyncio.sleep(0.3)
        try:
            req = urllib.request.Request(f"http://127.0.0.1:{port}/json")
            with urllib.request.urlopen(req, timeout=1) as resp:
                targets = json.loads(resp.read().decode())
                for t in targets:
                    if t.get("type") == "page" and "webSocketDebuggerUrl" in t:
                        ws_url = t["webSocketDebuggerUrl"]
                        break
            if ws_url:
                break
        except Exception:
            continue

    if not ws_url:
        process.kill()
        raise RuntimeError("Failed to attach to Chrome CDP WebSocket endpoint.")

    network_requests: List[Dict[str, Any]] = []
    failed_requests: List[Dict[str, Any]] = []

    report = {
        "url": url,
        "checked_at": datetime.now().isoformat(),
        "adsbygoogle_loaded": False,
        "publisher_ids": [],
        "ad_slots": [],
        "network_ad_requests": [],
        "failed_ad_requests": [],
        "evaluation": {},
    }

    try:
        async with CDPClient(ws_url=ws_url) as cdp:
            # Setup event handlers
            def on_request(params: dict):
                req = params.get("request", {})
                req_url = req.get("url", "")
                if any(k in req_url for k in ["googleads", "pagead2", "googlesyndication", "adservice.google"]):
                    network_requests.append({
                        "url": req_url,
                        "method": req.get("method"),
                        "requestId": params.get("requestId"),
                    })

            def on_failed(params: dict):
                failed_requests.append(params)

            cdp.on("Network.requestWillBeSent", on_request)
            cdp.on("Network.loadingFailed", on_failed)

            # Enable CDP domains
            await cdp.send("Network.enable")
            await cdp.send("Page.enable")
            await cdp.send("DOM.enable")

            # Navigate to target URL
            await cdp.send("Page.navigate", {"url": url})

            # Wait for page settle & network activity
            await asyncio.sleep(5.0)

            # Check DOM for adsbygoogle elements & publisher IDs via JavaScript evaluation
            js_script = """
            (() => {
                const ads = Array.from(document.querySelectorAll('ins.adsbygoogle'));
                const adData = ads.map(el => ({
                    client: el.getAttribute('data-ad-client') || '',
                    slot: el.getAttribute('data-ad-slot') || '',
                    format: el.getAttribute('data-ad-format') || '',
                    status: el.getAttribute('data-ad-status') || 'pending',
                    isVisible: el.offsetWidth > 0 && el.offsetHeight > 0,
                    width: el.offsetWidth,
                    height: el.offsetHeight
                }));

                const scripts = Array.from(document.querySelectorAll('script')).map(s => s.src);
                const hasAdSenseScript = scripts.some(src => src.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'));

                let pubIds = [];
                adData.forEach(a => { if (a.client) pubIds.push(a.client); });
                scripts.forEach(s => {
                    const match = s.match(/client=(ca-pub-[0-9]+)/);
                    if (match) pubIds.push(match[1]);
                });

                return {
                    hasAdSenseScript,
                    uniquePubIds: Array.from(new Set(pubIds)),
                    slots: adData,
                    title: document.title
                };
            })()
            """
            eval_res = await cdp.send("Runtime.evaluate", {
                "expression": js_script,
                "returnByValue": True,
            })

            result_val = eval_res.get("result", {}).get("value", {})
            report["adsbygoogle_loaded"] = result_val.get("hasAdSenseScript", False)
            report["publisher_ids"] = result_val.get("uniquePubIds", [])
            report["ad_slots"] = result_val.get("slots", [])
            report["page_title"] = result_val.get("title", "")
            report["network_ad_requests"] = network_requests
            report["failed_ad_requests"] = failed_requests

            # Health Evaluation
            evaluation = {
                "script_tag_status": "PASS" if report["adsbygoogle_loaded"] else "WARN (No direct script tag)",
                "publisher_id_found": bool(report["publisher_ids"]),
                "ad_slots_count": len(report["ad_slots"]),
                "ad_requests_count": len(network_requests),
                "is_healthy": (report["adsbygoogle_loaded"] or len(network_requests) > 0),
            }
            report["evaluation"] = evaluation

    finally:
        try:
            process.kill()
        except Exception:
            pass

    return report


def print_report(report: Dict[str, Any]):
    print("\n" + "=" * 60)
    print(f"📊 AdSense & Network Inspection Report")
    print(f"URL: {report['url']}")
    print(f"Title: {report.get('page_title', 'N/A')}")
    print(f"Time: {report['checked_at']}")
    print("=" * 60)

    print(f"\n[1] AdSense Script Status:")
    print(f"  - adsbygoogle.js loaded: {'✅ YES' if report['adsbygoogle_loaded'] else '❌ NO'}")
    if report["publisher_ids"]:
        print(f"  - Publisher ID(s) detected: {', '.join(report['publisher_ids'])}")
    else:
        print(f"  - Publisher ID(s): ⚠️ None found")

    print(f"\n[2] Ad Slots (<ins class='adsbygoogle'>):")
    slots = report["ad_slots"]
    print(f"  - Total slots detected: {len(slots)}")
    for i, slot in enumerate(slots, 1):
        print(f"    Slot #{i}: Client={slot['client']}, SlotID={slot['slot']}, Status={slot['status']}, Size={slot['width']}x{slot['height']}")

    print(f"\n[3] Network Activity (Google Ad Domains):")
    print(f"  - Ad network requests initiated: {len(report['network_ad_requests'])}")
    print(f"  - Failed ad requests: {len(report['failed_ad_requests'])}")

    print(f"\n[4] Overall Health Evaluation:")
    eval_data = report["evaluation"]
    for k, v in eval_data.items():
        print(f"  - {k}: {v}")
    print("=" * 60 + "\n")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python tools/check_adsense_network.py <URL>")
        sys.exit(1)

    target_url = sys.argv[1]
    res = asyncio.run(inspect_adsense(target_url, headless=True))
    print_report(res)

