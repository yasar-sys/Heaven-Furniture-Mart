import { photo } from "@/assets/real/photos";
import { useT } from "@/lib/i18n";
import { LanguageSwitch, MoodToggle } from "./mood-language";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Cta } from "./ui-kit";
import { useConsultation } from "./consultation-context";

const LINKS = [
  { label: "Story", href: "#statement" },
  { label: "Why Heaven", href: "#why" },
  { label: "Design Your Space", href: "#design" },
  { label: "Collections", href: "#collections" },
  { label: "Bespoke", href: "#bespoke" },
  { label: "3D Studio", href: "#studio" },
  { label: "Materials", href: "#materials" },
  { label: "Our Process", href: "#process" },
  { label: "Films", href: "#films" },
  { label: "Awards", href: "#awards" },
  { label: "Showroom", href: "#showroom" },
  { label: "Our Reach", href: "#reach" },
  { label: "Milestones", href: "#milestones" },
  { label: "Consultation", href: "#consultation" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState<string>("#statement");
  const railRef = useRef<HTMLDivElement | null>(null);
  const { openConsultation } = useConsultation();
  const t = useT();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  /* Track the section currently in view. */
  useEffect(() => {
    const targets = LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => !!el,
    );
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.6] },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Keep the active pill in view inside the rail. */
  useEffect(() => {
    const rail = railRef.current;
    const el = rail?.querySelector<HTMLElement>(`[data-nav="${active}"]`);
    if (!rail || !el) return;
    const offset = el.offsetLeft - rail.clientWidth / 2 + el.offsetWidth / 2;
    rail.scrollTo({ left: Math.max(0, offset), behavior: "smooth" });
  }, [active]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[var(--ease-luxe)]",
        scrolled
          ? "border-b border-ivory/10 bg-ink/90 py-2 backdrop-blur-xl"
          : "border-b border-transparent py-3 sm:py-4",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-2 px-3 sm:gap-4 sm:px-8 lg:px-14">
        <a
          href="#top"
          className="group flex min-w-0 shrink-0 items-baseline gap-2 text-ivory"
          aria-label={t("Heaven Furniture Mart, home")}
        >
          <img
            src={photo.logoMark}
            alt=""
            aria-hidden
            width={36}
            height={36}
            className="size-8 shrink-0 self-center rounded-sm object-cover"
          />
          <span className="font-serif text-lg leading-none tracking-[0.14em] sm:text-2xl">
            HEAVEN
          </span>
          <span className="eyebrow hidden whitespace-nowrap text-ivory/60 transition-colors group-hover:text-brass xs:inline">
            {t("Furniture Mart")}
          </span>
        </a>

        {/* Section rail — animated, scrollable, works on phone and desktop */}
        <div className="relative min-w-0 flex-1">
          <div
            ref={railRef}
            className="no-scrollbar flex snap-x snap-mandatory items-center gap-1 overflow-x-auto scroll-smooth px-1 py-1 sm:gap-1.5"
            aria-label={t("Sections")}
            role="navigation"
          >
            {LINKS.map((l) => {
              const on = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  data-nav={l.href}
                  data-cursor="grow"
                  aria-current={on ? "true" : undefined}
                  className={cn(
                    "group relative snap-center whitespace-nowrap rounded-full border px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.16em] transition-all duration-500 ease-[var(--ease-luxe)] sm:text-[0.66rem] sm:tracking-[0.18em]",
                    on
                      ? "border-brass/70 bg-brass/15 text-ivory"
                      : "border-ivory/12 text-ivory/60 hover:-translate-y-0.5 hover:border-ivory/40 hover:text-ivory",
                  )}
                >
                  {t(l.label)}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3 -bottom-px h-px origin-left bg-brass transition-transform duration-500 ease-[var(--ease-luxe)]",
                      on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </a>
              );
            })}
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-ink/90 to-transparent"
          />
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <LanguageSwitch className="hidden md:flex" />
          <MoodToggle />
          <Cta
            tone="light"
            size="md"
            className="hidden whitespace-nowrap xl:inline-flex"
            onClick={() => openConsultation()}
          >
            {t("Request Consultation")}
          </Cta>
          <button
            type="button"
            onClick={() => setMenu((v) => !v)}
            aria-expanded={menu}
            aria-label={menu ? t("Close menu") : t("Open menu")}
            className="relative z-50 flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[7px] xl:hidden"
          >
            <span
              className={cn(
                "block h-px w-6 bg-ivory transition-transform duration-500 ease-[var(--ease-luxe)]",
                menu && "translate-y-[4px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-px w-6 bg-ivory transition-transform duration-500 ease-[var(--ease-luxe)]",
                menu && "-translate-y-[4px] -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      {/* Full menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-ink px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-20 transition-[opacity,transform] duration-500 ease-[var(--ease-luxe)] xl:hidden",
          menu ? "pointer-events-auto opacity-100" : "pointer-events-none translate-y-2 opacity-0",
        )}
      >
        <span className="eyebrow mb-4 block text-brass">{t("Menu")}</span>
        <ul className="grid gap-1 sm:grid-cols-2">
          {LINKS.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setMenu(false)}
                style={{ transitionDelay: `${60 + i * 30}ms` }}
                className={cn(
                  "flex items-baseline gap-3 border-b border-ivory/10 py-2.5 font-serif text-[clamp(1.25rem,5.5vw,1.9rem)] leading-tight transition-all duration-500 ease-[var(--ease-luxe)] hover:pl-2 hover:text-brass",
                  active === l.href ? "text-brass" : "text-ivory",
                  menu ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
              >
                <span className="eyebrow text-ivory/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {t(l.label)}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-7">
          <Cta
            tone="light"
            onClick={() => {
              setMenu(false);
              openConsultation();
            }}
          >
            {t("Request Consultation")}
          </Cta>
          <div className="mt-6 border-t border-ivory/10 pt-5">
            <span className="eyebrow mb-2 block text-ivory/40">{t("Language")}</span>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <LanguageSwitch className="-ml-2 flex-wrap" />
              <MoodToggle />
            </div>
          </div>
          <p className="mt-5 text-xs leading-relaxed tracking-wide text-ivory/50">
            {t("Agrabad Access Road, Chattogram")}
            <br />
            <a href="tel:+8801960481983" className="hover:text-brass">
              +880 1960-481983
            </a>
          </p>
        </div>
      </div>
    </header>
  );
}
