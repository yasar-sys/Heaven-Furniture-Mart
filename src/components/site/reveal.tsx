import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown, threshold]);

  return { ref, shown };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  variant?: "text" | "image";
};

export function Reveal({ children, className, delay = 0, as, variant = "text" }: RevealProps) {
  const Tag = (as ?? "div") as React.ComponentType<Record<string, unknown>>;
  const { ref, shown } = useInView<HTMLElement>();

  return (
    <Tag
      ref={ref}
      data-shown={shown}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(variant === "image" ? "img-reveal" : "reveal", className)}
    >
      {children}
    </Tag>
  );
}
