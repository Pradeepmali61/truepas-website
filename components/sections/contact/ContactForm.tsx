"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useId, useState, type FormEvent } from "react";
import { industries, inquiryTypes, slug } from "@/lib/contact";

type Values = {
  fullName: string;
  workEmail: string;
  company: string;
  phone: string;
  industry: string;
  inquiryType: string;
  message: string;
  consent: boolean;
  /** Honeypot: hidden from people, filled in by bots */
  companyWebsite: string;
};
type Field = keyof Values;
type Status = "idle" | "submitting" | "success" | "error";

// Inquiries are emailed to the TruePas inbox through FormSubmit (formsubmit.co, no account). It must be called
// from the visitor's browser: it blocks server requests (e.g. from Vercel). Each new domain triggers a one-time
// "Activate Form" email to this inbox, and inquiries from that domain fail until its link is clicked.
const INBOX = "truepasai@gmail.com";
const FAILED = "The inquiry could not be delivered. Please try again later or use Book a Demo.";

const initial: Values = { fullName: "", workEmail: "", company: "", phone: "", industry: "", inquiryType: "", message: "", consent: false, companyWebsite: "" };

const inputs: { name: Field; label: string; type?: string; autoComplete: string; optional?: boolean }[] = [
  { name: "fullName", label: "Full Name", autoComplete: "name" },
  { name: "workEmail", label: "Work Email", type: "email", autoComplete: "email" },
  { name: "company", label: "Company / Organization", autoComplete: "organization" },
  { name: "phone", label: "Phone Number", type: "tel", autoComplete: "tel", optional: true },
];
const selects: { name: Field; label: string; placeholder: string; options: string[] }[] = [
  { name: "industry", label: "Industry", placeholder: "Select an industry", options: industries },
  { name: "inquiryType", label: "Inquiry Type", placeholder: "Select an inquiry type", options: inquiryTypes },
];

function validate(v: Values) {
  const e: Partial<Record<Field, string>> = {};
  if (!v.fullName.trim()) e.fullName = "Enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(v.workEmail)) e.workEmail = "Enter a valid work email address.";
  if (!v.company.trim()) e.company = "Enter your company or organization.";
  if (v.phone && !/^\+?[0-9\s().-]{7,20}$/.test(v.phone)) e.phone = "Enter a valid phone number or leave this field blank.";
  if (!v.industry) e.industry = "Select your industry.";
  if (!v.inquiryType) e.inquiryType = "Select an inquiry type.";
  if (v.message.trim().length < 20) e.message = "Tell us a little more about your requirements.";
  if (!v.consent) e.consent = "Consent is required to submit this inquiry.";
  return e;
}

const control =
  "w-full rounded-lg border border-line-2 bg-white px-[15px] text-base text-ink outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,122,255,0.12)] aria-invalid:border-danger";
const statusStyles = {
  success: "mb-4 rounded-lg border border-[#1f9d61] bg-[#edf9f3] px-3.5 py-3 text-sm font-medium text-[#14663f]",
  error: "mb-4 rounded-lg border border-danger bg-[#fff1f1] px-3.5 py-3 text-sm font-medium text-[#9a1f1f]",
};

// Message hints for an industry preselected from an Industry Solutions CTA. Drafts pending client review
const industryHints: Record<string, string> = {
  Aviation: "Which touchpoints do you want to streamline? e.g. check-in, security, lounge entry or boarding",
  Hospitality: "Which touchpoints do you want to streamline? e.g. pre-arrival check-in, room access or check-out",
  "Car Rentals": "Which touchpoints do you want to streamline? e.g. license verification, counter-free pickup or returns",
  "Theme Parks": "Which touchpoints do you want to streamline? e.g. park entry, season passes or ride access",
  "Cruise Operations": "Which touchpoints do you want to streamline? e.g. terminal check-in, embarkation or cabin entry",
  "Stadiums & Entertainment Venues": "Which touchpoints do you want to streamline? e.g. gate entry, VIP areas or staff access",
  Healthcare: "Which touchpoints do you want to streamline? e.g. patient registration, appointment check-in or pharmacy pickup",
};

// Links can preselect the industry and inquiry type with their slugs, e.g. /contact?industry=aviation&inquiry=request-demo#inquiry
const fromSlug = (options: string[], param: string | null) => options.find((o) => slug(o) === param) ?? "";

type Prefill = Pick<Values, "industry" | "inquiryType">;
const empty: Prefill = { industry: "", inquiryType: "" };

function PrefilledForm() {
  const params = useSearchParams();
  // Keyed by the query so a new prefill (e.g. from the chat assistant while already on /contact) resets the form
  return (
    <InquiryForm
      key={params.toString()}
      prefill={{ industry: fromSlug(industries, params.get("industry")), inquiryType: fromSlug(inquiryTypes, params.get("inquiry")) }}
    />
  );
}

