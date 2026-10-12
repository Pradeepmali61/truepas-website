// Contact form delivery: each inquiry is emailed to the TruePas inbox through FormSubmit (formsubmit.co),
// which needs no account. The first submission sends an "Activate Form" email to that inbox; inquiries are
// delivered once the link in it has been clicked.
const TO = "truepasai@gmail.com";

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
const FAILED = "The inquiry could not be delivered. Please try again later or use Book a Demo.";

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

  // FormSubmit rejects requests without a Referer ("open this page through a web server")
  const site = new URL(request.url).origin;
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${TO}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", Referer: `${site}/contact`, Origin: site },
      body: JSON.stringify({
        _subject: `TruePas inquiry: ${p.inquiryType} from ${p.fullName} (${p.company})`,
        _replyto: p.workEmail,
        _template: "table",
        _captcha: "false",
        Name: p.fullName,
        Email: p.workEmail,
        Company: p.company,
        Phone: p.phone || "-",
        Industry: p.industry,
        "Inquiry type": p.inquiryType,
        Message: p.message,
      }),
    });
    // FormSubmit answers { success: "true" | "false", message }
    const body = (await res.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;
    if (!res.ok || String(body?.success) !== "true") {
      console.error("Contact form delivery failed:", res.status, body?.message);
      return reply(false, FAILED, 502);
    }
  } catch (err) {
    console.error("Contact form delivery failed:", err);
    return reply(false, FAILED, 502);
  }

  return reply(true, "Your inquiry has been sent.");
}
