// Privacy Policy and Terms & Conditions are verbatim from the client's .docx files (9 Oct 2026).
// The Cookie Policy is the truepas-website-pages draft plus the cookie audit of 11 Oct 2026 (local build and
// truepas-blond.vercel.app): the site sets no cookies itself; only the Calendly popup sets third-party ones.

// A string is a paragraph; the objects are sub-headings, lists and a highlighted placeholder box
export type LegalBlock = string | { h3: string } | { ul: string[] } | { ol: string[] } | { box: string[] };

export type LegalSection = {
  title: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  eyebrow: string;
  title: string;
  description: string;
  effective: string;
  updated: string;
  sections: LegalSection[];
};

export const privacyPolicy: LegalDoc = {
  eyebrow: "Privacy & Security",
  title: "Your Privacy Matters",
  description:
    "How TruePas collects, uses, protects and shares personal and biometric information, and the choices you have.",
  effective: "October 9, 2026",
  updated: "October 9, 2026",
  sections: [
    {
      title: "1. Introduction",
      blocks: [
        "TruePas (“TruePas”, “we”, “our”, or “us”) provides a reusable digital identity and biometric verification platform designed to help customers verify their identity at participating businesses and locations.",
        "This Privacy Policy explains how we collect, use, store, disclose, and protect personal information when you:",
        {
          ul: [
            "Visit our public website.",
            "Create or manage an identity using the TruePas customer mobile application.",
            "Enroll in identity verification or use a TruePas-enabled kiosk.",
            "Interact with our customer support or contact us about our services.",
          ],
        },
        "This Privacy Policy does not currently govern the separate TruePas Merchant Portal. Merchant Portal privacy terms will be published separately.",
      ],
    },
    {
      title: "2. Information We May Collect",
      blocks: [
        "The information we collect depends on the features you use, the verification process, and the participating business.",
        { h3: "2.1 Personal and Account Information" },
        "We may collect information such as your name, email address, telephone number, account identifiers, authentication information, and account preferences.",
        { h3: "2.2 Identity Information" },
        "Depending on the enrollment or verification process, we may process identity information you provide or authorize us to access, including identity document details, verification results, and information needed to associate your digital identity with your account.",
        { h3: "2.3 Facial and Biometric Information" },
        "TruePas supports facial identity verification. Where enabled and permitted by applicable law, this may involve processing facial images, facial features, biometric templates, liveness-check information, or other data used to verify that a person is the legitimate account holder.",
        "Biometric information can be sensitive and may be subject to specific legal protections. We use it only for disclosed and authorized purposes, subject to applicable consent requirements and law.",
        "A facial image and a biometric template are not necessarily the same thing. The specific information processed depends on the verification technology and configuration used.",
        { h3: "2.4 Verification and Check-In Information" },
        "When you use a TruePas-enabled kiosk or participating service, we may process:",
        {
          ul: [
            "The date and time of a verification or check-in.",
            "The participating business or location.",
            "Verification outcomes, including successful, unsuccessful, or incomplete attempts.",
            "Relevant session, device, and transaction-reference identifiers.",
            "Information necessary to investigate errors, prevent misuse, or maintain service security.",
          ],
        },
        { h3: "2.5 Device and Technical Information" },
        "We may collect technical information such as device identifiers, application version, IP address, diagnostic logs, security events, and website usage information where necessary for functionality, security, troubleshooting, and service improvement.",
        "Cookies or similar technologies may be used on our website, subject to applicable consent requirements and any cookie preferences we provide.",
        { h3: "2.6 Support and Communications" },
        "If you contact us, we may process your contact details, message contents, and information needed to respond to your request.",
        "Please avoid sending biometric information, identity documents, passwords, or other sensitive information through ordinary email or unsecured support channels unless we specifically provide an appropriate secure method.",
      ],
    },
    {
      title: "3. How We Use Information",
      blocks: [
        "We may use personal information to:",
        {
          ul: [
            "Create, maintain, and secure your TruePas account.",
            "Enroll and manage your reusable digital identity.",
            "Perform identity verification and liveness checks where enabled.",
            "Support check-ins, entry, access, and other authorized workflows at participating businesses.",
            "Communicate verification results to the relevant participating business.",
            "Maintain service reliability and investigate technical issues.",
            "Detect fraud, unauthorized access, duplicate or suspicious activity, and security incidents.",
            "Respond to support requests and account-related inquiries.",
            "Meet legal obligations and establish, exercise, or defend legal claims.",
            "Improve the reliability, security, and usability of our services, where permitted by law.",
          ],
        },
        "We do not use this list to authorize unrelated uses of biometric information. Any additional use must have an appropriate legal basis and, where required, separate notice and consent.",
      ],
    },
    {
      title: "4. Consent and Your Choices",
      blocks: [
        "Where required by law, we will obtain your informed consent before collecting or processing biometric information.",
        "Before a biometric enrollment or verification process, the applicable interface should explain the relevant purpose and provide the necessary consent information.",
        "You may decline optional biometric processing. However, some features that rely on biometric verification may then be unavailable. Where required by applicable law, or where offered by a participating business, an alternative verification method may be available.",
        "Withdrawing consent does not automatically make prior processing unlawful, and we may need to retain certain information where legally permitted or required. We will explain any material limitations associated with withdrawing consent.",
      ],
    },
    {
      title: "5. How Information Is Shared",
      blocks: [
        "We may share information with the following categories of recipients, where necessary and permitted by law.",
        { h3: "5.1 Participating Businesses" },
        "When you use TruePas at a participating business, we may share the verification result, relevant check-in details, and other information necessary to complete the authorized service.",
        "The information shared depends on the specific integration and workflow. We do not intend to provide every participating business with unrestricted access to your TruePas account or biometric information.",
        "Participating businesses may separately process information under their own privacy policies. You should review the applicable business’s privacy notice before using its services.",
        { h3: "5.2 Service Providers" },
        "We may use authorized providers for hosting, infrastructure, security, communications, identity verification, support, and other technical services. Such providers should receive only the information reasonably required for their assigned functions and be subject to appropriate contractual and security controls.",
        { h3: "5.3 Legal and Safety Disclosures" },
        "We may disclose information where reasonably necessary to comply with law, respond to valid legal requests, protect individuals, investigate suspected fraud, or protect the rights, property, and security of TruePas and others.",
        { h3: "5.4 Business Transfers" },
        "Information may be transferred as part of a merger, acquisition, financing, restructuring, or sale of assets, subject to applicable legal requirements and appropriate safeguards.",
        "We do not sell personal information as a product. Any disclosure or use that constitutes a sale or targeted advertising under applicable law will be handled according to the relevant legal requirements and disclosed where required.",
      ],
    },
    {
      title: "6. Data Retention",
      blocks: [
        "We retain personal information only for as long as reasonably necessary for the purposes described in this Policy, subject to applicable legal obligations and legitimate recordkeeping requirements.",
        "Retention periods may differ for:",
        {
          ul: [
            "Account and identity records.",
            "Biometric templates and associated enrollment data.",
            "Verification and check-in records.",
            "Security, audit, and diagnostic logs.",
            "Support communications and legal records.",
          ],
        },
        "The actual retention period depends on the applicable service configuration, contractual requirements, and law. We will establish and communicate specific retention periods for biometric information and other sensitive records through our operational policies and applicable notices.",
        "When information is no longer required, we will take appropriate steps to delete it, securely dispose of it, or irreversibly anonymize it, subject to lawful retention exceptions.",
      ],
    },
    {
      title: "7. Security",
      blocks: [
        "TruePas is designed with privacy and security considerations, which may include encryption, access restrictions, authentication, controlled data sharing, and security monitoring.",
        "We use reasonable technical and organizational safeguards appropriate to the information processed. No system or method of transmission or storage can be guaranteed to be completely secure.",
        "Access to personal and biometric information should be limited to authorized personnel and systems that require it for legitimate functions.",
      ],
    },
    {
      title: "8. International Data Transfers",
      blocks: [
        "TruePas or its service providers may process information in countries other than the country where you reside.",
        "Where personal information is transferred internationally, we will implement the safeguards required by applicable law. The countries involved and the safeguards available may depend on the service and its deployment configuration.",
      ],
    },
    {
      title: "9. Your Privacy Rights",
      blocks: [
        "Depending on your location and applicable law, you may have the right to:",
        {
          ul: [
            "Request access to personal information we hold about you.",
            "Request correction of inaccurate or incomplete information.",
            "Request deletion of eligible personal information.",
            "Withdraw consent where processing relies on consent.",
            "Object to or request restrictions on certain processing.",
            "Request a copy of eligible information in a portable format.",
            "Lodge a complaint with the relevant privacy or data protection authority.",
          ],
        },
        "These rights are subject to applicable legal exceptions and verification requirements.",
        "To submit a request, contact us using the details in Section 13. We may need to verify your identity before processing a request. We will respond within the period required by applicable law.",
      ],
    },
    {
      title: "10. Children’s Privacy",
      blocks: [
        "TruePas is not intended for use by children who are not legally eligible to use the relevant service.",
        "Where a service may be used by a minor, the applicable age requirements, parental or guardian authorization, and biometric processing rules must be established in accordance with local law and the participating business’s requirements.",
        "We do not intend to knowingly process children’s biometric information without the authorizations and safeguards required by applicable law.",
      ],
    },
    {
      title: "11. Third-Party Services and Links",
      blocks: [
        "Our website or applications may link to third-party websites, services, or applications. Those services may operate under their own privacy policies.",
        "TruePas is not responsible for the privacy practices of independent third parties. Review their notices before providing information to them.",
      ],
    },
    {
      title: "12. Changes to This Policy",
      blocks: [
        "We may update this Privacy Policy to reflect changes in our services, technology, legal requirements, or privacy practices.",
        "We will update the effective date when changes are published. Where required by law, we will provide additional notice or obtain consent before implementing material changes.",
      ],
    },
    {
      title: "13. Contact Us",
      blocks: [
        "For privacy questions, requests, or complaints, contact:",
        {
          box: [
            "Organization: [Full legal name of the TruePas operating entity]",
            "Privacy contact: [Privacy team or Data Protection Officer, if appointed]",
            "Email: [Official privacy contact email]",
            "Website: https://truepas-blond.vercel.app/",
          ],
        },
        "Please do not include passwords, full identity document numbers, or biometric information in an initial email.",
      ],
    },
    {
      title: "14. Applicable Law",
      blocks: [
        "This Policy is intended to be interpreted in accordance with applicable privacy and data protection laws. Any jurisdiction-specific rights, notices, or requirements will apply to the extent required by law.",
        // Drafting note from the docx, kept off the live page:
        // "This Policy must be reviewed and finalized against TruePas’s actual data flows and the laws
        // applicable to its operating entities and customers before publication."
      ],
    },
  ],
};

