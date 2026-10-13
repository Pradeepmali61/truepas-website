import type { Industry } from "./types";

export default {
  label: "Car Rentals",
  title: "From Booking to Keys, in Seconds",
  intro:
    "Renters verify their identity and licence once, then skip the counter at every pickup. Your team spends less time on paperwork and more time getting customers on the road.",
  heroImage: "enterprises/industry-car-rentals",
  heroAlt: "Customer verifying their identity at a car rental counter as the agent hands over the keys",
  contact: "car-rentals",
  journey: {
    label: "Renter Journey",
    title: "One Glance From Booking to Return",
    intro: "See how a TruePas renter moves through your pickup process, and what changes for your teams at each step.",
    steps: [
      {
        title: "Book and Link Once",
        text: "Renters enroll in the TruePas app or at a kiosk, link their licence to the booking and approve sharing with you.",
        image: "industries/car-rentals-1-book-link",
        alt: "Renter on a sofa approving identity sharing for a car booking in the TruePas app",
      },
      {
        title: "Licence & ID Verification",
        text: "A quick face check against the renter's ID confirms who is driving before they ever reach your branch.",
        image: "industries/car-rentals-2-licence-check",
        alt: "TruePas app confirming a liveness check and licence verification, licence and keys on the table",
      },
      {
        title: "Skip the Queue",
        text: "Verified renters head straight to pickup, so the counter is free for customers who need extra help.",
        image: "industries/car-rentals-3-skip-queue",
        alt: "Verified renter walking past the rental counter queue towards the pickup area",
      },
      {
        title: "Key Handover",
        text: "At the desk or kiosk, a facial scan matches the renter to the booking and releases the keys without paperwork.",
        image: "industries/car-rentals-4-key-handover",
        alt: "Rental agent handing over car keys after TruePas verifies the customer at the desk",
      },
      {
        title: "Exit Gate",
        text: "Drivers are recognised at the lot barrier, which lifts automatically once the rental is confirmed.",
        image: "industries/car-rentals-5-exit-gate",
        alt: "Driver verified by a TruePas terminal as the car park exit barrier rises",
      },
      {
        title: "Returns & Loyalty",
        text: "Each rental is logged to the renter's profile, so returns are simple and loyalty benefits apply automatically.",
        image: "industries/car-rentals-6-returns",
        alt: "Return attendant confirming a car return on a TruePas device as the renter steps out",
      },
    ],
  },
} satisfies Industry;
