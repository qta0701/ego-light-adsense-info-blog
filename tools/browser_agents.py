"""Browser Agents Interface for ego-light-adsense-info-blog.

This module unifies and interfaces with two powerful browser automation tools:
1. Rust-based `chrome-agent` (sderosiaux/chrome-agent):
   - Fast, single binary, accessibility tree (uids), article reading (Readability),
     and structured record extraction.
2. Python-based `chrome-agent` (captivus/chrome-agent):
   - Raw Chrome DevTools Protocol (CDP) client, event subscriptions, network monitoring,
     and deep multi-agent browser session management.
"""

import json
import os
import subprocess
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional

PROJECT_ROOT = Path(__file__).resolve().parent.parent
RUST_BIN = (
    PROJECT_ROOT
    / ".tools"
    / "chrome-agent-rust"
    / "node_modules"
    / "chrome-agent"
    / "bin"
    / "chrome-agent-windows-x64.exe"
)
VENV_PYTHON = PROJECT_ROOT / ".venv" / "Scripts" / "python.exe"
VENV_CHROME_AGENT = PROJECT_ROOT / ".venv" / "Scripts" / "chrome-agent.exe"


class RustChromeAgent:
    """Interface to sderosiaux/chrome-agent (Rust CLI).

    Best for:
    - High-level content extraction (Mozilla Readability `read`)
    - Repeated record extraction (`extract`)
    - Accessibility tree inspection & UI element interaction (`goto`, `click`, `fill`)
    """

    def __init__(
        self,
        browser_name: str = "default",
        connect_url: Optional[str] = None,
        bin_path: Optional[Path] = None,
    ):
        self.bin_path = bin_path or RUST_BIN
        self.browser_name = browser_name
        self.connect_url = connect_url

    def _run(self, *args: str, timeout: int = 45) -> subprocess.CompletedProcess:
        cmd = [str(self.bin_path)]
        if self.connect_url:
            cmd.extend(["--connect", self.connect_url])
        else:
            cmd.extend(["--browser", self.browser_name])
        cmd.extend(list(args))
        import tempfile
        with tempfile.TemporaryFile() as out_f, tempfile.TemporaryFile() as err_f:
            res = subprocess.run(
                cmd,
                stdin=subprocess.DEVNULL,
                stdout=out_f,
                stderr=err_f,
                timeout=timeout,
            )
            out_f.seek(0)
            err_f.seek(0)
            stdout = out_f.read().decode("utf-8", errors="replace")
            stderr = err_f.read().decode("utf-8", errors="replace")
        return subprocess.CompletedProcess(
            args=cmd,
            returncode=res.returncode,
            stdout=stdout,
            stderr=stderr,
        )

    def goto(self, url: str, inspect: bool = True) -> str:
        """Navigate to a URL and optionally inspect accessibility tree."""
        args = ["goto", url]
        if inspect:
            args.append("--inspect")
        res = self._run(*args)
        return res.stdout.strip() or res.stderr.strip()

    def read_article(self, url: Optional[str] = None, html: bool = False) -> str:
        """Extract main article body using Mozilla Readability."""
        if url:
            self.goto(url, inspect=False)
        args = ["read"]
        if html:
            args.append("--html")
        res = self._run(*args)
        if res.returncode != 0:
            # Fallback to visible text from body/main if Readability fails
            text_res = self._run("text", "--selector", "main")
            if not text_res.stdout.strip():
                text_res = self._run("text", "--selector", "body")
            return text_res.stdout.strip()
        return res.stdout.strip()

    def extract_records(self, url: Optional[str] = None, limit: int = 20) -> str:
        """Extract repeated structured records (feeds, product lists, search results)."""
        if url:
            self.goto(url, inspect=False)
        res = self._run("extract", "--limit", str(limit))
        return res.stdout.strip()

    def inspect(self) -> str:
        """Get the current page accessibility tree with uids."""
        res = self._run("inspect")
        return res.stdout.strip()

    def click(self, uid_or_selector: str) -> str:
        """Click by uid (e.g. 'n12') or selector."""
        if uid_or_selector.startswith("n") and uid_or_selector[1:].isdigit():
            res = self._run("click", uid_or_selector)
        else:
            res = self._run("click", "--selector", uid_or_selector)
        return res.stdout.strip()

    def fill(self, uid: str, value: str) -> str:
        """Fill an input field by uid."""
        res = self._run("fill", "--uid", uid, value)
        return res.stdout.strip()

    def eval_js(self, expression: str) -> Any:
        """Evaluate JavaScript and return JSON parsed result if possible."""
        res = self._run("--json", "eval", expression)
        out = res.stdout.strip()
        try:
            return json.loads(out)
        except Exception:
            return out

    def close(self, purge: bool = False) -> str:
        """Close the managed Chrome instance."""
        args = ["close"]
        if purge:
            args.append("--purge")
        res = self._run(*args)
        return res.stdout.strip()


