import Link from "next/link";

export const metadata = {
  title: "Getting Started - Vibe-Fi Documentation",
  description: "Overview and getting started guide for Vibe-Fi, the fast terminal music player for Linux & macOS.",
};

export default function DocsOverviewPage() {
  return (
    <div>
      <div className="docs-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/docs">Docs</Link>
        <span>/</span>
        <span className="current">Getting Started</span>
      </div>

      <h1 className="docs-page-title">Getting Started with Vibe-Fi</h1>
      <p className="docs-lead-text">
        Vibe-Fi is a lightweight, zero-configuration music player designed specifically for your terminal.
        Built with C++17, <code>libmpv</code>, and <code>ncurses</code>, it starts in milliseconds and runs in under 35 MB of RAM.
      </p>

      <hr className="docs-divider" />

      <h2>Why Vibe-Fi?</h2>
      <p>
        Most desktop music solutions come with trade-offs. Web & Electron apps like Spotify consume hundreds of megabytes of RAM
        and noticeable CPU in the background. Traditional command-line players like <code>cmus</code> or <code>mpd</code> are lightweight,
        but require cumbersome configuration files, external daemons, and custom scripts just to stream a song from YouTube or show synced lyrics.
      </p>

      <p>
        <strong>Vibe-Fi brings everything together out of the box:</strong>
      </p>

      <div className="docs-feature-list-box">
        <ul>
          <li><strong>Direct YouTube Streaming:</strong> Search and stream audio instantly via <code>yt-dlp</code> without opening a browser or decoding video.</li>
          <li><strong>Real-time Audio Visualizers:</strong> Built-in physics and wave visualizers (Cava Wave, Neon Flame, Stereo Bars) responding directly to audio frequencies.</li>
          <li><strong>Synchronized Lyrics:</strong> Automatic line-by-line scrolling lyrics from <code>lrclib.net</code> with offline caching.</li>
          <li><strong>Zero System Pollution:</strong> Standalone dependencies are kept in an isolated user bottle (<code>~/.vibe-fi/bottle/</code>) and cleaned up automatically.</li>
          <li><strong>Native Desktop Integration:</strong> Linux MPRIS D-Bus integration for media keys, Waybar, Polybar, and Discord Rich Presence.</li>
        </ul>
      </div>

      <h2>Quick Start in 60 Seconds</h2>
      <p>
        Run the one-line automated installer in your terminal:
      </p>

      <div className="docs-code-block">
        <pre><code>{'bash -c "$(curl -fsSL https://raw.githubusercontent.com/Swadesh-c0de/vibe-fi/main/install.sh)"'}</code></pre>
      </div>

      <p>
        Once installed, simply launch Vibe-Fi from any terminal window:
      </p>

      <div className="docs-code-block">
        <pre><code>{`# Launch the interactive player
vibe

# Or stream a song directly from YouTube
vibe "lofi hip hop chill beats"

# Or stream a direct YouTube URL
vibe "https://www.youtube.com/watch?v=5qap5aO4i9A"`}</code></pre>
      </div>

      <div className="docs-callout callout-tip">
        <div className="callout-icon">💡</div>
        <div className="callout-body">
          <strong>Tip:</strong> Press <kbd>S</kbd> anytime inside the player to open the interactive YouTube search prompt, or press <kbd>V</kbd> to cycle visualizer modes!
        </div>
      </div>

      <h2>Next Steps</h2>
      <div className="docs-cards-grid">
        <Link href="/docs/installation" className="docs-card-link">
          <div className="card-link-title">Installation Guide →</div>
          <p className="card-link-desc">Instructions for Arch Linux, macOS, Ubuntu, Fedora, and building from source with CMake.</p>
        </Link>
        <Link href="/docs/usage" className="docs-card-link">
          <div className="card-link-title">Usage & Workflow →</div>
          <p className="card-link-desc">Learn about YouTube streaming, local library indexing, playlists, and dotfiles integration.</p>
        </Link>
        <Link href="/docs/hotkeys" className="docs-card-link">
          <div className="card-link-title">Hotkeys Reference →</div>
          <p className="card-link-desc">Complete cheatsheet of all keyboard shortcuts for navigation, visualizers, and playback.</p>
        </Link>
      </div>
    </div>
  );
}
