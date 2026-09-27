import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="footer-logo">
              <svg width="26" height="26" viewBox="0 0 36 36" fill="none">
                <rect width="36" height="36" rx="9" className="logo-squircle-bg" />
                <rect x="6.5" y="14" width="4" height="14" rx="2" fill="#7daea3" />
                <rect x="13.5" y="6" width="4" height="22" rx="2" fill="#d4be98" />
                <rect x="20.5" y="11" width="4" height="17" rx="2" fill="#e78a4e" />
                <rect x="27.5" y="18" width="4" height="10" rx="2" fill="#a9b665" />
              </svg>
              <span className="brand-wordmark">
                <span className="wordmark-vibe">vibe</span>
                <span className="wordmark-fi">-fi</span>
              </span>
            </div>
            <p className="footer-tagline">
              Free, open-source terminal music player for Linux & macOS. Built with C++17, libmpv, and ncurses.
            </p>
            {/* Terminal prompt footer widget */}
            <div className="footer-prompt-badge">
              <span className="prompt-arrow">❯</span>
              <code>vibe --version : v1.1.2 · Linux & macOS</code>
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="footer-links-group">
              <span className="footer-group-title">Documentation</span>
              <Link href="/docs" className="footer-link">Getting Started</Link>
              <Link href="/docs/installation" className="footer-link">Installation Guide</Link>
              <Link href="/docs/usage" className="footer-link">Usage & CLI</Link>
              <Link href="/docs/hotkeys" className="footer-link">Keyboard Shortcuts</Link>
            </div>

            <div className="footer-links-group">
              <span className="footer-group-title">Features</span>
              <a href="#youtube" className="footer-link">YouTube Streaming</a>
              <a href="#visualizers" className="footer-link">Audio Visualizers</a>
              <a href="#lyrics" className="footer-link">Synced Lyrics</a>
              <a href="#bottle" className="footer-link">Bottle Isolation</a>
            </div>

            <div className="footer-links-group">
              <span className="footer-group-title">Community</span>
              <a
                href="https://github.com/Swadesh-c0de/vibe-fi"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                GitHub Repository ↗
              </a>
              <a
                href="https://github.com/Swadesh-c0de/vibe-fi/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Releases (v1.1.2) ↗
              </a>
              <a
                href="https://github.com/Swadesh-c0de/vibe-fi/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Report Issue ↗
              </a>
              <a
                href="https://github.com/Swadesh-c0de/vibe-fi/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                MIT License ↗
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            Crafted with passion by{" "}
            <a
              href="https://github.com/Swadesh-c0de"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-author-link"
            >
              Swadesh-c0de
            </a>
          </p>
          <div className="footer-pills">
            <span className="tech-pill">C++17</span>
            <span className="tech-pill">libmpv</span>
            <span className="tech-pill">ncurses</span>
            <span className="tech-pill">yt-dlp</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
