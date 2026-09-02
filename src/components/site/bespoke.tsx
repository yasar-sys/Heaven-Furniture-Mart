import { useCallback, useEffect, useRef, useState } from "react";
import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";
import { Reveal } from "./reveal";
import { Section, Shell } from "./ui-kit";

export function Bespoke() {
  const [pos, setPos] = useState(48);
  const dragging = useRef(false);
  const frame = useRef<HTMLDivElement | null>(null);

  const setFromClientX = useCallback((clientX: number) => {
    const el = frame.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const next = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(98, Math.max(2, next)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      setFromClientX(e.clientX);
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [setFromClientX]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(2, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(98, p + 4));
  };

  return (
    <Section id="bespoke" tone="muted" className="py-24 sm:py-32 lg:py-40" label="Bespoke">
      <Shell>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal className="mb-6 flex items-center gap-4">
              <span className="eyebrow text-brass">Bespoke</span>
              <span className="h-px flex-1 bg-foreground/12" />
            </Reveal>
            <Reveal as="h2" delay={60} className="display-lg">
              Not made for everyone.
              <br />
              <span className="italic text-brown">Made for you.</span>
            </Reveal>
          </div>
          <Reveal delay={140} className="lg:col-span-5">
            <p className="text-[0.95rem] leading-[1.85] text-muted-foreground">
              Your room has its own dimensions. Your lifestyle has its own needs. Your taste is your
              own. That's why we build around you.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-14 sm:mt-20">
          <div className="mb-4 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
            <span>Standard space</span>
            <span className="text-brass">→</span>
            <span className="text-foreground">Bespoke solution</span>
          </div>

          <div
            ref={frame}
            className="relative aspect-4/3 w-full touch-none select-none overflow-hidden rounded-sm bg-ink sm:aspect-16/10"
            onPointerDown={(e) => {
              dragging.current = true;
              setFromClientX(e.clientX);
            }}
          >
            <img
              src={afterImg}
              alt="The same room fitted with bespoke furniture: sectional sofa, walnut wall unit and custom joinery"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <img
              src={beforeImg}
              alt="The same room before, empty and unfurnished"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            />
            <span
              className="absolute left-4 top-4 rounded-sm bg-ink/70 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.22em] text-ivory backdrop-blur-sm transition-opacity duration-300 sm:left-6 sm:top-6"
              style={{ opacity: pos > 14 ? 1 : 0 }}
            >
              Before
            </span>
            <span className="absolute right-4 top-4 rounded-sm bg-ink/70 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.22em] text-brass backdrop-blur-sm sm:right-6 sm:top-6">
              After
            </span>

            <div
              className="absolute inset-y-0 z-10 w-px bg-ivory/85"
              style={{ left: `${pos}%` }}
              aria-hidden
            />
            <button
              type="button"
              role="slider"
              aria-label="Drag to compare the standard space with the bespoke solution"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              onKeyDown={onKey}
              onPointerDown={() => {
                dragging.current = true;
              }}
              className="absolute top-1/2 z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-ivory/70 bg-ink/60 text-ivory backdrop-blur-md transition-transform duration-300 hover:scale-105"
              style={{ left: `${pos}%` }}
            >
              <span aria-hidden className="text-xs tracking-[0.1em]">
                ‹ ›
              </span>
            </button>
          </div>

          <p className="mt-4 text-center text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
            Drag to see the difference
          </p>
        </Reveal>
      </Shell>
    </Section>
  );
}
