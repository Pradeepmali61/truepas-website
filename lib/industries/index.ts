import airports from "./airports";
import carRentals from "./car-rentals";
import cruise from "./cruise";
import healthcare from "./healthcare";
import hotels from "./hotels";
import themeParks from "./theme-parks";
import venues from "./venues";

export type { Industry, JourneyStep } from "./types";

// Industry pages aren't in Figma; the copy is a draft pending client review. Images are reused from the
// Enterprises and Users pages (plus unused deliveries) until the client sends a dedicated set for each journey.
// Keys are the /industries/<slug> routes
export const industries = {
  airports,
  "car-rentals": carRentals,
  hotels,
  "theme-parks": themeParks,
  cruise,
  venues,
  healthcare,
};
