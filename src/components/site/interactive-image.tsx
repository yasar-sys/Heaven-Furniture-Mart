import { useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Extra classes for the framing wrapper. */
  frameClassName?: string;
  /** How far the image drifts with the pointer, in px. */
  depth?: number;
  /** Slow continuous drift, for hero-scale imagery. */
  drift?: boolean;
  /** Brass light that follows the pointer across the image. */
  sheen?: boolean;
  loading?: "lazy" | "eager";
  children?: ReactNode;
};

/**
 * A still photograph that behaves like a live surface: it parallaxes and tilts
 * with the pointer, catches a brass highlight, and can drift slowly on its own.
 */
export function InteractiveImage({
  src,
  alt,
  className,
  frameClassName,
  depth = 18,
  drift = false,
  sheen = true,
  loading = "lazy",
  children,
}: Props) {
  const frame = useRef<HTMLDivElement | null>(null);
  const raf = useRef(0);

  const apply = useCallback(
    (x: number, y: number, active: boolean) => {
      const el = frame.current;
      if (!el) return;
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        el.style.setProperty("--ix", x.toFixed(4));
        el.style.setProperty("--iy", y.toFixed(4));
        el.style.setProperty("--iactive", active ? "1" : "0");
      });
    },
    [],
  );

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = frame.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    apply(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1, true);
  };

  return (
    <div
      ref={frame}
      onPointerMove={onMove}
      onPointerLeave={() => apply(0, 0, false)}
      data-cursor="grow"
      className={cn("interactive-frame group/img", frameClassName)}
      style={{ ["--idepth" as string]: `${depth}px` }}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        className={cn("interactive-frame__img", drift && "animate-drift", className)}
      />
      {sheen && <span aria-hidden className="interactive-frame__sheen" />}
      {children}
    </div>
  );
}

/**
 * Pointer tracking for frames that manage their own (often crossfading) images.
 * Spread `frameProps` on the framing element and give each image the
 * `interactive-frame__img` class.
 */
export function useInteractiveFrame(depth = 18) {
  const frame = useRef<HTMLDivElement | null>(null);
  const raf = useRef(0);

  const set = useCallback((x: number, y: number, active: boolean) => {
    const el = frame.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--ix", x.toFixed(4));
      el.style.setProperty("--iy", y.toFixed(4));
      el.style.setProperty("--iactive", active ? "1" : "0");
    });
  }, []);

  return {
    frameProps: {
      ref: frame,
      "data-cursor": "grow" as const,
      style: { ["--idepth" as string]: `${depth}px` },
      onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => {
        const el = frame.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        set(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1, true);
      },
      onPointerLeave: () => set(0, 0, false),
    },
  };
}
