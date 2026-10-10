// Contact form delivery. Submissions are forwarded to CONTACT_WEBHOOK_URL (a CRM or automation
// webhook); until it is set the form shows a clear error instead of pretending the message was sent.
type Payload = {
  fullName?: string;
  workEmail?: string;
  company?: string;
  phone?: string;
  industry?: string;
  inquiryType?: string;
  message?: string;
  consent?: boolean;
  companyWebsite?: string;
};

const reply = (ok: boolean, message: string, status = 200) => Response.json({ ok, message }, { status });

export async function POST(request: Request) {
  let p: Payload;
  try {
    p = (await request.json()) as Payload;
  } catch {
    return reply(false, "The inquiry could not be processed.", 400);
  }

  // Honeypot filled in: a bot
  if (p.companyWebsite) return reply(false, "The inquiry could not be submitted.", 400);

  const required = [p.fullName, p.workEmail, p.company, p.industry, p.inquiryType, p.message];
  if (required.some((v) => typeof v !== "string" || !v.trim()) || !p.consent || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.workEmail ?? "")) {
    return reply(false, "Please complete all required fields correctly.", 400);
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return reply(false, "Contact delivery is not configured yet. Please use Book a Demo instead.", 503);

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submittedAt: new Date().toISOString(),
        fullName: p.fullName,
        workEmail: p.workEmail,
        company: p.company,
        phone: p.phone ?? "",
        industry: p.industry,
        inquiryType: p.inquiryType,
        message: p.message,
      }),
    });
    if (!res.ok) return reply(false, "The inquiry could not be delivered. Please try again later.", 502);
  } catch {
    return reply(false, "The inquiry could not be delivered. Please try again later.", 502);
  }

  return reply(true, "Your inquiry has been sent.");
}
