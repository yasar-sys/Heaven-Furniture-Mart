import { Reveal } from "./reveal";
import { Section, Shell } from "./ui-kit";

const FACTS = [
  { k: "Trusted by hundreds of homeowners", v: "Across Chattogram and beyond" },
  { k: "Free design consultation", v: "Every project starts with a conversation" },
  { k: "Delivery & installation included", v: "Workshop to your room, handled" },
];

export function Proof() {
  return (
    <Section tone="muted" className="py-24 sm:py-32" label="Trust">
      <Shell>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal as="h2" className="display-md max-w-[18ch]">
              Hundreds of happy homeowners.
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <dl className="grid gap-px">
              {FACTS.map((f, i) => (
                <Reveal key={f.k} delay={i * 90} className="border-t border-ink/12 py-7">
                  <dt className="font-serif text-2xl leading-snug text-ink">{f.k}</dt>
                  <dd className="mt-2 text-sm text-muted-foreground">{f.v}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Shell>
    </Section>
  );
}
