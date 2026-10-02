import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Usage & Workflow - Vibe-Fi Documentation",
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

      <h1 className="docs-page-title">Usage &amp; Workflow</h1>
      <p className="docs-lead-text">
        Discover the full power of Vibe-Fi—from instant YouTube searches and synced lyrics to Linux desktop bar widgets.
      </p>

      <hr className="docs-divider" />

      <h2>Command-Line Interface</h2>
      <p>
        Vibe-Fi can be launched directly or with inline search queries and URLs:
      </p>

      <div className="docs-code-block">
        <pre><code>{`# 1. Open the interactive TUI player
vibe

# 2. Search and play immediately
vibe "miles davis blue in green"

# 3. Stream directly from a YouTube video URL
vibe "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

# 4. Play a local audio file
vibe ~/Music/favorite-song.flac

# 5. Restore last session position and playlist
vibe -r
# or using the long-form CLI option:
vibe --restore`}</code></pre>
      </div>

      <h2>Streaming YouTube in the TUI</h2>
      <p>
        While inside Vibe-Fi, you don&apos;t need to exit to change songs:
      </p>
      <ul>
        <li>Press <kbd>S</kbd> to open the live search prompt. Type keywords, and Vibe-Fi will stream the top result instantly.</li>
        <li>Press <kbd>U</kbd> to paste a direct YouTube link from your clipboard.</li>
      </ul>

      <div className="docs-callout callout-tip">
        <div className="callout-icon">⚡</div>
        <div className="callout-body">
          <strong>Audio-Only Streaming:</strong> Vibe-Fi extracts only the opus/m4a audio stream via <code>yt-dlp</code>. It never fetches video frames, saving 80%+ bandwidth and CPU compared to a browser.
        </div>
      </div>

      <h2>Local Audio Library</h2>
      <p>
        Press <kbd>L</kbd> to browse and play audio files from your local storage.
      </p>
      <ul>
        <li>Supported formats: <code>.flac</code>, <code>.mp3</code>, <code>.wav</code>, <code>.m4a</code>, <code>.ogg</code>, <code>.opus</code>, <code>.aac</code>, <code>.alac</code>, <code>.aiff</code>, and <code>.webm</code>.</li>
        <li>Cached track durations provide instant scrolling and seeking without disk thrashing.</li>
        <li>Press <kbd>A</kbd> while highlighting any track to add it to a playlist.</li>
      </ul>

      <h2>Playlists &amp; Session Memory</h2>
      <p>
        Press <kbd>P</kbd> to view your saved playlists.
      </p>
      <ul>
        <li>Press <kbd>E</kbd> to export any playlist to a portable standard <code>.m3u</code> file.</li>
        <li>If you close your terminal or reboot, press <kbd>R</kbd> or run <code>vibe -r</code> to restore your last track, exact seek timestamp, volume, and active visualizer.</li>
      </ul>

      <h2 id="mpris">Linux MPRIS &amp; Media Keys</h2>
      <p>
        On Linux, Vibe-Fi registers a native D-Bus MPRIS interface (<code>org.mpris.MediaPlayer2.vibefi</code>).
        This allows hardware keyboard media keys (Play, Pause, Next, Prev) to control Vibe-Fi automatically.
      </p>

      <div className="docs-code-block">
        <pre><code># Control playback from scripts or terminal
playerctl -p vibefi play-pause
playerctl -p vibefi next
playerctl -p vibefi previous
{`playerctl -p vibefi metadata --format "{{ artist }} - {{ title }}"`}</code></pre>
      </div>

      <h2 id="waybar">Waybar &amp; Hyprland Integration</h2>
      <p>
        You can embed Vibe-Fi&apos;s current track and playback status directly in your <strong>Waybar</strong> panel:
      </p>

      <div className="docs-code-block">
        <pre><code>{`// In ~/.config/waybar/config
"custom/vibefi": {
    "format": "  {}",
    "max-length": 40,
    "exec": "playerctl -p vibefi metadata --format '{{artist}} - {{title}}' 2> /dev/null",
    "interval": 2,
    "on-click": "playerctl -p vibefi play-pause"
}`}</code></pre>
      </div>

      <h2 id="bottle">Isolated Bottle System</h2>
      <p>
        Vibe-Fi keeps standalone runtime binaries isolated in <code>~/.vibe-fi/bottle/</code>.
        To view your bottle status:
      </p>

      <div className="docs-code-block">
        <pre><code>vibe --bottle</code></pre>
      </div>
    </div>
  );
}
