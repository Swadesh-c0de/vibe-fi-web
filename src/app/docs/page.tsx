import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import DocCodeBlock from "@/components/DocCodeBlock";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Overview and getting started guide for Vibe-Fi, the fast terminal music player for Linux & macOS.",
};

export default function DocsOverviewPage(): React.JSX.Element {
  return (
    <div>
      <div className="docs-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/docs">Docs</Link>
        <span>/</span>
        <span className="current">Getting Started</span>
      </div>

      <h1 className="docs-page-title">Getting Started</h1>
      <p className="docs-lead-text">
        Vibe-Fi is a simple, lightweight music player that runs right in your terminal.
        Search and stream songs from YouTube, play local music files, watch audio visualizers, and read synced lyrics — using ~60 MB of RAM on Linux &amp; macOS.
      </p>

      <hr className="docs-divider" />

      <h2>Why Vibe-Fi?</h2>
      <p>
        Desktop music apps consume hundreds of megabytes of memory and distract you with heavy browser windows.
        Older terminal players can be hard to configure, require complex setup, and don&apos;t stream YouTube or show synced lyrics out of the box.
      </p>

      <p>
        <strong>Vibe-Fi makes terminal music simple:</strong>
      </p>

      <div className="docs-feature-list-box">
        <ul>
          <li><strong>Stream YouTube:</strong> Search and listen to any song instantly without opening a browser.</li>
          <li><strong>Live Visualizer:</strong> Watch smooth audio spectrum bars dance to the beat.</li>
          <li><strong>Synced Lyrics:</strong> Sing along with lyrics that scroll automatically in time with the song.</li>
          <li><strong>Local Music Files:</strong> Play MP3, FLAC, WAV, M4A, OGG, and other local tracks directly from your music folder.</li>
          <li><strong>Ultra Lightweight:</strong> Starts in milliseconds and idles in ~60 MB of RAM.</li>
          <li><strong>Keyboard &amp; Media Keys:</strong> Control playback with standard media keys, status bars (Waybar/Polybar), and Discord.</li>
        </ul>
      </div>

      <h2>Quick Install (60 Seconds)</h2>
      <p>
        Run this single command in your terminal to install Vibe-Fi:
      </p>

      <DocCodeBlock
        title="bash"
        code="curl -fsSL https://raw.githubusercontent.com/Swadesh-c0de/vibe-fi-go/main/install.sh | bash"
      />

      <p>
        Once installed, launch it from any terminal:
      </p>

      <DocCodeBlock
        title="terminal"
        code={`# Open the player
vibe

# Or search and play a song directly
vibe "lofi chill beats"

# Or play a direct YouTube link
vibe "https://www.youtube.com/watch?v=5qap5aO4i9A"`}
      />

      <div className="docs-callout callout-tip">
        <div className="callout-icon">💡</div>
        <div className="callout-body">
          <strong>Helpful Shortcuts:</strong> Inside the player, press <kbd>S</kbd> to search for songs, <kbd>V</kbd> to switch visualizer layouts, <kbd>T</kbd> to change color themes, and <kbd>Space</kbd> to play or pause.
        </div>
      </div>

      <h2>Explore More</h2>
      <div className="docs-cards-grid">
        <Link href="/docs/installation" className="docs-card-link">
          <div className="card-link-title">Installation Guide →</div>
          <p className="card-link-desc">Step-by-step installation instructions for Arch Linux, macOS, Ubuntu, Fedora, and building from source.</p>
        </Link>
        <Link href="/docs/usage" className="docs-card-link">
          <div className="card-link-title">Usage &amp; Shortcuts →</div>
          <p className="card-link-desc">Learn how to search YouTube, play local music, change themes, and control playback from your desktop.</p>
        </Link>
        <Link href="/docs/hotkeys" className="docs-card-link">
          <div className="card-link-title">Hotkeys Cheatsheet →</div>
          <p className="card-link-desc">Complete list of keyboard shortcuts for fast, hands-on control.</p>
        </Link>
      </div>
    </div>
  );
}
