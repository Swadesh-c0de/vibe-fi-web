import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import DocCodeBlock from "@/components/DocCodeBlock";

export const metadata: Metadata = {
  title: "Usage & Workflows",
  description: "Learn how to use Vibe-Fi for YouTube streaming, local library playback, playlists, lyrics, and desktop integration.",
};

export default function UsageDocsPage(): React.JSX.Element {
  return (
    <div>
      <div className="docs-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/docs">Docs</Link>
        <span>/</span>
        <span className="current">Usage &amp; Workflow</span>
      </div>

      <h1 className="docs-page-title">Usage &amp; Shortcuts</h1>
      <p className="docs-lead-text">
        Learn how to search for songs, play music, switch visualizer views, and control playback from your keyboard.
      </p>

      <hr className="docs-divider" />

      <h2>Starting Vibe-Fi</h2>
      <p>
        You can launch Vibe-Fi directly from your terminal, search for a song, or play a file:
      </p>

      <DocCodeBlock
        title="terminal"
        code={`# 1. Open the interactive player
vibe

# 2. Search and play a song from YouTube
vibe "miles davis blue in green"

# 3. Play a YouTube link directly
vibe "https://www.youtube.com/watch?v=5qap5aO4i9A"

# 4. Play a local audio file
vibe ~/Music/favorite-song.mp3

# 5. Resume your last session (restores song, queue, volume)
vibe -r

# 6. Fast launch (skips update check)
vibe --no-update`}
      />

      <h2>Controls Inside the Player</h2>
      <p>
        Everything in Vibe-Fi can be controlled using simple single-key shortcuts:
      </p>
      <ul>
        <li><kbd>S</kbd> — <strong>Search YouTube:</strong> Type any song or artist name to start playing immediately.</li>
        <li><kbd>U</kbd> — <strong>Paste a Link:</strong> Play a YouTube URL from your clipboard.</li>
        <li><kbd>Space</kbd> — <strong>Play / Pause:</strong> Toggle audio playback.</li>
        <li><kbd>N</kbd> / <kbd>B</kbd> — <strong>Next / Previous:</strong> Skip to the next or previous track.</li>
        <li><kbd>O</kbd> — <strong>Autoplay:</strong> Automatically keep playing related songs when the current one ends.</li>
        <li><kbd>C</kbd> — <strong>Queue:</strong> See what songs are playing next.</li>
        <li><kbd>L</kbd> — <strong>Local Music:</strong> Browse and play songs stored in your computer&apos;s music folder.</li>
      </ul>

      <div className="docs-callout callout-tip">
        <div className="callout-icon">⚡</div>
        <div className="callout-body">
          <strong>Audio-Only Streaming:</strong> Vibe-Fi only downloads the audio stream. It never loads video frames, saving 80%+ of your bandwidth and CPU.
        </div>
      </div>

      <h2 id="layouts">Visualizer &amp; Layout Modes</h2>
      <p>
        Press <kbd>V</kbd> to switch between three display modes:
      </p>
      <ul>
        <li><strong>Split View (Default):</strong> Shows the live visualizer on the left and scrolling lyrics on the right.</li>
        <li><strong>Full Visualizer:</strong> Expands the real-time audio bars across your entire terminal window.</li>
        <li><strong>Full Lyrics:</strong> Expands the synchronized lyrics to fill the screen — great for singing along.</li>
      </ul>

      <h2 id="themes">Color Themes</h2>
      <p>
        Press <kbd>T</kbd> inside the player to cycle through 6 built-in color themes:
      </p>
      <div className="docs-feature-list-box">
        <ul>
          <li><strong>Midnight (Default):</strong> Sleek dark grey with cyan and purple accents.</li>
          <li><strong>Nord:</strong> Clean arctic blue and frost tones.</li>
          <li><strong>Matrix:</strong> Classic terminal phosphor green.</li>
          <li><strong>HyDE:</strong> Vibrant cyberpunk neon pink and purple.</li>
          <li><strong>Gruvbox:</strong> Warm retro autumn tones with cream and amber.</li>
          <li><strong>Slate:</strong> Minimalist monochrome grey for distraction-free coding.</li>
        </ul>
      </div>

      <h2>Synced Lyrics</h2>
      <p>
        Vibe-Fi automatically fetches synchronized lyrics:
      </p>
      <ul>
        <li>Lyrics scroll automatically line-by-line as the song plays.</li>
        <li>Press <kbd>↑</kbd> and <kbd>↓</kbd> arrow keys to browse earlier or upcoming lyrics manually.</li>
        <li>Press <kbd>Y</kbd> to re-lock auto-scrolling back to the current song line.</li>
      </ul>

      <h2 id="mpris">Media Keys &amp; Desktop Controls</h2>
      <p>
        On Linux, Vibe-Fi connects to standard desktop media controls. Your keyboard&apos;s Play, Pause, Next, and Previous keys work automatically.
      </p>

      <DocCodeBlock
        title="bash"
        code={`# Control playback from terminal or scripts
playerctl -p vibefi play-pause
playerctl -p vibefi next
playerctl -p vibefi previous
playerctl -p vibefi metadata --format "{{ artist }} - {{ title }}"`}
      />

      <h2 id="waybar">Status Bar (Waybar &amp; Polybar)</h2>
      <p>
        Show the currently playing song in your desktop bar:
      </p>

      <DocCodeBlock
        title="~/.config/waybar/config (jsonc)"
        code={`// In ~/.config/waybar/config
"custom/vibefi": {
    "format": "  {}",
    "max-length": 40,
    "exec": "playerctl -p vibefi metadata --format '{{artist}} - {{title}}' 2> /dev/null",
    "interval": 2,
    "on-click": "playerctl -p vibefi play-pause"
}`}
      />
    </div>
  );
}