// The query string is only known in the browser, so the static HTML carries the empty form until it is read
export default function ContactForm() {
  return (
    <Suspense fallback={<InquiryForm prefill={empty} />}>
      <PrefilledForm />
    </Suspense>
  );
}

function InquiryForm({ prefill }: { prefill: Prefill }) {
  const id = useId();
  const [values, setValues] = useState({ ...initial, ...prefill });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const update = <K extends Field>(field: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  // Shared aria wiring for a field and its error message
  const a11y = (field: Field) => ({
    id: `${id}-${field}`,
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `${id}-${field}-error` : undefined,
  });
  const error = (field: Field) =>
    errors[field] && (
      <span id={`${id}-${field}-error`} className="text-[13px] text-danger">
        {errors[field]}
      </span>
    );

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus("error");
      setMessage("Please review the highlighted fields.");
      return;
    }
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${INBOX}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `TruePas inquiry: ${values.inquiryType} from ${values.fullName} (${values.company})`,
          _replyto: values.workEmail,
          _template: "table",
          _captcha: "false",
          // FormSubmit drops submissions whose _honey field is filled in
          _honey: values.companyWebsite,
          Name: values.fullName,
          Email: values.workEmail,
          Company: values.company,
          Phone: values.phone || "-",
          Industry: values.industry,
          "Inquiry type": values.inquiryType,
          Message: values.message,
        }),
      });
      // FormSubmit answers { success: "true" | "false", message }
      const result = (await res.json()) as { success?: string | boolean; message?: string };
      if (!res.ok || String(result.success) !== "true") throw new Error(result.message);
      setStatus("success");
      setMessage("Your inquiry has been sent.");
      setValues({ ...initial, ...prefill });
    } catch (err) {
      console.error("Contact form delivery failed:", err);
      setStatus("error");
      setMessage(FAILED);
    }
  }

  return (
    <form id="inquiry" noValidate onSubmit={submit} className="scroll-mt-24 rounded-2xl border border-line/75 bg-white p-7 shadow-card-strong md:p-10">
      <h2 className="mb-2 text-2xl leading-8 font-semibold">Send an Inquiry</h2>
      <p className="mb-[26px] text-base leading-6 text-ink-3">Complete the form and the TruePas team will review your requirements.</p>

      <div role="status" aria-live="polite" className={status === "success" || status === "error" ? statusStyles[status] : "sr-only"}>
        {message}
      </div>

      <div className="grid gap-[18px] md:grid-cols-2">
        {inputs.map((f) => (
          <div key={f.name} className="flex flex-col gap-[7px]">
            <label htmlFor={`${id}-${f.name}`} className="text-sm font-semibold">
              {f.label} {f.optional && <span className="font-normal text-ink-3">(optional)</span>}
            </label>
            <input
              {...a11y(f.name)}
              type={f.type ?? "text"}
              autoComplete={f.autoComplete}
              value={values[f.name] as string}
              onChange={(e) => update(f.name, e.target.value)}
              className={`${control} h-12`}
            />
            {error(f.name)}
          </div>
        ))}
        {selects.map((f) => (
          <div key={f.name} className="flex flex-col gap-[7px]">
            <label htmlFor={`${id}-${f.name}`} className="text-sm font-semibold">
              {f.label}
            </label>
            <select {...a11y(f.name)} value={values[f.name] as string} onChange={(e) => update(f.name, e.target.value)} className={`${control} h-12`}>
              <option value="">{f.placeholder}</option>
              {f.options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            {error(f.name)}
          </div>
        ))}
      </div>

      <div className="mt-[18px] flex flex-col gap-[7px]">
        <label htmlFor={`${id}-message`} className="text-sm font-semibold">
          Message
        </label>
        <textarea
          {...a11y("message")}
          placeholder={
            values.inquiryType === "API Integration" ? "Which systems should TruePas connect with? e.g. your PMS, ticketing or CRM platform" : industryHints[values.industry]
          }
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          className={`${control} min-h-[132px] resize-y py-3`}
        />
        {error("message")}
      </div>

      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor={`${id}-companyWebsite`}>Company Website</label>
        <input id={`${id}-companyWebsite`} tabIndex={-1} autoComplete="off" value={values.companyWebsite} onChange={(e) => update("companyWebsite", e.target.value)} />
      </div>

      <div className="mt-5 flex flex-col gap-[7px]">
        <label htmlFor={`${id}-consent`} className="flex gap-2.5 text-sm leading-[22px] text-ink-3">
          <input
            {...a11y("consent")}
            type="checkbox"
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
            className="mt-0.5 size-[18px] shrink-0 accent-primary"
          />
          <span>
            I agree that TruePas may process the information provided to respond to my inquiry. See the{" "}
            <Link href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </Link>{" "}
            for details.
          </span>
        </label>
        {error("consent")}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-base leading-6 font-semibold text-white transition-colors hover:bg-[#006ae0] focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "Sending Inquiry…" : "Send Inquiry"}
      </button>
    </form>
  );
}
