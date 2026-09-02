import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Mood = "light" | "dark";

type Ctx = { mood: Mood; setMood: (m: Mood) => void; toggleMood: () => void };

const ThemeContext = createContext<Ctx | null>(null);
const KEY = "hfm-mood";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mood, setMood] = useState<Mood>("light");

  // Read the stored preference after hydration so SSR markup stays stable.
  useEffect(() => {
    const stored = window.localStorage.getItem(KEY);
    if (stored === "dark" || stored === "light") setMood(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", mood === "dark");
    root.style.colorScheme = mood;
    window.localStorage.setItem(KEY, mood);
  }, [mood]);

  const value = useMemo(
    () => ({ mood, setMood, toggleMood: () => setMood((m) => (m === "dark" ? "light" : "dark")) }),
    [mood],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useMood() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useMood must be used within ThemeProvider");
  return ctx;
}
