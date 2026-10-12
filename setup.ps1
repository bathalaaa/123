# One-time setup for Windows.
# Installs Claude Code, ffmpeg, Python, Python packages (faster-whisper, auto-editor)
# and the Montserrat Black font.
# Usage (PowerShell):  powershell -ExecutionPolicy Bypass -File setup.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$FontUrl = "https://raw.githubusercontent.com/JulietaUla/Montserrat/master/fonts/ttf/Montserrat-Black.ttf"

function Refresh-Path {
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" +
                [System.Environment]::GetEnvironmentVariable("Path", "User")
}

# ---------- System packages (ffmpeg, python) ----------
if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
    Write-Host "!! winget not found. Install 'App Installer' from the Microsoft Store, then run this again."
    exit 1
}

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    Write-Host "==> Installing ffmpeg"
    winget install --id Gyan.FFmpeg -e --accept-source-agreements --accept-package-agreements
}

if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "==> Installing Python 3.12"
    winget install --id Python.Python.3.12 -e --accept-source-agreements --accept-package-agreements
}

Refresh-Path

# ---------- Python packages (in a local virtual env) ----------
Write-Host "==> Creating Python virtual environment in .venv"
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install faster-whisper auto-editor

# ---------- Font ----------
New-Item -ItemType Directory -Force -Path "assets\fonts" | Out-Null
if (-not (Test-Path "assets\fonts\Montserrat-Black.ttf")) {
    Write-Host "==> Downloading Montserrat Black font"
    Invoke-WebRequest -Uri $FontUrl -OutFile "assets\fonts\Montserrat-Black.ttf"
}

# ---------- Claude Code ----------
if (-not (Get-Command claude -ErrorAction SilentlyContinue)) {
    Write-Host "==> Installing Claude Code"
    Invoke-RestMethod https://claude.ai/install.ps1 | Invoke-Expression
}

Write-Host ""
Write-Host "==> All done. Installed versions:"
try { (ffmpeg -version)[0] } catch { Write-Host "ffmpeg: open a new terminal to use it" }
python --version
.\.venv\Scripts\python.exe -c "import faster_whisper; print('faster-whisper', faster_whisper.__version__)"
Get-Item "assets\fonts\Montserrat-Black.ttf" | Select-Object Name, Length
Write-Host ""
Write-Host "Next: open a NEW terminal in this folder and run:  claude"
Write-Host "Python tools live in .venv (activate with: .\.venv\Scripts\Activate.ps1)"
