import { useT } from "@/lib/i18n";

const KEYWORDS = [
  "Bespoke Furniture",
  "Solid Timber",
  "Handcrafted",
  "Made to Order",
  "Designed in Chattogram",
  "Delivered Nationwide",
];

export function Marquee() {
  const t = useT();
  const items = [...KEYWORDS, ...KEYWORDS];

  return (
    <div
      aria-hidden
      className="relative flex overflow-hidden border-y border-ivory/10 bg-ink py-5 select-none"
    >
      <div className="marquee-track flex shrink-0 items-center gap-8 pr-8">
        {items.map((kw, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="font-serif text-2xl italic tracking-wide text-ivory/80 sm:text-3xl">
              {t(kw)}
            </span>
            <span className="text-brass text-xl">•</span>
          </div>
        ))}
      </div>
      <div className="marquee-track flex shrink-0 items-center gap-8 pr-8" aria-hidden>
        {items.map((kw, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="font-serif text-2xl italic tracking-wide text-ivory/80 sm:text-3xl">
              {t(kw)}
            </span>
            <span className="text-brass text-xl">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
