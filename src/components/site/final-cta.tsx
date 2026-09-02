import { useT } from "@/lib/i18n";
import { Reveal } from "./reveal";
import { Cta, Section, Shell } from "./ui-kit";
import { useConsultation } from "./consultation-context";

export function FinalCta() {
  const { openConsultation } = useConsultation();
  const t = useT();

  return (
    <Section tone="ink" className="py-28 sm:py-36 lg:py-48" label="Request a consultation">
      <Shell>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal as="h2" className="display-lg text-ivory">
            {t("Your space")}
            <br />
            {t("deserves something")}
            <br />
            <span className="italic text-brass">{t("made for it.")}</span>
          </Reveal>
          <Reveal delay={120} className="mx-auto mt-9 max-w-md text-sm leading-relaxed text-ivory/65">
            {t("Tell us what you're imagining. We'll help you turn it into something real.")}
          </Reveal>
          <Reveal delay={200} className="mt-12">
            <Cta tone="light" onClick={() => openConsultation()}>
              {t("Request a free consultation")}
            </Cta>
            <p className="mt-6 text-[0.68rem] uppercase tracking-[0.2em] text-ivory/40">
              {t("No commitment. Just a conversation about your space.")}
            </p>
          </Reveal>
        </div>
      </Shell>
    </Section>
  );
}

export function Footer() {
  const t = useT();

  return (
    <footer className="border-t border-ivory/10 bg-ink pb-28 pt-14 text-ivory sm:pb-14">
      <Shell>
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-serif text-2xl tracking-[0.14em]">HEAVEN</p>
            <p className="eyebrow mt-2 text-ivory/50">{t("Furniture Mart")}</p>
            <p className="mt-6 max-w-xs text-xs leading-relaxed text-ivory/50">
              {t("Agrabad Access Road, Chattogram, Bangladesh")}
            </p>
          </div>

          <div className="flex flex-col gap-2 text-xs tracking-wide text-ivory/60">
            <a href="tel:+8801960481983" className="link-underline w-fit">
              +880 1960-481983
            </a>
            <a href="mailto:heavenfurnituremart@gmail.com" className="link-underline w-fit">
              heavenfurnituremart@gmail.com
            </a>
            <div className="mt-3 flex gap-5 text-[0.65rem] uppercase tracking-[0.2em]">
              <a
                className="link-underline"
                href="https://facebook.com/HeavenFurnitureMart"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
              <a
                className="link-underline"
                href="https://instagram.com/heaven_furniture_ltd"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                className="link-underline"
                href="https://youtube.com/@HeavenFurnitureMart"
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-[0.62rem] uppercase tracking-[0.22em] text-ivory/35 sm:flex-row sm:justify-between">
          <span>{t("Designed · Crafted · Customized")}</span>
          <span>© {new Date().getFullYear()} Heaven Furniture Mart</span>
        </div>
      </Shell>
    </footer>
  );
}
