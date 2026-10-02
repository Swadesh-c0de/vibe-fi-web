"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface ShortcutItem {
  id: string;
  keys: string[];
  label: string;
  hint: string;
  triggerKeys: string[];
}

interface CategoryGroup {
  id: "playback" | "navigation" | "visuals" | "library";
  title: string;
  accent: string;
  borderGlow: string;
  items: ShortcutItem[];
}

const SHORTCUT_GROUPS: CategoryGroup[] = [
  {
    id: "playback",
    title: "Playback Controls",
    accent: "var(--accent-sage)",
    borderGlow: "rgba(125, 174, 163, 0.3)",
    items: [
      {
        id: "play-pause",
        keys: ["Space"],
        label: "Toggle Play / Pause",
        hint: "Instant pause / resume",
        triggerKeys: [" ", "Space"],
      },
      {
        id: "seek",
        keys: ["←", "→"],
        label: "Seek Backward / Forward",
        hint: "±5 seconds",
        triggerKeys: ["ArrowLeft", "ArrowRight"],
      },
      {
        id: "volume",
        keys: ["+", "-"],
        label: "Volume Up / Down",
        hint: "5% gain steps",
        triggerKeys: ["+", "-", "=", "_"],
      },
      {
        id: "mute",
        keys: ["M"],
        label: "Mute / Unmute",
        hint: "Silences audio output",
        triggerKeys: ["m", "M"],
      },
    ],
  },
  {
    id: "navigation",
    title: "Navigation & Search",
    accent: "var(--accent-gold)",
    borderGlow: "rgba(216, 166, 87, 0.3)",
    items: [
      {
        id: "search",
        keys: ["S"],
        label: "Live YouTube Search",
        hint: "Inline search prompt",
        triggerKeys: ["s", "S"],
      },
      {
        id: "url",
        keys: ["U"],
        label: "Stream Direct URL",
        hint: "Paste from clipboard",
        triggerKeys: ["u", "U"],
      },
      {
        id: "restore",
        keys: ["R"],
        label: "Restore Last Session",
        hint: "Loads ~/.vibe-fi/state.ini",
        triggerKeys: ["r", "R"],
      },
      {
        id: "quit",
        keys: ["Q"],
        label: "Quit Player Safely",
        hint: "Cleans up terminal screen",
        triggerKeys: ["q", "Q"],
      },
    ],
  },
  {
    id: "visuals",
    title: "Visualizers & Themes",
    accent: "var(--accent-amber)",
    borderGlow: "rgba(231, 138, 78, 0.3)",
    items: [
      {
        id: "visualizer",
        keys: ["V"],
        label: "Cycle Visualizers",
        hint: "Flame, Cava, Stereo",
        triggerKeys: ["v", "V"],
      },
      {
        id: "theme",
        keys: ["T"],
        label: "Cycle Color Themes",
        hint: "Gruvbox, Midnight, Nord...",
        triggerKeys: ["t", "T"],
      },
      {
        id: "lyrics",
        keys: ["↑", "↓"],
        label: "Scroll Synced Lyrics",
        hint: "Manual LRC navigation",
        triggerKeys: ["ArrowUp", "ArrowDown"],
      },
    ],
  },
  {
    id: "library",
    title: "Library & Playlists",
    accent: "var(--accent-purple)",
    borderGlow: "rgba(211, 134, 155, 0.3)",
    items: [
      {
        id: "library",
        keys: ["L"],
        label: "Browse Local Music",
        hint: "FLAC, MP3, WAV, OPUS",
        triggerKeys: ["l", "L"],
      },
      {
        id: "playlist",
        keys: ["P"],
        label: "Playlist Manager",
        hint: "Switch & reorder queues",
        triggerKeys: ["p", "P"],
      },
      {
        id: "add",
        keys: ["A"],
        label: "Add Track to Playlist",
        hint: "Quick append active song",
        triggerKeys: ["a", "A"],
      },
      {
        id: "export",
        keys: ["E"],
        label: "Export Playlist (.m3u)",
        hint: "Save standard format to disk",
        triggerKeys: ["e", "E"],
      },
    ],
  },
];

const FILTER_TABS = [
  { id: "all", label: "All" },
  { id: "playback", label: "Playback" },
  { id: "navigation", label: "Navigation" },
  { id: "visuals", label: "Visuals" },
  { id: "library", label: "Library" },
];

