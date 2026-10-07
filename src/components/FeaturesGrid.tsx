import React from "react";

export interface FeatureItem {
  id: string;
  icon: React.ReactNode;
  badge: string;
  title: string;
  desc: string;
  tag: string;
}

export default function FeaturesGrid(): React.JSX.Element {
  const features: FeatureItem[] = [
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
    <section className="py-8 sm:py-12 content-auto" id="features">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 border-b border-subtle pb-2.5 mb-5 sm:mb-6">
          <h2 className="font-brand text-base sm:text-lg font-bold text-text-primary tracking-tight">
            Core Capabilities
          </h2>
          <span className="text-[0.72rem] sm:text-xs font-mono text-text-muted">
            &lt; 35 MB RAM · C++17 · Wayland &amp; X11 native
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {features.map((feat) => (
            <div
              key={feat.id}
              id={feat.id}
              className="bg-surface border border-subtle rounded-[6px] p-3.5 sm:p-4.5 lg:p-5 flex flex-col justify-between transition-[border-color,transform,box-shadow] duration-150 hover:border-strong hover:-translate-y-0.5 hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[6px] bg-surface-elevated border border-strong flex items-center justify-center text-sage shrink-0">
                    <span className="[&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-4.5 sm:[&>svg]:h-4.5">
                      {feat.icon}
                    </span>
                  </div>
                  <span className="font-mono text-[0.66rem] sm:text-[0.68rem] font-bold text-amber bg-surface-elevated border border-strong/40 px-2 py-0.5 rounded-[4px]">
                    {feat.badge}
                  </span>
                </div>
                <h3 className="font-brand text-[0.98rem] sm:text-[1.05rem] lg:text-[1.1rem] font-bold mb-1.5 text-text-primary leading-snug">
                  {feat.title}
                </h3>
                <p className="text-[0.8rem] sm:text-[0.84rem] leading-[1.55] text-text-secondary">
                  {feat.desc}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-subtle/80 flex items-center justify-between">
                <span className="font-mono text-[0.68rem] sm:text-[0.72rem] text-text-muted">
                  {feat.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
