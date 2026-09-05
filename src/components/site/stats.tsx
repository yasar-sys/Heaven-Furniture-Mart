import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { Reveal, useInView } from "./reveal";
import { Section, Shell } from "./ui-kit";

type Stat = { value: number; suffix: string; label: string };

const STATS: Stat[] = [
  { value: 5, suffix: "+", label: "Years in Business" },
  { value: 500, suffix: "+", label: "Completed Projects" },
  { value: 350, suffix: "+", label: "Happy Customers" },
  { value: 12, suffix: "", label: "Design Awards" },
];

function useCountUp(target: number, start: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start, target, duration]);

  return val;
}

function StatItem({ stat, start }: { stat: Stat; start: boolean }) {
  const t = useT();
  const val = useCountUp(stat.value, start);
  return (
    <div className="text-center">
      <div className="font-serif text-5xl font-light text-brass sm:text-6xl lg:text-7xl">
        {val}
        {stat.suffix}
      </div>
      <div className="eyebrow mt-4 text-ivory/55">{t(stat.label)}</div>
    </div>
  );
}

export function Stats() {
  const { ref, shown } = useInView<HTMLDivElement>(0.3);

  return (
    <Section id="stats" tone="ink" className="py-20 sm:py-28 lg:py-32" label="Our numbers">
      <Shell>
        <div ref={ref} className="grid grid-cols-2 gap-12 lg:grid-cols-4 lg:gap-8">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 120}>
              <StatItem stat={s} start={shown} />
            </Reveal>
          ))}
        </div>
      </Shell>
    </Section>
  );
}
