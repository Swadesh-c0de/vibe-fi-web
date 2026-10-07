"use client";

import React, { useState, useMemo } from "react";

export interface WorkflowCategory {
  id: string;
  label: string;
}

export interface CliCommand {
  id: string;
  category: "stream" | "local" | "desktop" | "bottle";
  tag: string;
  title: string;
  desc: string;
  command: string;
  altCommand?: string;
  keywords?: string[];
}

const WORKFLOW_CATEGORIES: WorkflowCategory[] = [
  { id: "all", label: "All Commands" },
  { id: "stream", label: "Streaming" },
  { id: "local", label: "Local Music" },
  { id: "desktop", label: "Desktop & MPRIS" },
  { id: "bottle", label: "Bottle & System" },
];

const COMMANDS: CliCommand[] = [
  {
    id: "search-stream",
    category: "stream",
    tag: "Stream",
    title: "Instant YouTube Audio Search",
    desc: "Searches YouTube in the background, extracts the 160kbps audio stream via yt-dlp, and starts playing in milliseconds.",
    command: 'vibe "synthwave radio"',
  },
  {
    id: "direct-url",
    category: "stream",
    tag: "Direct URL",
    title: "Play Direct YouTube Link",
    desc: "Streams audio directly from any YouTube video, music playlist, or 24/7 livestream URL without loading video frames.",
    command: 'vibe "https://youtu.be/5qap5aO4i9A"',
  },
  {
    id: "session-restore",
    category: "stream",
    tag: "Restore",
    title: "Instant Session Restore",
    desc: "Pass -r or --restore to bypass the intro screen and directly reload state—recovering last track, seek position, volume, and playlist from ~/.vibe-fi/state.ini.",
    command: "vibe -r",
    altCommand: "vibe --restore",
    keywords: ["restore", "-r", "--restore", "resume", "state.ini", "state", "session"],
  },
  {
    id: "local-folder",
    category: "local",
    tag: "Local Library",
    title: "Open Local Music Directory",
    desc: "Launches the TUI focused on your local audio folders. Supports FLAC, MP3, WAV, OPUS, and M4A with zero disk lag.",
    command: "vibe ~/Music",
  },
  {
    id: "local-file",
    category: "local",
    tag: "Lossless Audio",
    title: "Play Standalone Audio File",
    desc: "Plays a local lossless audio file through libmpv with bit-perfect hardware output and synchronized visualizer.",
    command: "vibe ~/Music/song.flac",
  },
  {
    id: "mpris-toggle",
    category: "desktop",
    tag: "MPRIS D-Bus",
    title: "Toggle Play / Pause via D-Bus",
    desc: "Linux MPRIS interface allows hardware media keys and window manager keybinds (Hyprland, Sway, i3) to control playback.",
    command: "playerctl -p vibefi play-pause",
  },
  {
    id: "waybar-status",
    category: "desktop",
    tag: "Waybar / i3",
    title: "Waybar & Polybar Status Feed",
    desc: "Prints the currently playing artist and song title formatted cleanly for desktop panels, status bars, and notifications.",
    command: "playerctl -p vibefi metadata --format '{{artist}} - {{title}}'",
  },
  {
    id: "bottle-status",
    category: "bottle",
    tag: "Isolated Sandbox",
    title: "Inspect Isolated Runtime Bottle",
    desc: "Verifies the self-contained dependencies in ~/.vibe-fi/bottle/ to ensure your core OS remains completely clean.",
    command: "vibe --bottle",
  },
  {
    id: "bottle-uninstall",
    category: "bottle",
    tag: "Clean Removal",
    title: "Clean Zero-Residue Uninstall",
    desc: "Removes Vibe-Fi and cleans up isolated bottle binaries, caches, and configs without leaving junk behind.",
    command: "vibe --uninstall",
  },
];

