import Link from "next/link";

export const metadata = {
  title: "Hotkeys Reference - Vibe-Fi Documentation",
  description: "Complete list of keyboard shortcuts for Vibe-Fi terminal music player.",
};

const HOTKEY_GROUPS = [
  {
    title: "Global & Navigation",
    items: [
      { key: "Q", desc: "Quit Vibe-Fi safely and restore terminal state" },
      { key: "S", desc: "Open live YouTube search bar" },
      { key: "U", desc: "Paste and stream direct YouTube URL from clipboard" },
      { key: "L", desc: "Open Local audio library browser" },
      { key: "P", desc: "Open Playlists menu" },
      { key: "R", desc: "Restore last session state (track, position, volume)" },
    ],
  },
  {
    title: "Playback Controls",
    items: [
      { key: "Space", desc: "Toggle Play / Pause" },
      { key: "← / →", desc: "Seek backward / forward 5 seconds" },
      { key: "+ / -", desc: "Increase / decrease volume by 5%" },
      { key: "9 / 0", desc: "Alternative volume down / up controls" },
      { key: "M", desc: "Mute / Unmute audio" },
      { key: "[ / ]", desc: "Skip to previous / next track in playlist" },
    ],
  },
  {
    title: "Visualizers & Themes",
    items: [
      { key: "V", desc: "Cycle visualizer mode (Cava Wave → Neon Flame → Stereo Bars)" },
      { key: "T", desc: "Cycle terminal color themes (Midnight, Matrix, Nord, HyDE)" },
      { key: "↑ / ↓", desc: "Scroll synchronized lyrics manually" },
    ],
  },
  {
    title: "Playlists & Library",
    items: [
      { key: "A", desc: "Add currently playing song to a playlist" },
      { key: "D", desc: "Remove selected song from active playlist" },
      { key: "E", desc: "Export active playlist to an .m3u file" },
      { key: "Enter", desc: "Play selected track or enter directory" },
      { key: "Backspace", desc: "Navigate to parent directory in library" },
    ],
  },
];

export default function HotkeysDocsPage() {
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
                  <th style={{ width: "160px" }}>Shortcut</th>
                  <th>Action & Description</th>
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
