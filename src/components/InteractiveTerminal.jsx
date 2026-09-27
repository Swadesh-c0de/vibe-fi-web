"use client";

import { useEffect, useRef, useState } from "react";

const SAMPLE_LYRICS = [
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

const THEMES = [
  { id: "auto", name: "Gruvbox (Match Site)" },
  { id: "midnight", name: "Midnight" },
  { id: "matrix", name: "Matrix" },
  { id: "nord", name: "Nord" },
  { id: "hyde", name: "HyDE" },
];

export default function InteractiveTerminal() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const synthIntervalRef = useRef(null);

  // Peak physics for authentic DSP equalizer
  const peaksRef = useRef([]);
  const peakDecayRef = useRef([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [visMode, setVisMode] = useState("flame"); // 'flame' (default like showcase.png), 'cava', 'stereo'
  const [activeTheme, setActiveTheme] = useState("auto"); // 'auto', 'midnight', 'matrix', 'nord', 'hyde'
  const [currentSecond, setCurrentSecond] = useState(0);
  const [volume, setVolume] = useState(85);
  const [isMuted, setIsMuted] = useState(false);
  const [peakLevel, setPeakLevel] = useState(78);

  const TOTAL_DURATION = 40; // 40 seconds loop

  // Initialize Web Audio Synth for interactive audio
  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
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

      const playChord = () => {
        if (!audioCtxRef.current || isMuted) return;
        const now = audioCtxRef.current.currentTime;
        const currentChord = chords[chordIndex % chords.length];
        chordIndex++;

        currentChord.forEach((freq) => {
          const osc = audioCtxRef.current.createOscillator();
          const gain = audioCtxRef.current.createGain();
          const filter = audioCtxRef.current.createBiquadFilter();

          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now);

          // Warm lowpass filter for lofi chill warmth
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
      synthIntervalRef.current = setInterval(playChord, 3000);
      setIsPlaying(true);
    } catch (err) {
      console.error("Audio error:", err);
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  const togglePlayRef = useRef(togglePlay);
  useEffect(() => {
    togglePlayRef.current = togglePlay;
  });

  // Progress timer for lyrics & seek bar
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentSecond((prev) => (prev + 1) % TOTAL_DURATION);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const cycleVisualizer = () => {
    setVisMode((prev) => {
      const modes = ["flame", "cava", "stereo"];
      const nextIdx = (modes.indexOf(prev) + 1) % modes.length;
      return modes[nextIdx];
    });
  };

  const cycleTheme = () => {
    setActiveTheme((prev) => {
      const nextIdx = (THEMES.findIndex((t) => t.id === prev) + 1) % THEMES.length;
      return THEMES[nextIdx].id;
    });
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;

      if (e.code === "Space") {
        e.preventDefault();
        togglePlayRef.current?.();
      } else if (e.key === "v" || e.key === "V") {
        e.preventDefault();
        cycleVisualizer();
      } else if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        cycleTheme();
      } else if (e.key === "m" || e.key === "M") {
        setIsMuted((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Canvas visualizer rendering loop with high DPI support & peak physics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width || 300;
      const height = rect.height || 130;

      if (width <= 0 || height <= 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const bufferLength = analyserRef.current ? analyserRef.current.frequencyBinCount : 32;
      const dataArray = new Uint8Array(bufferLength);

      if (analyserRef.current && isPlaying && !isMuted) {
        analyserRef.current.getByteFrequencyData(dataArray);
      } else {
        // Subtle ambient idle breathing curve when paused
        const t = Date.now() * 0.0025;
        for (let i = 0; i < bufferLength; i++) {
          dataArray[i] = Math.max(8, Math.sin(t + i * 0.22) * 22 + 18);
        }
      }

      // Compute dynamic peak with functional state update
      let maxVal = 0;
      for (let i = 0; i < bufferLength; i++) {
        if (dataArray[i] > maxVal) maxVal = dataArray[i];
      }
      const currentPeakPct = Math.round((maxVal / 255) * 100);
      setPeakLevel((prev) => {
        if (Math.abs(currentPeakPct - prev) > 4) {
          return currentPeakPct;
        }
        return prev;
      });

      // Detect current theme colors (computed from container CSS variables)
      const containerStyle = getComputedStyle(containerRef.current || document.documentElement);
      const colorBase = containerStyle.getPropertyValue("--term-bar-base").trim() || "#a9b665";
      const colorTop = containerStyle.getPropertyValue("--term-bar-top").trim() || "#ea6962";
      const colorCap = containerStyle.getPropertyValue("--term-bar-cap").trim() || "#e78a4e";
      const colorAccent = containerStyle.getPropertyValue("--term-accent").trim() || "#7daea3";

      if (visMode === "flame") {
        // ─── MODE 1: NEON FLAME (MATCHING SHOWCASE.PNG) ───────────
        // Responsive bar count with safe clamping
        const barWidth = width > 600 ? 10 : 7;
        const barGap = width > 600 ? 5 : 3;
        const totalBarSpace = barWidth + barGap;
        const availableWidth = Math.max(0, width - 20);
        const calculatedBars = Math.floor(availableWidth / totalBarSpace);
        const barCount = Math.max(1, Math.min(80, calculatedBars));
        const startX = Math.max(0, (width - barCount * totalBarSpace) / 2);

        if (peaksRef.current.length !== barCount) {
          peaksRef.current = new Array(barCount).fill(0);
          peakDecayRef.current = new Array(barCount).fill(0);
        }

        for (let i = 0; i < barCount; i++) {
          const rawVal = dataArray[i % bufferLength] / 255.0;
          // Apply gentle equalizer curve shaping
          const shapedVal = Math.pow(rawVal, 1.1) * (height * 0.78);
          const barH = Math.max(4, shapedVal);
          const x = startX + i * totalBarSpace;
          const y = height - barH;

          // Split-bar styling: olive/sage base with salmon/orange peak zone
          const splitH = Math.min(barH, height * 0.45);
          const topH = Math.max(0, barH - splitH);

          // Base bar
          ctx.fillStyle = colorBase;
          ctx.fillRect(x, height - splitH, barWidth, splitH);

          // Top hot bar
          if (topH > 0) {
            ctx.fillStyle = colorTop;
            ctx.fillRect(x, y, barWidth, topH);
          }

          // Physics for floating peak caps (▲ or ⯁ from showcase.png)
          if (barH >= peaksRef.current[i]) {
            peaksRef.current[i] = barH;
            peakDecayRef.current[i] = 0;
          } else {
            peakDecayRef.current[i] += 0.12;
            peaksRef.current[i] = Math.max(4, peaksRef.current[i] - peakDecayRef.current[i]);
          }

          const peakY = height - peaksRef.current[i] - 6;

          // Draw peak marker (pair of subtle diamond caps like showcase.png)
          ctx.fillStyle = colorCap;
          ctx.fillRect(x + 1, Math.max(2, peakY), Math.max(2, (barWidth - 2) / 2), 2);
          ctx.fillRect(x + barWidth / 2 + 1, Math.max(2, peakY), Math.max(2, (barWidth - 2) / 2), 2);
        }
      } else if (visMode === "cava") {
        // ─── MODE 2: CAVA WAVE (FLUID SMOOTH FREQUENCY WAVE) ───────
        ctx.beginPath();
        const sliceWidth = width / (bufferLength - 1);
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 255.0;
          const y = height - v * (height * 0.75) - 6;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            const prevX = x - sliceWidth;
            const prevY = height - (dataArray[i - 1] / 255.0) * (height * 0.75) - 6;
            const midX = (prevX + x) / 2;
            ctx.quadraticCurveTo(prevX, prevY, midX, (prevY + y) / 2);
          }
          x += sliceWidth;
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, colorAccent);
        grad.addColorStop(1, "rgba(0, 0, 0, 0.0)");
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.strokeStyle = colorAccent;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      } else {
        // ─── MODE 3: STEREO BARS (DUAL CHANNEL L/R SPECTRUM) ───────
        const half = Math.floor(bufferLength / 2);
        const barW = Math.max(4, (width - 60) / (half * 2));

        // Center line
        ctx.strokeStyle = "rgba(128, 128, 128, 0.25)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.stroke();

        // Left Channel
        for (let i = 0; i < half; i++) {
          const val = (dataArray[i] / 255.0) * (height * 0.8);
          const x = width / 2 - (i + 1) * (barW + 2);
          ctx.fillStyle = colorBase;
          ctx.fillRect(x, height - val, barW, val);
        }

        // Right Channel
        for (let i = 0; i < half; i++) {
          const val = (dataArray[i] / 255.0) * (height * 0.8);
          const x = width / 2 + 2 + i * (barW + 2);
          ctx.fillStyle = colorTop;
          ctx.fillRect(x, height - val, barW, val);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isPlaying, visMode, activeTheme, isMuted, volume]);

  // Identify active lyric index
  const activeLyricIndex = SAMPLE_LYRICS.reduce((acc, lyric, idx) => {
    if (currentSecond >= lyric.time) return idx;
    return acc;
  }, 0);

  // Compute text-based ASCII Progress Bar like showcase.png: [=========>---------]
  const progressRatio = currentSecond / TOTAL_DURATION;
  const BAR_LENGTH = 38;
  const filledChars = Math.round(progressRatio * BAR_LENGTH);
  const progressBarString =
    "[" +
    "=".repeat(Math.max(0, filledChars - 1)) +
    (filledChars > 0 ? ">" : "") +
    "-".repeat(Math.max(0, BAR_LENGTH - filledChars)) +
    "]";

  // Formatted timestamps
  const formatTime = (secs) => {
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

        <div className="tui-title-text">
          <span className="tui-title-user">veronica@arch</span>
          <span className="tui-title-sep">:</span>
          <span className="tui-title-path">~/Music</span>
          <span className="tui-title-dot">·</span>
          <span className="tui-title-brand">vibe-fi v1.1.2</span>
        </div>

        <div className="tui-title-status">
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
            onClick={togglePlay}
            className={`tui-action-chip ${isPlaying ? "chip-active" : ""}`}
            title="Play / Pause (Space)"
          >
            {isPlaying ? "⏸ PAUSE" : "▶ PLAY DEMO"}
          </button>

          <button
            onClick={cycleVisualizer}
            className="tui-action-chip"
            title="Cycle Visualizer (V)"
          >
            <span className="chip-label">VISUALIZER:</span>{" "}
            <strong>{visMode.toUpperCase()}</strong>
          </button>

          <button
            onClick={cycleTheme}
            className="tui-action-chip"
            title="Cycle Palette (T)"
          >
            <span className="chip-label">THEME:</span>{" "}
            <strong>{THEMES.find((t) => t.id === activeTheme)?.name}</strong>
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`tui-action-chip ${isMuted ? "chip-muted" : ""}`}
            title="Mute / Unmute (M)"
          >
            {isMuted ? "🔇 MUTED" : `🔊 VOL: ${volume}%`}
          </button>
        </div>

        {/* ─── PANE 1: VISUALIZER (MATCHING SHOWCASE.PNG) ─────────── */}
        <div className="tui-pane tui-pane-vis">
          <div className="tui-pane-header">
            <span className="tui-pane-title">
              VISUALIZER: {visMode === "flame" ? "NEON FLAME" : visMode === "cava" ? "CAVA WAVE" : "STEREO BARS"}{" "}
              <span className="tui-note-symbols">[♫ {isPlaying ? "● ● ○ ○" : "○ ○ ○ ○"}]</span>
            </span>
            <span className="tui-pane-peak">[{peakLevel}% PEAK]</span>
          </div>

          <div className="tui-canvas-wrapper">
            <canvas ref={canvasRef} className="tui-canvas" />
          </div>
        </div>

        {/* ─── PANE 2: LYRICS (CENTERED MATCHING SHOWCASE.PNG) ────── */}
        <div className="tui-pane tui-pane-lyrics">
          <div className="tui-pane-header">
            <span className="tui-pane-title">LYRICS (lrclib.net)</span>
            <span className="tui-lyrics-time">
              {formatTime(currentSecond)} / {formatTime(TOTAL_DURATION)}
            </span>
          </div>

          <div className="tui-lyrics-center-box">
            {SAMPLE_LYRICS.map((line, idx) => {
              const diff = idx - activeLyricIndex;
              // Only render nearby lines for a focused 5-line window
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
                      {line.text}
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
            <div className="tui-song-title">
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
        <div className="tui-bottom-hotkeys">
          <div className="hotkey-pill">
            <kbd>[SPACE]</kbd> <span>{isPlaying ? "Pause" : "Play"}</span>
          </div>
          <div className="hotkey-pill">
            <kbd>[V]</kbd> <span>Visualizer</span>
          </div>
          <div className="hotkey-pill">
            <kbd>[T]</kbd> <span>Theme</span>
          </div>
          <div className="hotkey-pill">
            <kbd>[S]</kbd> <span>Search</span>
          </div>
          <div className="hotkey-pill">
            <kbd>[L]</kbd> <span>Library</span>
          </div>
          <div className="hotkey-pill">
            <kbd>[P]</kbd> <span>Playlist</span>
          </div>
          <div className="hotkey-pill">
            <kbd>[R]</kbd> <span>Replay</span>
          </div>
          <div className="hotkey-pill">
            <kbd>[Q]</kbd> <span>Quit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
