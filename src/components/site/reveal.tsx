import { useRef, type ElementType, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

export function useInViewHook<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const shown = useInView(ref, {
    once: true,
    margin: "0px 0px -8% 0px",
    amount: threshold,
  });
  return { ref, shown };
}

// Keep the old export name so existing call sites continue to work
export function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const shown = useInView(ref, {
    once: true,
    margin: "0px 0px -8% 0px",
    amount: threshold,
  });
  return { ref, shown };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  variant?: "text" | "image";
};

const textVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const imageVariants = {
  hidden: { opacity: 0, clipPath: "inset(0 0 14% 0)" },
  visible: { opacity: 1, clipPath: "inset(0 0 0 0)" },
};

export function Reveal({ children, className, delay = 0, as, variant = "text" }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "0px 0px -8% 0px",
    amount: 0.18,
  });

  const Tag = (as ?? motion.div) as React.ComponentType<Record<string, unknown>>;

  const variants = variant === "image" ? imageVariants : textVariants;
  const transition = variant === "image"
    ? { duration: 1.3, ease: [0.22, 1, 0.36, 1] as const, delay: delay / 1000 }
    : { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: delay / 1000 };

  return (
    <Tag
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={transition}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
