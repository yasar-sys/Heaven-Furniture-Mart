import { useState } from "react";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { Section, SectionHeading, Shell } from "./ui-kit";

const CHANNEL = "https://www.youtube.com/@HeavenFurnitureMart";

const VIDEOS = [
  {
    id: "qEwoJWbXSTs",
    title: "Virtual showroom tour — luxury & bespoke furniture, Chattogram",
  },
  { id: "t9548EmISOk", title: "The latest home décor trends, before anyone else" },
  { id: "aodK1JCOx0E", title: "Fall décor inspiration" },
  { id: "xv0GZWonG1Q", title: "Home essentials we love — part one" },
  { id: "ZowMY_7A_BE", title: "Bathroom décor inspiration" },
];

export function Films() {
  const t = useT();
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <Section id="films" tone="muted" className="py-24 sm:py-32 lg:py-40" label="Films">
      <Shell>
        <SectionHeading eyebrow={t("Films")} title={t("See the craft in motion.")} />

        <div className="mt-14 grid gap-6 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((v, i) => (
            <Reveal key={v.id} delay={i * 90} className={cn(i === 0 && "lg:col-span-2")}>
              <div className="group overflow-hidden rounded-sm border border-foreground/10 bg-background">
                <div className="relative aspect-video w-full overflow-hidden bg-ink">
                  {playing === v.id ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
                      title={t(v.title)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  ) : (
                    <button
                      type="button"
                      data-cursor="grow"
                      onClick={() => setPlaying(v.id)}
                      aria-label={`${t("Play")}: ${t(v.title)}`}
                      className="absolute inset-0 h-full w-full"
                    >
                      <img
                        src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                        alt={t(v.title)}
                        loading="lazy"
                        decoding="async"
                        width={480}
                        height={360}
                        className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-luxe)] group-hover:scale-[1.04]"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-ink/35 transition-opacity duration-700 group-hover:opacity-60"
                      />
                      <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brass/70 bg-ink/50 text-brass backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
                        <svg width="16" height="18" viewBox="0 0 16 18" aria-hidden>
                          <path d="M2 1.5 14.5 9 2 16.5V1.5Z" fill="currentColor" />
                        </svg>
                      </span>
                    </button>
                  )}
                </div>
                <div className="flex items-start justify-between gap-4 p-5">
                  <p className="max-w-[34ch] font-serif text-lg leading-snug text-foreground">
                    {t(v.title)}
                  </p>
                  <a
                    href={`https://www.youtube.com/watch?v=${v.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="grow"
                    className="shrink-0 whitespace-nowrap text-[0.6rem] uppercase tracking-[0.2em] text-brass transition-colors hover:text-brown"
                  >
                    {t("Watch on YouTube")} ↗
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-12 text-center">
          <a
            href={CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="grow"
            className="link-underline text-[0.7rem] uppercase tracking-[0.24em] text-foreground"
          >
            {t("Visit our YouTube channel")} ↗
          </a>
        </Reveal>
      </Shell>
    </Section>
  );
}
