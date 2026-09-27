"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DOCS_NAV = [
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

export default function DocsLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="docs-page-wrapper">
      <Navbar />

      <div className="container docs-layout-container">
        {/* Sidebar Navigation */}
        <aside className="docs-sidebar">
          <div className="docs-sidebar-inner">
            <div className="docs-sidebar-header">
              <span className="sidebar-title">Documentation</span>
              <span className="sidebar-version-badge">v1.1.2</span>
            </div>

            <nav className="docs-sidebar-nav">
              {DOCS_NAV.map((group, idx) => (
                <div key={idx} className="docs-nav-group">
                  <span className="docs-nav-group-title">{group.category}</span>
                  <ul className="docs-nav-list">
                    {group.links.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className={`docs-nav-link ${isActive ? "active" : ""}`}
                          >
                            {isActive && <span className="active-dot">❯</span>}
                            <span>{link.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="docs-sidebar-footer">
              <a
                href="https://github.com/Swadesh-c0de/vibe-fi/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="docs-help-link"
              >
                <span>Found a doc issue?</span>
                <span className="help-arrow">Edit on GitHub ↗</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Main Documentation Article Content */}
        <main className="docs-content-area">
          <article className="docs-article">{children}</article>
        </main>
      </div>

      <Footer />
    </div>
  );
}
