import "@/app/globals.css";
import "@/app/atelier.css";
import { DisplayModeShell } from "@/components/display-mode/display-mode-shell";
import { JsonLd } from "@/components/json-ld";
import {
  DEFAULT_SOCIAL_IMAGE,
  SITE_NAME,
  SITE_URL,
  siteIdentityJsonLd,
} from "@/lib/site";
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
  preload: false,
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-italianno",
});

const manufacturingConsent = Manufacturing_Consent({
  preload: false,
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-manufacturing-consent",
  fallback: ["system-ui", "arial"],
  adjustFontFallback: false,
});

const amita = Amita({
  preload: false,
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "AP | Design, code & a little curiosity",
    template: "%s | AP",
  },

  icons: { icon: "/ap-icon.svg" },

  description:
    "Websites, useful little tools, and the independent creative work of Apnatva Singh Rawat. Based in India.",

  keywords: ["Apnatva Singh Rawat", "AP", "Creative developer", "Web design", "Independent designer"],

  authors: [{ name: "Apnatva Singh Rawat", url: SITE_URL }],
  creator: "Apnatva Singh Rawat",
  publisher: "Apnatva Singh Rawat",

  applicationName: `${SITE_NAME} Portfolio`,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "AP | Design, code & a little curiosity",
    description:
      "Websites, useful little tools, and the independent creative work of Apnatva Singh Rawat.",
    images: [
      {
        url: DEFAULT_SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: "AP — Design, code & a little curiosity",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AP | Design, code & a little curiosity",
    description:
      "The independent creative work of Apnatva Singh Rawat. Design, development, and writing.",
    images: [DEFAULT_SOCIAL_IMAGE],
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
    <html lang="en" data-display-mode="creative" suppressHydrationWarning>
      <body className={`mx-auto bg-background antialiased ${FONT_VARS}`}>
        <JsonLd data={siteIdentityJsonLd} />
        <DisplayModeShell>{children}</DisplayModeShell>
      </body>
    </html>
  );
}
