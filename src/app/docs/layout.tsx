"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export interface DocsNavLink {
  href: string;
  label: string;
}

export interface DocsNavGroup {
  category: string;
  links: DocsNavLink[];
}

const DOCS_NAV: DocsNavGroup[] = [
  {
    category: "Getting Started",
    links: [
      { href: "/docs", label: "Overview & Architecture" },
      { href: "/docs/installation", label: "Installation Guide" },
    ],
  },
  {
    category: "Guides & Reference",
    links: [
      { href: "/docs/usage", label: "Usage, Search & Playlists" },
      { href: "/docs/hotkeys", label: "Keyboard Hotkeys Reference" },
    ],
  },
  {
    category: "Desktop Integration",
    links: [
      { href: "/docs/usage#mpris", label: "Linux MPRIS & playerctl" },
      { href: "/docs/usage#waybar", label: "Waybar & Hyprland Config" },
      { href: "/docs/usage#bottle", label: "Dependency Bottle System" },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const pathname = usePathname();
  const [mobileDocsOpen, setMobileDocsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handlePopState = (): void => setMobileDocsOpen(false);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const activeLink = DOCS_NAV.flatMap((g) => g.links).find((l) => l.href === pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container flex flex-col lg:flex-row gap-6 lg:gap-12 pt-6 sm:pt-10 pb-16 sm:pb-20 flex-1">
        {/* Mobile Docs Navigation Accordion Toggle */}
        <div className="block lg:hidden w-full mb-4">
          <button
            type="button"
            className="docs-mobile-nav-toggle-btn w-full flex items-center justify-between px-4 py-3 bg-surface-elevated border border-strong rounded-[6px] text-text-primary font-brand text-[0.95rem] font-bold cursor-pointer transition-colors hover:border-sage"
            onClick={() => setMobileDocsOpen((prev) => !prev)}
            aria-expanded={mobileDocsOpen}
          >
            <span className="flex items-center gap-2">
              <span>📖</span>
              <span>Docs Navigation</span>
            </span>
            <span className="flex items-center gap-2 text-[0.82rem] text-text-muted">
              <span className="text-sage font-mono">
                {activeLink ? activeLink.label : "Documentation"}
              </span>
              <span>{mobileDocsOpen ? "▲" : "▼"}</span>
            </span>
          </button>
        </div>

        {/* Sidebar Navigation */}
        <aside className={`docs-sidebar w-full lg:w-[260px] shrink-0 ${mobileDocsOpen ? "mobile-open block" : "hidden lg:block"}`}>
          <div className="lg:sticky lg:top-24 flex flex-col gap-6 sm:gap-7">
            <div className="flex items-center justify-between pb-3 border-b border-subtle">
              <span className="font-brand font-extrabold text-[1.1rem]">Documentation</span>
              <span className="font-mono text-[0.72rem] font-bold px-1.5 py-0.5 bg-surface-elevated border border-strong rounded text-sage">
                v1.1.2
              </span>
            </div>

            <nav className="flex flex-col gap-6">
              {DOCS_NAV.map((group, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="block font-brand text-[0.8rem] font-extrabold uppercase tracking-wider text-text-muted mb-2">
                    {group.category}
                  </span>
                  <ul className="list-none flex flex-col gap-1 p-0 m-0">
                    {group.links.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setMobileDocsOpen(false)}
                            className={`flex items-center gap-2 px-2.5 py-1.5 text-[0.92rem] font-semibold rounded transition-colors ${
                              isActive
                                ? "bg-surface-elevated text-sage font-bold"
                                : "text-text-secondary hover:bg-surface-subtle hover:text-sage"
                            }`}
                          >
                            {isActive && <span className="font-mono text-amber">❯</span>}
                            <span>{link.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="pt-4 border-t border-subtle">
              <a
                href="https://github.com/Swadesh-c0de/vibe-fi/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-0.5 text-[0.82rem] text-text-muted hover:text-text-primary transition-colors"
              >
                <span>Found a doc issue?</span>
                <span className="text-sage font-semibold">Edit on GitHub ↗</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Main Documentation Article Content */}
        <main className="flex-1 min-w-0">
          <article className="max-w-[820px]">{children}</article>
        </main>
      </div>

      <Footer />
    </div>
  );
}
