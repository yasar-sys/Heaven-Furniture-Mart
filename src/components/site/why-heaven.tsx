import { Reveal } from "./reveal";
import { Section, SectionHeading, Shell } from "./ui-kit";

const POINTS = [
  { n: "01", t: "Fully Bespoke", d: "Built around your space, not mass-produced." },
  { n: "02", t: "Free Design Consultation", d: "Start with your idea. We'll help shape it." },
  { n: "03", t: "Premium Materials", d: "Quality wood, materials and skilled craftsmanship." },
  { n: "04", t: "In-House Craftsmanship", d: "Every piece receives attention from skilled craftsmen." },
  { n: "05", t: "Delivery & Installation", d: "We take care of the journey from workshop to your home." },
  { n: "06", t: "A Physical Showroom", d: "Experience the furniture in person at Agrabad, Chattogram." },
];

export function WhyHeaven() {
  return (
    <Section tone="muted" className="py-24 sm:py-32 lg:py-40" label="Why Heaven">
      <Shell>
        <SectionHeading
          eyebrow="Why Heaven"
          title={
            <>
              Six reasons clients
              <br />
              build with us.
            </>
          }
        />

        <div className="mt-16 grid gap-x-14 gap-y-px sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((p, i) => (
            <Reveal
              key={p.n}
              delay={i * 70}
              className="group border-t border-ink/12 py-8 transition-colors duration-500 hover:border-brass"
            >
              <div className="flex items-baseline gap-5">
                <span className="font-sans text-[0.7rem] tracking-[0.24em] text-brass">{p.n}</span>
                <h3 className="font-serif text-2xl leading-tight text-ink">{p.t}</h3>
              </div>
              <p className="mt-4 max-w-xs pl-[3.1rem] text-sm leading-relaxed text-muted-foreground">
                {p.d}
              </p>
            </Reveal>
          ))}
        </div>
      </Shell>
    </Section>
  );
}
