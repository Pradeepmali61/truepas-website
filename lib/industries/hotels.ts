import type { Industry } from "./types";

export default {
  label: "Hotels",
  title: "Check In Before You Arrive",
  intro:
    "Guests confirm their identity ahead of arrival and walk straight to their room. From then on, one glance replaces the ID, the paperwork and the key card.",
  heroImage: "enterprises/industry-hotels",
  heroAlt: "Guest verifying their identity on a device at hotel reception as the receptionist welcomes them",
  contact: "hospitality",
  journey: {
    label: "Guest Journey",
    title: "One Face for the Whole Stay",
    intro: "See how a TruePas guest moves through your hotel, and what changes for your teams at each step.",
    steps: [
      {
        title: "Book and Link Identity",
        text: "Guests enroll in the TruePas app or at a kiosk, link their reservation and approve sharing with the hotel.",
        image: "industries/hotels-1-book-link",
        alt: "Guest beside an open suitcase approving identity sharing for a hotel booking in the TruePas app",
      },
      {
        title: "Pre-Arrival Check-In",
        text: "Guests confirm their details from their phone before they travel, so arrival is quick and friendly.",
        image: "industries/hotels-2-pre-arrival",
        alt: "Traveler in a taxi seeing their completed hotel check-in in the TruePas app",
      },
      {
        title: "Front Desk Welcome",
        text: "Guests are recognized and greeted by name at the desk, with no ID or card needed to hand over.",
        image: "industries/hotels-3-front-desk",
        alt: "Receptionist welcoming a guest verified by TruePas at a marble front desk",
      },
      {
        title: "Room & Floor Access",
        text: "A glance at the door reader opens the guest's floor and room, with no plastic key card to collect.",
        image: "industries/hotels-4-room-access",
        alt: "Guest at their room door as a TruePas reader verifies them and the lock turns green",
      },
      {
        title: "Spa, Gym & Lounge Access",
        text: "A glance confirms who is staying, so guests walk into the spa, gym and lounge without a key card or room number.",
        image: "industries/hotels-5-spa-gym",
        alt: "Guest with a towel entering the hotel fitness and spa after a TruePas reader verifies them",
      },
      {
        title: "Express Check-Out",
        text: "A glance at the desk or kiosk confirms the guest at check-out, and their room access ends automatically.",
        image: "industries/hotels-6-check-out",
        alt: "Guest checking out at a TruePas kiosk in the hotel lobby",
      },
    ],
  },
} satisfies Industry;
