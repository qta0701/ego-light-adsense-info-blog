# Project-local native CLI. Keep stdout as the upstream JSON envelope (also for MCP).
$projectRoot = Split-Path -Parent $PSScriptRoot
$desktopArch = $env:PROCESSOR_ARCHITEW6432
if (-not $desktopArch) { $desktopArch = $env:PROCESSOR_ARCHITECTURE }
if ($desktopArch -eq 'ARM64') { $desktopArch = 'arm64' } else { $desktopArch = 'x64' }
$desktopBin = Join-Path $projectRoot ".tools/agent-desktop/node_modules/agent-desktop/bin/agent-desktop-win32-$desktopArch.exe"
if (-not (Test-Path -LiteralPath $desktopBin)) {
    Write-Error 'Run tools/install-agent-desktop.ps1 first.'
    exit 1
}
$previousDesktopHome = $env:AGENT_DESKTOP_HOME
try {
    if (-not $env:AGENT_DESKTOP_HOME) {
        $env:AGENT_DESKTOP_HOME = Join-Path $projectRoot '.session/agent-desktop'
    }
    & $desktopBin @args
    $desktopExitCode = $LASTEXITCODE
} finally {
    $env:AGENT_DESKTOP_HOME = $previousDesktopHome
}
exit $desktopExitCode
