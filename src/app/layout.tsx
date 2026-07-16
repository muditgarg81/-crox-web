import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { company } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://croxoilandgas.com";
const description =
  "CROX OIL & GAS PVT. LTD manufactures PP woven sacks, FIBC/jumbo bags, polypropylene fabric, and HM/LDPE liners from our Nagpur, India facility.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} | ${company.tagline}`,
    template: `%s | ${company.name}`,
  },
  description,
  keywords: [
    "PP woven sacks",
    "FIBC bags",
    "jumbo bags manufacturer",
    "polypropylene fabric",
    "HDPE liners",
    "woven sack bags Nagpur",
    "PP bags manufacturer India",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: company.name,
    title: `${company.name} | ${company.tagline}`,
    description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} | ${company.tagline}`,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ManufacturingBusiness",
  name: company.name,
  description,
  url: siteUrl,
  logo: `${siteUrl}/images/crox_logo.png`,
  email: company.email,
  telephone: company.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address,
    addressLocality: "Nagpur",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
