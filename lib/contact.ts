// Options of the Contact page inquiry form, shared with the chat assistant's open_contact_form action
export const industries = ["Aviation", "Hospitality", "Car Rentals", "Theme Parks", "Cruise Operations", "Stadiums & Entertainment Venues", "Healthcare", "Other"];
export const inquiryTypes = ["Request Demo", "Enterprise Partnership", "API Integration", "Technical Support", "General Inquiry"];

// "Stadiums & Entertainment Venues" -> "stadiums-entertainment-venues"
export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/** Contact form link with the industry and inquiry type preselected, e.g. /contact?industry=aviation&inquiry=request-demo#inquiry */
export function contactHref({ industry, inquiryType }: { industry?: string; inquiryType?: string }) {
  const params = new URLSearchParams();
  if (industry) params.set("industry", slug(industry));
  if (inquiryType) params.set("inquiry", slug(inquiryType));
  return `/contact?${params}#inquiry`;
}
