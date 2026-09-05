import { photo } from "@/assets/real/photos";
import { useT } from "@/lib/i18n";
import { Reveal } from "./reveal";
import { Cta, Section, Shell } from "./ui-kit";
import { useConsultation } from "./consultation-context";

export function FinalCta() {
  const { openConsultation } = useConsultation();
  const t = useT();

  return (
    <Section id="consultation" tone="ink" className="py-28 sm:py-36 lg:py-48" label="Request a consultation">
      <Shell>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal as="h2" className="display-lg text-ivory">
            {t("Your space")}
            <br />
            {t("deserves something")}
            <br />
            <span className="italic text-brass">{t("made for it.")}</span>
          </Reveal>
          <Reveal
            delay={120}
            className="mx-auto mt-9 max-w-md text-sm leading-relaxed text-ivory/65"
          >
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

const FOOTER_LINKS = [
  { label: "Story", href: "#statement" },
  { label: "Why Heaven", href: "#why" },
  { label: "Design Your Space", href: "#design" },
  { label: "Collections", href: "#collections" },
  { label: "Bespoke", href: "#bespoke" },
  { label: "3D Studio", href: "#studio" },
  { label: "Materials", href: "#materials" },
  { label: "Our Process", href: "#process" },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com/HeavenFurnitureMart" },
  { label: "Instagram", href: "https://instagram.com/heaven_furniture_ltd" },
  { label: "YouTube", href: "https://youtube.com/@HeavenFurnitureMart" },
];

export function Footer() {
  const t = useT();

  return (
    <footer className="border-t border-ivory/10 bg-ink pb-28 pt-16 text-ivory sm:pb-16 lg:pt-20">
      <Shell>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand column */}
          <div className="lg:pr-6">
            <div className="flex items-center gap-2.5">
              <img
                src={photo.logoMark}
                alt={t("Heaven Furniture Mart logo")}
                width={36}
                height={36}
                className="size-9 shrink-0 rounded-sm object-cover"
              />
              <p className="font-serif text-2xl tracking-[0.14em]">HEAVEN</p>
            </div>
            <p className="eyebrow mt-2 text-ivory/50">{t("Furniture Mart")}</p>
            <p className="mt-6 max-w-xs text-xs leading-relaxed text-ivory/50">
              {t("Agrabad Access Road, Chattogram, Bangladesh")}
            </p>
          </div>

          {/* Navigation column */}
          <nav aria-label={t("Navigation")}>
            <p className="eyebrow mb-5 text-brass">{t("Navigation")}</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="link-underline w-fit text-xs leading-relaxed tracking-wide text-ivory/60 transition-colors duration-300 hover:text-ivory"
                  >
                    {t(l.label)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact column */}
          <div>
            <p className="eyebrow mb-5 text-brass">{t("Contact")}</p>
            <ul className="space-y-3 text-xs tracking-wide text-ivory/60">
              <li>
                <a href="tel:+8801960481983" className="link-underline w-fit transition-colors duration-300 hover:text-ivory">
                  +880 1960-481983
                </a>
              </li>
              <li>
                <a
                  href="mailto:heavenfurnituremart@gmail.com"
                  className="link-underline w-fit break-all transition-colors duration-300 hover:text-ivory"
                >
                  heavenfurnituremart@gmail.com
                </a>
              </li>
              <li className="pt-1 text-ivory/45">{t("Agrabad Access Road, Chattogram")}</li>
            </ul>
          </div>

          {/* Socials + newsletter column */}
          <div>
            <p className="eyebrow mb-5 text-brass">{t("Follow us")}</p>
            <ul className="flex flex-wrap gap-4">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-sm border border-ivory/15 px-4 py-2.5 text-[0.65rem] uppercase tracking-[0.18em] text-ivory/55 transition-all duration-500 ease-[var(--ease-luxe)] hover:border-brass/50 hover:text-brass"
                  >
                    {t(s.label)}
                    <span className="text-brass opacity-0 transition-opacity duration-500 group-hover:opacity-100">↗</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.62rem] uppercase tracking-[0.2em] text-ivory/35">
              {t("Designed · Crafted · Customized")}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-[0.62rem] uppercase tracking-[0.22em] text-ivory/35 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Heaven Furniture Mart</span>
          <span>{t("All rights reserved")}</span>
        </div>
      </Shell>
    </footer>
  );
}
