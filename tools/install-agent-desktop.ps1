param([switch]$NoNotify)
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$installDir = Join-Path $projectRoot '.tools/agent-desktop'
$installOk = $false
try {
    New-Item -ItemType Directory -Force -Path $installDir | Out-Null
    Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'agent-desktop/package.json') -Destination (Join-Path $installDir 'package.json')
    Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'agent-desktop/npm-lock.json') -Destination (Join-Path $installDir 'package-lock.json')
    & npm.cmd ci --prefix $installDir --cache (Join-Path $projectRoot '.tools/npm-cache') --offline=false --no-audit --no-fund
    if ($LASTEXITCODE -ne 0) { throw 'agent-desktop npm ci failed.' }
    # npm verifies package integrity; also check the selected native binary's shipped digest.
    $desktopArch = $env:PROCESSOR_ARCHITEW6432
    if (-not $desktopArch) { $desktopArch = $env:PROCESSOR_ARCHITECTURE }
    if ($desktopArch -eq 'ARM64') { $desktopArch = 'arm64' } else { $desktopArch = 'x64' }
    $desktopBin = Join-Path $installDir "node_modules/agent-desktop/bin/agent-desktop-win32-$desktopArch.exe"
    $expectedHash = (Get-Content -LiteralPath "$desktopBin.sha256" -Raw).Trim()
    if ((Get-FileHash -LiteralPath $desktopBin -Algorithm SHA256).Hash -ine $expectedHash) { throw 'Native binary checksum mismatch.' }
    & (Join-Path $projectRoot 'bin/agent-desktop.cmd') version
    if ($LASTEXITCODE -ne 0) { throw 'agent-desktop startup failed.' }
    $installOk = $true
} finally {
    if (-not $NoNotify) {
        try {
            $message = if ($installOk) { 'Installation completed.' } else { 'Installation stopped. Check terminal output.' }
            & (Join-Path $PSScriptRoot 'show-notification.ps1') -Title 'agent-desktop' -Message $message
        } catch { Write-Warning 'Windows notification unavailable; see terminal result.' }
    }
}