export default function HotkeysSection(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [activeShortcutId, setActiveShortcutId] = useState<string | null>(null);

  // Live keyboard testing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      const key = e.key;

      for (const group of SHORTCUT_GROUPS) {
        for (const item of group.items) {
          if (
            item.triggerKeys.some(
              (tk) => tk.toLowerCase() === key.toLowerCase()
            )
          ) {
            if (key === " ") {
              e.preventDefault();
            }
            setActiveShortcutId(item.id);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
              setActiveShortcutId(null);
            }, 1200);
            return;
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timeoutId);
    };
  }, []);

  const visibleGroups = SHORTCUT_GROUPS.filter(
    (g) => activeTab === "all" || g.id === activeTab
  );

  return (
    <section className="py-8 sm:py-12" id="hotkeys">
      <div className="container max-w-[1020px]">
        {/* Clean, Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 border-b border-subtle pb-2.5 mb-4 sm:mb-6">
          <h2 className="font-brand text-base sm:text-lg font-bold text-text-primary tracking-tight">
            Keyboard Shortcuts
          </h2>
          <span className="text-[0.72rem] sm:text-xs font-mono text-text-muted">
            Home-row navigation · Zero mouse required
          </span>
        </div>

        {/* Category Tabs Scrolling Inside the Card */}
        <div className="flex justify-center mb-4 sm:mb-5 max-w-full px-2">
          <div className="inline-flex items-center gap-1 p-1 bg-surface border border-subtle rounded-[6px] max-w-full overflow-x-auto scrollbar-none shadow-xs">
            {FILTER_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  type="button"
                  key={tab.id}
                  onClick={(e) => {
                    setActiveTab(tab.id);
                    e.currentTarget.scrollIntoView({
                      behavior: "smooth",
                      block: "nearest",
                      inline: "center",
                    });
                  }}
                  className={`px-2.5 sm:px-3 py-1 rounded-[6px] text-[0.72rem] sm:text-xs font-mono font-medium transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${isActive
                    ? "bg-surface-elevated text-text-primary border border-strong shadow-xs font-semibold"
                    : "text-text-muted hover:text-text-primary hover:bg-surface-subtle border border-transparent"
                    }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2x2 Clean Grouped Deck */}
        <div
          className={`grid gap-3 sm:gap-4 md:gap-4.5 ${activeTab === "all"
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 max-w-[560px] mx-auto"
            }`}
        >
          {visibleGroups.map((group) => (
            <div
              key={group.id}
              className="bg-surface border border-subtle rounded-[6px] p-3 sm:p-4 md:p-4.5 transition-all duration-200 shadow-xs"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-subtle">
                <h3 className="font-brand font-bold text-xs sm:text-[0.84rem] text-text-primary tracking-tight">
                  {group.title}
                </h3>

                <span className="font-mono text-[0.66rem] sm:text-[0.68rem] text-text-muted">
                  {group.items.length} keys
                </span>
              </div>

              {/* Shortcut List Rows */}
              <div className="divide-y divide-subtle/40">
                {group.items.map((item) => {
                  const isActive = activeShortcutId === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setActiveShortcutId(item.id);
                        setTimeout(() => setActiveShortcutId(null), 1000);
                      }}
                      className={`flex items-center justify-between py-1.5 sm:py-2 px-1.5 sm:px-2 -mx-1 rounded-[6px] transition-all duration-150 cursor-pointer ${isActive
                        ? "bg-surface-elevated ring-1"
                        : "hover:bg-surface-elevated/50"
                        }`}
                      style={{
                        borderColor: isActive ? group.borderGlow : undefined,
                      }}
                    >
                      {/* Left: Action Label & Micro-hint */}
                      <div className="min-w-0 pr-2 sm:pr-2.5">
                        <div className="font-sans text-[0.78rem] sm:text-[0.82rem] font-medium text-text-primary truncate">
                          {item.label}
                        </div>
                        <div className="font-mono text-[0.66rem] sm:text-[0.68rem] text-text-muted truncate mt-0.5">
                          {item.hint}
                        </div>
                      </div>

                      {/* Right: Tactile Keycap(s) */}
                      <div className="flex items-center gap-1 shrink-0">
                        {item.keys.map((k, kIdx) => (
                          <kbd
                            key={kIdx}
                            className={`inline-flex items-center justify-center min-w-[24px] h-[22px] sm:h-[24px] px-1.5 rounded-[6px] font-mono text-[0.7rem] sm:text-[0.72rem] font-bold tracking-tight transition-all duration-150 select-none ${isActive
                              ? "bg-green/15 text-green border border-green scale-105"
                              : "bg-canvas dark:bg-surface-elevated text-text-primary border border-strong border-b-2 shadow-xs"
                              }`}
                          >
                            {k}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Bottom Help / Docs Link */}
        <div className="mt-8 text-center px-4">
          <p className="font-mono text-[0.76rem] text-text-muted">
            Press any shortcut to test live &bull;{" "}
            <Link
              href="/docs/hotkeys"
              className="text-text-secondary hover:text-sage transition-colors underline underline-offset-4"
            >
              View full keyboard bindings in docs →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
