import "@/app/globals.css";
import { SiteFooter } from "@/components/footer";
import SmoothScrollProvider from "@/components/smooth-scroll";
import { Metadata, Viewport } from "next";
import {
  Amita,
  Italianno,
  Manrope,
  Manufacturing_Consent,
} from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-manrope",
});

const italianno = Italianno({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-italianno",
});

const manufacturingConsent = Manufacturing_Consent({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-manufacturing-consent",
  fallback: ["system-ui", "arial"],
});

const amita = Amita({
  subsets: ["devanagari"],
  weight: ["700"],
  display: "swap",
  variable: "--font-amita",
});

const FONT_VARS = [
  amita.variable,
  manufacturingConsent.variable,
  italianno.variable,
  manrope.variable,
].join(" ");

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#060010" },
    { media: "(prefers-color-scheme: dark)", color: "#060010" },
  ],
};

const siteUrl = "https://apnatva.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "AP | Design-First Next.js Developer",
    template: "%s | AP",
  },

  icons: "/4.webp",

  description:
    "AP is a design-first Next.js developer building portfolio sites, e-commerce stores, dashboards, and technical web experiences for freelance and contract clients.",

  keywords: [
    "AP",
    "Apnatva",
    "Next.js developer",
    "Node.js developer",
    "web designer developer",
    "design first developer",
    "freelance web developer India",
    "contract Next.js developer",
    "e-commerce store developer",
    "portfolio website developer",
    "frontend developer",
    "full stack developer",
    "PayloadCMS developer",
    "Shadcn UI developer",
    "Tailwind CSS developer",
    "GSAP developer",
  ],

  authors: [{ name: "AP", url: siteUrl }],
  creator: "AP",
  publisher: "AP",

  applicationName: "AP Portfolio",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "AP",
    title: "AP | Design-First Next.js Developer",
    description:
      "Portfolio of AP, a design-first developer creating Next.js websites, e-commerce stores, CMS-backed experiences, and visual web interfaces.",
    images: [
      {
        url: "/4.webp",
        width: 1200,
        height: 630,
        alt: "AP design-first developer portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AP | Design-First Next.js Developer",
    description:
      "Design-first Next.js developer for portfolio sites, e-commerce stores, CMS-backed websites, and freelance/contract web work.",
    images: ["/4.webp"],
    creator: "@nattupi0",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`mx-auto bg-background antialiased ${FONT_VARS}`}>
        <SmoothScrollProvider>
          <main className="font-narrow">
            {children} <SiteFooter />
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
