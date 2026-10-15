import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// openGraph holds only fields shared by every page; Next fills og:title/description from each page's own metadata.
// The share image is app/opengraph-image.jpg
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "TruePas — One Access for Every Customer Journey",
  description:
    "Turn every check-in, verification, entry and payment into a seamless experience with secure biometric identity.",
  openGraph: { siteName: "TruePas", type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} antialiased motion-safe:scroll-smooth`}>
      <body className="flex min-h-svh flex-col font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
