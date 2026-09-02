import heroShowroom from "./hero-showroom.jpg";
import bedroomRoyalNavy from "./bedroom-royal-navy.jpg";
import livingBeigeArmchairs from "./living-beige-armchairs.jpg";
import bedroomCarvedGold from "./bedroom-carved-gold.jpg";
import bedroomModernNavy from "./bedroom-modern-navy.jpg";

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

  bedroomVelvet: bedroomRoyalNavy,
  bedroomClassic: bedroomCarvedGold,
  bedroomNavy: bedroomModernNavy,
  livingTeal: heroShowroom,
  livingBeige: livingBeigeArmchairs,
  livingGold: bedroomCarvedGold,

  customSwing: customSwing.url,
  officeConference: officeConference.url,
  logoMark: logoMark.url,
  awardTrophy: awardTrophy,
  awardCeremony: awardCeremony,
  awardTeam: awardTeam,
} as const;
