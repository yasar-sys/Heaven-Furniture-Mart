import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/* ---------- CTA button ---------- */

type CtaProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: "solid" | "outline" | "light";
  size?: "md" | "lg";
};

export function Cta({ tone = "solid", size = "lg", className, children, ...rest }: CtaProps) {
  return (
    <button
      {...rest}
      className={cn(
        "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-sm font-sans uppercase tracking-[0.2em] transition-[color,background-color,border-color,transform] duration-500 ease-[var(--ease-luxe)] active:scale-[0.985]",
        size === "lg" ? "px-8 py-4 text-[0.7rem] sm:text-xs" : "px-6 py-3 text-[0.65rem]",
        tone === "solid" && "bg-ink text-primary-foreground hover:bg-brown",
        tone === "outline" &&
          "border border-foreground/25 text-foreground hover:border-ink hover:bg-ink hover:text-primary-foreground",
        tone === "light" &&
          "border border-ivory/40 text-ivory backdrop-blur-[2px] hover:border-ivory hover:bg-ivory hover:text-foreground",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="relative z-10 h-px w-6 bg-current transition-all duration-500 ease-[var(--ease-luxe)] group-hover:w-9"
      />
    </button>
  );
}

/* ---------- Section shell + heading ---------- */

export function Section({
  id,
  className,
  children,
  tone = "ivory",
  label,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  tone?: "ivory" | "ink" | "muted";
  label?: string;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn(
        "relative scroll-mt-24",
        tone === "ivory" && "bg-background text-foreground",
        tone === "muted" && "bg-secondary text-foreground",
        tone === "ink" && "bg-ink text-ivory",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Shell({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-14", className)}>
      {children}
    </div>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  align = "left",
  invert = false,
}: {
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {(eyebrow || index) && (
        <Reveal className="mb-6 flex items-center gap-4">
          {align === "center" && <span className="hidden flex-1 rule-line sm:block" />}
          {index && (
            <span className={cn("eyebrow", invert ? "text-brass" : "text-brass")}>{index}</span>
          )}
          {eyebrow && (
            <span
              className={cn("eyebrow", invert ? "text-ivory/60" : "text-muted-foreground")}
            >
              {eyebrow}
            </span>
          )}
          <span className={cn("flex-1 rule-line", align === "center" && "hidden sm:block")} />
        </Reveal>
      )}
      <Reveal delay={80} as="h2" className="display-lg">
        {title}
      </Reveal>
      {intro && (
        <Reveal
          delay={160}
          className={cn(
            "mt-7 max-w-xl text-[0.95rem] leading-relaxed",
            align === "center" && "mx-auto",
            invert ? "text-ivory/70" : "text-muted-foreground",
          )}
        >
          {intro}
        </Reveal>
      )}
    </div>
  );
}
