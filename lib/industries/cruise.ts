import type { Industry } from "./types";

export default {
  label: "Cruise Lines",
  title: "From Terminal to Deck, Effortlessly",
  intro:
    "Passengers verify once before sailing and move through embarkation and every port with ease. From then on, one glance replaces the passport and cruise card at every step of the voyage.",
  heroImage: "enterprises/industry-cruise",
  heroAlt: "Passenger verifying their identity at a cruise terminal gate with the ship outside",
  contact: "cruise-operations",
  journey: {
    label: "Passenger Journey",
    title: "One Face, Dock to Deck",
    intro: "See how a TruePas passenger moves from booking to disembarkation, and what changes for your crew at each step.",
    steps: [
      {
        title: "Enroll Before Sailing",
        text: "Passengers enroll in the TruePas app before sailing, or at the terminal, and approve sharing with the cruise line.",
        image: "industries/cruise-1-enroll",
        alt: "Couple packed for a cruise approving identity sharing with the cruise line in the TruePas app",
      },
      {
        title: "Documents Checked Once",
        text: "Passports and travel documents are verified in advance, so your passenger manifest is ready before arrival.",
        image: "industries/cruise-2-documents",
        alt: "TruePas app confirming a passport check at home, the passport on the table",
      },
      {
        title: "Terminal Check-In & Embarkation",
        text: "A glance at the terminal gate confirms the passenger, so boarding moves smoothly without paper checks.",
        image: "industries/cruise-3-embarkation",
        alt: "Couple verified by TruePas at a cruise terminal e-gate with the ship outside",
      },
      {
        title: "Onboard Access & Cabin Entry",
        text: "The same verified identity opens cabin doors and restricted areas, with no keycards to lose or share.",
        image: "industries/cruise-4-cabin",
        alt: "Passenger at their cabin door as a TruePas reader verifies them and the lock turns green",
      },
      {
        title: "Shore Excursions & Re-Boarding",
        text: "Face checks at the gangway log every passenger off and back on, keeping the manifest accurate at each port.",
        image: "industries/cruise-5-shore",
        alt: "Crew member confirming a passenger back on board after a TruePas check at the gangway",
      },
      {
        title: "Disembarkation",
        text: "At the end of the voyage, passengers leave the ship with a glance and the manifest closes without paper checks.",
        image: "industries/cruise-6-disembark",
        alt: "Family with suitcases leaving the ship through TruePas exit gates towards the terminal",
      },
    ],
  },
} satisfies Industry;
