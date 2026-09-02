import { useState } from "react";
import { Section, SectionHeading, Shell } from "./ui-kit";
import { Reveal, useInView } from "./reveal";
import { useT } from "@/lib/i18n";

/* Simplified national outline, in real degrees, projected below. */
const OUTLINE: [number, number][] = [
  [88.95, 26.28],
  [88.42, 26.0],
  [88.12, 25.2],
  [88.72, 24.92],
  [88.15, 24.32],
  [88.72, 24.02],
  [89.05, 23.88],
  [89.1, 23.4],
  [88.9, 23.2],
  [88.8, 22.6],
  [89.2, 21.86],
  [89.85, 21.72],
  [90.32, 22.02],
  [90.62, 21.8],
  [91.02, 22.2],
  [91.42, 22.78],
  [91.82, 22.5],
  [92.02, 21.9],
  [92.32, 21.42],
  [92.58, 20.9],
  [92.36, 20.78],
  [92.28, 21.32],
  [92.62, 22.2],
  [92.4, 23.02],
  [91.78, 23.42],
  [91.18, 23.02],
  [91.42, 24.0],
  [92.02, 24.4],
  [92.34, 25.02],
  [91.6, 25.18],
  [90.6, 25.2],
  [89.82, 25.32],
  [89.82, 26.02],
];

const W = 340;
const H = 440;
const LON0 = 87.85;
const LON1 = 92.95;
const LAT0 = 20.6;
const LAT1 = 26.75;

const px = (lon: number) => ((lon - LON0) / (LON1 - LON0)) * W;
const py = (lat: number) => ((LAT1 - lat) / (LAT1 - LAT0)) * H;

const OUTLINE_PATH =
  OUTLINE.map(([lon, lat], i) => `${i === 0 ? "M" : "L"}${px(lon).toFixed(1)} ${py(lat).toFixed(1)}`).join(
    " ",
  ) + " Z";

const ORIGIN = { name: "Chattogram", lon: 91.83, lat: 22.35, note: "Agrabad · where it started" };

const CITIES: { name: string; lon: number; lat: number; note: string; year: string }[] = [
  { name: "Cumilla", lon: 91.18, lat: 23.46, note: "Delivery corridor", year: "2022" },
  { name: "Dhaka", lon: 90.41, lat: 23.81, note: "Client projects", year: "2023" },
  { name: "Cox's Bazar", lon: 92.0, lat: 21.44, note: "Resort interiors", year: "2023" },
  { name: "Sylhet", lon: 91.87, lat: 24.9, note: "Residential fit-outs", year: "2024" },
  { name: "Khulna", lon: 89.57, lat: 22.81, note: "Growing next", year: "2026" },
  { name: "Rajshahi", lon: 88.6, lat: 24.37, note: "Growing next", year: "2026" },
  { name: "Rangpur", lon: 89.25, lat: 25.74, note: "Growing next", year: "2027" },
  { name: "Barishal", lon: 90.37, lat: 22.7, note: "Growing next", year: "2027" },
];

function arc(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  // Bow the curve perpendicular to the line for an airline-route feel.
  const cx = mx - (dy / len) * len * 0.22;
  const cy = my + (dx / len) * len * 0.22;
  return `M${x1} ${y1} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2} ${y2}`;
}

export function Reach() {
  const t = useT();
  const { ref, shown } = useInView<HTMLDivElement>(0.25);
  const [active, setActive] = useState<string | null>(null);

  const ox = px(ORIGIN.lon);
  const oy = py(ORIGIN.lat);
  const current = CITIES.find((c) => c.name === active);

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

                {CITIES.map((c, i) => {
                  const x = px(c.lon);
                  const y = py(c.lat);
                  const on = active === c.name;
                  return (
                    <g key={c.name}>
                      <path
                        d={arc(ox, oy, x, y)}
                        fill="none"
                        stroke="var(--color-brass)"
                        strokeOpacity={on ? 1 : 0.6}
                        strokeWidth={on ? 1.4 : 0.9}
                        strokeLinecap="round"
                        style={{
                          strokeDasharray: 400,
                          strokeDashoffset: shown ? 0 : 400,
                          transition: `stroke-dashoffset 1.5s var(--ease-luxe) ${380 + i * 190}ms, stroke-opacity .5s, stroke-width .5s`,
                        }}
                      />
                      <g
                        tabIndex={0}
                        role="button"
                        aria-label={`${t(c.name)} — ${t(c.note)}`}
                        onMouseEnter={() => setActive(c.name)}
                        onMouseLeave={() => setActive(null)}
                        onFocus={() => setActive(c.name)}
                        onBlur={() => setActive(null)}
                        className="cursor-pointer outline-none"
                        style={{
                          opacity: shown ? 1 : 0,
                          transition: `opacity .8s var(--ease-luxe) ${900 + i * 190}ms`,
                        }}
                      >
                        <circle cx={x} cy={y} r="12" fill="transparent" />
                        <circle
                          cx={x}
                          cy={y}
                          r={on ? 4.4 : 3}
                          fill="var(--color-ivory)"
                          fillOpacity={on ? 1 : 0.7}
                          style={{ transition: "r .35s var(--ease-luxe), fill-opacity .35s" }}
                        />
                        <text
                          x={x + 8}
                          y={y + 3.5}
                          className="font-sans text-[9px] tracking-[0.16em] uppercase"
                          fill="var(--color-ivory)"
                          fillOpacity={on ? 0.95 : 0.5}
                        >
                          {t(c.name)}
                        </text>
                      </g>
                    </g>
                  );
                })}

                {/* Origin — Chattogram */}
                <g>
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
              <p className="eyebrow text-brass">
                {current ? t(current.note) : t(ORIGIN.note)}
              </p>
              <h3 className="mt-4 font-serif text-3xl text-ivory sm:text-4xl">
                {current ? t(current.name) : t("Chattogram")}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/65">
                {current
                  ? `${t("Serving since")} ${current.year}.`
                  : t(
                      "Hover a city to see where our furniture already lives — and where we grow next.",
                    )}
              </p>
            </Reveal>

            <Reveal delay={90}>
              <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5">
                {CITIES.map((c) => (
                  <li key={c.name}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(c.name)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(c.name)}
                      onBlur={() => setActive(null)}
                      className={`group flex w-full items-baseline justify-between gap-3 border-b pb-2 text-left transition-colors duration-500 ${
                        active === c.name
                          ? "border-brass text-ivory"
                          : "border-ivory/15 text-ivory/70 hover:text-ivory"
                      }`}
                    >
                      <span className="text-xs uppercase tracking-[0.2em]">{t(c.name)}</span>
                      <span className="font-serif text-sm text-brass">{c.year}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Shell>
    </Section>
  );
}
