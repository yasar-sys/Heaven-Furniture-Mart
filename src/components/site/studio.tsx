import { lazy, Suspense, useMemo, useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { Cta, Section, Shell } from "./ui-kit";

const StudioScene = lazy(() => import("./studio-scene"));
import { WHATSAPP_NUMBER, openWhatsApp } from "@/lib/whatsapp";

type PieceId = "Sofa" | "Bed" | "Wardrobe" | "Dining Table";

const PIECES: { id: PieceId; note: string; min: number; max: number }[] = [
  { id: "Sofa", note: "Three-seater, deep-seat comfort", min: 180, max: 320 },
  { id: "Bed", note: "Upholstered headboard, storage base", min: 150, max: 220 },
  { id: "Wardrobe", note: "Sliding or shutter doors", min: 120, max: 300 },
  { id: "Dining Table", note: "Six to ten seats", min: 140, max: 300 },
];

const FABRICS = [
  { id: "Ivory Linen", hex: "#e5ded1" },
  { id: "Teal Velvet", hex: "#1f4b4c" },
  { id: "Navy Velvet", hex: "#22304f" },
  { id: "Tan Leather", hex: "#a9754a" },
  { id: "Charcoal Weave", hex: "#3a3a3c" },
  { id: "Blush Velvet", hex: "#c99c96" },
];

const WOODS = [
  { id: "Natural Teak", hex: "#b1793f" },
  { id: "Walnut", hex: "#6b4227" },
  { id: "Ebony", hex: "#2b221d" },
  { id: "Antique Gold", hex: "#c8a151" },
];

export function Studio() {
  const t = useT();
  const [piece, setPiece] = useState<PieceId>("Sofa");
  const [fabric, setFabric] = useState(FABRICS[1]!);
  const [wood, setWood] = useState(WOODS[0]!);
  const [span, setSpan] = useState(0.5);

  const active = useMemo(() => PIECES.find((p) => p.id === piece)!, [piece]);
  const width = Math.round(active.min + span * (active.max - active.min));

  const summary = `${t(piece)} · ${t(fabric.id)} · ${t(wood.id)} · ${width} cm`;

  return (
    <Section id="studio" tone="ink" className="py-24 sm:py-32 lg:py-40" label="Bespoke studio">
      <Shell>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="mb-6 flex items-center gap-4">
              <span className="eyebrow text-brass">{t("Live configurator")}</span>
              <span className="h-px flex-1 bg-ivory/15" />
            </div>
            <h2 className="display-lg text-ivory">
              {t("Preview your own")}
              <br />
              <span className="italic text-brass">{t("bespoke piece.")}</span>
            </h2>
            <p className="mt-6 max-w-[42ch] text-sm leading-relaxed text-ivory/60">
              {t(
                "Choose the piece, the fabric, the wood and the width. Drag the model to turn it. Then send your exact configuration to our designers on WhatsApp.",
              )}
            </p>

            <div className="mt-10 space-y-8">
              <fieldset>
                <legend className="eyebrow mb-3 text-ivory/40">{t("Piece")}</legend>
                <div className="flex flex-wrap gap-2.5">
                  {PIECES.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      aria-pressed={piece === p.id}
                      onClick={() => setPiece(p.id)}
                      className={cn(
                        "rounded-sm border px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.18em] transition-all duration-500",
                        piece === p.id
                          ? "border-brass bg-brass/15 text-ivory"
                          : "border-ivory/20 text-ivory/60 hover:border-ivory/50 hover:text-ivory",
                      )}
                    >
                      {t(p.id)}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="eyebrow mb-3 text-ivory/40">{t("Upholstery")}</legend>
                <div className="flex flex-wrap gap-3">
                  {FABRICS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      title={t(f.id)}
                      aria-label={t(f.id)}
                      aria-pressed={fabric.id === f.id}
                      onClick={() => setFabric(f)}
                      className={cn(
                        "h-9 w-9 rounded-full border transition-all duration-500",
                        fabric.id === f.id
                          ? "scale-110 border-brass shadow-[0_0_0_3px_color-mix(in_oklab,var(--brass)_28%,transparent)]"
                          : "border-ivory/25 hover:border-ivory/70",
                      )}
                      style={{ backgroundColor: f.hex }}
                    />
                  ))}
                </div>
                <p className="mt-3 text-xs text-ivory/50">{t(fabric.id)}</p>
              </fieldset>

              <fieldset>
                <legend className="eyebrow mb-3 text-ivory/40">{t("Wood & finish")}</legend>
                <div className="flex flex-wrap gap-3">
                  {WOODS.map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      title={t(w.id)}
                      aria-label={t(w.id)}
                      aria-pressed={wood.id === w.id}
                      onClick={() => setWood(w)}
                      className={cn(
                        "h-9 w-9 rounded-sm border transition-all duration-500",
                        wood.id === w.id
                          ? "scale-110 border-brass"
                          : "border-ivory/25 hover:border-ivory/70",
                      )}
                      style={{ backgroundColor: w.hex }}
                    />
                  ))}
                </div>
                <p className="mt-3 text-xs text-ivory/50">{t(wood.id)}</p>
              </fieldset>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="eyebrow text-ivory/40">{t("Width")}</span>
                  <span className="font-serif text-xl text-brass">{width} cm</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(span * 100)}
                  aria-label={t("Width")}
                  onChange={(e) => setSpan(Number(e.target.value) / 100)}
                  className="h-1 w-full cursor-ew-resize appearance-none rounded-full bg-ivory/20 accent-brass"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="overflow-hidden rounded-sm border border-ivory/12 bg-ivory/[0.03]">
              <div
                data-cursor="grow"
                role="img"
                aria-label={summary}
                className="relative aspect-4/3 w-full touch-none select-none overflow-hidden"
              >
                <ClientOnly
                  fallback={
                    <div className="absolute inset-0 grid place-items-center text-[0.65rem] uppercase tracking-[0.24em] text-ivory/40">
                      {t("Drag to rotate")}
                    </div>
                  }
                >
                  <Suspense
                    fallback={
                      <div className="absolute inset-0 grid place-items-center text-[0.65rem] uppercase tracking-[0.24em] text-ivory/40">
                        {t("Drag to rotate")}
                      </div>
                    }
                  >
                    <StudioScene piece={piece} fabric={fabric.hex} wood={wood.hex} span={span} />
                  </Suspense>
                </ClientOnly>
                <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[0.6rem] uppercase tracking-[0.24em] text-ivory/45">
                  {t("Drag to rotate")}
                </span>
              </div>

              <div className="flex flex-col gap-5 border-t border-ivory/12 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div>
                  <p className="eyebrow text-brass">{t("Your configuration")}</p>
                  <p className="mt-2 font-serif text-xl text-ivory">{summary}</p>
                  <p className="mt-1 text-xs text-ivory/50">{t(active.note)}</p>
                </div>
                <Cta
                  tone="light"
                  size="md"
                  onClick={() =>
                    openWhatsApp(
                      `${t("Hello Heaven Furniture Mart, I designed a piece in your studio")}: ${summary}`,
                    )
                  }
                >
                  {t("Send on WhatsApp")}
                </Cta>
              </div>
            </div>
            <p className="mt-4 text-center text-[0.65rem] uppercase tracking-[0.22em] text-ivory/40">
              WhatsApp {WHATSAPP_NUMBER}
            </p>
          </Reveal>
        </div>
      </Shell>
    </Section>
  );
}
