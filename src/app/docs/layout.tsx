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
      { href: "/docs", label: "Overview" },
      { href: "/docs/installation", label: "Installation Guide" },
    ],
  },
  {
    category: "Guides",
    links: [
      { href: "/docs/usage", label: "Usage & Shortcuts" },
      { href: "/docs/hotkeys", label: "Hotkeys Cheatsheet" },
    ],
  },
  {
    category: "Desktop Setup",
    links: [
      { href: "/docs/usage#mpris", label: "Media Keys & Controls" },
      { href: "/docs/usage#waybar", label: "Status Bar (Waybar)" },
    ],
  },
];

function DocsNavList({
  pathname,
  onNavigate,
  isMobile,
}: {
  pathname: string;
  onNavigate?: () => void;
  isMobile?: boolean;
}): React.JSX.Element {
  return (
    <nav className={isMobile ? "flex flex-col gap-3.5" : "flex flex-col gap-6 sm:gap-7"}>
      {DOCS_NAV.map((group, idx) => (
        <div key={idx} className="flex flex-col">
          <span
            className={
              isMobile
                ? "font-brand text-[0.72rem] font-extrabold uppercase tracking-wider text-text-muted mb-1 px-1"
                : "block font-brand text-[0.78rem] font-extrabold uppercase tracking-wider text-text-muted mb-2.5"
            }
          >
            {group.category}
          </span>
          <ul className={`list-none flex flex-col p-0 m-0 ${isMobile ? "gap-1" : "gap-1.5"}`}>
            {group.links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    className={`flex items-center gap-2 font-medium transition-colors ${
                      isMobile
                        ? "px-2.5 py-1.5 text-[0.86rem] rounded"
                        : "px-3 py-2 text-[0.92rem] rounded-[5px]"
                    } ${
                      isActive
                        ? isMobile
                          ? "bg-surface text-sage font-bold border border-strong/50 shadow-xs"
                          : "bg-surface-elevated text-sage font-bold border border-strong/50 shadow-xs"
                        : isMobile
                        ? "text-text-secondary hover:bg-surface hover:text-sage"
                        : "text-text-secondary hover:bg-surface-subtle hover:text-sage"
                    }`}
                  >
                    {isActive && <span className="font-mono text-amber text-xs">❯</span>}
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

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

      <div className="container flex flex-col lg:flex-row gap-0 lg:gap-12 xl:gap-16 pt-5 sm:pt-8 lg:pt-14 pb-16 sm:pb-28 flex-1">
        {/* Sleek Mobile Docs Sub-Navigation Bar */}
        <div className="block lg:hidden w-full mb-5">
          <div className="bg-surface border border-subtle sm:border-strong rounded-lg shadow-xs overflow-hidden transition-all">
            <button
              type="button"
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-text-primary cursor-pointer select-none transition-colors hover:bg-surface-elevated/60"
              onClick={() => setMobileDocsOpen((prev) => !prev)}
              aria-expanded={mobileDocsOpen}
              aria-label="Toggle Documentation Navigation"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-6 h-6 rounded flex items-center justify-center bg-surface-elevated border border-subtle text-sage shrink-0">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
                <span className="font-brand font-bold text-[0.88rem] tracking-tight text-text-primary">
                  Docs Navigation
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-[0.76rem] font-semibold text-sage px-2 py-0.5 bg-surface-elevated border border-subtle rounded max-w-[140px] truncate">
                  {activeLink ? activeLink.label : "Documentation"}
                </span>
                <svg
                  className={`w-4 h-4 text-text-muted transition-transform duration-200 shrink-0 ${
                    mobileDocsOpen ? "rotate-180 text-sage" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </button>

            {/* Collapsible Accordion Content */}
            {mobileDocsOpen && (
              <div className="border-t border-subtle bg-surface-elevated/30 p-3.5 flex flex-col gap-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-subtle/50 text-[0.75rem] text-text-muted">
                  <span className="font-brand font-bold uppercase tracking-wider">Documentation</span>
                  <span className="font-mono font-bold text-sage px-1.5 py-0.5 bg-surface-elevated border border-strong rounded text-[0.7rem]">v2.0.0</span>
                </div>
                <DocsNavList
                  pathname={pathname}
                  onNavigate={() => setMobileDocsOpen(false)}
                  isMobile
                />
                <div className="pt-2 border-t border-subtle/50 text-center">
                  <a
                    href="https://github.com/Swadesh-c0de/vibe-fi-go/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.78rem] text-text-muted hover:text-text-primary transition-colors"
                  >
                    Found a doc issue? <span className="text-sage font-semibold">Edit on GitHub ↗</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Sidebar Navigation */}
        <aside className="docs-sidebar hidden lg:block w-[260px] xl:w-[270px] shrink-0">
          <div className="lg:sticky lg:top-24 flex flex-col gap-7 sm:gap-8">
            <div className="flex items-center justify-between pb-3.5 border-b border-subtle">
              <span className="font-brand font-extrabold text-[1.12rem]">Documentation</span>
              <span className="font-mono text-[0.72rem] font-bold px-2 py-0.5 bg-surface-elevated border border-strong rounded text-sage">
                v2.0.0
              </span>
            </div>

            <DocsNavList pathname={pathname} />

            <div className="pt-4.5 border-t border-subtle">
              <a
                href="https://github.com/Swadesh-c0de/vibe-fi-go/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1 text-[0.82rem] text-text-muted hover:text-text-primary transition-colors"
              >
                <span>Found a doc issue?</span>
                <span className="text-sage font-semibold">Edit on GitHub ↗</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Main Documentation Article Content */}
        <main className="flex-1 min-w-0">
          <article className="docs-article max-w-[840px] w-full min-w-0">{children}</article>
        </main>
      </div>

      <Footer />
    </div>
  );
}
