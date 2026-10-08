"use client";

import Link from "next/link";
import React, { useState } from "react";

export interface InstallOption {
  id: string;
  label: string;
  shortLabel: string;
  command: string;
  note: string;
  highlighted: React.ReactNode;
}

const INSTALL_OPTIONS: InstallOption[] = [
  {
    id: "auto",
    label: "Auto Script",
    shortLabel: "Auto",
    command: `curl -fsSL https://raw.githubusercontent.com/Swadesh-c0de/vibe-fi-go/main/install.sh | bash`,
    note: "Pre-built binary for Linux & macOS. Auto-resolves libmpv.",
    highlighted: (
      <>
        <span className="text-amber font-semibold">curl</span>{" "}
        <span className="text-text-muted font-normal">-fsSL</span>{" "}
        <span className="text-text-primary">https://raw.githubusercontent.com/Swadesh-c0de/vibe-fi-go/main/install.sh</span>{" "}
        <span className="text-sage font-bold">|</span>{" "}
        <span className="text-amber font-semibold">bash</span>
      </>
    ),
  },
  {
    id: "global",
    label: "System-wide",
    shortLabel: "Global",
    command: `curl -fsSL https://raw.githubusercontent.com/Swadesh-c0de/vibe-fi-go/main/install.sh | bash -s -- --global`,
    note: "Installs system-wide into /usr/local/bin for all users.",
    highlighted: (
      <>
        <span className="text-amber font-semibold">curl</span>{" "}
        <span className="text-text-muted font-normal">-fsSL</span>{" "}
        <span className="text-text-primary">https://raw.githubusercontent.com/Swadesh-c0de/vibe-fi-go/main/install.sh</span>{" "}
        <span className="text-sage font-bold">|</span>{" "}
        <span className="text-amber font-semibold">bash</span>{" "}
        <span className="text-text-muted font-normal">-s --</span>{" "}
        <span className="text-gold font-semibold">--global</span>
      </>
    ),
  },
  {
    id: "source",
    label: "From Source",
    shortLabel: "Source",
    command: `git clone https://github.com/Swadesh-c0de/vibe-fi-go.git && cd vibe-fi-go && make install`,
    note: "Compiles with Go 1.20+ and Make into ~/.local/bin.",
    highlighted: (
      <>
        <span className="text-amber font-semibold">git</span>{" "}
        <span className="text-text-secondary">clone</span>{" "}
        <span className="text-text-primary">https://github.com/Swadesh-c0de/vibe-fi-go.git</span>{" "}
        <span className="text-sage font-bold">&amp;&amp;</span>{" "}
        <span className="text-amber font-semibold">cd</span>{" "}
        <span className="text-text-secondary">vibe-fi-go</span>{" "}
        <span className="text-sage font-bold">&amp;&amp;</span>{" "}
        <span className="text-amber font-semibold">make</span>{" "}
        <span className="text-text-secondary">install</span>
      </>
    ),
  },
];

export default function InstallWidget(): React.JSX.Element {
  const [selectedTab, setSelectedTab] = useState<string>("auto");
  const [copied, setCopied] = useState<boolean>(false);

  const activeTab = selectedTab;
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
      {/* Sleek Segmented Tab Switcher */}
      <div
        className="flex items-center px-3.5 sm:px-5 py-2.5 sm:py-3 border-b border-subtle bg-surface-elevated/30"
        role="tablist"
      >
        <div className="inline-flex items-center p-1 rounded-[6px] bg-surface-elevated/70 dark:bg-canvas/80 border border-subtle gap-1 max-w-full">
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
                className={`flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-1.5 rounded-[4px] font-mono text-[0.76rem] sm:text-[0.82rem] transition-all duration-150 cursor-pointer select-none leading-none ${isActive
                  ? "bg-surface dark:bg-surface-elevated text-text-primary font-semibold border border-strong/40 shadow-xs"
                  : "text-text-secondary dark:text-text-muted hover:text-text-primary border border-transparent"
                  }`}
              >
                <span className="hidden sm:inline">{opt.label}</span>
                <span className="sm:hidden">{opt.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Refined Terminal Command Row */}
      <div className="flex items-center justify-between gap-3 sm:gap-4 px-3.5 sm:px-5.5 py-3.5 sm:py-4.5 bg-code-bg/60 dark:bg-canvas/75 transition-colors group/cmd">
        <div
          className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0 cursor-pointer select-all"
          onClick={() => handleCopy()}
          title="Click to copy command"
        >
          <svg
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sage shrink-0 select-none transition-all duration-150 group-hover/cmd:translate-x-0.5 group-hover/cmd:text-green"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <pre className="flex-1 min-w-0 overflow-x-auto scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden font-mono text-[0.78rem] sm:text-[0.88rem] text-text-primary leading-relaxed whitespace-nowrap py-0.5 pr-4 sm:pr-5">
            <code>{currentOption.highlighted}</code>
          </pre>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`terminal-copy-action-btn w-[30px] sm:w-auto h-[30px] sm:h-[34px] inline-flex items-center justify-center gap-1.5 p-0 sm:px-3.5 rounded-[5px] sm:rounded-[6px] border font-mono text-[0.72rem] sm:text-[0.78rem] font-semibold shrink-0 cursor-pointer transition-all duration-150 active:scale-95 shadow-xs select-none ${copied
            ? "bg-green text-text-inverse border-green font-bold shadow-sm"
            : "bg-surface hover:bg-surface-elevated border-strong hover:border-sage text-text-primary hover:text-sage"
            }`}
          aria-label="Copy install command"
          title="Copy to clipboard"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="hidden sm:inline">Copied!</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Lightweight Note & Documentation Link Footer */}
      <div className="px-3.5 sm:px-5.5 py-2.5 sm:py-3 bg-surface-elevated/25 border-t border-subtle flex items-center justify-between gap-3 text-[0.76rem] sm:text-[0.82rem]">
        <p className="text-text-secondary leading-relaxed min-w-0 flex-1">
          {currentOption.note}
        </p>
        <Link
          href="/docs/installation"
          className="text-sage hover:text-text-primary font-semibold whitespace-nowrap inline-flex items-center gap-1.5 transition-colors shrink-0 group/guide"
        >
          <span>Full guide</span>
          <span aria-hidden="true" className="transition-transform group-hover/guide:translate-x-0.5">→</span>
        </Link>
      </div>
    </div>
  );
}
