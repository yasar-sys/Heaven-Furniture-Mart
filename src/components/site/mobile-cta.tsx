import { useT } from "@/lib/i18n";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useConsultation } from "./consultation-context";

export function MobileCta() {
  const [show, setShow] = useState(false);
  const { openConsultation, open } = useConsultation();
  const t = useT();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-ivory/10 bg-ink/90 p-3 backdrop-blur-xl transition-transform duration-700 ease-[var(--ease-luxe)] sm:hidden",
        show && !open ? "translate-y-0" : "translate-y-full",
      )}
    >
      <button
        type="button"
        onClick={() => openConsultation()}
        className="w-full rounded-sm border border-brass/60 bg-brass/15 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] text-ivory active:scale-[0.99]"
      >
        {t("Request consultation")}
      </button>
    </div>
  );
}
