import Link from "next/link";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound(): React.JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 flex items-center justify-center py-20 px-4">
                <div className="max-w-[480px] w-full bg-surface border border-subtle rounded-[6px] p-6 sm:p-8 text-center shadow-xs animate-onload">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded bg-code-bg border border-code-border font-mono text-xs text-red">
                        <span>zsh: command not found: 404</span>
                    </div>
                    <h1 className="font-brand text-2xl sm:text-3xl font-extrabold text-text-primary mb-2">
                        Page Not Found
                    </h1>
                    <p className="text-sm sm:text-base text-text-secondary mb-6 leading-relaxed">
                        The route you requested doesn&apos;t exist in Vibe-Fi.
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <Link href="/" className="btn btn-primary text-sm px-5 py-2.5">
                            ← Back to Home
                        </Link>
                        <Link href="/docs" className="btn btn-secondary text-sm px-5 py-2.5">
                            Read Docs
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}