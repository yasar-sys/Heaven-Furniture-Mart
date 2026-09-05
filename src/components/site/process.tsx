import { useState } from "react";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { InteractiveImage } from "./interactive-image";
import { Section, SectionHeading, Shell } from "./ui-kit";

import shareImg from "@/assets/process/step-share.jpg";
import designImg from "@/assets/process/step-design.jpg";
import craftImg from "@/assets/process/step-craft.jpg";
import deliverImg from "@/assets/process/step-deliver.jpg";

const STEPS = [
  {
    n: "01",
    t: "You share",
    d: "Your space, needs and vision.",
    img: shareImg,
    alt: "A designer sketching a room layout beside fabric swatches",
  },
  {
    n: "02",
    t: "We design",
    d: "Ideas become a considered design.",
    img: designImg,
    alt: "Furniture elevations being drafted with a scale ruler",
  },
  {
    n: "03",
    t: "We craft",
    d: "Skilled craftsmen bring it to life.",
    img: craftImg,
    alt: "A craftsman hand-finishing a solid wood frame in the workshop",
  },
  {
    n: "04",
    t: "We deliver",
    d: "Installed beautifully in your space.",
    img: deliverImg,
    alt: "A finished velvet sofa being placed in an elegant living room",
  },
];

export function Process() {
  const t = useT();
  const [active, setActive] = useState(0);

  return (
    <Section id="process" className="py-28 sm:py-36 lg:py-44" label="Our process">
      <Shell>
        <SectionHeading eyebrow={t("Our Process")} title={t("From conversation to installed.")} />

        <ol className="mt-20 grid gap-10 sm:mt-24 sm:grid-cols-2 sm:gap-x-px lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 120}
              as="li"
              className="group relative sm:pr-8"
              
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                aria-pressed={active === i}
                className="block w-full text-left"
              >
                <InteractiveImage
                  src={s.img}
                  alt={t(s.alt)}
                  width={1200}
                  height={900}
                  depth={14}
                  frameClassName={cn(
                    "aspect-4/3 w-full overflow-hidden rounded-sm border transition-colors duration-700",
                    active === i ? "border-brass/70" : "border-foreground/10",
                  )}
                  className="object-cover"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-0 bg-ink/25 transition-opacity duration-700",
                      active === i ? "opacity-0" : "opacity-100",
                    )}
                  />
                  <span className="absolute left-4 top-4 rounded-sm bg-ink/70 px-2.5 py-1 text-[0.6rem] tracking-[0.26em] text-brass backdrop-blur-sm">
                    {s.n}
                  </span>
                </InteractiveImage>

                <span
                  aria-hidden
                  className={cn(
                    "mt-7 block h-px bg-brass transition-all duration-[1200ms] ease-[var(--ease-luxe)]",
                    active === i ? "w-full" : "w-10",
                  )}
                />
                <h3 className="mt-6 font-serif text-3xl uppercase leading-none tracking-tight text-foreground">
                  {t(s.t)}
                </h3>
                <p className="mt-4 max-w-[24ch] text-sm leading-relaxed text-muted-foreground">
                  {t(s.d)}
                </p>
              </button>
            </Reveal>
          ))}
        </ol>
      </Shell>
    </Section>
  );
}
