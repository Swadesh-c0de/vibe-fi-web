"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar(): React.JSX.Element {
  const [stars, setStars] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    // Fetch GitHub stars with localStorage caching
    if (typeof window === "undefined") return;
    const cachedStars = localStorage.getItem("vibefi_gh_stars");
    const cachedTime = localStorage.getItem("vibefi_gh_stars_time");
    const now = Date.now();

    if (cachedStars && cachedTime && now - parseInt(cachedTime, 10) < 1000 * 60 * 15) {
      setStars(cachedStars);
    } else {
      fetch("https://api.github.com/repos/Swadesh-c0de/vibe-fi")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then((data: { stargazers_count?: number }) => {
          if (data && typeof data.stargazers_count === "number") {
            const count = data.stargazers_count;
            const formatted = count >= 1000 ? `${(count / 1000).toFixed(1)}k` : `${count}`;
            setStars(formatted);
            localStorage.setItem("vibefi_gh_stars", formatted);
            localStorage.setItem("vibefi_gh_stars_time", now.toString());
          }
        })
        .catch(() => {
          if (cachedStars) setStars(cachedStars);
        });
    }
  }, []);

  return (
    <header className="sticky top-0 z-[100] bg-overlay backdrop-blur-md border-b border-subtle transition-all">
      <div className="container flex items-center justify-between h-[60px] sm:h-[68px]">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0" aria-label="vibe-fi home">
          <div className="flex items-center justify-center shrink-0">
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="9" className="logo-squircle-bg" />
              <rect x="6.5" y="14" width="4" height="14" rx="2" fill="#7daea3" />
              <rect x="13.5" y="6" width="4" height="22" rx="2" fill="#d4be98" />
              <rect x="20.5" y="11" width="4" height="17" rx="2" fill="#e78a4e" />
              <rect x="27.5" y="18" width="4" height="10" rx="2" fill="#a9b665" />
            </svg>
          </div>
          <div className="font-brand font-black text-[1.3rem] sm:text-[1.6rem] tracking-tight leading-none whitespace-nowrap">
            <span className="text-text-primary">vibe</span>
            <span className="text-sage">-fi</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#features" className="text-[0.95rem] font-semibold text-text-secondary hover:text-sage transition-colors">
            Features
          </Link>
          <Link href="/#showcase" className="text-[0.95rem] font-semibold text-text-secondary hover:text-sage transition-colors">
            Showcase
          </Link>
          <Link href="/docs" className="text-[0.95rem] font-semibold text-text-secondary hover:text-sage transition-colors">
            Docs
          </Link>
          <Link href="/docs/installation" className="text-[0.95rem] font-semibold text-text-secondary hover:text-sage transition-colors">
            Install
          </Link>
          <Link href="/docs/hotkeys" className="text-[0.95rem] font-semibold text-text-secondary hover:text-sage transition-colors">
            Hotkeys
          </Link>
        </nav>

        {/* Right Actions: Stars, Theme Toggle & GitHub */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* GitHub Stars Button */}
          <a
            href="https://github.com/Swadesh-c0de/vibe-fi"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[34px] shrink-0 inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 bg-surface-elevated border border-strong rounded-[6px] font-sans text-[0.82rem] sm:text-[0.85rem] font-semibold text-text-primary transition-all hover:border-gold hover:text-gold hover:-translate-y-0.5 box-border select-none whitespace-nowrap"
            title="Star vibe-fi on GitHub"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="hidden sm:inline">Star</span>
            <span className="pl-1.5 border-l border-subtle text-gold font-mono whitespace-nowrap shrink-0">{stars ? `★ ${stars}` : "★ 1"}</span>
          </a>

          {/* Theme Toggle (Light / Dark Mode) */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="mobile-menu-btn md:hidden p-1.5 sm:p-2 text-text-primary shrink-0 rounded hover:bg-surface-subtle transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer open flex flex-col gap-4 p-6 bg-surface border-b border-strong">
          <Link
            href="/#features"
            className="text-[1.1rem] font-semibold text-text-primary hover:text-sage transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            href="/#showcase"
            className="text-[1.1rem] font-semibold text-text-primary hover:text-sage transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Showcase
          </Link>
          <Link
            href="/docs"
            className="text-[1.1rem] font-semibold text-text-primary hover:text-sage transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Docs &amp; Overview
          </Link>
          <Link
            href="/docs/installation"
            className="text-[1.1rem] font-semibold text-text-primary hover:text-sage transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Installation Guide
          </Link>
          <Link
            href="/docs/hotkeys"
            className="text-[1.1rem] font-semibold text-text-primary hover:text-sage transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Keyboard Hotkeys
          </Link>
          <div className="pt-2 border-t border-subtle">
            <a
              href="https://github.com/Swadesh-c0de/vibe-fi"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary w-full"
            >
              GitHub Repository ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
