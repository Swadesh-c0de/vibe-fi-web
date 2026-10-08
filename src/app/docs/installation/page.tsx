import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import DocCodeBlock from "@/components/DocCodeBlock";

export const metadata: Metadata = {
  title: "Installation",
  description: "Complete installation guide for Vibe-Fi on Arch Linux, macOS, Ubuntu, Debian, Fedora, and building from source.",
};

export default function InstallationDocsPage(): React.JSX.Element {
  return (
    <div>
      <div className="docs-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/docs">Docs</Link>
        <span>/</span>
        <span className="current">Installation</span>
      </div>

      <h1 className="docs-page-title">Installation Guide</h1>
      <p className="docs-lead-text">
        Vibe-Fi runs smoothly on Linux and macOS. Choose the installation method that fits your setup best.
      </p>

      <hr className="docs-divider" />

      {/* Method 1: Automated Script */}
      <h2>1. Quick Install (Recommended)</h2>
      <p>
        The universal install script automatically detects your platform (Linux or macOS, x86_64 or ARM64), downloads the pre-built release binary, and configures it in one command:
      </p>

      <DocCodeBlock
        title="bash"
        code="curl -fsSL https://raw.githubusercontent.com/Swadesh-c0de/vibe-fi-go/main/install.sh | bash"
      />

      <div className="docs-callout callout-note">
        <div className="callout-icon">ℹ️</div>
        <div className="callout-body">
          Installs into your user folder (<code>~/.local/bin/vibe</code>). Ensure <code>~/.local/bin</code> is in your <code>$PATH</code>.
        </div>
      </div>

      {/* Method 2: System-Wide */}
      <h2>2. System-Wide Installation</h2>
      <p>
        To install Vibe-Fi for all users on your system into <code>/usr/local/bin</code>, pass the <code>--global</code> flag:
      </p>

      <DocCodeBlock
        title="bash (root / global)"
        code="curl -fsSL https://raw.githubusercontent.com/Swadesh-c0de/vibe-fi-go/main/install.sh | bash -s -- --global"
      />

      {/* Method 3: Prerequisites */}
      <h2>3. Prerequisites (Audio Engine)</h2>
      <p>
        Vibe-Fi links against <code>libmpv</code> for hardware-accelerated, high-fidelity audio streaming. The installer script attempts to resolve this automatically, or you can install it using your system package manager:
      </p>

      <h3>Arch Linux &amp; EndeavourOS:</h3>
      <DocCodeBlock title="pacman" code="sudo pacman -S mpv" />

      <h3>macOS (Homebrew):</h3>
      <DocCodeBlock title="brew" code="brew install mpv" />

      <h3>Ubuntu &amp; Debian:</h3>
      <DocCodeBlock title="apt" code="sudo apt update && sudo apt install -y libmpv2" />

      <h3>Fedora:</h3>
      <DocCodeBlock title="dnf" code="sudo dnf install -y mpv-libs" />

      {/* Method 4: Building from Source */}
      <h2>4. Building from Source</h2>
      <p>
        If you prefer building from source with Go (1.20+) and Make:
      </p>

      <DocCodeBlock
        title="bash"
        code={`git clone https://github.com/Swadesh-c0de/vibe-fi-go.git
cd vibe-fi-go
make install`}
      />

      {/* Verifying & Bottle Status */}
      <h2>5. Check Your Installation</h2>
      <p>
        Confirm that Vibe-Fi is ready to go:
      </p>

      <DocCodeBlock
        title="terminal"
        code={`# Check the installed version
vibe --version

# Check installed helpers and audio tools
vibe --bottle

# Fast launch (skips update check)
vibe --no-update`}
      />

      {/* Clean Uninstallation */}
      <h2>6. How to Uninstall</h2>
      <p>
        Vibe-Fi can be completely removed at any time with a single command:
      </p>

      <DocCodeBlock
        title="terminal"
        code="vibe --uninstall"
      />

      <p>
        This cleanly removes the binary, cached lyrics, and helper tools without leaving unwanted files behind.
      </p>
    </div>
  );
}
