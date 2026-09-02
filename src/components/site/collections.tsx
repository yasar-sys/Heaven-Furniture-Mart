import { InteractiveImage } from "./interactive-image";
import { useT } from "@/lib/i18n";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Reveal } from "./reveal";
import { Cta, Section, SectionHeading, Shell } from "./ui-kit";
import { useConsultation } from "./consultation-context";

import dining from "@/assets/dining.jpg";
import { photo } from "@/assets/real/photos";

type Collection = {
  id: string;
  title: string;
  items: string;
  img: string;
  alt: string;
  interest: string;
  room: string;
  frame: string;
  imageClassName?: string;
  width: number;
  height: number;
  pieces: { name: string; note: string }[];
};

const COLLECTIONS: Collection[] = [
  {
    id: "living",
    title: "Living",
    items: "Sofas · Lounge Chairs · Coffee Tables · Consoles",
    img: photo.livingBeigeArmchairs,
    alt: "Elegantly styled beige curved armchairs with a throw blanket and accent vase by Heaven Furniture Mart",
    interest: "Sofa",
    room: "Living Room",
    frame: "aspect-square",
    width: 1024,
    height: 1024,
    pieces: [
      { name: "Curved lounge armchairs", note: "Bouclé or velvet, customized to your space." },
      { name: "Teal velvet showroom sofa set", note: "Gilded accent table and luxury detailing." },
      { name: "Wall-hung TV console", note: "Cable-managed, built to alcove width." },
    ],
  },
  {
    id: "bedroom",
    title: "Bedroom",
    items: "Beds · Wardrobes · Dressing Tables · Bedside Tables",
    img: photo.bedroomRoyalNavy,
    alt: "Royal navy velvet four-poster bed with embroidered headboard and gold accents by Heaven Furniture Mart",
    interest: "Bed",
    room: "Bedroom",
    frame: "aspect-[5/6]",
    imageClassName: "object-[50%_42%]",
    width: 864,
    height: 1024,
    pieces: [
      { name: "Royal four-poster bed", note: "Embroidered velvet headboard with gold posts." },
      { name: "Matching luxury bedside tables", note: "Handcrafted detailing and brass pull handles." },
      { name: "Floor-to-ceiling wardrobe", note: "Custom internal storage layout." },
    ],
  },
  {
    id: "dining",
    title: "Classic Royal Suite",
    items: "Carved Beds · Royal Wardrobes · Dressing Units",
    img: photo.bedroomCarvedGold,
    alt: "Classic carved gold bed with tufted leather headboard and matching gold wardrobe by Heaven Furniture Mart",
    interest: "Royal Suite",
    room: "Bedroom",
    frame: "aspect-[4/3]",
    width: 768,
    height: 1024,
    pieces: [
      { name: "Hand-carved gold bed", note: "Deep button-tufted leather headboard." },
      { name: "Matching 4-door gold almirah", note: "Intricate crown carving and mirror doors." },
      { name: "Royal vanity dressing set", note: "Matching finish and marble top." },
    ],
  },
  {
    id: "office",
    title: "Office & Study",
    items: "Executive Tables · Bookshelves · Workstations",
    img: photo.officeConference,
    alt: "Long wooden conference table with upholstered task chairs in a bright office",
    interest: "Office / Study",
    room: "Office & Study",
    frame: "aspect-square",
    width: 1080,
    height: 1080,
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
                  width={c.width}
                  height={c.height}
                  className={c.imageClassName}
                  frameClassName={`${c.frame} w-full`}
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
                width={open.width}
                height={open.height}
                className={open.imageClassName}
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
