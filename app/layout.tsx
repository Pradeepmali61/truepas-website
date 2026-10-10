import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CookieConsent from "@/components/layout/CookieConsent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TruePas — One Access for Every Customer Journey",
  description:
    "Turn every check-in, verification, entry and payment into a seamless experience with secure biometric identity.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="flex min-h-svh flex-col font-sans">
        <Navbar />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
