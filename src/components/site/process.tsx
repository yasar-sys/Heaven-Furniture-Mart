import { Reveal } from "./reveal";
import { Section, SectionHeading, Shell } from "./ui-kit";

const STEPS = [
  { n: "01", t: "You share", d: "Your space, needs and vision." },
  { n: "02", t: "We design", d: "Ideas become a considered design." },
  { n: "03", t: "We craft", d: "Skilled craftsmen bring it to life." },
  { n: "04", t: "We deliver", d: "Installed beautifully in your space." },
];

export function Process() {
  return (
    <Section id="process" className="py-24 sm:py-32 lg:py-40" label="Our process">
      <Shell>
        <SectionHeading eyebrow="Our Process" title="From conversation to installed." />

        <ol className="mt-16 grid gap-px sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 120}
              as="li"
              className="group relative border-t border-ink/12 pt-8 sm:pr-8"
            >
              <span
                aria-hidden
                className="absolute -top-px left-0 h-px w-0 bg-brass transition-all duration-[1200ms] ease-[var(--ease-luxe)] group-data-[shown=true]:w-full"
              />
              <span className="font-sans text-[0.7rem] tracking-[0.26em] text-brass">{s.n}</span>
              <h3 className="mt-5 font-serif text-3xl uppercase leading-none tracking-tight text-ink">
                {s.t}
              </h3>
              <p className="mt-4 max-w-[24ch] text-sm leading-relaxed text-muted-foreground">
                {s.d}
              </p>
            </Reveal>
          ))}
        </ol>
      </Shell>
    </Section>
  );
}
