import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Outfit, Bricolage_Grotesque } from "next/font/google";
import React from "react";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: true,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  preload: true,
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  preload: true,
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#141617",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vibe-fi.vercel.app"),
  title: {
    default: "vibe-fi — Terminal Music Player",
    template: "%s | vibe-fi",
  },
  description:
    "Fast, lightweight terminal music player built in Go with Bubble Tea. Stream YouTube audio, watch real-time visualizers, and read synchronized lyrics with ~60 MB of RAM.",
  keywords: [
    "vibe-fi",
    "terminal music player",
    "tui music player",
    "bubble tea go",
    "youtube music cli",
    "synchronized lyrics cli",
    "cli audio visualizer",
    "gruvbox material",
    "lightweight audio player",
    "linux music player",
    "macos cli music",
  ],
  authors: [{ name: "Swadesh-c0de", url: "https://github.com/Swadesh-c0de" }],
  creator: "Swadesh-c0de",
  publisher: "vibe-fi",
  openGraph: {
    title: "vibe-fi — Terminal Music Player",
    description:
      "Fast, lightweight terminal music player built in Go with Bubble Tea. Stream YouTube audio, watch real-time visualizers, and read synchronized lyrics with ~60 MB of RAM.",
    url: "https://vibe-fi.vercel.app",
    siteName: "vibe-fi",
    images: [
      {
        url: "/showcase.png",
        width: 1879,
        height: 1155,
        alt: "vibe-fi terminal music player showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "vibe-fi — Terminal Music Player",
    description:
      "Fast, lightweight terminal music player built in Go with Bubble Tea. Stream YouTube audio, watch real-time visualizers, and read synchronized lyrics with ~60 MB of RAM.",
    images: ["/showcase.png"],
    creator: "@Swadesh_c0de",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${jetbrainsMono.variable} ${outfit.variable} ${bricolage.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Inline Theme Initializer */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('vibefi_theme');
                  if (saved === 'light' || saved === 'dark') {
                    document.documentElement.setAttribute('data-theme', saved);
                  } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
