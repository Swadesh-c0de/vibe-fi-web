"use client";

import React, { useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.attributeName === "data-theme") {
        callback();
      }
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  return () => {
    window.removeEventListener("storage", callback);
    observer.disconnect();
  };
}

function getSnapshot(): Theme {
  const active = document.documentElement.getAttribute("data-theme");
  return active === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

export default function ThemeToggle(): React.JSX.Element {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = (): void => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    try {
      localStorage.setItem("vibefi_theme", nextTheme);
    } catch {
      // Safe fallback for restricted storage environments
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle-btn h-[34px] shrink-0 inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 bg-surface-elevated border border-strong rounded-[6px] text-text-primary font-mono text-[0.85rem] font-semibold transition-all hover:border-sage hover:text-sage hover:-translate-y-0.5 active:scale-95 select-none cursor-pointer box-border whitespace-nowrap"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span className="theme-toggle-indicator flex items-center justify-center shrink-0" aria-hidden="true">
        {theme === "dark" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        )}
      </span>
      <span className="theme-toggle-label leading-none hidden sm:inline">
        {theme === "dark" ? "Dark" : "Light"}
      </span>
    </button>
  );
}
