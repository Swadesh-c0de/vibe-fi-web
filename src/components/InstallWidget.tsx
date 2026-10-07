"use client";

import Link from "next/link";
import React, { useState, useSyncExternalStore } from "react";

export interface InstallOption {
  id: string;
  label: string;
  badge?: string;
  command: string;
  note: string;
}

const INSTALL_OPTIONS: InstallOption[] = [
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

const noopSubscribe = () => () => {};

export default function InstallWidget(): React.JSX.Element {
  const isMac = useSyncExternalStore(
    noopSubscribe,
    () => typeof window !== "undefined" && window.navigator.userAgent.toLowerCase().includes("mac"),
    () => false
  );
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const activeTab = selectedTab ?? (isMac ? "macos" : "auto");
  const currentOption = INSTALL_OPTIONS.find((opt) => opt.id === activeTab) || INSTALL_OPTIONS[0];

  const handleCopy = (e?: React.MouseEvent): void => {
    if (e && e.stopPropagation) e.stopPropagation();
    const textToCopy = currentOption.command;

    const fallbackCopy = (): void => {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      } catch {
        // Fallback suppressed
      }
    };

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }
    } catch {
      fallbackCopy();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-surface border border-subtle sm:border-strong rounded-[6px] shadow-xs hover:border-strong transition-[border-color,box-shadow] duration-150 overflow-hidden">
      {/* Sleek Tab Navigation */}
      <div
        className="flex items-center gap-1 p-1 sm:p-1.5 border-b border-subtle bg-surface-elevated/30 overflow-x-auto scrollbar-none [webkit-overflow-scrolling:touch]"
        role="tablist"
      >
        {INSTALL_OPTIONS.map((opt) => {
          const isActive = activeTab === opt.id;
          return (
            <button
              type="button"
              key={opt.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setSelectedTab(opt.id);
                setCopied(false);
              }}
              className={`install-tab-btn flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.2 rounded-[6px] font-brand text-[0.76rem] sm:text-[0.82rem] font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isActive
                  ? "bg-surface text-text-primary border border-strong shadow-xs font-bold"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-subtle border border-transparent"
              }`}
            >
              <span>{opt.label}</span>
              {opt.badge && (
                <span
                  className={`hidden sm:inline-block text-[0.62rem] sm:text-[0.64rem] font-mono font-medium px-1.5 py-0.5 rounded-[4px] transition-colors ${
                    opt.badge === "Recommended"
                      ? "bg-sage/15 text-sage border border-sage/25 font-bold"
                      : "bg-surface-subtle text-text-muted border border-subtle"
                  }`}
                >
                  {opt.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Pure, Clean Command Row */}
      <div className="flex items-center justify-between gap-3 px-3.5 sm:px-4.5 py-3 sm:py-3.5 bg-surface transition-colors">
        <div
          className="flex items-center gap-2 sm:gap-2.5 flex-1 min-w-0 cursor-pointer select-all group/cmd"
          onClick={() => handleCopy()}
          title="Click to copy command"
        >
          <span className="font-mono text-sage font-bold text-sm sm:text-base select-none leading-none shrink-0" aria-hidden="true">
            ❯
          </span>
          <pre className="flex-1 min-w-0 overflow-x-auto scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden font-mono text-[0.78rem] sm:text-[0.84rem] text-text-primary leading-relaxed whitespace-nowrap py-0.5">
            <code>{currentOption.command}</code>
          </pre>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`terminal-copy-action-btn h-[30px] sm:h-[32px] inline-flex items-center gap-1.5 px-2.5 rounded-[6px] border font-mono text-[0.72rem] sm:text-[0.76rem] font-semibold shrink-0 cursor-pointer transition-colors duration-150 active:scale-95 shadow-xs select-none ${
            copied
              ? "bg-green text-text-inverse border-green font-bold shadow-sm"
              : "bg-surface-elevated hover:bg-surface border-strong hover:border-sage text-text-primary hover:text-sage"
          }`}
          aria-label="Copy install command"
          title="Copy to clipboard"
        >
          {copied ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Lightweight Note & Documentation Link Footer */}
      <div className="px-3.5 sm:px-4.5 py-2 sm:py-2.5 bg-surface-elevated/25 border-t border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[0.75rem] sm:text-[0.78rem]">
        <div className="flex items-center gap-1.5 text-text-secondary min-w-0">
          <span className="font-mono text-[0.64rem] uppercase tracking-wider font-bold text-amber px-1.5 py-0.5 bg-amber/10 border border-amber/20 rounded-[4px] shrink-0">
            Info
          </span>
          <span className="truncate sm:whitespace-normal">{currentOption.note}</span>
        </div>
        <Link
          href="/docs/installation"
          className="text-sage hover:text-text-primary font-semibold whitespace-nowrap inline-flex items-center gap-1 transition-colors shrink-0 group/link text-[0.75rem] sm:text-[0.78rem]"
        >
          <span>Installation guide</span>
          <span className="transition-transform group-hover/link:translate-x-0.5" aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
