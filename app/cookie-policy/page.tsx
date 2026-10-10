import type { Metadata } from "next";
import CookiePreferences from "@/components/sections/legal/CookiePreferences";
import CookieTable from "@/components/sections/legal/CookieTable";
import LegalDocument from "@/components/sections/legal/LegalDocument";
import { cookiePolicy } from "@/lib/legal";

export const metadata: Metadata = {
  title: "TruePas — Cookie Policy",
  description: "Understand how TruePas uses cookies, optional tracking technologies and browser controls.",
};

export default function CookiePolicyPage() {
  return (
    <main className="flex flex-1 flex-col">
      <LegalDocument
        doc={cookiePolicy}
        extras={{
          "managing-cookie-preferences": (
            <>
              <CookieTable />
              <CookiePreferences />
            </>
          ),
        }}
      />
    </main>
  );
}
