import { useEffect, useRef } from "react";

/**
 * Editorial cursor: a small brass dot that tracks the pointer exactly and a
 * thin ring that trails behind it, easing open over interactive elements.
 * Only mounts for fine pointers (desktop) and respects reduced-motion.
 */
export function LuxeCursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;

    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;

    document.documentElement.classList.add("has-luxe-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let target = 1;
    let visible = false;
    let frame = 0;

    const interactive = (el: EventTarget | null) =>
      el instanceof Element &&
      Boolean(
        el.closest(
          'a, button, input, textarea, select, label, [role="button"], [data-cursor="grow"]',
        ),
      );

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      target = interactive(e.target) ? 2.5 : 1;
      if (!visible) {
        visible = true;
        d.style.opacity = "1";
        r.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible = false;
      d.style.opacity = "0";
      r.style.opacity = "0";
    };

    const onDown = () => {
      target = target * 0.72;
    };

    const tick = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      scale += (target - scale) * 0.12;
      d.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onMove as unknown as EventListener, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onMove as unknown as EventListener);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-luxe-cursor");
    };
  }, []);

  return (
    <div aria-hidden className="luxe-cursor-layer">
      <div ref={ring} className="luxe-cursor-ring" />
      <div ref={dot} className="luxe-cursor-dot" />
    </div>
  );
}
