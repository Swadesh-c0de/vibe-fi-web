import React from "react";

export default function CommunitySection(): React.JSX.Element {
  return (
    <section className="py-8 sm:py-12" id="community">
      <div className="container max-w-[760px]">
        <div className="relative overflow-hidden bg-surface border border-subtle rounded-[6px] py-7 px-4.5 sm:py-9 sm:px-8 text-center shadow-xs">
          <div className="relative z-10 max-w-[540px] mx-auto">
            <h2 className="font-brand text-base sm:text-lg font-bold text-text-primary tracking-tight mb-1.5">
              Free, Open Source &amp; Built for You
            </h2>

            <p className="text-text-secondary text-[0.78rem] sm:text-[0.84rem] leading-relaxed mb-5">
              Vibe-Fi is 100% MIT-licensed software built in C++17. We welcome contributors, theme designers,
              bug hunters, and music lovers across Linux and macOS.
            </p>

            {/* Clean Monospace Chips */}
            <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
              <span className="px-2 py-0.5 rounded-[4px] font-mono text-[0.68rem] sm:text-[0.72rem] font-medium bg-surface-elevated border border-strong text-text-secondary">
                MIT License
              </span>
              <span className="px-2 py-0.5 rounded-[4px] font-mono text-[0.68rem] sm:text-[0.72rem] font-medium bg-surface-elevated border border-strong text-text-secondary">
                PRs Welcome
              </span>
              <span className="px-2 py-0.5 rounded-[4px] font-mono text-[0.68rem] sm:text-[0.72rem] font-medium bg-surface-elevated border border-strong text-text-secondary">
                Linux &amp; macOS
              </span>
              <span className="px-2 py-0.5 rounded-[4px] font-mono text-[0.68rem] sm:text-[0.72rem] font-medium bg-surface-elevated border border-strong text-text-secondary">
                C++17 &amp; libmpv
              </span>
            </div>

            {/* Clean Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
              <a
                href="https://github.com/Swadesh-c0de/vibe-fi"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full sm:w-auto px-4 py-2 text-[0.8rem] sm:text-[0.84rem] inline-flex items-center justify-center gap-2"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>Star on GitHub</span>
              </a>

              <a
                href="https://github.com/Swadesh-c0de/vibe-fi/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary w-full sm:w-auto px-4 py-2 text-[0.8rem] sm:text-[0.84rem]"
              >
                <span>Open an Issue / PR ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
