import type { Metadata } from "next";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import InstallWidget from "@/components/InstallWidget";
import FeaturesGrid from "@/components/FeaturesGrid";
import CliWorkflows from "@/components/CliWorkflows";
import HotkeysSection from "@/components/HotkeysSection";
import CommunitySection from "@/components/CommunitySection";

export const metadata: Metadata = {
  title: "vibe-fi — Fast, Lightweight Terminal Music Player for Linux & macOS",
  description:
    "Free, open-source terminal music player. Stream YouTube audio, watch real-time visualizers, and read synced lyrics in under 35 MB of RAM.",
};

export default function HomePage(): React.JSX.Element {
  return (
    <div className="landing-page">
      <Navbar />

      <main>
        {/* ─── HERO SECTION ────────────────────────────────────────── */}
        <section className="relative py-12 sm:py-20 pb-8 sm:pb-12 overflow-hidden max-w-[100vw]">
          <div className="container relative z-10 flex flex-col items-center text-center">
            {/* Powerline Prompt Badge (Matching User Reference) */}
            <div className="mb-6 sm:mb-8 max-w-full">
              <div className="powerline-prompt">
                <span className="powerline-seg powerline-seg-user">
                  <span className="powerline-user-name">veronica@</span>arch
                </span>
                <span className="powerline-arrow-1" />
                <span className="powerline-seg powerline-seg-dir">~</span>
                <span className="powerline-arrow-2" />
                <span className="powerline-seg powerline-seg-cmd">
                  $ vibe &quot;lofi beats&quot;<span className="blink">_</span>
                </span>
              </div>
            </div>

            {/* Hero Main Typography */}
            <h1 className="font-brand text-[1.85rem] xs:text-[2.2rem] sm:text-[2.8rem] md:text-[3.8rem] font-extrabold leading-[1.18] sm:leading-[1.15] tracking-tight mb-4 sm:mb-6 max-w-[900px]">
              Turn up the volume. <br />
              <span className="bg-gradient-to-br from-sage to-green bg-clip-text text-transparent">
                Keep vibing in your terminal.
              </span>
            </h1>

            <p className="text-[0.95rem] sm:text-xl text-text-secondary max-w-[720px] leading-relaxed mb-6 sm:mb-10 px-1">
              A fast, lightweight music player for Linux &amp; macOS. Stream YouTube audio without opening a browser,
              watch real-time visualizers, and read synchronized lyrics — smoothly running in under 35 MB of RAM.
            </p>

            {/* Hero CTA Actions */}
            <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto mb-8 sm:mb-14">
              <a
                href="#install"
                className="btn btn-primary px-3.5 sm:px-5 py-2 sm:py-2.5 text-[0.82rem] sm:text-[0.95rem] whitespace-nowrap justify-center shadow-md flex-1 sm:flex-initial"
              >
                <span>Getting Started</span>
                <span aria-hidden="true">→</span>
              </a>

              <a
                href="https://github.com/Swadesh-c0de/vibe-fi"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary px-3.5 sm:px-5 py-2 sm:py-2.5 text-[0.82rem] sm:text-[0.95rem] whitespace-nowrap justify-center flex-1 sm:flex-initial"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>
            </div>

            {/* Interactive Live Terminal Showcase */}
            <div className="w-full max-w-[860px]" id="showcase">
              <InteractiveTerminal />
            </div>
          </div>
        </section>

        {/* ─── LIVE SPECS & STATS STRIP ───────────────────────────── */}
        <section className="border-y border-subtle py-3 sm:py-3.5 overflow-x-auto scrollbar-none [webkit-overflow-scrolling:touch]">
          <div className="container flex items-center justify-start sm:justify-center gap-4 sm:gap-6 flex-nowrap sm:flex-wrap text-[0.82rem] font-mono whitespace-nowrap min-w-max sm:min-w-0">
            <div className="inline-flex items-center gap-2 text-text-secondary font-medium">
              <span className="w-2 h-2 rounded-full bg-green" />
              <span>Linux &amp; macOS Native</span>
            </div>
            <div className="text-text-muted opacity-30 select-none">/</div>
            <div className="inline-flex items-center gap-2 text-text-secondary font-medium">
              <span>⚡</span>
              <span>&lt; 35 MB RAM Footprint</span>
            </div>
            <div className="text-text-muted opacity-30 select-none">/</div>
            <div className="inline-flex items-center gap-2 text-text-secondary font-medium">
              <span>🎵</span>
              <span>YouTube Audio Stream</span>
            </div>
            <div className="text-text-muted opacity-30 select-none">/</div>
            <div className="inline-flex items-center gap-2 text-text-secondary font-medium">
              <span>📜</span>
              <span>Synced LRC Lyrics</span>
            </div>
            <div className="text-text-muted opacity-30 select-none">/</div>
            <div className="inline-flex items-center gap-2 text-text-secondary font-medium">
              <span>📦</span>
              <span>Isolated Bottle System</span>
            </div>
            <div className="text-text-muted opacity-30 select-none">/</div>
            <div className="inline-flex items-center gap-2 text-text-secondary font-medium">
              <span>🛡️</span>
              <span>MIT Licensed</span>
            </div>
          </div>
        </section>

        {/* ─── QUICK INSTALL WIDGET ───────────────────────────────── */}
        <section className="py-8 sm:py-12 content-auto" id="install">
          <div className="container">
            <div className="max-w-[700px] mx-auto mb-2.5 sm:mb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 px-1">
              <h2 className="font-brand text-base sm:text-lg font-bold text-text-primary tracking-tight">
                Quick Installation
              </h2>
              <span className="text-[0.72rem] sm:text-xs font-mono text-text-muted">
                Isolated bottle · Zero OS clutter
              </span>
            </div>

            <div className="max-w-[700px] mx-auto">
              <InstallWidget />
            </div>
          </div>
        </section>

        {/* ─── CORE CAPABILITIES (NO COMPETITOR COMPARISONS) ──────── */}
        <FeaturesGrid />

        {/* ─── CLI COMMAND WORKFLOWS ───────────────────────────────── */}
        <CliWorkflows />

        {/* ─── KEYBOARD HOTKEYS SECTION ───────────────────────────── */}
        <HotkeysSection />

        {/* ─── COMMUNITY & OPEN SOURCE ─────────────────────────────── */}
        <CommunitySection />
      </main>

      <Footer />
    </div>
  );
}
