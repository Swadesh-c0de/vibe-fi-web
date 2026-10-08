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

    // Instant Zero-Jank Theme Switch:
    // 1. Temporarily freeze all CSS transitions across the entire DOM tree
    document.documentElement.classList.add("disable-transitions");

    // 2. Set theme attribute and persist to storage
    document.documentElement.setAttribute("data-theme", nextTheme);
    try {
      localStorage.setItem("vibefi_theme", nextTheme);
    } catch {
      // Safe fallback for restricted storage environments
    }

    // 3. Update theme-color meta tag for browser chrome
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute("content", nextTheme === "light" ? "#fbf1c7" : "#141617");
    }

    // 4. Force synchronous style recalculation while transitions are frozen
    window.getComputedStyle(document.documentElement).opacity;

    // 5. Restore normal transitions on the next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove("disable-transitions");
      });
    });
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle-btn w-[34px] h-[34px] shrink-0 inline-flex items-center justify-center bg-surface-elevated border border-strong rounded-[6px] text-text-primary transition-colors duration-150 hover:bg-surface-subtle hover:border-sage hover:text-sage select-none cursor-pointer box-border"
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
    </button>
  );
}
