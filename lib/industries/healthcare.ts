import type { Industry } from "./types";

export default {
  label: "Healthcare Providers",
  title: "Right Patient, Right Care, Every Time",
  intro:
    "Patients verify their identity once and are recognised instantly at every visit. From registration to pharmacy pickup, one glance replaces the forms, cards and repeated questions.",
  heroImage: "enterprises/industry-healthcare",
  heroAlt: "Patient checking in at a hospital reception with identity verification",
  contact: "healthcare",
  journey: {
    label: "Patient Journey",
    title: "One Face Across Every Visit",
    intro: "See how a TruePas patient moves through your facility, and what changes for your teams at each step.",
    steps: [
      {
        title: "Register From Home",
        text: "Patients enroll in the TruePas app from home or at a kiosk on arrival, so nobody fills in forms at the desk.",
        image: "industries/healthcare-1-register",
        alt: "Patient on a sofa scanning their face in the TruePas app to enroll",
      },
      {
        title: "ID Verification",
        text: "A quick face check against their ID confirms who the patient is, so staff skip the paperwork and manual checks.",
        image: "industries/healthcare-2-id-check",
        alt: "TruePas app confirming an ID check at the kitchen table, the ID card beside the phone",
      },
      {
        title: "Patient-Controlled Consent",
        text: "Patients approve sharing their identity with your practice, and can review or withdraw that consent at any time.",
        image: "industries/healthcare-3-consent",
        alt: "Patient at home deciding whether to share their identity with a clinic in the TruePas app",
      },
      {
        title: "Kiosk Appointment Check-In",
        text: "A glance at the kiosk confirms the patient and their appointment, easing queues at the front desk.",
        image: "industries/healthcare-4-kiosk",
        alt: "Older patient checked in at a clinic TruePas kiosk as a nurse looks on",
      },
      {
        title: "Right Patient, Right Record",
        text: "Verified identity documents link each visit to the correct patient, reducing mix-ups and duplicate records.",
        image: "industries/healthcare-5-record",
        alt: "Doctor with a patient whose identity TruePas has verified on the desk device and screen",
      },
      {
        title: "Pharmacy Pickup",
        text: "A glance at the pharmacy counter confirms the right patient is collecting the right prescription.",
        image: "industries/healthcare-6-pharmacy",
        alt: "Pharmacist handing over a prescription after TruePas verifies the patient at the counter",
      },
    ],
  },
} satisfies Industry;