export const termsAndConditions: LegalDoc = {
  eyebrow: "Legal",
  title: "Terms & Conditions",
  description:
    "The terms that govern your use of the TruePas website, mobile app and TruePas-enabled kiosks.",
  effective: "October 9, 2026",
  updated: "October 9, 2026",
  sections: [
    {
      title: "1. Agreement to These Terms",
      blocks: [
        "These Terms & Conditions (“Terms”) govern your access to and use of the TruePas public website, customer mobile application, and TruePas-enabled kiosks.",
        "TruePas provides technology for reusable digital identity and biometric verification to support authorized check-ins, entry, and related services at participating businesses.",
        "By accessing or using the applicable services, you agree to these Terms. If you do not agree, do not use the relevant service.",
        "Service scope: These Terms do not govern the separate TruePas Merchant Portal. Terms applicable to that portal will be provided separately.",
      ],
    },
    {
      title: "2. Eligibility and Account Registration",
      blocks: [
        "You must be legally eligible to use the applicable service under the laws that apply to you.",
        "You agree to provide accurate information when creating or maintaining an account and to update information when reasonably necessary.",
        "You are responsible for protecting your account credentials and for activity performed through your account, except to the extent that applicable law provides otherwise.",
        "You must promptly notify TruePas if you suspect unauthorized access to your account.",
        "We may require additional verification to establish that you are the legitimate account holder or to protect your account from misuse.",
      ],
    },
    {
      title: "3. How TruePas Works",
      blocks: [
        "TruePas enables eligible customers to establish a reusable digital identity and use supported identity verification workflows at participating businesses.",
        "Depending on the service and configuration, these workflows may include:",
        {
          ol: [
            "Creating an account and enrolling an identity.",
            "Providing the notices and consent required for identity or biometric processing.",
            "Completing supported identity verification or liveness checks.",
            "Presenting your identity at a participating kiosk or location.",
            "Receiving a verification outcome that supports an authorized check-in, entry, or service workflow.",
          ],
        },
        "Not every business, location, or workflow supports every feature. Availability depends on the participating business, technical integrations, and applicable requirements.",
        "TruePas does not guarantee that every identity verification attempt will succeed or that every participating business will accept a particular verification result.",
      ],
    },
    {
      title: "4. Identity Enrollment and Biometric Verification",
      blocks: [
        "Some TruePas features use facial recognition or other biometric technology to help verify identity.",
        "Where applicable, you must review the relevant notice and provide the consent or authorization required before enrolling or undergoing biometric verification.",
        "You agree to provide accurate information and cooperate with reasonable verification instructions.",
        "Verification may fail because of image quality, lighting, device limitations, liveness checks, connectivity problems, inaccurate enrollment information, or other technical or operational factors.",
        "A verification result is an output of the configured verification process. It should not be interpreted as a guarantee that fraud, impersonation, or every form of identity misuse has been eliminated.",
        "Where required by law or offered by a participating business, an alternative verification method may be available.",
      ],
    },
    {
      title: "5. Kiosk Use and Participating Businesses",
      blocks: [
        "When using a TruePas-enabled kiosk, you must follow the displayed instructions and any lawful instructions provided by authorized personnel at the location.",
        "You must not:",
        {
          ul: [
            "Attempt to impersonate another individual.",
            "Use another person’s account or identity without authorization.",
            "Tamper with, damage, or interfere with a kiosk or its security controls.",
            "Attempt to bypass identity verification, liveness checks, or access restrictions.",
            "Interfere with other users or disrupt the participating business’s operations.",
            "Use the kiosk for unlawful activity.",
          ],
        },
        "Participating businesses remain responsible for their own admission, check-in, eligibility, booking, membership, and access policies. A successful TruePas verification does not independently guarantee entry, admission, a booking, or access to a service.",
      ],
    },
    {
      title: "6. Acceptable Use",
      blocks: [
        "You agree to use TruePas lawfully and only for its intended purposes.",
        "You must not:",
        {
          ul: [
            "Use TruePas to commit fraud, identity theft, harassment, or other unlawful acts.",
            "Submit false, misleading, or unauthorized identity information.",
            "Reverse engineer, exploit, or interfere with the service except where applicable law expressly permits it.",
            "Introduce malware or attempt unauthorized access to TruePas systems.",
            "Scrape, copy, or misuse protected information obtained through the service.",
            "Circumvent rate limits, authentication, consent requirements, or other security safeguards.",
            "Use TruePas in a manner that infringes another person’s rights.",
          ],
        },
        "We may investigate suspected violations and take proportionate action consistent with applicable law.",
      ],
    },
    {
      title: "7. Privacy and Personal Information",
      blocks: [
        "Your use of TruePas is also governed by the TruePas Privacy Policy.",
        "That Policy describes how we process personal information, including identity, biometric, verification, and check-in information.",
        "Where consent is required for biometric processing, these Terms alone do not replace the applicable biometric notice or consent process.",
        "You should also review the privacy notice of a participating business because that business may independently process your information for its own purposes.",
      ],
    },
    {
      title: "8. Service Availability and Changes",
      blocks: [
        "We aim to provide reliable services, but we do not guarantee uninterrupted, error-free, or universally available operation.",
        "The service may be unavailable or limited because of maintenance, network failures, device problems, third-party service interruptions, security incidents, or other circumstances.",
        "We may update, suspend, restrict, or discontinue features where reasonably necessary for security, technical, legal, or operational reasons.",
        "Where required by law, we will provide appropriate notice or preserve applicable consumer rights.",
      ],
    },
    {
      title: "9. Third-Party Services",
      blocks: [
        "TruePas may integrate with or rely on services operated by third parties, including participating businesses and technology providers.",
        "Third-party services may be subject to separate terms, privacy policies, and availability requirements.",
        "TruePas does not control every aspect of third-party services and is not responsible for their independent acts or omissions, except to the extent liability cannot lawfully be excluded.",
      ],
    },
    {
      title: "10. Intellectual Property",
      blocks: [
        "The TruePas website, applications, software, branding, designs, and related materials are owned by or licensed to the relevant TruePas entity and are protected by applicable intellectual property laws.",
        "Subject to these Terms, we grant you a limited, personal, non-exclusive, non-transferable, revocable right to use the services for their intended purposes.",
        "Except where expressly permitted by law or by written authorization, you may not copy, modify, distribute, sell, sublicense, or create derivative works from TruePas software or protected materials.",
        "These Terms do not transfer ownership of any intellectual property to you.",
      ],
    },
    {
      title: "11. Account Suspension and Termination",
      blocks: [
        "You may stop using TruePas at any time. Where account deletion is available, you may request it through the application or by contacting us.",
        "We may suspend or restrict access when reasonably necessary to protect users, investigate suspected fraud, respond to security incidents, enforce these Terms, or comply with legal obligations.",
        "Where appropriate and legally permitted, we will provide notice and an opportunity to resolve the issue.",
        "Account termination does not automatically require deletion of every record. Certain information may need to be retained where legally permitted or required, as explained in the Privacy Policy.",
      ],
    },
    {
      title: "12. Disclaimers",
      blocks: [
        "To the extent permitted by applicable law, TruePas is provided on an “as available” basis.",
        "We do not guarantee that:",
        {
          ul: [
            "Every identity verification attempt will succeed.",
            "Every device or participating business will support every feature.",
            "Verification will prevent all fraud, unauthorized entry, or identity misuse.",
            "The services will operate without interruption or technical error.",
          ],
        },
        "Nothing in these Terms excludes any guarantee, right, or remedy that cannot lawfully be excluded under applicable consumer protection or other mandatory law.",
      ],
    },
    {
      title: "13. Limitation of Liability",
      blocks: [
        "To the extent permitted by applicable law, the relevant TruePas operating entity will not be liable for indirect, incidental, special, consequential, or punitive losses arising from use of the services.",
        "Nothing in these Terms excludes or limits liability for fraud, willful misconduct, gross negligence where exclusion is prohibited, death or personal injury caused by negligence where exclusion is prohibited, or any other liability that cannot lawfully be limited.",
        // Drafting note from the docx, kept off the live page:
        // "Any additional liability limitations must be finalized to comply with the laws applicable to
        // the operating entity and the user."
      ],
    },
    {
      title: "14. Indemnity",
      blocks: [
        "To the extent permitted by law, you may be responsible for losses directly resulting from your unlawful misuse of TruePas, infringement of third-party rights, or material breach of these Terms.",
        "Nothing in this section requires you to indemnify TruePas for losses caused by TruePas’s own unlawful conduct or for any liability that cannot legally be transferred to you.",
      ],
    },
    {
      title: "15. Changes to These Terms",
      blocks: [
        "We may update these Terms to reflect changes in our services, technology, operations, or legal requirements.",
        "We will publish the updated Terms and revise the effective date. Where required by law, we will provide advance notice or obtain your agreement to material changes.",
        "Your continued use of the services after an update takes effect will be subject to the updated Terms only to the extent permitted by applicable law.",
      ],
    },
    {
      title: "16. Governing Law and Disputes",
      blocks: [
        "These Terms are subject to the laws applicable to the relevant TruePas operating entity, without overriding mandatory consumer protections that apply to you.",
        // Drafting note from the docx, kept off the live page:
        // "Before publication, insert the correct governing law, dispute-resolution process, and court or
        // tribunal jurisdiction after confirming the contracting entity and its registered location."
        "Nothing in these Terms removes any mandatory right to bring a complaint before a competent regulator or court.",
      ],
    },
    {
      title: "17. Contact Us",
      blocks: [
        "For questions about these Terms, account use, or the TruePas services, contact:",
        {
          box: [
            "Organization: [Full legal name of the TruePas operating entity]",
            "Email: [Official support or legal contact email]",
            "Website: https://truepas-blond.vercel.app/",
          ],
        },
      ],
    },
    {
      title: "18. Entire Agreement and Severability",
      blocks: [
        "These Terms, together with the applicable Privacy Policy and any additional terms expressly presented for a specific feature, form the agreement governing your use of the covered services.",
        "If a provision is found unenforceable, the remaining provisions will remain effective to the extent permitted by law.",
        "Failure to enforce a provision does not constitute a waiver of that provision or any other right.",
        "These Terms do not override any separate written agreement that expressly governs a specific service or relationship.",
      ],
    },
  ],
};

