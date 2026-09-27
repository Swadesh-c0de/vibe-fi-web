"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [stars, setStars] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Fetch GitHub stars with localStorage caching
    const cachedStars = localStorage.getItem("vibefi_gh_stars");
    const cachedTime = localStorage.getItem("vibefi_gh_stars_time");
    const now = Date.now();

    if (cachedStars && cachedTime && now - parseInt(cachedTime, 10) < 1000 * 60 * 15) {
      const timer = setTimeout(() => setStars(cachedStars), 0);
      return () => clearTimeout(timer);
    } else {
      fetch("https://api.github.com/repos/Swadesh-c0de/vibe-fi")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then((data) => {
          if (data && typeof data.stargazers_count === "number") {
            const count = data.stargazers_count;
            const formatted = count >= 1000 ? `${(count / 1000).toFixed(1)}k` : `${count}`;
            setStars(formatted);
            localStorage.setItem("vibefi_gh_stars", formatted);
            localStorage.setItem("vibefi_gh_stars_time", now.toString());
          }
        })
        .catch(() => {
          // Graceful fallback
          if (cachedStars) setStars(cachedStars);
        });
    }
  }, []);

  return (
    <header className="site-header">
      <div className="container nav-inner">
        {/* Brand Logo */}
        <Link href="/" className="nav-brand" aria-label="vibe-fi home">
          <div className="brand-icon-wrapper">
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="9" className="logo-squircle-bg" />
              <rect x="6.5" y="14" width="4" height="14" rx="2" fill="#7daea3" />
              <rect x="13.5" y="6" width="4" height="22" rx="2" fill="#d4be98" />
              <rect x="20.5" y="11" width="4" height="17" rx="2" fill="#e78a4e" />
              <rect x="27.5" y="18" width="4" height="10" rx="2" fill="#a9b665" />
            </svg>
          </div>
          <div className="brand-wordmark">
            <span className="wordmark-vibe">vibe</span>
            <span className="wordmark-fi">-fi</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-links">
          <Link href="/#features" className="nav-link">
            Features
          </Link>
          <Link href="/#showcase" className="nav-link">
            Showcase
          </Link>
          <Link href="/docs" className="nav-link">
            Docs
          </Link>
          <Link href="/docs/installation" className="nav-link">
            Install
          </Link>
          <Link href="/docs/hotkeys" className="nav-link">
            Hotkeys
          </Link>
        </nav>

        {/* Right Actions: Stars, Theme Toggle & GitHub */}
        <div className="nav-actions">
          {/* GitHub Stars Button */}
          <a
            href="https://github.com/Swadesh-c0de/vibe-fi"
            target="_blank"
            rel="noopener noreferrer"
            className="gh-star-btn"
            title="Star vibe-fi on GitHub"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="gh-star-text">Star</span>
            <span className="gh-star-count">{stars ? `★ ${stars}` : "★"}</span>
          </a>

          {/* Theme Toggle (Light / Dark Mode) */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
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
        <div className="mobile-menu-drawer">
          <Link
            href="/#features"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            href="/#showcase"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Showcase
          </Link>
          <Link
            href="/docs"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Docs & Overview
          </Link>
          <Link
            href="/docs/installation"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Installation Guide
          </Link>
          <Link
            href="/docs/hotkeys"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Keyboard Hotkeys
          </Link>
          <div className="mobile-menu-footer">
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
