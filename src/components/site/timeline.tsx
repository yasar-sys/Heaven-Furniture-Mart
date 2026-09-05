import { useT } from "@/lib/i18n";
import { Reveal } from "./reveal";
import { Section, Shell } from "./ui-kit";

const MILESTONES = [
  { y: "2020", d: "Founded by Abul Kalam Bhuiyan" },
  { y: "2021", d: "Agrabad showroom opened" },
  { y: "2024–2025", d: "Exhibited at International Furniture Fair, Chattogram" },
  { y: "2025", d: "Member of the Chamber of Commerce" },
  { y: "2026", d: "Nationwide BFIOA recognition" },
];

export function Timeline() {
  const t = useT();

  return (
    <Section id="milestones" className="py-20 sm:py-24" label="Brand timeline">
      <Shell>
        <Reveal className="eyebrow text-muted-foreground">{t("Milestones")}</Reveal>
        <ol className="mt-8 grid gap-px sm:grid-cols-2 lg:grid-cols-5">
          {MILESTONES.map((m, i) => (
            <Reveal
              key={m.y}
              delay={i * 80}
              as="li"
              className="border-t border-foreground/12 py-6 sm:pr-6"
            >
              <p className="font-serif text-xl text-brass">{m.y}</p>
              <p className="mt-2 max-w-[26ch] text-[0.8rem] leading-relaxed text-muted-foreground">
                {t(m.d)}
              </p>
            </Reveal>
          ))}
        </ol>
      </Shell>
    </Section>
  );
}
