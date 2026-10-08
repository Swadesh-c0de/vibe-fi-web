import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Hotkeys Reference",
  description: "Complete list of keyboard shortcuts for Vibe-Fi terminal music player.",
};

interface HotkeyDocItem {
  key: string;
  desc: string;
}

interface HotkeyDocGroup {
  title: string;
  items: HotkeyDocItem[];
}

const HOTKEY_GROUPS: HotkeyDocGroup[] = [
  {
    title: "General & Navigation",
    items: [
      { key: "Q", desc: "Quit Vibe-Fi" },
      { key: "? / F1", desc: "Open shortcuts help menu" },
      { key: "S", desc: "Search YouTube for songs or artists" },
      { key: "U", desc: "Play a YouTube URL from clipboard" },
      { key: "L", desc: "Open local music folder" },
      { key: "P", desc: "Open playlists manager" },
      { key: "C", desc: "View current song queue" },
      { key: "R", desc: "Replay current song / resume session" },
      { key: "ESC", desc: "Back to player / close menu" },
    ],
  },
  {
    title: "Playback Controls",
    items: [
      { key: "Space", desc: "Play or pause" },
      { key: "N / >", desc: "Next song" },
      { key: "B / <", desc: "Previous song" },
      { key: "← / →", desc: "Rewind / fast-forward 5 seconds" },
      { key: "+ / -", desc: "Turn volume up / down" },
      { key: "O", desc: "Toggle Autoplay (keep playing similar tracks)" },
    ],
  },
  {
    title: "Visualizer & Lyrics",
    items: [
      { key: "V", desc: "Switch view: Split → Full Visualizer → Full Lyrics" },
      { key: "T", desc: "Switch theme: Midnight, Nord, Matrix, HyDE, Gruvbox, Slate" },
      { key: "↑ / ↓", desc: "Scroll lyrics up / down manually" },
      { key: "Y", desc: "Turn auto-scroll back on" },
    ],
  },
  {
    title: "Playlists & Folders",
    items: [
      { key: "A", desc: "Add currently playing song to a playlist" },
      { key: "Enter", desc: "Play selected song or open folder" },
      { key: "Backspace", desc: "Go up one folder" },
      { key: "ESC", desc: "Close folder view and return to player" },
    ],
  },
];

export default function HotkeysDocsPage(): React.JSX.Element {
  return (
    <div>
      <div className="docs-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/docs">Docs</Link>
        <span>/</span>
        <span className="current">Hotkeys Reference</span>
      </div>

      <h1 className="docs-page-title">Keyboard Hotkeys Reference</h1>
      <p className="docs-lead-text">
        Vibe-Fi is built from the ground up for keyboard-only efficiency. Here is the full map of available shortcuts.
      </p>

      <hr className="docs-divider" />

      {HOTKEY_GROUPS.map((group, gIdx) => (
        <div key={gIdx} className="hotkeys-doc-group">
          <h2>{group.title}</h2>
          <div className="hotkeys-doc-table-wrapper">
            <table className="hotkeys-doc-table">
              <thead>
                <tr>
                  <th className="w-[120px] sm:w-[170px]">Shortcut</th>
                  <th>Action &amp; Description</th>
                </tr>
              </thead>
              <tbody>
                {group.items.map((item, iIdx) => (
                  <tr key={iIdx}>
                    <td>
                      <kbd className="doc-keycap">{item.key}</kbd>
                    </td>
                    <td>{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
