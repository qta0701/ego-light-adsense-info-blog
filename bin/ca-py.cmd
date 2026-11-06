@echo off
setlocal
set "PY_EXE=%~dp0..\.venv\Scripts\chrome-agent.exe"
"%PY_EXE%" %*

