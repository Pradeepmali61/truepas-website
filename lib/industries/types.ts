export type JourneyStep = {
  title: string;
  text: string;
  /** Path under public/images, without the .webp extension */
  image: string;
  alt: string;
};

export type Industry = {
  label: string;
  title: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  /** Contact form industry slug, see ContactForm */
  contact: string;
  journey: { label: string; title: string; intro: string; steps: JourneyStep[] };
};
