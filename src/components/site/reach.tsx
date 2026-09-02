import { Section, SectionHeading, Shell } from "./ui-kit";
import { Reveal, useInView } from "./reveal";
import { useT } from "@/lib/i18n";
import { BD_ISLANDS, BD_MAINLAND, MAP_H, MAP_W, project } from "./bd-map";

const W = MAP_W;
const H = MAP_H;

const ORIGIN = { name: "Chattogram", lon: 91.8, lat: 22.36, note: "Agrabad · where it started" };

export function Reach() {
  const t = useT();
  const { ref, shown } = useInView<HTMLDivElement>(0.25);

  const { x: ox, y: oy } = project(ORIGIN.lon, ORIGIN.lat);

  return (
    <Section id="reach" tone="ink" className="py-24 sm:py-32 lg:py-40" label="Our reach">
      <Shell>
        <SectionHeading
          index="09"
          eyebrow={t("Our Reach")}
          title={
            <>
              {t("Started in Chattogram.")}
              <br />
              <span className="italic text-brass">{t("Growing across Bangladesh.")}</span>
            </>
          }
          intro={t(
            "Every piece still leaves our Agrabad workshop — and now it travels further every year.",
          )}
          invert
        />

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center">
          <Reveal variant="image">
            <div ref={ref} className="relative mx-auto w-full max-w-[460px]">
              <svg
                viewBox={`-10 -10 ${W + 20} ${H + 20}`}
                className="h-auto w-full overflow-visible"
                role="img"
                aria-label={t("Map of Bangladesh showing growth from Chattogram")}
              >
                <defs>
                  <linearGradient id="reach-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-brass)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="var(--color-brass)" stopOpacity="0.09" />
                  </linearGradient>
                </defs>

                <path
                  d={OUTLINE_PATH}
                  fill="url(#reach-fill)"
                  stroke="var(--color-brass)"
                  strokeOpacity="0.9"
                  strokeWidth="1.6"
                  className="reach-outline"
                  style={{ strokeDasharray: 1400, strokeDashoffset: shown ? 0 : 1400 }}
                />

                {/* Origin — Chattogram, the only place we claim */}
                <g
                  style={{
                    opacity: shown ? 1 : 0,
                    transition: "opacity 1s var(--ease-luxe) 700ms",
                  }}
                >
                  <circle cx={ox} cy={oy} r="6" fill="var(--color-brass)" className="reach-pulse" />
                  <circle cx={ox} cy={oy} r="4" fill="var(--color-brass)" />
                  <text
                    x={ox + 11}
                    y={oy + 4}
                    className="font-serif text-[15px] italic"
                    fill="var(--color-brass)"
                  >
                    {t("Chattogram")}
                  </text>
                </g>
              </svg>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow text-brass">{t(ORIGIN.note)}</p>
              <h3 className="mt-4 font-serif text-3xl text-ivory sm:text-4xl">{t("Chattogram")}</h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/65">
                {t(
                  "Our showroom and workshop are in Agrabad, Chattogram — every piece is designed, crafted and finished here before it reaches your home.",
                )}
              </p>
            </Reveal>

            <Reveal delay={90}>
              <p className="mt-10 max-w-md border-t border-ivory/15 pt-6 text-sm leading-relaxed text-ivory/55">
                {t(
                  "We deliver from Chattogram, and we’re growing city by city across Bangladesh as demand for bespoke furniture spreads.",
                )}
              </p>
            </Reveal>
          </div>
        </div>
      </Shell>
    </Section>
  );
}
