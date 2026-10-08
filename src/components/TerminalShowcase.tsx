"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function TerminalShowcase(): React.JSX.Element {
  const [view, setView] = useState<"showcase" | "demo">("showcase");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (view === "demo") {
      video.play().catch(() => {
        // Gracefully handle browser autoplay policies
      });
    } else {
      video.pause();
    }
  }, [view]);

  return (
    <div className="w-full max-w-[860px] mx-auto">
      {/* Sleek Minimalist Terminal Window */}
      <div className="rounded-[6px] sm:rounded-lg border border-[#3c3836] bg-[#141617] shadow-2xl overflow-hidden">
        {/* Terminal Header Chrome (Refined, Minimal, No Dots) */}
        <div className="relative flex items-center justify-between px-3 sm:px-4 h-8 sm:h-9 border-b border-[#2d3133] bg-[#181a1b] font-mono select-none">
          {/* Centered Title */}
          <span className="text-xs font-medium text-[#a89984] tracking-wide pointer-events-none">
            vibe-fi
          </span>

          {/* Minimalist View Switcher (High Contrast in both Light & Dark modes) */}
          <div className="absolute right-2 sm:right-3 flex items-center p-0.5 rounded-[5px] bg-[#121415] border border-[#2d3133] text-[11px] sm:text-xs">
            <button
              type="button"
              onClick={() => setView("showcase")}
              className={`px-2.5 py-0.5 rounded-[4px] font-mono transition-colors duration-150 cursor-pointer select-none leading-none ${view === "showcase"
                ? "bg-[#282c2e] text-[#ebdbb2] font-semibold border border-[#3c3836] shadow-xs"
                : "text-[#928374] hover:text-[#ebdbb2]"
                }`}
              aria-pressed={view === "showcase"}
            >
              Showcase
            </button>
            <button
              type="button"
              onClick={() => setView("demo")}
              className={`px-2.5 py-0.5 rounded-[4px] font-mono transition-colors duration-150 cursor-pointer select-none leading-none ${view === "demo"
                ? "bg-[#282c2e] text-[#ebdbb2] font-semibold border border-[#3c3836] shadow-xs"
                : "text-[#928374] hover:text-[#ebdbb2]"
                }`}
              aria-pressed={view === "demo"}
            >
              Demo
            </button>
          </div>
        </div>

        {/* Display Container with Preloaded Smooth Crossfade */}
        <div className="relative w-full aspect-[1000/618] bg-black overflow-hidden">
          <Image
            src="/showcase.png"
            alt="vibe-fi terminal showcase"
            fill
            unoptimized
            priority
            className={`object-cover scale-110 transition-opacity duration-200 ${view === "showcase" ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
              }`}
          />
          <video
            ref={videoRef}
            src="/demo.mp4"
            muted
            loop
            playsInline
            preload="auto"
            aria-label="vibe-fi live terminal demo"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${view === "demo" ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
              }`}
          />
        </div>
      </div>
    </div>
  );
}
