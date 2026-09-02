import { useState } from "react";
import { cn } from "@/lib/utils";
import wood from "@/assets/material-wood.jpg";
import fabric from "@/assets/material-fabric.jpg";
import finish from "@/assets/material-finish.jpg";
import { Reveal } from "./reveal";
import { Section, Shell } from "./ui-kit";

const MATERIALS = [
  {
    tab: "Wood",
    name: "Natural Wood",
    line: "Warm grain. Honest character.",
    img: wood,
    alt: "Macro close-up of walnut wood grain",
  },
  {
    tab: "Fabric",
    name: "Velvet",
    line: "Soft texture. Deep comfort.",
    img: fabric,
    alt: "Macro close-up of deep teal velvet upholstery",
  },
  {
    tab: "Finish",
    name: "Matte Finish",
    line: "Quiet sophistication.",
    img: finish,
    alt: "Macro close-up of a matte ivory furniture edge with brushed brass detail",
  },
];

export function Materials() {
  const [active, setActive] = useState(0);
  const current = MATERIALS[active]!;

  return (
    <Section id="materials" tone="ink" className="py-24 sm:py-32 lg:py-40" label="Materials">
      <Shell>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 lg:pt-6">
            <Reveal className="mb-6 flex items-center gap-4">
              <span className="eyebrow text-brass">Materials</span>
              <span className="h-px flex-1 bg-ivory/15" />
            </Reveal>
            <Reveal as="h2" delay={60} className="display-lg text-ivory">
              Touch the detail.
            </Reveal>

            <div
              role="tablist"
              aria-label="Material categories"
              className="mt-10 flex gap-7 border-b border-ivory/12"
            >
              {MATERIALS.map((m, i) => (
                <button
                  key={m.tab}
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  className={cn(
                    "-mb-px border-b py-4 text-[0.68rem] uppercase tracking-[0.22em] transition-colors duration-500",
                    active === i
                      ? "border-brass text-ivory"
                      : "border-transparent text-ivory/45 hover:text-ivory/80",
                  )}
                >
                  {m.tab}
                </button>
              ))}
            </div>

            <div className="mt-10 min-h-28">
              <h3 key={current.name} className="hero-rise font-serif text-4xl text-ivory">
                {current.name}
              </h3>
              <p key={current.line} className="hero-rise mt-3 text-sm text-ivory/60">
                {current.line}
              </p>
            </div>

            <p className="mt-12 font-serif text-2xl italic text-brass">Every detail matters.</p>
          </div>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="relative aspect-square w-full overflow-hidden rounded-sm sm:aspect-4/3 lg:aspect-square">
              {MATERIALS.map((m, i) => (
                <img
                  key={m.tab}
                  src={m.img}
                  alt={m.alt}
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={1200}
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-1000 ease-[var(--ease-luxe)]",
                    active === i ? "scale-100 opacity-100" : "scale-[1.06] opacity-0",
                  )}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </Shell>
    </Section>
  );
}
