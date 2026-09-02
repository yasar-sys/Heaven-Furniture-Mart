import { useT } from "@/lib/i18n";
import { Reveal } from "./reveal";
import { InteractiveImage } from "./interactive-image";
import { Section, Shell } from "./ui-kit";
import { photo } from "@/assets/real/photos";

const FACTS = [
  { k: "Trusted by hundreds of homeowners", v: "Across Chattogram and beyond" },
  { k: "Free design consultation", v: "Every project starts with a conversation" },
  { k: "Delivery & installation included", v: "Workshop to your room, handled" },
];

const AWARDS = [
  {
    img: photo.awardTrophy,
    year: "2024",
    title: "14th Chattogram Furniture Fair",
    note: "Participant crest, awarded at our fair pavilion.",
    alt: "Heaven Furniture Mart participant crest from the 14th Chattogram Furniture Fair 2024, held at the company's pavilion",
    fit: "contain" as const,
    width: 1440,
    height: 1920,
  },
  {
    img: photo.awardCeremony,
    year: "2024",
    title: "Recognised on stage",
    note: "Honoured at the 13th Chattogram Furniture Fair prize ceremony.",
    alt: "Heaven Furniture Mart founder receiving a plaque on stage at the 13th Chattogram Furniture Fair 2024",
    fit: "cover" as const,
    width: 1600,
    height: 1200,
  },
  {
    img: photo.awardTeam,
    year: "2024",
    title: "Tulir Achore Amar Ghor",
    note: "Second prize sponsored by Heaven Furniture Mart.",
    alt: "The Heaven Furniture Mart team with prize winners of the Tulir Achore Amar Ghor art competition",
    fit: "cover" as const,
    width: 1600,
    height: 1200,
  },
];


export function Proof() {
  const t = useT();

  return (
    <Section tone="muted" className="py-24 sm:py-32" label="Trust">
      <Shell>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal as="h2" className="display-md max-w-[18ch]">
              {t("Hundreds of happy homeowners.")}
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <dl className="grid gap-px">
              {FACTS.map((f, i) => (
                <Reveal key={f.k} delay={i * 90} className="border-t border-foreground/12 py-7">
                  <dt className="font-serif text-2xl leading-snug text-foreground">{t(f.k)}</dt>
                  <dd className="mt-2 text-sm text-muted-foreground">{t(f.v)}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-20 sm:mt-28">
          <Reveal className="flex items-center gap-4">
            <span className="eyebrow text-brass">{t("Awards & Recognition")}</span>
            <span className="h-px flex-1 bg-foreground/12" />
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-3 lg:gap-8">
            {AWARDS.map((a, i) => (
              <Reveal key={a.title} delay={i * 90}>
                <figure className="group">
                  <InteractiveImage
                    src={a.img}
                    alt={a.alt}
                    depth={a.fit === "contain" ? 8 : 16}
                    width={a.width}
                    height={a.height}
                    className={a.fit === "contain" ? "object-contain p-4" : "object-cover"}
                    frameClassName="aspect-4/3 w-full overflow-hidden rounded-sm bg-foreground/5"
                  />

                  <figcaption className="mt-5">
                    <p className="font-serif text-lg text-brass">{a.year}</p>
                    <p className="mt-1 font-serif text-xl leading-snug text-foreground">
                      {t(a.title)}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(a.note)}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </Shell>
    </Section>
  );
}
