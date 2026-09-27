import Link from "next/link";

export const metadata = {
  title: "Installation Guide - Vibe-Fi Documentation",
  description: "Complete installation guide for Vibe-Fi on Arch Linux, macOS, Ubuntu, Debian, Fedora, and building from source.",
};

export default function InstallationDocsPage() {
  return (
    <div>
      <div className="docs-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/docs">Docs</Link>
        <span>/</span>
        <span className="current">Installation</span>
      </div>

      <h1 className="docs-page-title">Installing Vibe-Fi</h1>
      <p className="docs-lead-text">
        Vibe-Fi is engineered to run seamlessly on Linux and macOS with minimal dependencies.
        Choose the installation method suited to your environment.
      </p>

      <hr className="docs-divider" />

      {/* Method 1: Automated Script */}
      <h2>1. Automated Script (Recommended)</h2>
      <p>
        The automated script auto-detects your operating system and package manager, installs missing system libraries,
        compiles Vibe-Fi, and places the binary in your <code>PATH</code>:
      </p>

      <div className="docs-code-block">
        <pre><code>{'bash -c "$(curl -fsSL https://raw.githubusercontent.com/Swadesh-c0de/vibe-fi/main/install.sh)"'}</code></pre>
      </div>

      <div className="docs-callout callout-note">
        <div className="callout-icon">ℹ️</div>
        <div className="callout-body">
          The installer creates an isolated bottle at <code>~/.vibe-fi/bottle/</code> for standalone helpers (such as <code>yt-dlp</code>) so your global system remains unmodified.
        </div>
      </div>

      {/* Method 2: Arch Linux */}
      <h2>2. Arch Linux & EndeavourOS</h2>
      <p>
        On Arch Linux and derivatives, install via the repository script or manual build:
      </p>

      <div className="docs-code-block">
        <pre><code># Clone and run the installer
git clone https://github.com/Swadesh-c0de/vibe-fi.git
cd vibe-fi
chmod +x install.sh
./install.sh</code></pre>
      </div>

      {/* Method 3: macOS */}
      <h2>3. macOS (Apple Silicon & Intel)</h2>
      <p>
        Make sure you have <a href="https://brew.sh" target="_blank" rel="noopener noreferrer">Homebrew</a> installed.
        Vibe-Fi utilizes <code>mpv</code> and <code>yt-dlp</code>:
      </p>

      <div className="docs-code-block">
        <pre><code># 1. Install prerequisites via Homebrew
brew install mpv yt-dlp cmake pkg-config

# 2. Clone and install vibe-fi
git clone https://github.com/Swadesh-c0de/vibe-fi.git
cd vibe-fi
chmod +x install.sh
./install.sh</code></pre>
      </div>

      {/* Method 4: Ubuntu / Debian / Fedora */}
      <h2>4. Ubuntu, Debian & Fedora</h2>
      <p>Install the required build dependencies before compiling:</p>

      <h3>Ubuntu / Debian:</h3>
      <div className="docs-code-block">
        <pre><code>sudo apt update
sudo apt install -y build-essential cmake pkg-config libmpv-dev libncurses-dev curl
git clone https://github.com/Swadesh-c0de/vibe-fi.git
cd vibe-fi
./install.sh</code></pre>
      </div>

      <h3>Fedora:</h3>
      <div className="docs-code-block">
        <pre><code>sudo dnf install -y gcc-c++ cmake pkgconf-pkg-config mpv-devel ncurses-devel curl
git clone https://github.com/Swadesh-c0de/vibe-fi.git
cd vibe-fi
./install.sh</code></pre>
      </div>

      {/* Method 5: Building from Source */}
      <h2>5. Building from Source with CMake</h2>
      <p>
        For power users who prefer standard CMake build pipelines:
      </p>

      <div className="docs-code-block">
        <pre><code>git clone https://github.com/Swadesh-c0de/vibe-fi.git
cd vibe-fi

# Configure with CMake (C++17)
cmake -B build -DCMAKE_BUILD_TYPE=Release

# Compile using all available CPU threads
cmake --build build -j$(nproc 2&gt;/dev/null || sysctl -n hw.ncpu)

# Install binary to /usr/local/bin
sudo cmake --install build</code></pre>
      </div>

      {/* Verifying & Bottle Status */}
      <h2>6. Verifying the Installation</h2>
      <p>
        Confirm that Vibe-Fi and its bottle dependencies are correctly configured:
      </p>

      <div className="docs-code-block">
        <pre><code># Check version
vibe --version

# Inspect isolated bottle dependencies
vibe --bottle</code></pre>
      </div>

      {/* Clean Uninstallation */}
      <h2>7. Clean Uninstallation</h2>
      <p>
        Unlike many terminal players that scatter config and cache files everywhere, Vibe-Fi includes a clean uninstaller:
      </p>

      <div className="docs-code-block">
        <pre><code>vibe --uninstall
# Or run ./uninstall.sh from the repository</code></pre>
      </div>

      <p>
        This cleanly removes the binary, the bottle directory (<code>~/.vibe-fi/bottle/</code>), and cached lyrics without leaving orphaned files.
      </p>
    </div>
  );
}
