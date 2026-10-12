#!/usr/bin/env bash
# One-time setup for Mac and Linux.
# Installs Claude Code, ffmpeg, Python packages (faster-whisper, auto-editor)
# and the Montserrat Black font.
# Usage: bash setup.sh

set -e
cd "$(dirname "$0")"

FONT_URL="https://raw.githubusercontent.com/JulietaUla/Montserrat/master/fonts/ttf/Montserrat-Black.ttf"
OS="$(uname -s)"

# Use sudo only when not already root
SUDO=""
if [ "$(id -u)" -ne 0 ]; then SUDO="sudo"; fi

echo "==> Detected OS: $OS"

# ---------- System packages (ffmpeg, python) ----------
if [ "$OS" = "Darwin" ]; then
  if ! command -v brew >/dev/null 2>&1; then
    echo "==> Installing Homebrew"
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    if [ -x /opt/homebrew/bin/brew ]; then eval "$(/opt/homebrew/bin/brew shellenv)"; fi
    if [ -x /usr/local/bin/brew ]; then eval "$(/usr/local/bin/brew shellenv)"; fi
  fi
  command -v ffmpeg  >/dev/null 2>&1 || { echo "==> Installing ffmpeg"; brew install ffmpeg; }
  command -v python3 >/dev/null 2>&1 || { echo "==> Installing Python"; brew install python; }
elif [ "$OS" = "Linux" ]; then
  if command -v apt-get >/dev/null 2>&1; then
    echo "==> Installing ffmpeg and Python with apt"
    $SUDO apt-get update
    $SUDO apt-get install -y ffmpeg python3 python3-pip python3-venv curl
  elif command -v dnf >/dev/null 2>&1; then
    echo "==> Installing ffmpeg and Python with dnf"
    $SUDO dnf install -y ffmpeg python3 python3-pip curl
  elif command -v pacman >/dev/null 2>&1; then
    echo "==> Installing ffmpeg and Python with pacman"
    $SUDO pacman -S --noconfirm ffmpeg python python-pip curl
  else
    echo "!! Unknown package manager. Please install ffmpeg and python3 yourself."
  fi
else
  echo "!! Unsupported OS. On Windows, run setup.ps1 instead."
  exit 1
fi

# ---------- Python packages (in a local virtual env) ----------
echo "==> Creating Python virtual environment in .venv"
python3 -m venv .venv
./.venv/bin/pip install --upgrade pip
./.venv/bin/pip install faster-whisper auto-editor

# ---------- Font ----------
mkdir -p assets/fonts
if [ ! -f assets/fonts/Montserrat-Black.ttf ]; then
  echo "==> Downloading Montserrat Black font"
  curl -fsSL -o assets/fonts/Montserrat-Black.ttf "$FONT_URL"
fi

# ---------- Claude Code ----------
if ! command -v claude >/dev/null 2>&1; then
  echo "==> Installing Claude Code"
  curl -fsSL https://claude.ai/install.sh | bash
fi

echo ""
echo "==> All done. Installed versions:"
ffmpeg -version | head -n 1 || true
python3 --version || true
./.venv/bin/auto-editor --version 2>/dev/null || true
./.venv/bin/python -c "import faster_whisper; print('faster-whisper', faster_whisper.__version__)" || true
ls -la assets/fonts/Montserrat-Black.ttf || true
echo ""
echo "Next: open a new terminal in this folder and run:  claude"
echo "Python tools live in .venv (activate with: source .venv/bin/activate)"
