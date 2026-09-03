import roomLiving from "./room-living.jpg";
import roomBedroom from "./room-bedroom.jpg";
import roomDining from "./room-dining.jpg";
import roomOffice from "./room-office.jpg";
import roomStudy from "./room-study.jpg";
import roomCustom from "./room-custom.jpg";

// Living room
import livingModern from "./living-modern.jpg";
import livingMinimal from "./living-minimal.jpg";
import livingClassic from "./living-classic.jpg";
import livingContemporary from "./living-contemporary.jpg";
import livingLuxury from "./living-luxury.jpg";
import livingTheater from "./living-theater.jpg";
import livingCompact from "./living-compact.jpg";
import livingMedium from "./living-medium.jpg";
import livingSpacious from "./living-spacious.jpg";

// Bedroom
import bedroomModern from "./bedroom-modern.jpg";
import bedroomMinimal from "./bedroom-minimal.jpg";
import bedroomClassic from "./bedroom-classic.jpg";
import bedroomContemporary from "./bedroom-contemporary.jpg";
import bedroomLuxury from "./bedroom-luxury.jpg";
import bedroomTheater from "./bedroom-theater.jpg";
import bedroomCompact from "./bedroom-compact.jpg";
import bedroomMedium from "./bedroom-medium.jpg";
import bedroomSpacious from "./bedroom-spacious.jpg";

// Dining
import diningModern from "./dining-modern.jpg";
import diningMinimal from "./dining-minimal.jpg";
import diningClassic from "./dining-classic.jpg";
import diningContemporary from "./dining-contemporary.jpg";
import diningLuxury from "./dining-luxury.jpg";
import diningTheater from "./dining-theater.jpg";
import diningCompact from "./dining-compact.jpg";
import diningMedium from "./dining-medium.jpg";
import diningSpacious from "./dining-spacious.jpg";

// Office
import officeModern from "./office-modern.jpg";
import officeMinimal from "./office-minimal.jpg";
import officeClassic from "./office-classic.jpg";
import officeContemporary from "./office-contemporary.jpg";
import officeLuxury from "./office-luxury.jpg";
import officeTheater from "./office-theater.jpg";
import officeCompact from "./office-compact.jpg";
import officeMedium from "./office-medium.jpg";
import officeSpacious from "./office-spacious.jpg";

// Study
import studyModern from "./study-modern.jpg";
import studyMinimal from "./study-minimal.jpg";
import studyClassic from "./study-classic.jpg";
import studyContemporary from "./study-contemporary.jpg";
import studyLuxury from "./study-luxury.jpg";
import studyTheater from "./study-theater.jpg";
import studyCompact from "./study-compact.jpg";
import studyMedium from "./study-medium.jpg";
import studySpacious from "./study-spacious.jpg";

// Custom
import customModern from "./custom-modern.jpg";
import customMinimal from "./custom-minimal.jpg";
import customClassic from "./custom-classic.jpg";
import customContemporary from "./custom-contemporary.jpg";
import customLuxury from "./custom-luxury.jpg";
import customTheater from "./custom-theater.jpg";
import customCompact from "./custom-compact.jpg";
import customMedium from "./custom-medium.jpg";
import customSpacious from "./custom-spacious.jpg";

export type Option = { id: string; note: string; img: string };

export type RoomId = "Living Room" | "Bedroom" | "Dining" | "Office" | "Study" | "Custom";

/** Six rooms — each with one dedicated, non-repeating photograph. */
export const ROOMS: { id: RoomId; note: string; img: string }[] = [
  { id: "Living Room", note: "Sofas, sectionals, coffee tables, lounge chairs", img: roomLiving },
  { id: "Bedroom", note: "Upholstered beds, bedside tables, custom wardrobes", img: roomBedroom },
  { id: "Dining", note: "Dining tables, upholstered chairs, crockery cabinets", img: roomDining },
  { id: "Office", note: "Director desks, executive seating, wall panelling", img: roomOffice },
  { id: "Study", note: "Bookshelves, writing desks, reading chairs", img: roomStudy },
  { id: "Custom", note: "Bespoke pieces built to your exact width and finish", img: roomCustom },
];

const STYLE_NOTES: Record<string, string> = {
  Modern: "Clean geometry, balanced proportions, sophisticated materials",
  Minimal: "Simple forms, open space, neutral palette, no clutter",
  Classic: "Traditional detailing, rich wood character, timeless forms",
  Contemporary: "Current trends, refined shapes, mixed textures",
  Luxury: "Premium materials, statement pieces, rich textures",
};

const SCALE_NOTES: Record<string, string> = {
  Theater: "Large-scale room, tiered seating, statement layouts",
  Compact: "Smaller footprint, space-efficient pieces, smart storage",
  Medium: "Balanced proportions, comfortable everyday circulation",
  Spacious: "Larger pieces, multiple zones, generous negative space",
};

export const STYLE_IDS = ["Modern", "Minimal", "Classic", "Contemporary", "Luxury"] as const;
export const SCALE_IDS = ["Theater", "Compact", "Medium", "Spacious"] as const;

/** Every room carries its own style and scale photography — nothing is shared. */
const IMAGES: Record<RoomId, Record<string, string>> = {
  "Living Room": {
    Modern: livingModern,
    Minimal: livingMinimal,
    Classic: livingClassic,
    Contemporary: livingContemporary,
    Luxury: livingLuxury,
    Theater: livingTheater,
    Compact: livingCompact,
    Medium: livingMedium,
    Spacious: livingSpacious,
  },
  Bedroom: {
    Modern: bedroomModern,
    Minimal: bedroomMinimal,
    Classic: bedroomClassic,
    Contemporary: bedroomContemporary,
    Luxury: bedroomLuxury,
    Theater: bedroomTheater,
    Compact: bedroomCompact,
    Medium: bedroomMedium,
    Spacious: bedroomSpacious,
  },
  Dining: {
    Modern: diningModern,
    Minimal: diningMinimal,
    Classic: diningClassic,
    Contemporary: diningContemporary,
    Luxury: diningLuxury,
    Theater: diningTheater,
    Compact: diningCompact,
    Medium: diningMedium,
    Spacious: diningSpacious,
  },
  Office: {
    Modern: officeModern,
    Minimal: officeMinimal,
    Classic: officeClassic,
    Contemporary: officeContemporary,
    Luxury: officeLuxury,
    Theater: officeTheater,
    Compact: officeCompact,
    Medium: officeMedium,
    Spacious: officeSpacious,
  },
  Study: {
    Modern: studyModern,
    Minimal: studyMinimal,
    Classic: studyClassic,
    Contemporary: studyContemporary,
    Luxury: studyLuxury,
    Theater: studyTheater,
    Compact: studyCompact,
    Medium: studyMedium,
    Spacious: studySpacious,
  },
  Custom: {
    Modern: customModern,
    Minimal: customMinimal,
    Classic: customClassic,
    Contemporary: customContemporary,
    Luxury: customLuxury,
    Theater: customTheater,
    Compact: customCompact,
    Medium: customMedium,
    Spacious: customSpacious,
  },
};

/** Styles shown for a given room — imagery is always that room's own. */
export function stylesFor(room: RoomId): Option[] {
  return STYLE_IDS.map((id) => ({ id, note: STYLE_NOTES[id]!, img: IMAGES[room][id]! }));
}

/** Scales shown for a given room — imagery is always that room's own. */
export function scalesFor(room: RoomId): Option[] {
  return SCALE_IDS.map((id) => ({ id, note: SCALE_NOTES[id]!, img: IMAGES[room][id]! }));
}
