import { useInteractiveFrame } from "./interactive-image";
import { useT } from "@/lib/i18n";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { Section, Shell } from "./ui-kit";

import matCarvedTeak from "@/assets/materials/mat-carved-teak.jpg";
import matVelvet from "@/assets/materials/mat-velvet.jpg";
import matMarble from "@/assets/materials/mat-marble.jpg";
import matBrass from "@/assets/materials/mat-brass.jpg";

type Material = {
  tab: string;
  name: string;
  line: string;
  img: string;
  alt: string;
  props: { label: string; value: string }[];
};

const MATERIALS: Material[] = [
  {
    tab: "Carved Wood",
    name: "Hand-Carved Solid Teak",
    line: "Kiln-seasoned teak and mahogany, chiselled by hand and finished with antique gold leaf.",
    img: matCarvedTeak,
    alt: "Macro detail of hand-carved solid teak panel with antique gold leaf floral carving",
    props: [
      { label: "Origin", value: "Seasoned teak & mahogany" },
      { label: "Finish", value: "Antique gold leaf on matte oil" },
      { label: "Moisture", value: "Kiln-dried to 8–10%" },
      { label: "Lead time", value: "3–4 weeks" },
    ],
  },
  {
    tab: "Velvet",
    name: "Diamond-Tufted Velvet",
    line: "Dense pile velvet, hand-tufted over high-resilience foam with cast brass buttons.",
    img: matVelvet,
    alt: "Macro detail of royal navy diamond-tufted velvet upholstery with brass buttons",
    props: [
      { label: "Weight", value: "380 GSM dense pile" },
      { label: "Durability", value: "30,000+ rub tested" },
      { label: "Core", value: "32-density HR foam" },
      { label: "Palette", value: "24 house colours" },
    ],
  },
  {
    tab: "Marble & Lacquer",
    name: "Imported Marble & Lacquer",
    line: "Honed marble tops set into hand-buffed lacquer frames for a mirror-clean edge.",
    img: matMarble,
    alt: "Macro detail of polished white marble tabletop edge over a high-gloss lacquer wood frame",
    props: [
      { label: "Slab", value: "18 mm imported marble" },
      { label: "Edge", value: "Hand-eased bullnose" },
      { label: "Coating", value: "7-layer PU lacquer" },
      { label: "Care", value: "Sealed, stain resistant" },
    ],
  },
  {
    tab: "Brass Hardware",
    name: "Antique Brass Fittings",
    line: "Solid brass pulls and soft-close mechanisms rated for a decade of daily use.",
    img: matBrass,
    alt: "Macro detail of brushed antique brass drawer pull and soft-close hinge on dark walnut",
    props: [
      { label: "Material", value: "Solid cast brass" },
      { label: "Motion", value: "Soft-close, 50k cycles" },
      { label: "Finish", value: "Brushed, lacquer sealed" },
      { label: "Warranty", value: "2 years on fittings" },
    ],
  },
];

export function Materials() {
  const t = useT();
  const [active, setActive] = useState(0);
  const current = MATERIALS[active]!;
  const { frameProps } = useInteractiveFrame(22);

  return (
    <Section id="materials" tone="ink" className="py-24 sm:py-32 lg:py-40" label="Materials">
      <Shell>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 lg:pt-6">
            <Reveal className="mb-6 flex items-center gap-4">
              <span className="eyebrow text-brass">{t("Materials")}</span>
              <span className="h-px flex-1 bg-ivory/15" />
            </Reveal>
            <Reveal as="h2" delay={60} className="display-lg text-ivory">
              {t("Touch the detail.")}
            </Reveal>

            <div
              role="tablist"
              aria-label={t("Material categories")}
              className="mt-10 flex flex-wrap gap-x-7 gap-y-1 border-b border-ivory/12"
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
                  {t(m.tab)}
                </button>
              ))}
            </div>

            <div className="mt-10 min-h-28">
              <h3 key={current.name} className="hero-rise font-serif text-4xl text-ivory">
                {t(current.name)}
              </h3>
              <p key={current.line} className="hero-rise mt-3 text-sm text-ivory/60">
                {t(current.line)}
              </p>
            </div>

            <dl key={current.tab} className="hero-rise mt-8 grid grid-cols-2 gap-px bg-ivory/10">
              {current.props.map((p) => (
                <div key={p.label} className="bg-ink px-4 py-4">
                  <dt className="text-[0.6rem] uppercase tracking-[0.2em] text-brass">
                    {t(p.label)}
                  </dt>
                  <dd className="mt-2 text-sm leading-snug text-ivory/80">{t(p.value)}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-12 font-serif text-2xl italic text-brass">
              {t("Every detail matters.")}
            </p>
          </div>

          <Reveal delay={120} className="lg:col-span-7">
            <div
              {...frameProps}
              className="interactive-frame relative aspect-square w-full rounded-sm sm:aspect-4/3 lg:aspect-square"
            >
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
                    "interactive-frame__img absolute inset-0",
                    active === i ? "opacity-100" : "opacity-0",
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