export const cookiePolicy: LegalDoc = {
  eyebrow: "Privacy & Security",
  title: "Cookies & Your Choices",
  description: "A clear guide to cookie categories, consent choices, browser controls and preference management.",
  effective: "October 9, 2026",
  updated: "October 11, 2026",
  sections: [
    {
      title: "1. What Are Cookies?",
      blocks: [
        "Cookies are small text files stored on a device when a website or application is used. Similar technologies, such as local storage and pixels, may also be used for related purposes.",
      ],
    },
    {
      title: "2. How TruePas Uses Cookies",
      blocks: [
        "TruePas may use cookies to operate the website, remember preferences, measure performance and support optional marketing functionality. Optional categories are enabled only after the required consent.",
      ],
    },
    {
      title: "3. Strictly Necessary Cookies",
      blocks: [
        "Strictly necessary cookies support core website functionality, security and service operation. They are always active and cannot be disabled through the preference panel.",
        "The TruePas website does not set its own cookies at present. Your cookie choice is saved in your browser’s local storage (truepas-cookie-consent) so that we can respect it on your next visit.",
      ],
    },
    {
      title: "4. Functional Cookies",
      blocks: [
        "Functional cookies may remember settings, preferences or previously selected options. These cookies are optional and are used only with consent.",
        "The TruePas website does not use functional cookies at present.",
      ],
    },
    {
      title: "5. Analytics Cookies",
      blocks: [
        "Analytics cookies may help understand how visitors use the website, identify performance issues and improve content or functionality. These cookies are optional and are used only with consent.",
        "The TruePas website does not use analytics cookies at present.",
      ],
    },
    {
      title: "6. Marketing Cookies",
      blocks: [
        "Marketing cookies may support campaign measurement, relevant messaging or audience analysis. These cookies are optional and are used only with consent.",
        "The TruePas website does not use marketing cookies at present.",
      ],
    },
    {
      title: "7. Third-Party Cookies",
      blocks: [
        "Third-party cookies may be set by approved service providers that support website functionality, analytics or marketing.",
        "When you select Book a Demo, a scheduling window from Calendly opens on the page. Calendly and the services it relies on may then set the following cookies, which are governed by Calendly’s own cookie policy:",
        {
          ul: [
            "__cf_bm (Cloudflare, for Calendly): protects the booking window from automated traffic. Expires after 30 minutes.",
            "_cfuvid (Cloudflare, for Calendly): supports traffic security and rate limiting. Expires when you close your browser.",
            "OptanonConsent (Calendly): remembers your cookie choices on Calendly. Expires after 1 year.",
            "m (Stripe, for Calendly): helps prevent payment fraud. Expires after up to 2 years.",
          ],
        },
        "Calendly may also ask for your consent to its own optional analytics and marketing cookies inside the booking window.",
      ],
    },
    {
      title: "8. Cookie Duration",
      blocks: [
        "Cookie duration depends on the cookie type and provider. Session cookies expire when the browsing session ends, while persistent cookies remain for a defined period.",
        "The durations of the cookies that can currently be set are listed in Section 7.",
      ],
    },
    {
      title: "9. Managing Cookie Preferences",
      blocks: [
        "Visitors can update optional cookie choices through the Cookie Settings panel. Strictly necessary cookies remain active because they are required for core site functionality.",
        "Blocking or deleting certain cookies may affect website functionality.",
      ],
    },
    {
      title: "10. Browser Controls",
      blocks: [
        "Most browsers allow users to view, block or delete cookies through browser settings. Browser controls operate independently from the TruePas preference panel and may affect all websites visited.",
      ],
    },
    {
      title: "11. Policy Updates",
      blocks: [
        "This Cookie Policy may be updated as website technologies, service providers or legal requirements change. Updates will be posted with a revised effective date.",
      ],
    },
    {
      title: "12. Contact Information",
      blocks: [
        "Questions about cookies or tracking preferences can be sent to us through the Contact page.",
      ],
    },
  ],
};

export const cookieCategories = [
  { category: "Strictly Necessary", purpose: "Core site security, functionality and service operation.", required: "Required" },
  { category: "Functional", purpose: "Remember preferences and support enhanced functionality.", required: "Optional" },
  { category: "Analytics", purpose: "Measure and improve website performance and usage.", required: "Optional" },
  { category: "Marketing", purpose: "Support campaign measurement and relevant communication.", required: "Optional" },
  { category: "Third-Party", purpose: "Provider-specific functionality, analytics or marketing.", required: "Depends on provider and consent" },
];
