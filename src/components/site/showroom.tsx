import { useT } from "@/lib/i18n";
import { photo } from "@/assets/real/photos";
import { Reveal } from "./reveal";
import { Cta, Shell } from "./ui-kit";
import { useConsultation } from "./consultation-context";

export function Showroom() {
  const { openConsultation } = useConsultation();
  const t = useT();

  return (
    <section
      id="showroom"
      aria-label="Showroom"
      className="relative scroll-mt-24 overflow-hidden bg-ink"
    >
      <img
        src={photo.bedroomNavy}
        alt="Heaven Furniture Mart showroom interior with staged sofas, dining sets and wardrobes"
        loading="lazy"
        decoding="async"
        width={1920}
        height={1080}
        className="animate-drift absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--ink)_80%,transparent),color-mix(in_oklab,var(--ink)_60%,transparent))]"
      />

      <Shell className="relative py-28 sm:py-36 lg:py-48">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal className="eyebrow text-brass">{t("Showroom · Agrabad")}</Reveal>
            <Reveal as="h2" delay={80} className="display-lg mt-6 text-ivory">
              {t("See it.")}
              <br />
              {t("Feel it.")}
              <br />
              <span className="italic text-brass">{t("Make it yours.")}</span>
            </Reveal>
            <Reveal delay={160} className="mt-8 max-w-md text-sm leading-relaxed text-ivory/70">
              {t(
                "Visit our showroom at Agrabad Access Road, Chattogram and experience our furniture in person.",
              )}
            </Reveal>
            <Reveal delay={220} className="mt-10">
              <Cta tone="light" onClick={() => openConsultation()}>
                {t("Visit the showroom")}
              </Cta>
            </Reveal>
          </div>

          <Reveal delay={200} className="lg:col-span-5 lg:pt-6">
            <dl className="space-y-7 border-t border-ivory/15 pt-8">
              <div>
                <dt className="eyebrow text-ivory/40">{t("Address")}</dt>
                <dd className="mt-2 font-serif text-2xl leading-snug text-ivory">
                  {t("Agrabad Access Road,")}
                  <br />
                  {t("Chattogram, Bangladesh")}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-ivory/40">{t("Phone")}</dt>
                <dd className="mt-2">
                  <a
                    href="tel:+8801960481983"
                    className="link-underline font-serif text-2xl text-ivory"
                  >
                    +880 1960-481983
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-ivory/40">{t("Email")}</dt>
                <dd className="mt-2">
                  <a
                    href="mailto:heavenfurnituremart@gmail.com"
                    className="link-underline text-sm tracking-wide text-ivory/80"
                  >
                    heavenfurnituremart@gmail.com
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
