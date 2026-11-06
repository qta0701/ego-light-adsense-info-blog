@echo off
setlocal
set "BIN_DIR=%~dp0..\.tools\chrome-agent-rust\node_modules\chrome-agent\bin"
"%BIN_DIR%\chrome-agent-windows-x64.exe" %*

