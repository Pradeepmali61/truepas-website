import type { Industry } from "./types";

export default {
  label: "Stadiums & Entertainment Venues",
  title: "Doors Open, Lines Disappear",
  intro:
    "Fans link their tickets to their identity and walk in without searching for a phone or paper ticket. From then on, one glance opens every door in your venue.",
  heroImage: "enterprises/industry-stadiums",
  heroAlt: "Fan verifying their identity and ticket at a stadium entrance with venue staff",
  contact: "stadiums-entertainment-venues",
  journey: {
    label: "Fan Journey",
    title: "One Face, Every Door",
    intro: "See how a TruePas fan moves through your venue, and what changes for your teams at each step.",
    steps: [
      {
        title: "Link Tickets to Identity",
        text: "Fans enroll in the TruePas app or at the venue, link their tickets and approve sharing with the venue.",
        image: "industries/venues-1-link-tickets",
        alt: "Fan at home approving identity sharing for a match ticket in the TruePas app",
      },
      {
        title: "Ticket Validation",
        text: "Each ticket belongs to a verified person, which shuts out touting and unauthorised resale before the event.",
        image: "industries/venues-2-ticket-validation",
        alt: "Fan outside the stadium at dusk with a ticket linked to their identity in the TruePas app",
      },
      {
        title: "Gate Entry",
        text: "A quick glance at the gate confirms the fan and their ticket, so queues keep moving without paper or phones.",
        image: "industries/venues-3-gate-entry",
        alt: "Fans walking through stadium turnstiles at dusk as TruePas verifies each of them",
      },
      {
        title: "VIP & Hospitality Areas",
        text: "Premium guests are recognised on arrival and welcomed by name, with access confirmed without a lanyard or list.",
        image: "industries/venues-4-vip",
        alt: "Host welcoming a guest verified by TruePas at a stadium hospitality lounge",
      },
      {
        title: "Step Out and Back In",
        text: "Fans step out at half-time or between sets and re-enter with the same glance, with no pass-outs or hand stamps.",
        image: "industries/venues-5-re-entry",
        alt: "Fan re-entering the stadium concourse through a TruePas gate at half-time",
      },
      {
        title: "The Next Event",
        text: "For the next match, concert or film, fans just link the new ticket, with no need to enroll or verify again.",
        image: "industries/venues-6-next-event",
        alt: "Fan entering a concert arena through a TruePas gate as the stage lights glow",
      },
    ],
  },
} satisfies Industry;
