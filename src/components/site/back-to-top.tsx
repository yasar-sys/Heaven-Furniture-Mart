import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

/**
 * Back-to-top control.
 *
 * Some Android browsers / WebViews don't fire `scroll` on `window` or report
 * scroll position only on `document.documentElement` / `document.body`. We
 * attach listeners to all three and read the max so it always works, and we
 * also show a thin scroll-progress ring around the button for a premium feel.
 */
export function BackToTop() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const t = useT();

  const measure = useCallback(() => {
    // Read from every possible source — Android Chrome, WebView, iOS Safari
    // all differ in which element actually scrolls.
    const sy =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement?.scrollTop ||
      document.body?.scrollTop ||
      0;

    const sh =
      document.documentElement?.scrollHeight ||
      document.body?.scrollHeight ||
      0;
    const vh =
      window.innerHeight ||
      document.documentElement?.clientHeight ||
      document.body?.clientHeight ||
      0;

    const max = Math.max(sh - vh, 1);
    const pct = Math.min(Math.max(sy / max, 0), 1);
    setProgress(pct);
    setShow(sy > 500);
  }, []);

  useEffect(() => {
    measure();
    // Attach to window, document, and body to cover every Android/iOS variant.
    const opts = { passive: true } as AddEventListenerOptions;
    window.addEventListener("scroll", measure, opts);
    window.addEventListener("resize", measure, opts);
    window.addEventListener("orientationchange", measure, opts);
    document.addEventListener("scroll", measure, opts);
    const body = document.body;
    body?.addEventListener("scroll", measure, opts);
    // Recompute after images/fonts load (layout shifts change scrollHeight).
    const t1 = window.setTimeout(measure, 600);
    const t2 = window.setTimeout(measure, 1800);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
      document.removeEventListener("scroll", measure);
      body?.removeEventListener("scroll", measure);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [measure]);

  const scrollToTop = useCallback(() => {
    // Some Android browsers ignore smooth scrollTo on window; try element too.
    const behavior: ScrollBehavior = "smooth";
    try {
      window.scrollTo({ top: 0, behavior });
    } catch {
      window.scrollTo(0, 0);
    }
    if (document.documentElement?.scrollTop) document.documentElement.scrollTo({ top: 0, behavior });
  }, []);

  // SVG progress ring geometry
  const R = 20;
  const C = 2 * Math.PI * R;
  const dash = C * progress;

  return (
    <button
      type="button"
      data-cursor="grow"
      aria-label={t("Back to top")}
      onClick={scrollToTop}
      className={cn(
        "fixed left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-brass/50 bg-ink/80 text-brass backdrop-blur-md transition-all duration-500 ease-[var(--ease-luxe)] hover:scale-105 hover:border-brass hover:bg-ink/90 active:scale-95",
        // Sit above the mobile CTA bar on phones; lower on desktop.
        "bottom-24 sm:bottom-8 sm:left-8",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      {/* Scroll-progress ring */}
      <svg
        className="absolute inset-0 -rotate-90"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        aria-hidden
      >
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="color-mix(in oklab, var(--brass) 25%, transparent)"
          strokeWidth="1.5"
        />
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="var(--brass)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${C}`}
        />
      </svg>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="relative">
        <path
          d="M8 13V3M8 3L3.5 7.5M8 3l4.5 4.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
