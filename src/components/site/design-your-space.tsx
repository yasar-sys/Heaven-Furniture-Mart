import { useInteractiveFrame } from "./interactive-image";
import { useT } from "@/lib/i18n";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { Cta, Section, Shell } from "./ui-kit";
import { useConsultation } from "./consultation-context";

import {
  ROOMS,
  scalesFor,
  stylesFor,
  type Option,
  type RoomId,
} from "@/assets/space/space-options";

/** A selectable chip carrying its own thumbnail. */
function Choice({
  option,
  active,
  onClick,
  label,
}: {
  option: Option;
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      data-cursor="grow"
      className={cn(
        "group flex items-center gap-3 rounded-sm border p-1.5 pr-4 text-left transition-all duration-400 ease-[var(--ease-luxe)]",
        active
          ? "border-brass bg-brass/12 text-ivory"
          : "border-ivory/15 text-ivory/60 hover:border-ivory/40 hover:text-ivory",
      )}
    >
      <span className="relative block size-11 shrink-0 overflow-hidden rounded-[2px] sm:size-12">
        <img
          src={option.img}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          width={1024}
          height={1024}
          className={cn(
            "absolute inset-0 size-full object-cover transition-all duration-500 ease-[var(--ease-luxe)]",
            active ? "scale-105 opacity-100" : "opacity-60 group-hover:scale-105 group-hover:opacity-90",
          )}
        />
      </span>
      <span className="text-[0.68rem] uppercase tracking-[0.16em]">{label}</span>
    </button>
  );
}

function Facet({
  legend,
  options,
  activeId,
  onSelect,
  t,
}: {
  legend: string;
  options: Option[];
  activeId: string;
  onSelect: (o: Option) => void;
  t: (s: string) => string;
}) {
  return (
    <fieldset>
      <legend className="eyebrow mb-4 text-ivory/40">{t(legend)}</legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((o) => (
          <Choice
            key={o.id}
            option={o}
            active={activeId === o.id}
            onClick={() => onSelect(o)}
            label={t(o.id)}
          />
        ))}
      </div>
    </fieldset>
  );
}

export function DesignYourSpace() {
  const [room, setRoom] = useState<{ id: RoomId; note: string; img: string }>(ROOMS[0]!);
  const [styleId, setStyleId] = useState("Modern");
  const [scaleId, setScaleId] = useState("Medium");

  // Style and scale imagery always belongs to the currently selected room.
  const styles = useMemo(() => stylesFor(room.id), [room.id]);
  const scales = useMemo(() => scalesFor(room.id), [room.id]);
  const style = styles.find((o) => o.id === styleId) ?? styles[0]!;
  const scale = scales.find((o) => o.id === scaleId) ?? scales[0]!;
  const { openConsultation } = useConsultation();
  const { frameProps } = useInteractiveFrame(18);
  const t = useT();

  return (
    <Section id="design" tone="ink" className="py-24 sm:py-32 lg:py-40" label="Design your space">
      <Shell>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
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
              <Facet legend="Room" options={ROOMS} activeId={room.id} onSelect={setRoom} t={t} />
              <Facet legend="Style" options={STYLES} activeId={style.id} onSelect={setStyle} t={t} />
              <Facet legend="Scale" options={SCALES} activeId={scale.id} onSelect={setScale} t={t} />
            </div>
          </div>

          {/* Live preview panel */}
          <Reveal delay={120} className="lg:col-span-7">
            <div className="overflow-hidden rounded-sm border border-ivory/12 bg-ivory/[0.03]">
              <div
                {...frameProps}
                className="interactive-frame relative aspect-4/5 w-full sm:aspect-3/2"
              >
                <img
                  key={room.img}
                  src={room.img}
                  alt={`${t(style.id)} ${t(room.id)} — ${t(scale.id)} · Heaven Furniture Mart`}
                  loading="lazy"
                  decoding="async"
                  width={1024}
                  height={1280}
                  className="interactive-frame__img absolute inset-0 size-full object-cover object-center animate-[image-swap_450ms_var(--ease-luxe)_both]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,color-mix(in_oklab,var(--ink)_90%,transparent)_100%)]"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="eyebrow text-brass">
                    {t(style.id)} · {t(scale.id)}
                  </p>
                  <h3 className="mt-3 font-serif text-3xl text-ivory sm:text-4xl">{t(room.id)}</h3>
                  <p className="mt-2 max-w-[46ch] text-xs leading-relaxed text-ivory/65">
                    {t(room.note)}
                  </p>
                </div>
              </div>

              {/* Style + scale references, so every selection is shown honestly */}
              <div className="grid gap-px border-t border-ivory/12 bg-ivory/10 sm:grid-cols-2">
                {[
                  { caption: "Style", option: style },
                  { caption: "Scale", option: scale },
                ].map(({ caption, option }) => (
                  <figure key={caption} className="flex items-center gap-4 bg-ink p-5 sm:p-6">
                    <span className="relative block aspect-square w-20 shrink-0 overflow-hidden rounded-[2px] sm:w-24">
                      <img
                        key={option.img}
                        src={option.img}
                        alt={`${t(caption)}: ${t(option.id)}`}
                        loading="lazy"
                        decoding="async"
                        width={1024}
                        height={1024}
                        className="absolute inset-0 size-full object-cover animate-[image-swap_450ms_var(--ease-luxe)_both]"
                      />
                    </span>
                    <figcaption className="min-w-0">
                      <p className="eyebrow text-ivory/40">{t(caption)}</p>
                      <p className="mt-1.5 font-serif text-lg text-ivory">{t(option.id)}</p>
                      <p className="mt-1 text-[0.7rem] leading-relaxed text-ivory/55">
                        {t(option.note)}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>

              <div className="flex flex-col gap-5 border-t border-ivory/12 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <p className="max-w-[24ch] font-serif text-xl leading-snug text-ivory">
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
