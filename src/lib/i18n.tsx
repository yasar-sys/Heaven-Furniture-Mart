import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DICTIONARIES, LANGUAGES, type Lang } from "./translations";

export { LANGUAGES, type Lang };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (source: string) => string };

const I18nContext = createContext<Ctx | null>(null);
const KEY = "hfm-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  // Read the stored preference after hydration so SSR markup stays stable.
  useEffect(() => {
    const stored = window.localStorage.getItem(KEY) as Lang | null;
    if (stored && stored in DICTIONARIES) setLang(stored);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(KEY, lang);
    const entry = LANGUAGES.find((l) => l.code === lang);
    if (entry) document.documentElement.lang = entry.htmlLang;
  }, [lang]);

  const t = useCallback((source: string) => DICTIONARIES[lang][source] ?? source, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}

export function useT() {
  return useI18n().t;
}
