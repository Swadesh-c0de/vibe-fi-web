"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const INSTALL_OPTIONS = [
  {
    id: "auto",
    label: "Automated Script",
    badge: "Recommended",
    command: `bash -c "$(curl -fsSL https://raw.githubusercontent.com/Swadesh-c0de/vibe-fi/main/install.sh)"`,
    note: "Detects OS, installs missing dependencies, builds binary, and configures isolated bottle.",
  },
  {
    id: "arch",
    label: "Arch Linux",
    badge: "Fastest",
    command: `git clone https://github.com/Swadesh-c0de/vibe-fi.git && cd vibe-fi && ./install.sh`,
    note: "Compatible with Arch Linux, EndeavourOS, and Manjaro via pacman.",
  },
  {
    id: "macos",
    label: "macOS",
    badge: "Brew",
    command: `git clone https://github.com/Swadesh-c0de/vibe-fi.git && cd vibe-fi && ./install.sh`,
    note: "Requires Homebrew for libmpv & yt-dlp dependencies.",
  },
  {
    id: "source",
    label: "From Source",
    badge: "CMake",
    command: `cmake -B build -S . && cmake --build build -j$(nproc) && sudo cmake --install build`,
    note: "Requires C++17 compiler, cmake, ninja, libmpv, and ncurses.",
  },
];

export default function InstallWidget() {
  const [activeTab, setActiveTab] = useState("auto");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Auto-detect OS
    if (typeof window !== "undefined") {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.includes("mac")) {
        const timer = setTimeout(() => setActiveTab("macos"), 0);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const currentOption = INSTALL_OPTIONS.find((opt) => opt.id === activeTab) || INSTALL_OPTIONS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentOption.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="install-widget-card">
      {/* Tab Switcher Header */}
      <div className="install-tabs-header">
        <div className="install-tabs-list" role="tablist">
          {INSTALL_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              role="tab"
              aria-selected={activeTab === opt.id}
              onClick={() => {
                setActiveTab(opt.id);
                setCopied(false);
              }}
              className={`install-tab-btn ${activeTab === opt.id ? "active" : ""}`}
            >
              <span>{opt.label}</span>
              {opt.badge && <span className="tab-pill">{opt.badge}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Command Window */}
      <div className="install-terminal-view">
        <div className="install-terminal-bar">
          <div className="terminal-dots-mini">
            <span className="dot dot-close" />
            <span className="dot dot-minimize" />
            <span className="dot dot-maximize" />
          </div>
          <span className="terminal-title-mini">bash — terminal</span>
        </div>

        <div className="install-command-row">
          <span className="command-prompt-symbol">$</span>
          <pre className="command-code-text">
            <code>{currentOption.command}</code>
          </pre>
          <button
            onClick={handleCopy}
            className={`copy-command-btn ${copied ? "copied" : ""}`}
            aria-label="Copy install command"
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Note and Link Footer */}
      <div className="install-widget-footer">
        <p className="install-note-text">
          <span className="note-label">Info:</span> {currentOption.note}
        </p>
        <Link href="/docs/installation" className="docs-link-arrow">
          View complete installation guide <span>→</span>
        </Link>
      </div>
    </div>
  );
}
