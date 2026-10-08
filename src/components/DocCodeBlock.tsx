"use client";

import React, { useState } from "react";

interface DocCodeBlockProps {
  code: string;
  title?: string;
  lang?: string;
}

export default function DocCodeBlock({
  code,
  title,
  lang,
}: DocCodeBlockProps): React.JSX.Element {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (): Promise<void> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = code;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore copy failures
    }
  };

  return (
    <div className="doc-code-card relative group my-6 sm:my-8 rounded-lg overflow-hidden border border-strong bg-code-bg shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-surface border-b border-strong/50 text-xs font-mono">
        <div className="flex items-center gap-2 text-text-muted">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-sage/40" />
          <span className="font-medium text-text-secondary">
            {title || (lang ? `${lang}` : "terminal")}
          </span>
        </div>

          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[0.76rem] font-mono transition-all cursor-pointer ${
              copied
                ? "bg-sage/20 text-sage border border-sage/50"
                : "text-text-muted hover:text-text-primary hover:bg-surface-elevated border border-transparent"
            }`}
            title="Copy command to clipboard"
            aria-label={copied ? "Copied" : "Copy to clipboard"}
          >
            {copied ? (
              <>
                <svg
                  className="w-3.5 h-3.5 text-sage"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold text-sage">Copied</span>
              </>
            ) : (
              <>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                  />
                </svg>
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>

      <div className="doc-code-content overflow-x-auto px-4 sm:px-5 pt-3.5 pb-3.5 sm:pt-4 sm:pb-4 text-[0.88rem] sm:text-[0.93rem] font-mono leading-relaxed text-text-primary">
        <pre className="m-0 font-mono inline-block min-w-full pr-4 sm:pr-5 pb-1">
          <code className="font-mono">{code}</code>
        </pre>
      </div>
    </div>
  );
}
