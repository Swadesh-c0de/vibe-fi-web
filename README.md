# Vibe-Fi Official Website

> The modern, high-performance product landing page and documentation portal for [Vibe-Fi](https://github.com/Swadesh-c0de/vibe-fi) — the lightning-fast, zero-config terminal music player for Linux & macOS.

---

## ✨ Features

- **Gruvbox Material Aesthetic**: Styled after retro-modern minimalist terminal aesthetics with custom colors matching the official Vibe-Fi brand squircle and Arch Linux powerline prompts.
- **☀️ Light & 🌙 Dark Mode Switcher**: Persistent, zero-flicker theme toggle button.
- **Interactive Live Terminal Player**:
  - Procedural Web Audio synthesizer engine (warm Lo-Fi chords)
  - 60 FPS Canvas Audio Visualizer with 3 reactive modes: **Cava Wave**, **Neon Flame** (with floating peak caps), and **Stereo Bars**
  - Real-time Synchronized Lyrics scroller (simulating `lrclib.net` integration)
  - Terminal theme switcher (**Midnight**, **Matrix**, **Nord**, **HyDE**)
  - Keyboard shortcuts active in-browser (`Space` to play/pause, `V` for visualizer, `T` for theme, `M` for mute)
- **Multi-Route Documentation Portal**:
  - `/docs`: Getting started overview & architecture
  - `/docs/installation`: Multi-platform guide (Arch Linux, macOS, Ubuntu/Debian, Fedora, CMake source build)
  - `/docs/usage`: CLI usage, YouTube streaming, playlists, lyrics cache, Waybar & Hyprland setup
  - `/docs/hotkeys`: Searchable shortcut cheatsheet
- **100% Vibe-Fi Focused**: Highlights the 6 core pillars without competitor comparisons.
- **Static Export Ready**: Fully compatible with Vercel, Netlify, Cloudflare Pages, and GitHub Pages.

---

## 🚀 Getting Started Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Production Build & Static Export

```bash
npm run build
```

This compiles an optimized, pre-rendered static site into the `out/` directory.

---

## 🌐 Deployment Options

### 1. GitHub Pages (Automated)
A ready-to-go GitHub Actions workflow is included at `.github/workflows/deploy.yml`. When you push to `main`, it will automatically build and publish to GitHub Pages.

### 2. Vercel
Import the repository on [Vercel](https://vercel.com) — zero configuration required.

### 3. Netlify / Cloudflare Pages
Set build command to `npm run build` and publish directory to `out`.

---

## 📄 License
MIT © [Swadesh-c0de](https://github.com/Swadesh-c0de)