export default function CliWorkflows(): React.JSX.Element {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCommands = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return COMMANDS.filter((cmd) => {
      const matchesCategory = activeCategory === "all" || cmd.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        cmd.title.toLowerCase().includes(q) ||
        cmd.desc.toLowerCase().includes(q) ||
        cmd.command.toLowerCase().includes(q) ||
        (cmd.altCommand && cmd.altCommand.toLowerCase().includes(q)) ||
        (cmd.keywords && cmd.keywords.some((k) => k.toLowerCase().includes(q))) ||
        cmd.tag.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, searchQuery]);

  const handleCopy = (id: string, text: string): void => {
    const fallbackCopy = (): void => {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
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
        navigator.clipboard.writeText(text).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }
    } catch {
      fallbackCopy();
    }
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <section className="py-8 sm:py-12 relative content-auto" id="cli">
      <div className="container">
        {/* Clean, Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 border-b border-subtle pb-2.5 mb-4 sm:mb-6">
          <h2 className="font-brand text-base sm:text-lg font-bold text-text-primary tracking-tight">
            CLI Commands &amp; Automation
          </h2>
          <span className="text-[0.72rem] sm:text-xs font-mono text-text-muted">
            Waybar · Hyprland · Shell scripts
          </span>
        </div>

        {/* Toolbar: Category Filter Tabs & Quick Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between flex-wrap gap-2.5 sm:gap-3.5 mb-4 sm:mb-6">
          <div className="flex items-center gap-1 overflow-x-auto max-w-full p-1 bg-surface border border-subtle rounded-[6px] scrollbar-none [webkit-overflow-scrolling:touch]">
            {WORKFLOW_CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`cli-cat-btn px-2.5 sm:px-3 py-1 sm:py-1.2 rounded-[6px] font-brand text-[0.76rem] sm:text-[0.82rem] font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? "active bg-surface-elevated text-sage border border-strong shadow-xs font-bold"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-subtle border border-transparent"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative flex items-center w-full sm:w-auto sm:min-w-[260px]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="absolute left-3 text-text-muted pointer-events-none"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search command (e.g. restore, waybar, flac)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8.5 pr-8 py-1.5 sm:py-2 bg-surface border border-strong rounded-[6px] font-sans text-[0.8rem] sm:text-[0.84rem] text-text-primary outline-none focus:border-sage placeholder:text-text-muted transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 text-text-muted hover:text-text-primary text-[0.8rem] px-1.5 py-0.5"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Grid of Command Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {filteredCommands.map((cmd) => {
            const isCopied = copiedId === cmd.id;

            return (
              <div
                key={cmd.id}
                className="bg-surface border border-subtle rounded-[6px] p-3.5 sm:p-4.5 lg:p-5 flex flex-col justify-between gap-4 transition-[border-color,transform,box-shadow] duration-150 min-w-0 max-w-full hover:border-strong hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                    <span className="font-mono text-[0.66rem] sm:text-[0.68rem] font-bold px-1.5 py-0.5 rounded-[4px] bg-surface-elevated border border-subtle text-gold">
                      {cmd.tag}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(cmd.id, cmd.command)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 font-mono text-[0.7rem] sm:text-[0.72rem] font-bold rounded-[6px] bg-surface-elevated border border-subtle transition-colors cursor-pointer ${
                        isCopied
                          ? "bg-green text-text-inverse border-green"
                          : "text-text-secondary hover:text-text-primary hover:border-sage"
                      }`}
                      title="Copy command to clipboard"
                      aria-label={`Copy command ${cmd.command}`}
                    >
                      {isCopied ? "✓ Copied" : "Copy"}
                    </button>
                  </div>

                  <h3 className="font-brand text-[0.92rem] sm:text-[0.98rem] lg:text-[1.02rem] font-bold text-text-primary mb-1.5 leading-snug">
                    {cmd.title}
                  </h3>
                  <p className="text-[0.78rem] sm:text-[0.82rem] leading-relaxed text-text-secondary">
                    {cmd.desc}
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 pt-2 border-t border-subtle/70">
                  <div
                    className="flex items-center justify-between p-2 sm:px-2.5 sm:py-2 bg-canvas border border-strong rounded-[6px] font-mono text-[0.74rem] sm:text-[0.78rem] text-sage font-bold cursor-pointer transition-colors hover:border-sage select-all min-w-0 shadow-xs"
                    onClick={() => handleCopy(cmd.id, cmd.command)}
                    title="Click to copy command"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleCopy(cmd.id, cmd.command);
                      }
                    }}
                  >
                    <span className="truncate">{cmd.command}</span>
                    <span className="text-text-muted text-[0.8rem] shrink-0 ml-1.5" aria-hidden="true">
                      {copiedId === cmd.id ? "✓" : "⎘"}
                    </span>
                  </div>

                  {cmd.altCommand && (
                    <div
                      className="flex items-center justify-between px-2.5 py-1 bg-surface-subtle border border-subtle rounded-[6px] font-mono text-[0.7rem] sm:text-[0.74rem] text-text-secondary cursor-pointer transition-colors hover:border-sage hover:text-text-primary select-all min-w-0"
                      onClick={() => handleCopy(`${cmd.id}-alt`, cmd.altCommand!)}
                      title="Click to copy alternate flag"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleCopy(`${cmd.id}-alt`, cmd.altCommand!);
                        }
                      }}
                    >
                      <span className="truncate text-text-muted">
                        alt: <span className="text-text-secondary font-medium">{cmd.altCommand}</span>
                      </span>
                      <span className="text-text-muted text-[0.75rem] shrink-0 ml-2">
                        {copiedId === `${cmd.id}-alt` ? "✓" : "⎘"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredCommands.length === 0 && (
          <div className="text-center py-12 text-text-muted font-mono text-sm">
            No commands matched &quot;{searchQuery}&quot;. Try searching for &quot;vibe&quot;, &quot;stream&quot;, or &quot;bottle&quot;.
          </div>
        )}
      </div>
    </section>
  );
}
