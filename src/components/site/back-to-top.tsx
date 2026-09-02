import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

export function BackToTop() {
  const [show, setShow] = useState(false);
  const t = useT();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      data-cursor="grow"
      aria-label={t("Back to top")}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-24 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-brass/50 bg-ink/70 text-brass backdrop-blur-md transition-all duration-500 ease-[var(--ease-luxe)] hover:scale-105 hover:border-brass hover:bg-ink/90 sm:bottom-8 sm:right-8",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M8 13V3M8 3L3.5 7.5M8 3l4.5 4.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
