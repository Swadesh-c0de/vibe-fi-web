"use client";

import { useState } from "react";

const THEME_OPTIONS = [
  {
    id: "midnight",
    name: "Midnight",
    desc: "Deep indigo borders, electric cyan spectrum, and vibrant magenta highlights.",
    bg: "#0f172a",
    border: "#6366f1",
    accent: "#38bdf8",
    highlight: "#ec4899",
    bars: ["#38bdf8", "#6366f1", "#818cf8", "#c084fc", "#ec4899"],
  },
  {
    id: "matrix",
    name: "Matrix",
    desc: "Classic cyberpunk terminal green with phosphor bloom and high contrast.",
    bg: "#051609",
    border: "#15803d",
    accent: "#22c55e",
    highlight: "#86efac",
    bars: ["#16a34a", "#22c55e", "#4ade80", "#86efac", "#22c55e"],
  },
  {
    id: "nord",
    name: "Nord",
    desc: "Arctic frost palette with polar night slates, cool blues, and aurora cyan.",
    bg: "#2e3440",
    border: "#4c566a",
    accent: "#88c0d0",
    highlight: "#eceff4",
    bars: ["#81a1c1", "#88c0d0", "#8fbcbb", "#d8dee9", "#eceff4"],
  },
  {
    id: "hyde",
    name: "HyDE",
    desc: "Velvet magenta, deep violet wave, and neon cyan accents.",
    bg: "#180f24",
    border: "#8b5cf6",
    accent: "#d946ef",
    highlight: "#06b6d4",
    bars: ["#8b5cf6", "#a855f7", "#d946ef", "#06b6d4", "#f43f5e"],
  },
];

export default function ThemeShowcase() {
  const [selectedTheme, setSelectedTheme] = useState(THEME_OPTIONS[0]);

  return (
    <section className="section theme-showcase-section" id="themes">
      <div className="container">
        <div className="section-head text-center">
          <div className="section-badge">TERMINAL PALETTES</div>
          <h2 className="section-title">Four Built-in Curated Themes</h2>
          <p className="section-desc">
            Press <kbd>T</kbd> inside Vibe-Fi to instantly cycle between themes. Your selection persists across sessions.
          </p>
        </div>

        {/* Theme Selectors */}
        <div className="theme-selectors-grid">
          {THEME_OPTIONS.map((th) => (
            <button
              key={th.id}
              onClick={() => setSelectedTheme(th)}
              className={`theme-picker-card ${selectedTheme.id === th.id ? "active" : ""}`}
            >
              <div className="theme-color-swatches">
                <span className="swatch" style={{ backgroundColor: th.bg }} />
                <span className="swatch" style={{ backgroundColor: th.border }} />
                <span className="swatch" style={{ backgroundColor: th.accent }} />
                <span className="swatch" style={{ backgroundColor: th.highlight }} />
              </div>
              <div className="theme-meta">
                <h4 className="theme-name">{th.name}</h4>
                <p className="theme-desc-short">{th.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Live Theme Preview Terminal Frame */}
        <div
          className="theme-preview-box"
          style={{
            backgroundColor: selectedTheme.bg,
            borderColor: selectedTheme.border,
            boxShadow: `0 20px 40px -15px ${selectedTheme.border}44`,
          }}
        >
          <div className="theme-preview-header" style={{ borderBottomColor: selectedTheme.border }}>
            <div className="theme-dots">
              <span className="dot dot-close" />
              <span className="dot dot-minimize" />
              <span className="dot dot-maximize" />
            </div>
            <span className="theme-preview-title" style={{ color: selectedTheme.highlight }}>
              vibe-fi — theme: {selectedTheme.name.toLowerCase()} [T to switch]
            </span>
          </div>

          <div className="theme-preview-body">
            <div className="preview-track-line">
              <span style={{ color: selectedTheme.accent, fontWeight: "bold" }}>▶ NOW PLAYING:</span>{" "}
              <span style={{ color: selectedTheme.highlight }}>Cyber Lofi Radio — 24/7 Chill Beats</span>
            </div>

            {/* Simulated Equalizer Bars */}
            <div className="preview-eq-bars">
              {Array.from({ length: 24 }).map((_, i) => {
                const color = selectedTheme.bars[i % selectedTheme.bars.length];
                const heightPercent = 25 + Math.sin(i * 0.7) * 45 + Math.cos(i * 1.3) * 20;
                return (
                  <div
                    key={i}
                    className="preview-eq-bar"
                    style={{
                      height: `${Math.min(95, Math.max(15, heightPercent))}%`,
                      backgroundColor: color,
                    }}
                  />
                );
              })}
            </div>

            <div className="preview-status-line">
              <span style={{ color: selectedTheme.border }}>[01:45 / 03:20]</span>
              <span style={{ color: selectedTheme.accent }}>[VOL: 85%]</span>
              <span style={{ color: selectedTheme.highlight }}>[MODE: CAVA WAVE]</span>
              <span style={{ color: selectedTheme.border }}>[MPRIS: ACTIVE]</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