class PythonChromeAgent:
    """Interface to captivus/chrome-agent (Python CDP CLI & library).

    Best for:
    - Raw Chrome DevTools Protocol commands (Network, DOM, Page, Runtime, CSS)
    - Real-time network and console monitoring
    - Complex session saving & restoring
    """

    def __init__(self, cli_path: Optional[Path] = None):
        self.cli_path = cli_path or VENV_CHROME_AGENT

    def _run(self, *args: str) -> subprocess.CompletedProcess:
        cmd = [str(self.cli_path)] + list(args)
        import tempfile
        with tempfile.TemporaryFile() as out_f, tempfile.TemporaryFile() as err_f:
            res = subprocess.run(
                cmd,
                stdin=subprocess.DEVNULL,
                stdout=out_f,
                stderr=err_f,
                timeout=45,
            )
            out_f.seek(0)
            err_f.seek(0)
            stdout = out_f.read().decode("utf-8", errors="replace")
            stderr = err_f.read().decode("utf-8", errors="replace")
        return subprocess.CompletedProcess(
            args=cmd,
            returncode=res.returncode,
            stdout=stdout,
            stderr=stderr,
        )

    def status(self) -> List[Dict[str, Any]]:
        """List managed Chrome instances and their targets."""
        res = self._run("status")
        try:
            return json.loads(res.stdout)
        except Exception:
            return []

    def launch(self, headless: bool = True) -> Dict[str, Any]:
        """Launch a new managed Chrome instance."""
        args = ["launch"]
        if headless:
            args.append("--headless")
        res = self._run(*args)
        try:
            return json.loads(res.stdout)
        except Exception:
            return {"raw_output": res.stdout, "error": res.stderr}

    def send_cdp(
        self,
        instance: str,
        method: str,
        params: Optional[Dict[str, Any]] = None,
    ) -> Any:
        """Send a raw CDP command to an instance."""
        args = [instance, method]
        if params is not None:
            args.append(json.dumps(params))
        res = self._run(*args)
        try:
            return json.loads(res.stdout)
        except Exception:
            return res.stdout.strip() or res.stderr.strip()

    def stop(self, instance: str) -> str:
        """Stop an instance."""
        res = self._run("stop", instance)
        return res.stdout.strip()

    def cleanup(self) -> str:
        """Clean up stale instances."""
        res = self._run("cleanup")
        return res.stdout.strip()


class EgoLiteBridge:
    """Bridge for citrolabs/ego-lite AI browser.

    Connects sderosiaux or captivus chrome-agent to ego-lite's debugging port,
    allowing agents to operate inside the user's authenticated session while keeping
    human tasks isolated.
    """

    def __init__(self, host: str = "127.0.0.1", port: int = 9222):
        self.host = host
        self.port = port
        self.base_url = f"http://{host}:{port}"

    def is_available(self) -> bool:
        """Check if ego-lite or Chromium debugging endpoint is listening."""
        import socket
        try:
            with socket.create_connection((self.host, self.port), timeout=1.0):
                return True
        except OSError:
            return False

    def get_rust_agent(self) -> RustChromeAgent:
        """Get a RustChromeAgent connected to this ego-lite instance."""
        return RustChromeAgent(connect_url=self.base_url)

    def get_version(self) -> Optional[Dict[str, Any]]:
        """Get browser version information from /json/version."""
        import urllib.request
        try:
            req = urllib.request.Request(f"{self.base_url}/json/version")
            with urllib.request.urlopen(req, timeout=2) as resp:
                return json.loads(resp.read().decode())
        except Exception:
            return None


# Convenience instances
rust_agent = RustChromeAgent()
py_agent = PythonChromeAgent()
ego_bridge = EgoLiteBridge()
