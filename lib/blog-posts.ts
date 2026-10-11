// Draft posts so the Blogs pages can be reviewed; replace with the client's articles when they arrive
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO date
  readMinutes: number;
  /** Cover photo, reused from the site's own images until the client sends article artwork */
  image: string;
  imageAlt: string;
  body: { heading?: string; text: string }[];
};

export const posts: BlogPost[] = [
  {
    slug: "why-one-biometric-identity",
    title: "Why One Reusable Biometric Identity Beats a Wallet Full of Cards",
    excerpt: "Every check-in still asks customers to prove who they are from scratch. Here is what changes when identity is verified once and reused everywhere.",
    category: "Identity",
    date: "2026-10-01",
    readMinutes: 4,
    image: "/images/enterprises/step-enroll.webp",
    imageAlt: "Traveller holding a phone showing his TruePas digital identity",
    body: [
      { text: "Hotels, airports, car rental desks and venues each ask for the same proof of identity, again and again. Customers queue, staff check documents by hand, and the business learns nothing it didn't already know." },
      { heading: "Verify once, reuse everywhere", text: "With TruePas, a customer enrolls once in the app: their ID document is verified and linked to a secure face template. At any TruePas-enabled location, a quick face scan confirms it is really them, in seconds." },
      { heading: "Less friction, fewer errors", text: "Removing repeated manual checks shortens queues at peak times and frees staff for the moments that need a human touch. It also removes the gaps that document fraud relies on." },
      { heading: "The customer stays in control", text: "Customers choose which industries can use their identity, see every verification in their activity log, and can opt out and delete their data at any time." },
    ],
  },
  {
    slug: "biometric-privacy-explained",
    title: "Biometric Privacy, Explained: How TruePas Protects Your Face Data",
    excerpt: "What is stored, what is never stored, and who can see it. A plain-language guide to privacy in biometric verification.",
    category: "Privacy & Security",
    date: "2026-09-24",
    readMinutes: 5,
    image: "/images/users/step-approve-data.webp",
    imageAlt: "TruePas app screen asking the user to review and approve how their data is used",
    body: [
      { text: "Trust is the foundation of biometric identity. People rightly want to know what happens to their face data before they use it." },
      { heading: "Templates, not photos", text: "TruePas converts a face scan into an encrypted mathematical template. The template is used to match a person at verification time and cannot be turned back into a photo." },
      { heading: "Consent per industry", text: "Customers decide, industry by industry, where their identity can be used. A hotel never sees what an airport saw, and nothing is shared without consent." },
      { heading: "Delete any time", text: "Opting out removes the customer's biometric template and personal data from TruePas, following the retention rules set out in our Privacy Policy." },
    ],
  },
  {
    slug: "faster-check-ins-at-peak-times",
    title: "Five Ways Faster Check-Ins Improve the Guest Experience at Peak Times",
    excerpt: "From cruise terminals to stadium gates, shaving seconds off each check-in adds up to shorter queues and happier guests.",
    category: "Industry",
    date: "2026-09-15",
    readMinutes: 3,
    image: "/images/enterprises/industry-cruise.webp",
    imageAlt: "Cruise passenger checking in at a TruePas kiosk in the terminal",
    body: [
      { text: "Peak times are where customer experience is won or lost. A few seconds saved per guest becomes minutes saved per queue." },
      { heading: "1. Shorter queues", text: "Face verification takes seconds, so lines move faster without adding staff." },
      { heading: "2. A consistent experience", text: "Every location follows the same verification flow, so guests know what to expect." },
      { heading: "3. Staff focus on service", text: "With identity checks automated, teams can spend their time helping guests." },
      { heading: "4. Fewer errors", text: "Automated matching removes the mistakes that come with manual document checks." },
      { heading: "5. Recognition that feels personal", text: "Guests are recognised and welcomed by name, from the first visit to the hundredth." },
    ],
  },
];

