import type { Industry } from "./types";

export default {
  label: "Theme Parks",
  title: "More Rides, Less Waiting",
  intro:
    "Visitors link their tickets and passes to their identity for fast, secure entry all day long. One glance replaces the paper ticket, the pass card and the queue at every gate.",
  heroImage: "enterprises/industry-theme-parks",
  heroAlt: "Family verifying their identity at a theme park entrance gate with a staff member",
  contact: "theme-parks",
  journey: {
    label: "Visitor Journey",
    title: "One Face for the Whole Day",
    intro: "See how a TruePas visitor moves through your park, and what changes for your teams at each step.",
    steps: [
      {
        title: "Link Tickets Before the Visit",
        text: "Visitors enroll in the TruePas app or at the park, link their tickets or season pass and approve sharing with you.",
        image: "industries/theme-parks-1-link-tickets",
        alt: "Parent at the breakfast table approving identity sharing for park tickets in the TruePas app",
      },
      {
        title: "Add the Family",
        text: "Visitors invite the family and friends they are travelling with, so the whole group enters together on arrival.",
        image: "industries/theme-parks-2-family",
        alt: "Family on a sofa with the TruePas Invite screen listing every family member as added",
      },
      {
        title: "Park Entry",
        text: "A glance at the turnstile confirms the ticket and identity, so guests walk in without scanning anything.",
        image: "industries/theme-parks-3-park-entry",
        alt: "Family walking through theme park turnstiles as TruePas verifies each of them",
      },
      {
        title: "Season Pass Validation",
        text: "Passes are tied to a verified face, so they cannot be shared or resold and genuine holders walk straight in.",
        image: "industries/theme-parks-4-season-pass",
        alt: "Season pass holder verified by TruePas at the Season Pass entry lane",
      },
      {
        title: "Rides, Shows & Attractions",
        text: "Visitors are recognised at each attraction entrance, so access is confirmed without tickets or wristbands.",
        image: "industries/theme-parks-5-rides",
        alt: "Teenager verified by TruePas at a roller coaster ride entrance",
      },
      {
        title: "Express Lanes & Re-Entry",
        text: "Express lane holders are recognised at the queue entrance, and guests re-enter the park later with the same glance.",
        image: "industries/theme-parks-6-express-reentry",
        alt: "Couple entering the Express lane at golden hour after a TruePas check",
      },
    ],
  },
} satisfies Industry;
