@echo off
setlocal
for %%I in ("%~dp0..") do set "DESKTOP_ROOT=%%~fI"
if not defined AGENT_DESKTOP_HOME set "AGENT_DESKTOP_HOME=%DESKTOP_ROOT%\.session\agent-desktop"
set "DESKTOP_ARCH=x64"
if /I "%PROCESSOR_ARCHITECTURE%"=="ARM64" set "DESKTOP_ARCH=arm64"
if /I "%PROCESSOR_ARCHITEW6432%"=="ARM64" set "DESKTOP_ARCH=arm64"
set "DESKTOP_BIN=%~dp0..\.tools\agent-desktop\node_modules\agent-desktop\bin\agent-desktop-win32-%DESKTOP_ARCH%.exe"
if not exist "%DESKTOP_BIN%" (
  echo Run tools/install-agent-desktop.ps1 first. 1>&2
  exit /b 1
)
"%DESKTOP_BIN%" %*
exit /b %errorlevel%
