"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export interface LyricLine {
  time: number;
  text: string;
}

export interface TerminalTheme {
  id: string;
  name: string;
}

const SAMPLE_LYRICS: LyricLine[] = [
  { time: 0, text: "♪ (smooth lofi chords start playing...)" },
  { time: 4, text: "Late night in the terminal, screen glowing bright" },
  { time: 8, text: "Just a lightweight player running through the night" },
  { time: 13, text: "Zero configuration, YouTube streaming free" },
  { time: 17, text: "Less than 35 megabytes of memory" },
  { time: 22, text: "Real-time visualizers moving to the beat" },
  { time: 26, text: "Synced LRC lyrics scrolling nice and neat" },
  { time: 31, text: "Arch or Mac, it doesn't matter where you roam" },
  { time: 36, text: "Vibe-fi keeps the rhythm feeling right at home ♪" },
];

const THEMES: TerminalTheme[] = [
  { id: "auto", name: "Gruvbox" },
  { id: "midnight", name: "Midnight" },
  { id: "matrix", name: "Matrix" },
  { id: "nord", name: "Nord" },
  { id: "hyde", name: "HyDE" },
];

type VisMode = "flame" | "cava" | "stereo";

interface PaletteColors {
  base: string;
  top: string;
  cap: string;
  accent: string;
}

