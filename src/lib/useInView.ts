"use client";

import { useEffect, useRef, useState } from "react";

export interface UseInViewOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Lightweight IntersectionObserver hook for hardware-accelerated scroll reveal.
 * Disconnects observer once the element enters viewport to minimize CPU overhead.
 * Safe for mobile devices, momentum scrolling, and fast swipe flings.
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  options: UseInViewOptions = {}
): {
  ref: React.RefObject<T | null>;
  isInView: boolean;
} {
  const { threshold = 0, rootMargin = "250px 0px 150px 0px", triggerOnce = true } = options;
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState<boolean>(() => {
    // If running in an environment without IntersectionObserver, or on small mobile screens, default to visible
    if (typeof window === "undefined") return false;
    return typeof IntersectionObserver === "undefined" || window.innerWidth <= 768;
  });

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || (window.innerWidth <= 768 && isInView)) {
      return;
    }

    const element = ref.current;
    if (!element) return;

    let isSubscribed = true;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            setIsInView(true);
            if (triggerOnce) {
              observer.disconnect();
              break;
            }
          } else if (!triggerOnce) {
            setIsInView(false);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    // Initial check within next animation frame to prevent synchronous setState in effect
    const rafId = requestAnimationFrame(() => {
      if (!isSubscribed || !element) return;
      const rect = element.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= vh + 200 && rect.bottom >= -200) {
        setIsInView(true);
        if (triggerOnce) {
          observer.disconnect();
        }
      }
    });

    return () => {
      isSubscribed = false;
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, isInView]);

  return { ref, isInView };
}
