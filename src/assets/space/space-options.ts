import roomLiving from "./room-living.jpg";
import roomBedroom from "./room-bedroom.jpg";
import roomDining from "./room-dining.jpg";
import roomOffice from "./room-office.jpg";
import roomStudy from "./room-study.jpg";
import roomCustom from "./room-custom.jpg";

import styleModern from "./style-modern.jpg";
import styleMinimal from "./style-minimal.jpg";
import styleClassic from "./style-classic.jpg";
import styleContemporary from "./style-contemporary.jpg";
import styleLuxury from "./style-luxury.jpg";

import scaleTheater from "./scale-theater.jpg";
import scaleCompact from "./scale-compact.jpg";
import scaleMedium from "./scale-medium.jpg";
import scaleSpacious from "./scale-spacious.jpg";

export type Option = { id: string; note: string; img: string };

/** Six rooms — each with one dedicated, non-repeating photograph. */
export const ROOMS: Option[] = [
  { id: "Living Room", note: "Sofas, sectionals, coffee tables, lounge chairs", img: roomLiving },
  { id: "Bedroom", note: "Upholstered beds, bedside tables, custom wardrobes", img: roomBedroom },
  { id: "Dining", note: "Dining tables, upholstered chairs, crockery cabinets", img: roomDining },
  { id: "Office", note: "Director desks, executive seating, wall panelling", img: roomOffice },
  { id: "Study", note: "Bookshelves, writing desks, reading chairs", img: roomStudy },
  { id: "Custom", note: "Bespoke pieces built to your exact width and finish", img: roomCustom },
];

/** Five styles — each visually distinct. */
export const STYLES: Option[] = [
  { id: "Modern", note: "Clean geometry, balanced proportions, sophisticated materials", img: styleModern },
  { id: "Minimal", note: "Simple forms, open space, neutral palette, no clutter", img: styleMinimal },
  { id: "Classic", note: "Traditional detailing, rich wood character, timeless forms", img: styleClassic },
  { id: "Contemporary", note: "Current trends, refined shapes, mixed textures", img: styleContemporary },
  { id: "Luxury", note: "Premium materials, statement pieces, rich textures", img: styleLuxury },
];

/** Four scales — the room size the pieces are drawn around. */
export const SCALES: Option[] = [
  { id: "Theater", note: "Large-scale room, tiered seating, statement layouts", img: scaleTheater },
  { id: "Compact", note: "Smaller footprint, space-efficient pieces, smart storage", img: scaleCompact },
  { id: "Medium", note: "Balanced proportions, comfortable everyday circulation", img: scaleMedium },
  { id: "Spacious", note: "Larger pieces, multiple zones, generous negative space", img: scaleSpacious },
];
