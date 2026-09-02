import { photo } from "@/assets/real/photos";
import { useT } from "@/lib/i18n";
import { LanguageSwitch, MoodToggle } from "./mood-language";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Cta } from "./ui-kit";
import { useConsultation } from "./consultation-context";

const LINKS = [
  { label: "Collections", href: "#collections" },
  { label: "Bespoke", href: "#bespoke" },
  { label: "Our Process", href: "#process" },
  { label: "Showroom", href: "#showroom" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[var(--ease-luxe)]",
        scrolled
          ? "border-b border-ivory/10 bg-ink/85 py-3 backdrop-blur-xl"
          : "border-b border-transparent py-6",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-14">
        <a
          href="#top"
          className="group flex shrink-0 items-baseline gap-2 text-ivory"
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
          <span className="font-serif text-2xl leading-none tracking-[0.14em] sm:text-[1.7rem]">
            HEAVEN
          </span>
          <span className="eyebrow hidden whitespace-nowrap text-ivory/55 transition-colors group-hover:text-brass sm:block lg:hidden min-[1440px]:block">
            {t("Furniture Mart")}
          </span>
        </a>

        <nav className="hidden items-center gap-6 xl:gap-9 lg:flex" aria-label={t("Sections")}>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline whitespace-nowrap text-[0.72rem] uppercase tracking-[0.18em] text-ivory/75 transition-colors hover:text-ivory xl:tracking-[0.22em]"
            >
              {t(l.label)}
            </a>
          ))}
          <LanguageSwitch />
          <MoodToggle />
          <Cta tone="light" size="md" className="whitespace-nowrap" onClick={() => openConsultation()}>
            {t("Request Consultation")}
          </Cta>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <MoodToggle />
          <button
            type="button"
            onClick={() => setMenu((v) => !v)}
            aria-expanded={menu}
            aria-label={menu ? t("Close menu") : t("Open menu")}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[7px] lg:hidden"
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

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-center bg-ink px-7 transition-[opacity,transform] duration-700 ease-[var(--ease-luxe)] lg:hidden",
          menu ? "pointer-events-auto opacity-100" : "pointer-events-none translate-y-2 opacity-0",
        )}
      >
        <span className="eyebrow mb-8 text-brass">{t("Menu")}</span>
        <ul className="space-y-5">
          {LINKS.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setMenu(false)}
                style={{ transitionDelay: `${120 + i * 70}ms` }}
                className={cn(
                  "block font-serif text-4xl text-ivory transition-all duration-700 ease-[var(--ease-luxe)]",
                  menu ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
              >
                {t(l.label)}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <Cta
            tone="light"
            onClick={() => {
              setMenu(false);
              openConsultation();
            }}
          >
            {t("Request Consultation")}
          </Cta>
          <LanguageSwitch className="mt-8 -ml-2" />
          <p className="mt-6 text-xs leading-relaxed tracking-wide text-ivory/50">
            {t("Agrabad Access Road, Chattogram")}
            <br />
            +880 1960-481983
          </p>
        </div>
      </div>
    </header>
  );
}
