"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function TerminalShowcase(): React.JSX.Element {
  const [view, setView] = useState<"showcase" | "demo">("showcase");
  const [hasLoadedDemo, setHasLoadedDemo] = useState<boolean>(false);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSelectView = (newView: "showcase" | "demo") => {
    if (newView === "demo" && !hasLoadedDemo) {
      setHasLoadedDemo(true);
    }
    setView(newView);
  };

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
  }, [view, isVideoReady]);

  const showVideo = view === "demo" && isVideoReady;

  return (
    <div className="w-full max-w-[860px] xl:max-w-[960px] mx-auto">
      {/* Sleek Minimalist Terminal Window */}
      <div className="rounded-[6px] sm:rounded-lg border border-[#3c3836] bg-[#141617] shadow-xl overflow-hidden">
        {/* Terminal Header Chrome (Refined, Minimal, No Dots) */}
        <div className="relative flex items-center justify-between px-3 sm:px-4 h-8 sm:h-9 border-b border-[#2d3133] bg-[#181a1b] font-mono select-none">
          {/* Left Title & Status Pill */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="text-xs font-medium text-[#a89984] tracking-wide pointer-events-none">
              vibe-fi
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-[#7c6f64] pointer-events-none">
              <span className="text-[#504945]">·</span>
              <span>~60 MB RAM · Go + Bubble Tea</span>
            </span>
          </div>

          {/* Minimalist View Switcher (High Contrast in both Light & Dark modes) */}
          <div className="flex items-center p-0.5 rounded-[5px] bg-[#121415] border border-[#2d3133] text-[11px] sm:text-xs">
            <button
              type="button"
              onClick={() => handleSelectView("showcase")}
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
              onClick={() => handleSelectView("demo")}
              onMouseEnter={() => setHasLoadedDemo(true)}
              onTouchStart={() => setHasLoadedDemo(true)}
              onFocus={() => setHasLoadedDemo(true)}
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

        {/* Display Container with Smooth Crossfade */}
        <div className="relative w-full aspect-[1000/618] bg-black overflow-hidden">
          <Image
            src="/showcase.png"
            alt="vibe-fi terminal showcase"
            fill
            unoptimized
            priority
            className={`object-cover transition-opacity duration-300 ${showVideo ? "opacity-0 pointer-events-none z-0" : "opacity-100 z-10"
              }`}
          />
          {hasLoadedDemo && (
            <video
              ref={videoRef}
              src="/demo.mp4"
              muted
              loop
              playsInline
              preload="auto"
              onLoadedData={() => setIsVideoReady(true)}
              onCanPlay={() => setIsVideoReady(true)}
              aria-label="vibe-fi live terminal demo"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${showVideo ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
                }`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
