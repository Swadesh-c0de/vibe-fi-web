"use client";

import { useState } from "react";

const HOTKEYS_DATA = [
  { key: "Space", desc: "Toggle Play / Pause", category: "playback" },
  { key: "← / →", desc: "Seek backward / forward 5 seconds", category: "playback" },
  { key: "+ / -", desc: "Increase / decrease volume (5%)", category: "playback" },
  { key: "M", desc: "Mute / Unmute audio", category: "playback" },
  { key: "V", desc: "Cycle Visualizers (Cava Wave, Neon Flame, Stereo)", category: "visuals" },
  { key: "T", desc: "Cycle Color Themes (Midnight, Matrix, Nord, HyDE)", category: "visuals" },
  { key: "↑ / ↓", desc: "Scroll synchronized lyrics manually", category: "visuals" },
  { key: "S", desc: "Search YouTube audio directly", category: "navigation" },
  { key: "U", desc: "Stream from direct YouTube URL", category: "navigation" },
  { key: "L", desc: "Browse Local audio library & folders", category: "library" },
  { key: "P", desc: "Open Playlists manager", category: "library" },
  { key: "A", desc: "Add active song to playlist", category: "library" },
  { key: "E", desc: "Export playlist to .m3u file", category: "library" },
  { key: "R", desc: "Restore last session (track, position, volume)", category: "navigation" },
  { key: "Q", desc: "Quit player safely and restore terminal", category: "navigation" },
];

export default function HotkeysSection() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredHotkeys = HOTKEYS_DATA.filter((item) => {
    const matchesFilter = filter === "all" || item.category === filter;
    const matchesSearch =
      search === "" ||
      item.key.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="section hotkeys-section" id="hotkeys">
      <div className="container">
        <div className="section-head text-center">
          <div className="section-badge">KEYBOARD FIRST</div>
          <h2 className="section-title">Master Every Keystroke</h2>
          <p className="section-desc">
            Designed for pure keyboard efficiency. No mouse required.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="hotkeys-toolbar">
          <div className="hotkeys-filter-tabs">
            {["all", "playback", "visuals", "navigation", "library"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`filter-tab-btn ${filter === cat ? "active" : ""}`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="hotkeys-search-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search shortcut (e.g. volume, theme)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input-field"
            />
            {search && (
              <button onClick={() => setSearch("")} className="clear-search-btn">
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Hotkeys Grid */}
        <div className="hotkeys-grid">
          {filteredHotkeys.map((item, idx) => (
            <div key={idx} className="hotkey-card">
              <div className="hotkey-caps">
                {item.key.split(" / ").map((k, i) => (
                  <span key={i}>
                    {i > 0 && <span className="key-sep">/</span>}
                    <kbd className="keycap">{k}</kbd>
                  </span>
                ))}
              </div>
              <div className="hotkey-desc-text">{item.desc}</div>
              <span className={`hotkey-category-tag tag-${item.category}`}>
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
