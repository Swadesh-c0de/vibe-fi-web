export default function FeaturesGrid() {
  const features = [
    {
      id: "youtube",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      ),
      badge: "Zero Config",
      title: "Direct YouTube Audio Streaming",
      desc: "Search for any song with `vibe \"song title\"` or press S inside the player. Streams raw audio without decoding video, saving massive CPU and bandwidth.",
      tag: "yt-dlp Integration",
    },
    {
      id: "visualizers",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="20" x2="12" y2="10" />
          <line x1="18" y1="20" x2="18" y2="4" />
          <line x1="6" y1="20" x2="6" y2="16" />
        </svg>
      ),
      badge: "Real-time DSP",
      title: "Built-in Audio Visualizers",
      desc: "Three reactive visualizer modes driven by real-time audio statistics: Cava Wave, Neon Flame (with floating peak caps), and Stereo Bars. No external daemon needed.",
      tag: "3 Visualizer Modes",
    },
    {
      id: "lyrics",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      badge: "Synced LRC",
      title: "Synchronized Live Lyrics",
      desc: "Auto-fetches timed lyrics from lrclib.net matching the active track, scrolling line-by-line as the music plays. Caches lyrics locally for instant offline playback.",
      tag: "Offline Caching",
    },
    {
      id: "bottle",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      badge: "Clean System",
      title: "Isolated Bottle Architecture",
      desc: "Keeps your operating system immaculate. Missing dependencies download to ~/.vibe-fi/bottle/ without sudo, and vibe --uninstall uninstalls cleanly without leaving junk behind.",
      tag: "Zero System Pollution",
    },
    {
      id: "mpris",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      badge: "Desktop Integration",
      title: "Linux MPRIS & Media Keys",
      desc: "Native Linux D-Bus integration enables seamless hardware media keys control, playerctl scripts, and desktop bar widgets (Waybar, Polybar, Hyprland, i3).",
      tag: "D-Bus / playerctl",
    },
    {
      id: "discord",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
      badge: "Native IPC",
      title: "Discord Rich Presence",
      desc: "Shares your currently playing track title, artist, and elapsed time on your Discord profile using a direct, ultra-lightweight Unix socket connection.",
      tag: "Unix Sockets",
    },
  ];

  return (
    <section className="section features-section" id="features">
      <div className="container">
        <div className="section-head text-center">
          <div className="section-badge">CORE CAPABILITIES</div>
          <h2 className="section-title">Built for Modern Terminal Life</h2>
          <p className="section-desc">
            Everything you need for music in your workflow. Starts in milliseconds, runs in under 35 MB of RAM.
          </p>
        </div>

        <div className="features-grid-cards">
          {features.map((feat) => (
            <div key={feat.id} className="feature-item-card" id={feat.id}>
              <div className="feature-card-top">
                <div className="feature-icon-box">{feat.icon}</div>
                <span className="feature-badge">{feat.badge}</span>
              </div>
              <h3 className="feature-item-title">{feat.title}</h3>
              <p className="feature-item-desc">{feat.desc}</p>
              <div className="feature-card-footer">
                <span className="feature-tag-pill">{feat.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