export default function InteractiveTerminal(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Peak physics for authentic DSP equalizer
  const peaksRef = useRef<number[]>([]);
  const peakDecayRef = useRef<number[]>([]);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [visMode, setVisMode] = useState<VisMode>("flame");
  const [activeTheme, setActiveTheme] = useState<string>("auto");
  const [currentSecond, setCurrentSecond] = useState<number>(0);
  const [volume] = useState<number>(85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [peakLevel, setPeakLevel] = useState<number>(78);
  const [termWidth, setTermWidth] = useState<number>(600);

  const TOTAL_DURATION = 40; // 40 seconds loop

  // Track terminal window width for responsive sub-components
  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = (): void => {
      if (containerRef.current) {
        setTermWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setTermWidth(entry.contentRect.width);
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Initialize Web Audio Synth for interactive audio
  const startAudio = useCallback((): void => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
        const analyser = audioCtxRef.current.createAnalyser();
        analyser.fftSize = 128;
        analyser.smoothingTimeConstant = 0.75;
        analyserRef.current = analyser;
      }

      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      const chords = [
        [220.0, 261.63, 329.63, 392.0], // Am7
        [174.61, 220.0, 261.63, 329.63], // Fmaj7
        [261.63, 329.63, 392.0, 493.88], // Cmaj7
        [196.0, 246.94, 293.66, 349.23], // G7
      ];
      let chordIndex = 0;

      const playChord = (): void => {
        if (!audioCtxRef.current || isMuted) return;
        const now = audioCtxRef.current.currentTime;
        const currentChord = chords[chordIndex % chords.length];
        chordIndex++;

        currentChord.forEach((freq) => {
          if (!audioCtxRef.current || !analyserRef.current) return;
          const osc = audioCtxRef.current.createOscillator();
          const gain = audioCtxRef.current.createGain();
          const filter = audioCtxRef.current.createBiquadFilter();

          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(950, now);

          const volFactor = volume / 100;
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(0.06 * volFactor, now + 0.25);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(analyserRef.current);
          analyserRef.current.connect(audioCtxRef.current.destination);

          osc.start(now);
          osc.stop(now + 2.9);
        });
      };

      playChord();
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = setInterval(playChord, 3000);
    } catch {
      // Audio context might fail on un-interacted page
    }
  }, [isMuted, volume]);

  const stopAudio = useCallback((): void => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "running") {
      audioCtxRef.current.suspend();
    }
  }, []);

  const togglePlay = useCallback((): void => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      startAudio();
      setIsPlaying(true);
    }
  }, [isPlaying, startAudio, stopAudio]);

  const cycleVisualizer = useCallback((): void => {
    const modes: VisMode[] = ["flame", "cava", "stereo"];
    const nextIdx = (modes.indexOf(visMode) + 1) % modes.length;
    setVisMode(modes[nextIdx]);
  }, [visMode]);

  const cycleTheme = useCallback((): void => {
    const ids = THEMES.map((t) => t.id);
    const nextIdx = (ids.indexOf(activeTheme) + 1) % ids.length;
    setActiveTheme(ids[nextIdx]);
  }, [activeTheme]);

  // Track timer loop
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentSecond((prev) => (prev + 1) % TOTAL_DURATION);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.key.toLowerCase() === "v") {
        e.preventDefault();
        cycleVisualizer();
      } else if (e.key.toLowerCase() === "t") {
        e.preventDefault();
        cycleTheme();
      } else if (e.key.toLowerCase() === "m") {
        e.preventDefault();
        setIsMuted((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay, cycleVisualizer, cycleTheme]);

  // Active lyric index
  const activeLyricIndex = SAMPLE_LYRICS.reduce((acc, lyric, idx) => {
    if (currentSecond >= lyric.time) return idx;
    return acc;
  }, 0);

  // Canvas visualizer rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let localPeakHold = 78;

    const render = (): void => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = rect.width;
      const height = rect.height;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      let dataArray: Uint8Array<ArrayBuffer> | null = null;
      if (analyserRef.current && isPlaying) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArray = new Uint8Array(new ArrayBuffer(bufferLength)) as Uint8Array<ArrayBuffer>;
        analyserRef.current.getByteFrequencyData(dataArray);
      }

      const isSmall = width < 400;
      const isMedium = width < 600;
      const numBars = isSmall ? 22 : isMedium ? 28 : 36;
      const gap = isSmall ? 2 : 3;
      const barWidth = Math.max(2, (width - (numBars - 1) * gap) / numBars);

      if (peaksRef.current.length !== numBars) {
        peaksRef.current = new Array(numBars).fill(0);
        peakDecayRef.current = new Array(numBars).fill(0);
      }

      const containerStyle = containerRef.current ? getComputedStyle(containerRef.current) : null;
      const palette: PaletteColors = {
        base: containerStyle?.getPropertyValue("--term-bar-base").trim() || "#a9b665",
        top: containerStyle?.getPropertyValue("--term-bar-top").trim() || "#ea6962",
        cap: containerStyle?.getPropertyValue("--term-bar-cap").trim() || "#e78a4e",
        accent: containerStyle?.getPropertyValue("--term-accent").trim() || "#7daea3",
      };

      const now = Date.now() / 1000;
      let frameMax = 0;

      for (let i = 0; i < numBars; i++) {
        let normalizedHeight = 0;

        if (isPlaying && dataArray) {
          const bin = Math.min(dataArray.length - 1, Math.floor((i / numBars) * (dataArray.length * 0.75)));
          normalizedHeight = dataArray[bin] / 255;
        } else if (isPlaying) {
          const wave1 = Math.sin(now * 4 + i * 0.28) * 0.45;
          const wave2 = Math.cos(now * 2.2 - i * 0.35) * 0.35;
          const wave3 = Math.sin(now * 6 + i * 0.5) * 0.15;
          normalizedHeight = Math.max(0.08, Math.min(0.96, 0.45 + wave1 + wave2 + wave3));
        } else {
          normalizedHeight = 0.05 + Math.sin(now * 1.5 + i * 0.2) * 0.04;
        }

        if (visMode === "cava") {
          const wave = Math.sin(now * 3 + i * 0.2) * 0.25;
          normalizedHeight = Math.max(0.08, Math.min(0.95, normalizedHeight * 0.8 + wave + 0.15));
        }

        const barHeight = Math.max(4, normalizedHeight * (height - 8));
        const x = i * (barWidth + gap);
        const y = height - barHeight;

        if (barHeight > frameMax) frameMax = barHeight;

        if (visMode === "flame") {
          if (barHeight >= peaksRef.current[i]) {
            peaksRef.current[i] = barHeight;
            peakDecayRef.current[i] = 0;
          } else {
            peakDecayRef.current[i] += 0.4;
            peaksRef.current[i] = Math.max(0, peaksRef.current[i] - peakDecayRef.current[i]);
          }

          const grad = ctx.createLinearGradient(0, height, 0, y);
          grad.addColorStop(0, palette.base);
          grad.addColorStop(0.65, palette.accent);
          grad.addColorStop(1, palette.top);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, [2, 2, 0, 0]);
          ctx.fill();

          const peakY = height - peaksRef.current[i] - 3;
          if (peakY < height - 6) {
            ctx.fillStyle = palette.cap;
            ctx.fillRect(x, Math.max(0, peakY), barWidth, 2);
          }
        } else if (visMode === "cava") {
          ctx.fillStyle = palette.accent;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, [3, 3, 0, 0]);
          ctx.fill();
        } else {
          // Stereo bars
          const isLeft = i < numBars / 2;
          ctx.fillStyle = isLeft ? palette.base : palette.top;
          ctx.fillRect(x, y, barWidth, barHeight);
        }
      }

      if (isPlaying) {
        const currentPeakPercent = Math.min(99, Math.round((frameMax / height) * 100));
        localPeakHold = Math.round(localPeakHold * 0.95 + currentPeakPercent * 0.05);
        setPeakLevel(localPeakHold);
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, visMode]);

  // Compute text-based ASCII Progress Bar
  const barLength = termWidth < 380 ? 14 : termWidth < 500 ? 20 : 28;
  const progressRatio = currentSecond / TOTAL_DURATION;
  const filledChars = Math.round(progressRatio * barLength);
  const progressBarString =
    "[" +
    "=".repeat(Math.max(0, filledChars - 1)) +
    (filledChars > 0 ? ">" : "") +
    "-".repeat(Math.max(0, barLength - filledChars)) +
    "]";

  // Formatted timestamps
  const formatTime = (secs: number): string => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      className={`vibe-tui-window tui-theme-${activeTheme}`}
    >
      {/* ─── TERMINAL TITLEBAR ────────────────────────────────────── */}
      <div className="vibe-tui-titlebar">
        <div className="tui-dots">
          <span className="dot dot-close" />
          <span className="dot dot-minimize" />
          <span className="dot dot-maximize" />
        </div>

        <div className="tui-title-text min-w-0 truncate">
          <span className="tui-title-user">veronica@arch</span>
          <span className="tui-title-sep">:</span>
          <span className="tui-title-path">~/Music</span>
          <span className="tui-title-dot">·</span>
          <span className="tui-title-brand">vibe-fi v1.1.2</span>
        </div>

        <div className="tui-title-status shrink-0">
          <span className={`tui-status-badge ${isPlaying ? "active" : ""}`}>
            <span className="tui-status-led" />
            {isPlaying ? "STREAMING" : "IDLE"}
          </span>
        </div>
      </div>

      {/* ─── TERMINAL TUI BODY ────────────────────────────────────── */}
      <div className="vibe-tui-body">
        {/* TOP INTERACTIVE CONTROLS BAR */}
        <div className="tui-controls-bar">
          <button
            type="button"
            onClick={togglePlay}
            className={`tui-action-chip shrink-0 ${isPlaying ? "chip-active" : ""}`}
            title="Play / Pause (Space)"
          >
            {isPlaying ? "⏸ PAUSE" : "▶ PLAY"}
          </button>

          <button
            type="button"
            onClick={cycleVisualizer}
            className="tui-action-chip shrink-0"
            title="Cycle Visualizer (V)"
          >
            <span className="chip-label hidden sm:inline">VISUALIZER:</span>{" "}
            <span className="sm:hidden text-text-muted text-[0.7rem] font-bold">VIS:</span>{" "}
            <strong>{visMode.toUpperCase()}</strong>
          </button>

          <button
            type="button"
            onClick={cycleTheme}
            className="tui-action-chip shrink-0"
            title="Cycle Palette (T)"
          >
            <span className="chip-label hidden sm:inline">THEME:</span>{" "}
            <span className="sm:hidden text-text-muted text-[0.7rem] font-bold">THEME:</span>{" "}
            <strong>{THEMES.find((t) => t.id === activeTheme)?.name}</strong>
          </button>

          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className={`tui-action-chip shrink-0 ${isMuted ? "chip-muted" : ""}`}
            title="Mute / Unmute (M)"
          >
            {isMuted ? "🔇 MUTED" : `🔊 ${volume}%`}
          </button>
        </div>

        {/* ─── PANE 1: VISUALIZER (MATCHING SHOWCASE.PNG) ─────────── */}
        <div className="tui-pane tui-pane-vis">
          <div className="tui-pane-header">
            <span className="tui-pane-title truncate mr-2">
              <span className="hidden sm:inline">VISUALIZER: </span>
              <span className="sm:hidden">VIS: </span>
              {visMode === "flame" ? "NEON FLAME" : visMode === "cava" ? "CAVA WAVE" : "STEREO BARS"}
              <span className="tui-note-symbols hidden md:inline ml-2">[♫ {isPlaying ? "● ● ○ ○" : "○ ○ ○ ○"}]</span>
            </span>
            <span className="tui-pane-peak shrink-0">[{peakLevel}% PEAK]</span>
          </div>

          <div className="tui-canvas-wrapper">
            <canvas ref={canvasRef} className="tui-canvas" />
          </div>
        </div>

        {/* ─── PANE 2: LYRICS (CENTERED MATCHING SHOWCASE.PNG) ────── */}
        <div className="tui-pane tui-pane-lyrics">
          <div className="tui-pane-header">
            <span className="tui-pane-title truncate mr-2">
              LYRICS <span className="hidden xs:inline text-text-dim text-[0.7rem] font-normal">(lrclib.net)</span>
            </span>
            <span className="tui-lyrics-time shrink-0">
              {formatTime(currentSecond)} / {formatTime(TOTAL_DURATION)}
            </span>
          </div>

          <div className="tui-lyrics-center-box">
            {SAMPLE_LYRICS.map((line, idx) => {
              const diff = idx - activeLyricIndex;
              if (Math.abs(diff) > 2) return null;

              const isCurrent = diff === 0;
              const isNear = Math.abs(diff) === 1;

              return (
                <div
                  key={idx}
                  className={`tui-lyric-row ${
                    isCurrent ? "lyric-current" : isNear ? "lyric-near" : "lyric-far"
                  }`}
                >
                  {isCurrent ? (
                    <span className="lyric-focus-wrapper">
                      <span className="lyric-arrow-left">&gt; </span>
                      <span className="lyric-focus-text">{line.text}</span>
                      <span className="lyric-arrow-right"> &lt;</span>
                    </span>
                  ) : (
                    line.text
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── PANE 3: NOW PLAYING (MATCHING SHOWCASE.PNG) ────────── */}
        <div className="tui-pane tui-pane-track">
          <div className="tui-pane-header">
            <span className="tui-pane-title">NOW PLAYING</span>
          </div>

          <div className="tui-track-content">
            <div className="tui-song-title truncate">
              Midnight Coffee — Chill Lo-Fi Beat
            </div>

            {/* ASCII / Unicode Progress Bar */}
            <div className="tui-progress-row">
              <span className="tui-progress-ascii">{progressBarString}</span>
            </div>

            {/* Time & Audio Info Row */}
            <div className="tui-track-meta-row">
              <span className="meta-time">
                {formatTime(currentSecond)} / {formatTime(TOTAL_DURATION)}
              </span>
              <span className="meta-format">
                YouTube Audio · opus 320kbps · libmpv DSP · RAM: 28.4 MB
              </span>
              <span className="meta-volume">
                Vol: {isMuted ? "0%" : `${volume}%`}
              </span>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM HOTKEY CHEATSHEET STRIP ─────────────────────── */}
        <div className="tui-bottom-hotkeys overflow-x-auto scrollbar-none flex-nowrap sm:flex-wrap">
          <div className="hotkey-pill shrink-0">
            <kbd>[SPACE]</kbd> <span>{isPlaying ? "Pause" : "Play"}</span>
          </div>
          <div className="hotkey-pill shrink-0">
            <kbd>[V]</kbd> <span>Visualizer</span>
          </div>
          <div className="hotkey-pill shrink-0">
            <kbd>[T]</kbd> <span>Theme</span>
          </div>
          <div className="hotkey-pill shrink-0">
            <kbd>[S]</kbd> <span>Search</span>
          </div>
          <div className="hotkey-pill shrink-0">
            <kbd>[L]</kbd> <span>Library</span>
          </div>
          <div className="hotkey-pill shrink-0">
            <kbd>[P]</kbd> <span>Playlist</span>
          </div>
          <div className="hotkey-pill shrink-0">
            <kbd>[R]</kbd> <span>Replay</span>
          </div>
          <div className="hotkey-pill shrink-0">
            <kbd>[Q]</kbd> <span>Quit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
