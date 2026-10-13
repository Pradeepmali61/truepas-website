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
        image: "industries/enroll-at-home",
        alt: "Man relaxing on a sofa enrolling his face in the TruePas app on his phone",
      },
      {
        title: "ID Verification",
        text: "A quick face check against their ID confirms who the patient is, so staff skip the paperwork and manual checks.",
        image: "users/step-verify-identity",
        alt: "Phone showing a TruePas face check to verify identity, with an ID document behind",
      },
      {
        title: "Patient-Controlled Consent",
        text: "Patients approve sharing their identity with your practice, and can review or withdraw that consent at any time.",
        image: "users/feature-consent",
        alt: "Phone showing TruePas privacy settings with consent toggles per industry",
      },
      {
        title: "Kiosk Appointment Check-In",
        text: "A glance at the kiosk confirms the patient and their appointment, easing queues at the front desk.",
        image: "industries/identity-kiosk",
        alt: "Biometric kiosk showing a verified face among many faces",
      },
      {
        title: "Right Patient, Right Record",
        text: "Verified identity documents link each visit to the correct patient, reducing mix-ups and duplicate records.",
        image: "users/feature-documents",
        alt: "Phone showing the TruePas documents screen with verified identity documents",
      },
      {
        title: "Pharmacy Pickup",
        text: "A glance at the pharmacy counter confirms the right patient is collecting the right prescription.",
        image: "users/step-ready",
        alt: "Phone showing the TruePas home screen with a verified profile",
      },
    ],
  },
} satisfies Industry;
