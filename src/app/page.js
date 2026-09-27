import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import InstallWidget from "@/components/InstallWidget";
import FeaturesGrid from "@/components/FeaturesGrid";
import ThemeShowcase from "@/components/ThemeShowcase";
import HotkeysSection from "@/components/HotkeysSection";
import CommunitySection from "@/components/CommunitySection";
import Link from "next/link";

export const metadata = {
  title: "vibe-fi — Fast, Lightweight Terminal Music Player for Linux & macOS",
  description:
    "Free, open-source terminal music player. Stream YouTube audio, watch real-time visualizers, and read synced lyrics in under 35 MB of RAM.",
};

export default function HomePage() {
  return (
    <div className="landing-page">
      <Navbar />

      <main>
        {/* ─── HERO SECTION ────────────────────────────────────────── */}
        <section className="hero-section">
          {/* Subtle Ambient Background Orbs */}
          <div className="hero-ambient-glow" aria-hidden="true" />
          <div className="hero-ambient-glow-amber" aria-hidden="true" />

          <div className="container hero-container">
            {/* Powerline Prompt Badge (Matching User Reference) */}
            <div className="hero-powerline-wrapper">
              <div className="powerline-prompt">
                <span className="powerline-seg powerline-seg-user">veronica@arch</span>
                <span className="powerline-arrow-1" />
                <span className="powerline-seg powerline-seg-dir">~</span>
                <span className="powerline-arrow-2" />
                <span className="powerline-seg powerline-seg-cmd">
                  $ vibe &quot;lofi beats&quot;<span className="blink">_</span>
                </span>
              </div>
            </div>

            {/* Hero Main Typography */}
            <h1 className="hero-title">
              Turn up the volume. <br />
              <span className="text-gradient-sage">Keep vibing in your terminal.</span>
            </h1>

            <p className="hero-tagline">
              A fast, lightweight music player for Linux & macOS. Stream YouTube audio without opening a browser,
              watch real-time visualizers, and read synchronized lyrics — smoothly running in under 35 MB of RAM.
            </p>

            {/* Hero CTA Actions */}
            <div className="hero-cta-group">
              <a href="#install" className="btn btn-primary btn-lg">
                <span className="btn-dollar-sign">$</span>
                <span>Quick Install</span>
              </a>

              <Link href="/docs" className="btn btn-secondary btn-lg">
                <span>Documentation →</span>
              </Link>

              <a
                href="https://github.com/Swadesh-c0de/vibe-fi"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-lg"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>View on GitHub</span>
              </a>
            </div>

            {/* Interactive Live Terminal Showcase */}
            <div className="hero-terminal-wrapper" id="showcase">
              <InteractiveTerminal />
            </div>
          </div>
        </section>

        {/* ─── LIVE SPECS & STATS STRIP ───────────────────────────── */}
        <section className="stats-bar-strip">
          <div className="container stats-bar-inner">
            <div className="stat-pill">
              <span className="stat-indicator dot-green" />
              <span>Linux & macOS Native</span>
            </div>
            <div className="stat-sep">/</div>
            <div className="stat-pill">
              <span className="stat-icon-text">⚡</span>
              <span>&lt; 35 MB RAM Footprint</span>
            </div>
            <div className="stat-sep">/</div>
            <div className="stat-pill">
              <span className="stat-icon-text">🎵</span>
              <span>YouTube Audio Stream</span>
            </div>
            <div className="stat-sep">/</div>
            <div className="stat-pill">
              <span className="stat-icon-text">📜</span>
              <span>Synced LRC Lyrics</span>
            </div>
            <div className="stat-sep">/</div>
            <div className="stat-pill">
              <span className="stat-icon-text">📦</span>
              <span>Isolated Bottle System</span>
            </div>
            <div className="stat-sep">/</div>
            <div className="stat-pill">
              <span className="stat-icon-text">🛡️</span>
              <span>MIT Licensed</span>
            </div>
          </div>
        </section>

        {/* ─── QUICK INSTALL WIDGET ───────────────────────────────── */}
        <section className="section install-section" id="install">
          <div className="container">
            <div className="section-head text-center">
              <div className="section-badge">$ GET STARTED</div>
              <h2 className="section-title">Install Vibe-Fi in Seconds</h2>
              <p className="section-desc">
                Choose your platform. The installer sets up dependencies in an isolated bottle without cluttering your OS.
              </p>
            </div>

            <div className="install-widget-wrapper">
              <InstallWidget />
            </div>
          </div>
        </section>

        {/* ─── CORE CAPABILITIES (NO COMPETITOR COMPARISONS) ──────── */}
        <FeaturesGrid />

        {/* ─── FOUR CURATED THEMES ─────────────────────────────────── */}
        <ThemeShowcase />

        {/* ─── KEYBOARD HOTKEYS SECTION ───────────────────────────── */}
        <HotkeysSection />

        {/* ─── COMMUNITY & OPEN SOURCE ─────────────────────────────── */}
        <CommunitySection />
      </main>

      <Footer />
    </div>
  );
}
