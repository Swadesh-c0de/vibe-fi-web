import React from "react";

export interface FeatureItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function FeaturesGrid(): React.JSX.Element {
  const features: FeatureItem[] = [
    {
      id: "youtube",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      ),
      title: "Play any song from YouTube",
      desc: "Search for any track or paste a link. Music streams directly in high audio quality without opening a browser or draining your battery.",
    },
    {
      id: "visualizers",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="20" x2="12" y2="10" />
          <line x1="18" y1="20" x2="18" y2="4" />
          <line x1="6" y1="20" x2="6" y2="16" />
        </svg>
      ),
      title: "Live audio visualizer",
      desc: "Watch your music dance with a smooth real-time spectrum visualizer that pulses to the beat across 3 clean layout modes.",
    },
    {
      id: "lyrics",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      title: "Live scrolling lyrics",
      desc: "Follow along as each line lights up in time with the song. Lyrics load automatically and are saved for offline listening.",
    },
    {
      id: "local",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      ),
      title: "Play your offline music library",
      desc: "Browse and play songs from your music folder. Supports MP3, FLAC, WAV, M4A, OGG, and all popular audio formats.",
    },
    {
      id: "mpris",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      title: "Media keys & status bars",
      desc: "Control playback with your keyboard's media keys and display the current song in status bars like Waybar, Polybar, or Discord.",
    },
    {
      id: "bubbletea",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: "Runs in ~60 MB of RAM",
      desc: "Starts instantly and uses virtually zero background memory. Leave it playing all day while you code or browse without slowdowns.",
    },
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-24 content-auto" id="features">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-4 border-b border-subtle pb-3.5 mb-8 sm:mb-10">
          <h2 className="font-brand text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            Key Features
          </h2>
          <span className="text-xs sm:text-sm font-mono text-text-muted">
            Simple · Fast · Terminal-native
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7">
          {features.map((feat) => (
            <div
              key={feat.id}
              id={feat.id}
              className="bg-surface border border-subtle rounded-[6px] p-6 sm:p-7 transition-colors duration-150 hover:border-strong flex flex-col shadow-xs"
            >
              <div className="text-sage mb-4 shrink-0 [&>svg]:w-6 [&>svg]:h-6">
                {feat.icon}
              </div>
              <h3 className="font-brand text-[1.05rem] sm:text-[1.12rem] font-bold text-text-primary mb-2 leading-snug">
                {feat.title}
              </h3>
              <p className="text-[0.88rem] sm:text-[0.92rem] leading-relaxed text-text-secondary">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
