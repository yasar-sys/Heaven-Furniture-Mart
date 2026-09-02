import { Reveal } from "./reveal";
import { Section, Shell } from "./ui-kit";

export function Statement() {
  return (
    <Section id="statement" className="py-28 sm:py-36 lg:py-48" label="Brand statement">
      <Shell>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-4">
            <span className="eyebrow text-brass">Since 2020 · Agrabad</span>
            <span className="mt-6 block rule-line w-16" />
          </Reveal>

          <div className="lg:col-span-8">
            <Reveal as="h2" className="display-lg max-w-[22ch]">
              More than furniture.
              <br />
              <span className="italic text-brown">A reflection of you.</span>
            </Reveal>

            <Reveal delay={120} as="blockquote" className="mt-12 max-w-2xl">
              <p className="font-sans text-base leading-[1.85] text-muted-foreground sm:text-lg">
                “At Heaven Furniture Mart, we believe furniture is more than just function; it is a
                reflection of lifestyle, taste, and comfort. Every piece we create is designed to
                bring lasting elegance into the homes of our clients.”
              </p>
              <footer className="mt-8 text-[0.7rem] uppercase tracking-[0.24em] text-ink">
                — Abul Kalam Bhuiyan, Managing Director
              </footer>
            </Reveal>
          </div>
        </div>
      </Shell>
    </Section>
  );
}
