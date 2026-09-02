import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type ConsultationPrefill = {
  interest?: string;
  room?: string;
  space?: string;
};

type Ctx = {
  open: boolean;
  prefill: ConsultationPrefill;
  openConsultation: (prefill?: ConsultationPrefill) => void;
  setOpen: (open: boolean) => void;
};

const ConsultationContext = createContext<Ctx | null>(null);

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<ConsultationPrefill>({});

  const openConsultation = useCallback((next?: ConsultationPrefill) => {
    if (next) setPrefill(next);
    setOpen(true);
  }, []);

  const value = useMemo(
    () => ({ open, prefill, openConsultation, setOpen }),
    [open, prefill, openConsultation],
  );

  return <ConsultationContext.Provider value={value}>{children}</ConsultationContext.Provider>;
}

export function useConsultation() {
  const ctx = useContext(ConsultationContext);
  if (!ctx) throw new Error("useConsultation must be used within ConsultationProvider");
  return ctx;
}
