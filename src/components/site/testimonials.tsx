import { useT } from "@/lib/i18n";
import { Reveal } from "./reveal";
import { Section, SectionHeading, Shell } from "./ui-kit";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We needed a sectional that fit an awkward corner and matched our existing teak pieces. Heaven designed it, crafted it, and it fits like it was always meant to be there.",
    name: "Tania Rahman",
    role: "Homeowner · Khulshi",
    initials: "TR",
  },
  {
    quote:
      "The dining set is the centerpiece of our home now. The carved gold detail is stunning — every guest asks where it came from.",
    name: "Imran Hossain",
    role: "Homeowner · Agrabad",
    initials: "IH",
  },
  {
    quote:
      "From the consultation to installation, the whole process was seamless. Our bedroom wardrobe uses every inch of space perfectly.",
    name: "Fatima Khan",
    role: "Homeowner · Panchlaish",
    initials: "FK",
  },
  {
    quote:
      "We furnished our entire office through Heaven. The workstations are solid, beautiful, and built to last. Worth every taka.",
    name: "Mahmudul Hasan",
    role: "Business Owner · GEC Circle",
    initials: "MH",
  },
  {
    quote:
      "I walked in with a vague idea and walked out with a design plan. The sofa they built is the most comfortable piece of furniture I own.",
    name: "Nusrat Jahan",
    role: "Homeowner · 2 No. Gate",
    initials: "NJ",
  },
  {
    quote:
      "The craftsmanship is on another level. You can see and feel the difference the moment you sit down. Truly bespoke, truly made for us.",
    name: "Rashidul Karim",
    role: "Homeowner · Bahirhat",
    initials: "RK",
  },
];

export function Testimonials() {
  const t = useT();

  return (
    <Section id="testimonials" className="py-24 sm:py-32 lg:py-40" label="Client testimonials">
      <Shell>
        <SectionHeading
          eyebrow={t("Testimonials")}
          title={
            <>
              {t("What our clients")}
              <br />
              {t("say about us.")}
            </>
          }
        />

        <div className="mt-16 grid gap-6 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {TESTIMONIALS.map((tm, i) => (
            <Reveal key={tm.name} delay={i * 80}>
              <figure className="group flex h-full flex-col rounded-sm border border-foreground/8 bg-card p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-500 hover:border-brass/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-8">
                <span className="font-serif text-5xl leading-none text-brass/40" aria-hidden>
                  &ldquo;
                </span>
                <blockquote className="mt-2 flex-1">
                  <p className="text-[0.92rem] leading-[1.75] text-muted-foreground">
                    {t(tm.quote)}
                  </p>
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4 border-t border-foreground/8 pt-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ink font-sans text-sm tracking-wide text-brass">
                    {tm.initials}
                  </span>
                  <div>
                    <p className="font-serif text-lg leading-tight text-foreground">{t(tm.name)}</p>
                    <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                      {t(tm.role)}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Shell>
    </Section>
  );
}
