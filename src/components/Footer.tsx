import Link from "next/link";
import React from "react";

export default function Footer(): React.JSX.Element {
  return (
    <footer className="mt-auto border-t border-subtle py-10 sm:py-16 pb-8 sm:pb-12 content-auto overflow-hidden">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between flex-wrap gap-8 md:gap-16 mb-10 md:mb-16">
          <div className="w-full md:max-w-[360px] min-w-0">
            <div className="flex items-center gap-3 mb-3.5 sm:mb-4.5">
              <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
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
            <p className="text-[0.88rem] sm:text-[0.92rem] text-text-secondary leading-relaxed mb-5 sm:mb-6">
              Free, open-source terminal music player for Linux &amp; macOS. Built with Go, Bubble Tea, Lip Gloss, and libmpv.
            </p>
            {/* Terminal prompt footer widget - strictly constrained for mobile */}
            <div className="flex items-center gap-2 max-w-full overflow-hidden px-3 py-2 bg-canvas border border-strong rounded-[6px] font-mono text-[0.74rem] sm:text-[0.78rem] text-text-secondary shadow-xs">
              <span className="text-sage font-extrabold shrink-0">❯</span>
              <code className="truncate min-w-0 flex-1">vibe &quot;Sunflower Spiderverse&quot;</code>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-8 sm:gap-12 lg:gap-16 flex-1 md:justify-end">
            <div className="flex flex-col gap-2 sm:gap-2.5">
              <span className="font-brand text-[0.92rem] sm:text-[0.95rem] font-extrabold text-text-primary mb-1">Documentation</span>
              <Link href="/docs" className="text-[0.85rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors">Getting Started</Link>
              <Link href="/docs/installation" className="text-[0.85rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors">Installation</Link>
              <Link href="/docs/usage" className="text-[0.85rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors">Usage &amp; CLI</Link>
              <Link href="/docs/hotkeys" className="text-[0.85rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors">Hotkeys</Link>
            </div>

            <div className="flex flex-col gap-2 sm:gap-2.5">
              <span className="font-brand text-[0.92rem] sm:text-[0.95rem] font-extrabold text-text-primary mb-1">Features</span>
              <Link href="/#youtube" className="text-[0.85rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors">YouTube Audio</Link>
              <Link href="/#visualizers" className="text-[0.85rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors">Visualizers</Link>
              <Link href="/#lyrics" className="text-[0.85rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors">Synced Lyrics</Link>
              <Link href="/#local" className="text-[0.85rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors">Local Library</Link>
            </div>

            <div className="flex flex-col gap-2 sm:gap-2.5 col-span-2 sm:col-span-1 pt-2 sm:pt-0">
              <span className="font-brand text-[0.92rem] sm:text-[0.95rem] font-extrabold text-text-primary mb-1">Community</span>
              <a
                href="https://github.com/Swadesh-c0de/vibe-fi-go"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.85rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors"
              >
                GitHub Repository ↗
              </a>
              <a
                href="https://github.com/Swadesh-c0de/vibe-fi-go/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.85rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors"
              >
                Releases (v2.0.0) ↗
              </a>
              <a
                href="https://github.com/Swadesh-c0de/vibe-fi-go/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.85rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors"
              >
                Report Issue ↗
              </a>
              <a
                href="https://github.com/Swadesh-c0de/vibe-fi-go/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.85rem] sm:text-[0.9rem] text-text-secondary hover:text-sage transition-colors"
              >
                MIT License ↗
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-subtle text-[0.84rem] sm:text-[0.88rem] text-text-muted text-center sm:text-left">
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
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap max-w-full">
            <span className="font-mono text-[0.72rem] sm:text-[0.74rem] px-2 py-0.5 bg-surface-elevated rounded border border-subtle">Go 1.20+</span>
            <span className="font-mono text-[0.72rem] sm:text-[0.74rem] px-2 py-0.5 bg-surface-elevated rounded border border-subtle">Bubble Tea</span>
            <span className="font-mono text-[0.72rem] sm:text-[0.74rem] px-2 py-0.5 bg-surface-elevated rounded border border-subtle">Lip Gloss</span>
            <span className="font-mono text-[0.72rem] sm:text-[0.74rem] px-2 py-0.5 bg-surface-elevated rounded border border-subtle">libmpv</span>
            <span className="font-mono text-[0.72rem] sm:text-[0.74rem] px-2 py-0.5 bg-surface-elevated rounded border border-subtle">yt-dlp</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
