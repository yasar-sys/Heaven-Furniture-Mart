import { useT } from "@/lib/i18n";
import heroImage from "@/assets/hero.jpg";
import { Cta } from "./ui-kit";
import { useConsultation } from "./consultation-context";

export function Hero() {
  const { openConsultation } = useConsultation();
  const t = useT();

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-ink">
      <img
        src={heroImage}
        alt="Bespoke living room with a deep green velvet sofa and walnut panelling, crafted by Heaven Furniture Mart"
        width={1920}
        height={1280}
        fetchPriority="high"
        decoding="async"
        className="animate-drift absolute inset-0 h-full w-full object-cover object-[62%_center] opacity-90 sm:object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--ink)_78%,transparent)_0%,color-mix(in_oklab,var(--ink)_28%,transparent)_42%,color-mix(in_oklab,var(--ink)_82%,transparent)_100%)]"
      />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1400px] flex-col justify-end px-5 pb-24 pt-32 sm:px-8 sm:pb-28 lg:px-14 lg:pb-32">
        <p className="eyebrow hero-rise mb-8 text-brass" style={{ animationDelay: "120ms" }}>
          {t("Bespoke Furniture · Chattogram")}
        </p>

        <h1
          className="display-xl hero-rise max-w-[16ch] text-ivory"
          style={{ animationDelay: "220ms" }}
        >
          {t("Furniture,")}
          <br />
          {t("crafted around you.")}
        </h1>

        <p
          className="hero-rise mt-8 max-w-md text-sm leading-relaxed text-ivory/75 sm:text-base"
          style={{ animationDelay: "380ms" }}
        >
          {t("Bespoke furniture designed for your space, your taste, your life.")}
        </p>

        <div
          className="hero-rise mt-11 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-9"
          style={{ animationDelay: "500ms" }}
        >
          <Cta tone="light" onClick={() => openConsultation()}>
            {t("Request a free consultation")}
          </Cta>
          <a
            href="#collections"
            className="link-underline text-[0.7rem] uppercase tracking-[0.24em] text-ivory/70 hover:text-ivory"
          >
            {t("Explore our work ↓")}
          </a>
        </div>

        <div
          className="hero-rise mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ivory/15 pt-7 text-[0.65rem] uppercase tracking-[0.26em] text-ivory/45"
          style={{ animationDelay: "640ms" }}
        >
          <span>{t("Designed")}</span>
          <span className="text-brass">·</span>
          <span>{t("Crafted")}</span>
          <span className="text-brass">·</span>
          <span>{t("Customized")}</span>
        </div>
      </div>
    </section>
  );
}
