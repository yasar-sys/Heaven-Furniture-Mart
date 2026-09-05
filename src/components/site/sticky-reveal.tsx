import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useT } from "@/lib/i18n";
import { Section, Shell } from "./ui-kit";
import { photo } from "@/assets/real/photos";

type Panel = {
  img: string;
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
};

const PANELS: Panel[] = [
  {
    img: photo.livingGreySectional,
    alt: "Grey velvet L-shaped sectional sofa with gold legs in Heaven Furniture Mart showroom",
    eyebrow: "Living Room",
    title: "A sofa shaped to your wall, not the other way around.",
    body: "We measure your space, sketch the proportions, and build the frame around your room — not a catalogue size. Every sectional leaves our workshop sized to the centimetre.",
  },
  {
    img: photo.bedroomRoyalNavy,
    alt: "Royal navy velvet four-poster bed with embroidered headboard and gold accents",
    eyebrow: "Bedroom",
    title: "Beds that fit the way you actually live.",
    body: "Headboard height set to your ceiling. Storage integrated into the base. Wardrobe internals planned with you, so every drawer, shelf and rail sits where your day needs it.",
  },
  {
    img: photo.diningRoyalGold,
    alt: "Royal carved gold dining table with floral embroidered oval-back chairs under chandelier",
    eyebrow: "Dining",
    title: "A table that seats exactly who you host.",
    body: "Four seats or twelve — your length, your finish, your chairs. Hand-carved gold detail or clean modern lines, built around the way you gather.",
  },
  {
    img: photo.officeDirectorDesk,
    alt: "Executive Director Desk with ergonomic chair and modern minimalist workspace",
    eyebrow: "Office & Study",
    title: "Workspaces built for the way you work.",
    body: "Executive desks with wire management, modular workstations for teams, and bookshelves fitted floor-to-ceiling. Every piece designed for focus and built to last.",
  },
];

function PinnedImage({ p, index, progress }: { p: Panel; index: number; progress: MotionValue<number> }) {
  const t = useT();
  const count = PANELS.length;
  const start = index / count;
  const end = (index + 1) / count;

  const opacity = useTransform(progress, [start - 0.02, start, end, end + 0.02], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, end], [1.08, 1]);

  return (
    <motion.img
      src={p.img}
      alt={t(p.alt)}
      loading="lazy"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
      style={{ opacity, scale }}
    />
  );
}

function TextPanel({ p, index, progress }: { p: Panel; index: number; progress: MotionValue<number> }) {
  const t = useT();
  const count = PANELS.length;
  const start = index / count;
  const end = (index + 1) / count;

  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.08), start, end, Math.min(1, end + 0.08)],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [Math.max(0, start - 0.08), start, end, Math.min(1, end + 0.08)],
    [40, 0, 0, -40],
  );

  return (
    <div className="flex min-h-screen items-center py-16">
      <motion.div style={{ opacity, y }}>
        <span className="eyebrow text-brass">{t(p.eyebrow)}</span>
        <h3 className="display-md mt-5 text-ivory">{t(p.title)}</h3>
        <p className="mt-6 max-w-md text-[0.95rem] leading-[1.85] text-ivory/65">
          {t(p.body)}
        </p>
        <div className="mt-8 h-px w-16 bg-brass/50" />
      </motion.div>
    </div>
  );
}

export function StickyReveal() {
  const t = useT();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <Section id="craft-journey" tone="ink" className="py-28 sm:py-36 lg:py-44" label="Craft journey">
      <Shell>
        <div className="mb-16 sm:mb-24">
          <span className="eyebrow text-brass">{t("The Journey")}</span>
          <h2 className="display-lg mt-6 text-ivory">
            {t("From idea to")} <span className="italic text-brass">{t("your room.")}</span>
          </h2>
        </div>
      </Shell>

      <div ref={containerRef} className="relative">
        <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
          <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-14">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-sm lg:aspect-4/5">
                {PANELS.map((p, i) => (
                  <PinnedImage key={i} p={p} index={i} progress={scrollYProgress} />
                ))}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,color-mix(in_oklab,var(--ink)_60%,transparent)_100%)]"
                />
              </div>

              <div className="flex flex-col">
                {PANELS.map((p, i) => (
                  <TextPanel key={i} p={p} index={i} progress={scrollYProgress} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
