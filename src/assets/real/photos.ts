import heroShowroom from "./hero-showroom.jpg";
import bedroomRoyalNavy from "./bedroom-royal-navy.jpg";
import livingBeigeArmchairs from "./living-beige-armchairs.jpg";
import bedroomCarvedGold from "./bedroom-carved-gold.jpg";
import bedroomModernNavy from "./bedroom-modern-navy.jpg";

import livingGreySectional from "./living-grey-sectional.jpg";
import diningPeachMarble from "./dining-peach-marble.jpg";
import officeDirectorDesk from "./office-director-desk.jpg";
import officeWorkstation from "./office-workstation.jpg";
import bedroomSleighBench from "./bedroom-sleigh-bench.jpg";

import customSwing from "./custom-swing.jpg.asset.json";
import officeConference from "./office-conference.jpg.asset.json";
import logoMark from "./logo-mark.jpg.asset.json";
import awardTrophy from "./award-trophy-2024.jpg";
import awardCeremony from "./award-ceremony.jpg";
import awardTeam from "./award-team.jpg";

/** Real Heaven Furniture Mart photography, served from local assets. */
export const photo = {
  heroShowroom,
  bedroomRoyalNavy,
  livingBeigeArmchairs,
  bedroomCarvedGold,
  bedroomModernNavy,

  livingGreySectional,
  diningPeachMarble,
  officeDirectorDesk,
  officeWorkstation,
  bedroomSleighBench,

  bedroomVelvet: bedroomRoyalNavy,
  bedroomClassic: bedroomCarvedGold,
  bedroomNavy: bedroomModernNavy,
  bedroomSleigh: bedroomSleighBench,
  livingTeal: heroShowroom,
  livingBeige: livingBeigeArmchairs,
  livingGold: bedroomCarvedGold,
  livingGrey: livingGreySectional,
  diningMarble: diningPeachMarble,
  officeDirector: officeDirectorDesk,
  officeCorporate: officeWorkstation,

  customSwing: customSwing.url,
  officeConference: officeConference.url,
  logoMark: logoMark.url,
  awardTrophy: awardTrophy,
  awardCeremony: awardCeremony,
  awardTeam: awardTeam,
} as const;
