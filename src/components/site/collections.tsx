import { InteractiveImage } from "./interactive-image";
import { useT } from "@/lib/i18n";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Reveal } from "./reveal";
import { Cta, Section, SectionHeading, Shell } from "./ui-kit";
import { useConsultation } from "./consultation-context";

import living from "@/assets/living.jpg";
import bedroom from "@/assets/bedroom.jpg";
import dining from "@/assets/dining.jpg";
import office from "@/assets/office.jpg";

type Collection = {
  id: string;
  title: string;
  items: string;
  img: string;
  alt: string;
  interest: string;
  room: string;
  pieces: { name: string; note: string }[];
};

const COLLECTIONS: Collection[] = [
  {
    id: "living",
    title: "Living",
    items: "Sofas · Coffee Tables · TV Units · Consoles",
    img: living,
    alt: "Ivory bouclé sofa with a walnut coffee table in a warm minimal living room",
    interest: "Sofa",
    room: "Living Room",
    pieces: [
      { name: "Curved lounge sofa", note: "Bouclé or velvet, sized to your wall." },
      { name: "Solid wood centre table", note: "Walnut, teak or oak with hand finish." },
      { name: "Wall-hung TV console", note: "Cable-managed, built to alcove width." },
    ],
  },
  {
    id: "bedroom",
    title: "Bedroom",
    items: "Beds · Wardrobes · Dressing Tables · Bedside Tables",
    img: bedroom,
    alt: "Upholstered bed with fluted wood headboard wall and built-in wardrobe",
    interest: "Bed",
    room: "Bedroom",
    pieces: [
      { name: "Upholstered platform bed", note: "Headboard height set to your room." },
      { name: "Floor-to-ceiling wardrobe", note: "Internal layout planned with you." },
      { name: "Dressing table & mirror", note: "Soft-close drawers, brass detail." },
    ],
  },
  {
    id: "dining",
    title: "Dining",
    items: "Dining Tables · Chairs · Cabinets",
    img: dining,
    alt: "Long walnut dining table with cane-back chairs under brass pendants",
    interest: "Dining Set",
    room: "Dining",
    pieces: [
      { name: "Solid wood dining table", note: "Four to twelve seats, your length." },
      { name: "Cane-back dining chair", note: "Upholstery in your fabric." },
      { name: "Crockery cabinet", note: "Glass, wood or closed shutters." },
    ],
  },
  {
    id: "office",
    title: "Office & Study",
    items: "Executive Tables · Bookshelves · Workstations",
    img: office,
    alt: "Executive walnut desk with built-in bookshelves in a dark study",
    interest: "Office / Study",
    room: "Office & Study",
    pieces: [
      { name: "Executive desk", note: "Storage side to suit how you work." },
      { name: "Built-in bookshelf wall", note: "Fitted floor to ceiling." },
      { name: "Study workstation", note: "Compact, for students and home offices." },
    ],
  },
];

export function Collections() {
  const [open, setOpen] = useState<Collection | null>(null);
  const { openConsultation } = useConsultation();
  const t = useT();

  return (
    <Section id="collections" className="py-24 sm:py-32 lg:py-40" label="Collections">
      <Shell>
        <SectionHeading
          eyebrow={t("Collections")}
          title={
            <>
              {t("A few of the rooms")}
              <br />
              {t("we shape.")}
            </>
          }
          intro={t("Not a catalogue. A starting point — every piece is made to your dimensions.")}
        />

        <div className="mt-16 grid gap-5 sm:mt-20 sm:grid-cols-2 lg:gap-7">
          {COLLECTIONS.map((c, i) => (
            <Reveal key={c.id} delay={i * 90}>
              <button
                type="button"
                onClick={() => setOpen(c)}
                className="group relative block w-full overflow-hidden rounded-sm text-left"
                aria-label={`${t(c.title)} — ${t("Explore →")}`}
              >
                <InteractiveImage
                  src={c.img}
                  alt={c.alt}
                  depth={24}
                  frameClassName="aspect-4/5 w-full sm:aspect-3/4"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,color-mix(in_oklab,var(--ink)_85%,transparent)_100%)]"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
                  <span className="block">
                    <span className="block font-serif text-3xl leading-none text-ivory sm:text-4xl">
                      {t(c.title)}
                    </span>
                    <span className="mt-3 block text-[0.68rem] uppercase tracking-[0.18em] text-ivory/60">
                      {t(c.items)}
                    </span>
                  </span>
                  <span className="shrink-0 text-[0.68rem] uppercase tracking-[0.2em] text-brass transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:translate-x-1">
                    {t("Explore →")}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </Shell>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-3xl gap-0 overflow-hidden rounded-sm border-foreground/10 bg-background p-0">
          {open && (
            <div className="grid sm:grid-cols-2">
              <InteractiveImage
                src={open.img}
                alt={open.alt}
                depth={14}
                frameClassName="h-56 w-full sm:h-full"
              />
              <div className="p-7 sm:p-10">
                <p className="eyebrow text-brass">{t("Collection")}</p>
                <DialogTitle className="mt-3 font-serif text-4xl font-light">
                  {t(open.title)}
                </DialogTitle>
                <DialogDescription className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {t(open.items)}
                </DialogDescription>

                <ul className="mt-8 space-y-5">
                  {open.pieces.map((p) => (
                    <li key={p.name} className="border-t border-foreground/10 pt-4">
                      <p className="font-serif text-xl text-foreground">{t(p.name)}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{t(p.note)}</p>
                    </li>
                  ))}
                </ul>

                <Cta
                  className="mt-9"
                  size="md"
                  onClick={() => {
                    setOpen(null);
                    openConsultation({ interest: open.interest, room: open.room });
                  }}
                >
                  {t("Create something similar")}
                </Cta>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}
