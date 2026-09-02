import { cn } from "@/lib/utils";
import { LANGUAGES, useI18n } from "@/lib/i18n";
import { useMood } from "@/lib/theme";

/** Light/dark mood switch, styled for the dark navigation bar. */
export function MoodToggle({ className }: { className?: string }) {
  const { mood, toggleMood } = useMood();
  const { t } = useI18n();

  return (
    <button
      type="button"
      onClick={toggleMood}
      data-mood-toggle
      aria-label={mood === "dark" ? t("Light mood") : t("Dark mood")}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border border-ivory/25 text-ivory/70 transition-colors duration-500 hover:border-brass hover:text-brass",
        className,
      )}
    >
      {mood === "dark" ? (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          aria-hidden
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          aria-hidden
        >
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
        </svg>
      )}
    </button>
  );
}

/** Language switcher: EN · BN · ES · HI. */
export function LanguageSwitch({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      role="group"
      aria-label={t("Language")}
    >
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          title={l.label}
          className={cn(
            "rounded-sm px-2 py-1 text-[0.62rem] tracking-[0.18em] transition-colors duration-500",
            lang === l.code ? "bg-brass/20 text-brass" : "text-ivory/50 hover:text-ivory",
          )}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
}
