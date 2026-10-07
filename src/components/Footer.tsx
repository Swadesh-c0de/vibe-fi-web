import Link from "next/link";
import React from "react";

export default function Footer(): React.JSX.Element {
  return (
    <footer className="mt-auto border-t border-subtle py-12 sm:py-16 pb-6 sm:pb-8 content-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between flex-wrap gap-8 md:gap-12 mb-8 md:mb-12">
          <div className="max-w-[360px]">
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="26" height="26" viewBox="0 0 36 36" fill="none">
                <rect width="36" height="36" rx="9" className="logo-squircle-bg" />
                <rect x="6.5" y="14" width="4" height="14" rx="2" fill="#7daea3" />
                <rect x="13.5" y="6" width="4" height="22" rx="2" fill="#d4be98" />
                <rect x="20.5" y="11" width="4" height="17" rx="2" fill="#e78a4e" />
                <rect x="27.5" y="18" width="4" height="10" rx="2" fill="#a9b665" />
              </svg>
              <span className="font-brand font-black text-2xl tracking-tight leading-none">
                <span className="text-text-primary">vibe</span>
                <span className="text-sage">-fi</span>
              </span>
            </div>
            <p className="text-[0.92rem] text-text-secondary leading-relaxed mb-5">
              Free, open-source terminal music player for Linux & macOS. Built with C++17, libmpv, and ncurses.
            </p>
            {/* Terminal prompt footer widget */}
            <div className="inline-flex items-center gap-2 max-w-full overflow-hidden px-3 py-1.5 bg-canvas border border-strong rounded-[6px] font-mono text-[0.74rem] sm:text-[0.78rem] text-text-secondary shadow-xs">
              <span className="text-sage font-extrabold shrink-0">❯</span>
              <code className="truncate">vibe --version : v1.1.2 · Linux &amp; macOS</code>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-16">
            <div className="flex flex-col gap-2">
              <span className="font-brand text-[0.95rem] font-extrabold text-text-primary mb-1.5">Documentation</span>
              <Link href="/docs" className="text-[0.88rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors">Getting Started</Link>
              <Link href="/docs/installation" className="text-[0.88rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors">Installation</Link>
              <Link href="/docs/usage" className="text-[0.88rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors">Usage &amp; CLI</Link>
              <Link href="/docs/hotkeys" className="text-[0.88rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors">Hotkeys</Link>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-brand text-[0.95rem] font-extrabold text-text-primary mb-1.5">Features</span>
              <a href="#youtube" className="text-[0.88rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors">YouTube Audio</a>
              <a href="#visualizers" className="text-[0.88rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors">Visualizers</a>
              <a href="#lyrics" className="text-[0.88rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors">Synced Lyrics</a>
              <a href="#bottle" className="text-[0.88rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors">Bottle Sandbox</a>
            </div>

            <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
              <span className="font-brand text-[0.95rem] font-extrabold text-text-primary mb-1.5">Community</span>
              <a
                href="https://github.com/Swadesh-c0de/vibe-fi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.88rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors"
              >
                GitHub Repository ↗
              </a>
              <a
                href="https://github.com/Swadesh-c0de/vibe-fi/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.88rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors"
              >
                Releases (v1.1.2) ↗
              </a>
              <a
                href="https://github.com/Swadesh-c0de/vibe-fi/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.88rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors"
              >
                Report Issue ↗
              </a>
              <a
                href="https://github.com/Swadesh-c0de/vibe-fi/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.88rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors"
              >
                MIT License ↗
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between flex-wrap gap-3 sm:gap-4 pt-8 border-t border-subtle text-[0.88rem] text-text-muted">
          <p>
            Crafted with passion by{" "}
            <a
              href="https://github.com/Swadesh-c0de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber font-semibold hover:underline"
            >
              Swadesh-c0de
            </a>
          </p>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[0.72rem] px-1.5 py-0.5 bg-surface-elevated rounded border border-subtle">C++17</span>
            <span className="font-mono text-[0.72rem] px-1.5 py-0.5 bg-surface-elevated rounded border border-subtle">libmpv</span>
            <span className="font-mono text-[0.72rem] px-1.5 py-0.5 bg-surface-elevated rounded border border-subtle">ncurses</span>
            <span className="font-mono text-[0.72rem] px-1.5 py-0.5 bg-surface-elevated rounded border border-subtle">yt-dlp</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
