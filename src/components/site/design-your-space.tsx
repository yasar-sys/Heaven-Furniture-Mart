import { useInteractiveFrame } from "./interactive-image";
import { useT } from "@/lib/i18n";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { Cta, Section, Shell } from "./ui-kit";
import { useConsultation } from "./consultation-context";

import { photo } from "@/assets/real/photos";

const STYLES = ["Modern", "Minimal", "Classic", "Contemporary", "Luxury"] as const;
const SCALES = [
  { id: "Compact", d: "Every centimetre considered." },
  { id: "Medium", d: "Balanced, generous proportions." },
  { id: "Spacious", d: "Room to compose freely." },
];

/** One frame per room, per style — scale shifts the frame again. */
const ROOMS = [
  {
    id: "Living Room",
    note: "Sofas, sectionals, coffee tables, lounge chairs",
    gallery: [
      photo.heroShowroom,
      photo.livingGreySectional,
      photo.livingBeigeArmchairs,
      photo.heroShowroom,
      photo.livingGreySectional,
    ],
  },
  {
    id: "Bedroom",
    note: "Four-poster beds, sleigh beds, royal wardrobes",
    gallery: [
      photo.bedroomRoyalNavy,
      photo.bedroomSleighBench,
      photo.bedroomCarvedGold,
      photo.bedroomModernNavy,
      photo.bedroomRoyalNavy,
    ],
  },
  {
    id: "Dining",
    note: "Carved gold dining tables, floral embroidered chairs, crockery cabinets",
    gallery: [
      photo.diningRoyalGold,
      photo.diningPeachMarble,
      photo.diningRoyalGold,
      photo.diningPeachMarble,
      photo.diningRoyalGold,
    ],
  },
  {
    id: "Office & Study",
    note: "Director desks, workstation pods, bookshelves",
    gallery: [
      photo.officeDirectorDesk,
      photo.officeWorkstation,
      photo.officeDirectorDesk,
      photo.officeWorkstation,
      photo.heroShowroom,
    ],
  },
  {
    id: "Custom",
    note: "Bespoke pieces built to your exact room width & finish",
    gallery: [
      photo.bedroomSleighBench,
      photo.livingGreySectional,
      photo.bedroomRoyalNavy,
      photo.diningPeachMarble,
      photo.officeDirectorDesk,
    ],
  },
];


function Choice({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-sm border px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.18em] transition-all duration-500 ease-[var(--ease-luxe)]",
        active
          ? "border-brass bg-brass/15 text-ivory"
          : "border-ivory/20 text-ivory/60 hover:border-ivory/50 hover:text-ivory",
      )}
    >
      {children}
    </button>
  );
}

export function DesignYourSpace() {
  const [room, setRoom] = useState(ROOMS[0]!);
  const [style, setStyle] = useState<string>(STYLES[0]!);
  const [scale, setScale] = useState(SCALES[1]!);
  const { openConsultation } = useConsultation();
  const { frameProps } = useInteractiveFrame(20);
  const t = useT();

  const styleIndex = STYLES.indexOf(style as (typeof STYLES)[number]);
  const scaleIndex = SCALES.findIndex((s) => s.id === scale.id);
  const activeFrame =
    room.gallery[(Math.max(styleIndex, 0) + Math.max(scaleIndex, 0) * 2) % room.gallery.length]!;


  return (
    <Section id="design" tone="ink" className="py-24 sm:py-32 lg:py-40" label="Design your space">
      <Shell>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal className="mb-6 flex items-center gap-4">
              <span className="eyebrow text-brass">{t("Interactive")}</span>
              <span className="h-px flex-1 bg-ivory/15" />
            </Reveal>
            <Reveal as="h2" delay={60} className="display-lg text-ivory">
              {t("Your space.")}
              <br />
              <span className="italic text-brass">{t("Your furniture.")}</span>
            </Reveal>
            <Reveal delay={140} className="mt-6 text-sm text-ivory/60">
              {t("Tell us what you're imagining.")}
            </Reveal>

            <div className="mt-12 space-y-10">
              <fieldset>
                <legend className="eyebrow mb-4 text-ivory/40">{t("Room")}</legend>
                <div className="flex flex-wrap gap-2.5">
                  {ROOMS.map((r) => (
                    <Choice key={r.id} active={room.id === r.id} onClick={() => setRoom(r)}>
                      {t(r.id)}
                    </Choice>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="eyebrow mb-4 text-ivory/40">{t("Style")}</legend>
                <div className="flex flex-wrap gap-2.5">
                  {STYLES.map((s) => (
                    <Choice key={s} active={style === s} onClick={() => setStyle(s)}>
                      {t(s)}
                    </Choice>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="eyebrow mb-4 text-ivory/40">{t("Scale")}</legend>
                <div className="flex flex-wrap gap-2.5">
                  {SCALES.map((s) => (
                    <Choice key={s.id} active={scale.id === s.id} onClick={() => setScale(s)}>
                      {t(s.id)}
                    </Choice>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>

          {/* Live preview panel */}
          <Reveal delay={120} className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-sm border border-ivory/12 bg-ivory/[0.03]">
              <div
                {...frameProps}
                className="interactive-frame relative aspect-4/5 w-full sm:aspect-3/2 lg:aspect-4/5"
              >
                <img
                  key={activeFrame}
                  src={activeFrame}
                  alt={`${style} ${room.id} furniture at ${scale.id.toLowerCase()} scale by Heaven Furniture Mart`}
                  loading="eager"
                  decoding="async"
                  className="interactive-frame__img absolute inset-0 animate-[image-swap_500ms_var(--ease-luxe)_both]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,color-mix(in_oklab,var(--ink)_88%,transparent)_100%)]"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="eyebrow text-brass">
                    {t(style)} · {t(scale.id)}
                  </p>
                  <h3 className="mt-3 font-serif text-3xl text-ivory sm:text-4xl">{t(room.id)}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ivory/65">{t(room.note)}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ivory/45">{t(scale.d)}</p>
                </div>
              </div>

              <div className="flex flex-col gap-5 border-t border-ivory/12 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <p className="max-w-[22ch] font-serif text-xl leading-snug text-ivory">
                  {t("Your bespoke furniture journey starts here.")}
                </p>
                <Cta
                  tone="light"
                  size="md"
                  onClick={() =>
                    openConsultation({
                      room: room.id,
                      space: scale.id,
                      ...(room.id === "Custom" ? { interest: "Fully Custom" } : {}),
                    })
                  }
                >
                  {t("Get my custom quote")}
                </Cta>
              </div>
            </div>
          </Reveal>
        </div>
      </Shell>
    </Section>
  );
}
