"use client";

import React, { useState, useEffect, useMemo } from "react";
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
        label: "Play / Pause",
        hint: "Start or pause playback",
        triggerKeys: [" ", "Space"],
      },
      {
        id: "next-prev",
        keys: ["N", "B"],
        label: "Next / Previous Song",
        hint: "Skip tracks forward or back",
        triggerKeys: ["n", "N", "b", "B", ">", "<"],
      },
      {
        id: "seek",
        keys: ["←", "→"],
        label: "Rewind / Fast-Forward",
        hint: "Jump 5 seconds back or ahead",
        triggerKeys: ["ArrowLeft", "ArrowRight"],
      },
      {
        id: "volume",
        keys: ["+", "-"],
        label: "Volume Up / Down",
        hint: "Adjust volume in 5% steps",
        triggerKeys: ["+", "-", "=", "_"],
      },
      {
        id: "autoplay",
        keys: ["O"],
        label: "Toggle Autoplay",
        hint: "Keep playing related songs",
        triggerKeys: ["o", "O"],
      },
    ],
  },
  {
    id: "navigation",
    title: "Search & Navigation",
    accent: "var(--accent-gold)",
    borderGlow: "rgba(216, 166, 87, 0.3)",
    items: [
      {
        id: "search",
        keys: ["S"],
        label: "Search YouTube",
        hint: "Search for songs or artists",
        triggerKeys: ["s", "S"],
      },
      {
        id: "url",
        keys: ["U"],
        label: "Play Direct Link",
        hint: "Paste a YouTube link from clipboard",
        triggerKeys: ["u", "U"],
      },
      {
        id: "queue",
        keys: ["C"],
        label: "View Song Queue",
        hint: "See upcoming tracks",
        triggerKeys: ["c", "C"],
      },
      {
        id: "cheatsheet",
        keys: ["?", "F1"],
        label: "Help & Shortcuts",
        hint: "Open shortcuts cheat sheet",
        triggerKeys: ["?", "F1", "/"],
      },
      {
        id: "quit",
        keys: ["Q"],
        label: "Quit Vibe-Fi",
        hint: "Exit player and restore terminal",
        triggerKeys: ["q", "Q"],
      },
    ],
  },
  {
    id: "visuals",
    title: "Visualizers & Lyrics",
    accent: "var(--accent-amber)",
    borderGlow: "rgba(231, 138, 78, 0.3)",
    items: [
      {
        id: "layout",
        keys: ["V"],
        label: "Switch View Layout",
        hint: "Split view ↔ Full visualizer ↔ Full lyrics",
        triggerKeys: ["v", "V"],
      },
      {
        id: "theme",
        keys: ["T"],
        label: "Change Color Theme",
        hint: "Cycle Midnight, Nord, Matrix, Gruvbox...",
        triggerKeys: ["t", "T"],
      },
      {
        id: "lyrics-scroll",
        keys: ["↑", "↓"],
        label: "Scroll Lyrics",
        hint: "Browse lyrics up and down",
        triggerKeys: ["ArrowUp", "ArrowDown"],
      },
      {
        id: "lyrics-auto",
        keys: ["Y"],
        label: "Auto-Scroll Lock",
        hint: "Turn automatic lyric scrolling back on",
        triggerKeys: ["y", "Y"],
      },
    ],
  },
  {
    id: "library",
    title: "Local Music & Playlists",
    accent: "var(--accent-purple)",
    borderGlow: "rgba(211, 134, 155, 0.3)",
    items: [
      {
        id: "local-lib",
        keys: ["L"],
        label: "Browse Local Music",
        hint: "Play MP3, FLAC, WAV, and more",
        triggerKeys: ["l", "L"],
      },
      {
        id: "playlist",
        keys: ["P"],
        label: "Playlists Manager",
        hint: "Open and organize saved playlists",
        triggerKeys: ["p", "P"],
      },
      {
        id: "add",
        keys: ["A"],
        label: "Add to Playlist",
        hint: "Save playing song to a playlist",
        triggerKeys: ["a", "A"],
      },
      {
        id: "esc",
        keys: ["ESC"],
        label: "Back / Close Menu",
        hint: "Return to main player screen",
        triggerKeys: ["Escape"],
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

const KEY_TO_SHORTCUT_MAP = new Map<string, string>();
for (const group of SHORTCUT_GROUPS) {
  for (const item of group.items) {
    for (const tk of item.triggerKeys) {
      KEY_TO_SHORTCUT_MAP.set(tk.toLowerCase(), item.id);
    }
  }
}

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

      const shortcutId = KEY_TO_SHORTCUT_MAP.get(e.key.toLowerCase());
      if (shortcutId) {
        if (e.key === " ") {
          e.preventDefault();
        }
        setActiveShortcutId(shortcutId);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setActiveShortcutId(null);
        }, 1200);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timeoutId);
    };
  }, []);

  const visibleGroups = useMemo(
    () => SHORTCUT_GROUPS.filter((g) => activeTab === "all" || g.id === activeTab),
    [activeTab]
  );

  return (
    <section className="py-14 sm:py-20 lg:py-24 content-auto" id="hotkeys">
      <div className="container max-w-[1040px]">
        {/* Clean, Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-4 border-b border-subtle pb-3.5 mb-6 sm:mb-8">
          <h2 className="font-brand text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            Keyboard Shortcuts
          </h2>
          <span className="text-xs sm:text-sm font-mono text-text-muted">
            Home-row navigation · Zero mouse required
          </span>
        </div>

        {/* Category Tabs Scrolling Inside the Card */}
        <div className="flex justify-center mb-6 sm:mb-8 max-w-full px-2">
          <div className="inline-flex items-center gap-1.5 p-1.5 bg-surface border border-subtle rounded-[6px] max-w-full overflow-x-auto scrollbar-none shadow-xs">
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
                  className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-[6px] text-[0.78rem] sm:text-[0.84rem] font-mono font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${isActive
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
          className={`grid gap-4 sm:gap-6 ${activeTab === "all"
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 max-w-[620px] mx-auto"
            }`}
        >
          {visibleGroups.map((group) => (
            <div
              key={group.id}
              className="bg-surface border border-subtle rounded-[6px] p-5 sm:p-6 transition-[border-color,box-shadow] duration-150 shadow-xs"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between pb-3 mb-2.5 border-b border-subtle">
                <h3 className="font-brand font-bold text-sm sm:text-base text-text-primary tracking-tight">
                  {group.title}
                </h3>

                <span className="font-mono text-[0.72rem] sm:text-[0.76rem] text-text-muted">
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
                      className={`flex items-center justify-between py-2 sm:py-2.5 px-2 sm:px-2.5 -mx-1 rounded-[6px] transition-colors duration-150 cursor-pointer ${isActive
                        ? "bg-surface-elevated ring-1"
                        : "hover:bg-surface-elevated/50"
                        }`}
                      style={{
                        borderColor: isActive ? group.borderGlow : undefined,
                      }}
                    >
                      {/* Left: Action Label & Micro-hint */}
                      <div className="min-w-0 pr-2 sm:pr-3">
                        <div className="font-sans text-[0.82rem] sm:text-[0.88rem] font-medium text-text-primary truncate">
                          {item.label}
                        </div>
                        <div className="font-mono text-[0.7rem] sm:text-[0.74rem] text-text-muted truncate mt-0.5">
                          {item.hint}
                        </div>
                      </div>

                      {/* Right: Tactile Keycap(s) */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {item.keys.map((k, kIdx) => (
                          <kbd
                            key={kIdx}
                            className={`inline-flex items-center justify-center min-w-[26px] h-[24px] sm:h-[26px] px-2 rounded-[6px] font-mono text-[0.72rem] sm:text-[0.76rem] font-bold tracking-tight transition-[colors,transform] duration-150 select-none ${isActive
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
