import type { Metadata } from "next";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TerminalShowcase from "@/components/TerminalShowcase";
import InstallWidget from "@/components/InstallWidget";
import FeaturesGrid from "@/components/FeaturesGrid";
import CliWorkflows from "@/components/CliWorkflows";
import HotkeysSection from "@/components/HotkeysSection";
import CommunitySection from "@/components/CommunitySection";

export const metadata: Metadata = {
  title: "vibe-fi — Terminal Music Player",
  description:
    "Free, open-source terminal music player for Linux & macOS written in Go with Bubble Tea. Stream YouTube audio, watch real-time visualizers, and read synced lyrics in ~60 MB of RAM.",
};

export default function HomePage(): React.JSX.Element {
  return (
    <div className="landing-page">
      <Navbar />

      <main>
        {/* ─── HERO SECTION ────────────────────────────────────────── */}
        <section className="relative py-14 sm:py-20 lg:py-26 pb-10 sm:pb-16 overflow-hidden max-w-[100vw]">
          <div className="container relative z-10 flex flex-col items-center text-center">
            {/* Powerline Prompt Badge */}
            <div className="mb-5 sm:mb-7 max-w-full">
              <div className="powerline-prompt">
                <span className="powerline-seg powerline-seg-user">arch</span>
                <span className="powerline-arrow-1" />
                <span className="powerline-seg powerline-seg-dir">~</span>
                <span className="powerline-arrow-2" />
                <span className="powerline-seg powerline-seg-cmd">
                  vibe &quot;lofi&quot;
                </span>
              </div>
            </div>

            {/* Hero Main Typography */}
            <h1 className="font-brand tracking-tight mb-5 sm:mb-7 max-w-[920px]">
              <span className="block text-[3.2rem] xs:text-[4.2rem] sm:text-[5.5rem] md:text-[6.6rem] font-black leading-none tracking-tight">
                <span className="text-text-primary">vibe</span>
                <span className="bg-gradient-to-r from-sage via-green to-amber bg-clip-text text-transparent">
                  -fi
                </span>
              </span>
            </h1>

            <p className="text-[0.98rem] sm:text-xl text-text-secondary max-w-[600px] leading-relaxed mb-8 sm:mb-12 px-2">
              A fast, lightweight terminal music player. Stream YouTube music with live visualizers and synced lyrics.
            </p>

            {/* Hero CTA Actions */}
            <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto mb-10 sm:mb-16">
              <a
                href="#install"
                className="btn btn-primary px-4 sm:px-6 py-2.5 sm:py-3 text-[0.86rem] sm:text-[0.95rem] whitespace-nowrap justify-center shadow-md flex-1 sm:flex-initial"
              >
                <span>Quick Install</span>
                <span aria-hidden="true">→</span>
              </a>

              <a
                href="https://github.com/Swadesh-c0de/vibe-fi-go"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary px-4 sm:px-6 py-2.5 sm:py-3 text-[0.86rem] sm:text-[0.95rem] whitespace-nowrap justify-center flex-1 sm:flex-initial"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>
            </div>

            {/* Terminal Window Showcase */}
            <div className="w-full max-w-[860px]" id="showcase">
              <TerminalShowcase />
            </div>
          </div>
        </section>

        {/* ─── LIVE SPECS & STATS STRIP ───────────────────────────── */}
        <section className="border-y border-subtle/70 py-3.5 sm:py-4.5 bg-surface/30">
          <div className="container max-w-[960px]">
            <div className="flex items-center justify-center gap-x-3.5 sm:gap-x-5 gap-y-2.5 flex-wrap text-[0.76rem] sm:text-[0.82rem] font-mono text-text-muted">
              <span className="text-text-secondary font-medium">
                Linux &amp; macOS
              </span>
              <span className="text-text-muted/60 select-none" aria-hidden="true">·</span>
              <span className="text-text-secondary font-medium">
                <span className="text-sage font-bold">~60 MB</span> RAM
              </span>
              <span className="text-text-muted/60 select-none" aria-hidden="true">·</span>
              <span className="text-text-secondary font-medium">
                YouTube Streaming
              </span>
              <span className="text-text-muted/60 select-none" aria-hidden="true">·</span>
              <span className="text-text-secondary font-medium">
                Local Music
              </span>
              <span className="text-text-muted/60 select-none" aria-hidden="true">·</span>
              <span className="text-text-secondary font-medium">
                Synced Lyrics
              </span>
              <span className="text-text-muted/60 select-none" aria-hidden="true">·</span>
              <span className="text-text-secondary font-medium">
                6 Color Themes
              </span>
              <span className="text-text-muted/60 select-none" aria-hidden="true">·</span>
              <span className="text-text-secondary font-medium">
                Free &amp; Open Source
              </span>
            </div>
          </div>
        </section>

        {/* ─── QUICK INSTALL WIDGET ───────────────────────────────── */}
        <section className="py-14 sm:py-20 lg:py-24 content-auto" id="install">
          <div className="container">
            <div className="max-w-[860px] mx-auto mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 px-1">
              <h2 className="font-brand text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
                Quick Install
              </h2>
              <span className="text-xs sm:text-sm font-mono text-text-muted">
                One command · Ready in seconds
              </span>
            </div>

            <div className="max-w-[860px] mx-auto">
              <InstallWidget />
            </div>
          </div>
        </section>

        {/* ─── CORE CAPABILITIES ──────── */}
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
