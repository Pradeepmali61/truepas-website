import type { Industry } from "./types";

export default {
  label: "Airports & Airlines",
  title: "From Curb to Gate, Without the Wait",
  intro:
    "Passengers link their identity to their trip before they ever reach the airport. From then on, one glance replaces the passport and boarding pass at every checkpoint.",
  heroImage: "enterprises/industry-airports",
  heroAlt: "Traveler verifying their identity on a check-in device while airline staff assist",
  contact: "aviation",
  journey: {
    label: "Passenger Journey",
    title: "One Face at Every Checkpoint",
    intro: "See how a TruePas passenger moves through your terminal, and what changes for your teams at each step.",
    steps: [
      {
        title: "Link Identity to the Trip",
        text: "Passengers enroll once in the TruePas app or at a kiosk, link their booking and approve sharing with the airline.",
        image: "industries/airports-1-link-trip",
        alt: "Traveler at home approving identity sharing with their airline in the TruePas app",
      },
      {
        title: "Self-Service Check-In",
        text: "A face scan at the kiosk finds the booking, checks the passenger in and prints bag tags in seconds.",
        image: "industries/airports-2-self-check-in",
        alt: "Passenger checking in at a TruePas kiosk as her bag tag prints",
      },
      {
        title: "Bag Drop & Desk Verification",
        text: "Agents see a verified identity on screen, so bags are dropped without passport checks or manual lookups.",
        image: "industries/airports-3-bag-drop",
        alt: "Passenger dropping a suitcase at a counter while TruePas verifies his identity",
      },
      {
        title: "Faster Security",
        text: "Biometric e-gates confirm identity at the security lane, so officers focus on screening, not documents.",
        image: "industries/airports-4-security",
        alt: "Passenger walking through a TruePas e-gate at airport security",
      },
      {
        title: "Lounge Entry",
        text: "Eligible passengers are recognized at the lounge desk and welcomed by name, with access confirmed instantly.",
        image: "industries/airports-5-lounge",
        alt: "Lounge host welcoming a traveler verified by TruePas at the desk",
      },
      {
        title: "Gate & Boarding",
        text: "A glance at the e-gate boards the passenger and updates the flight manifest in real time.",
        image: "industries/airports-6-boarding",
        alt: "Passenger boarding through a TruePas e-gate with the aircraft at the jet bridge",
      },
    ],
  },
} satisfies Industry;
