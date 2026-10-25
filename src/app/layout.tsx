import "@/app/globals.css";
import { DisplayModeProvider, displayModeBootstrapScript } from "@/components/display-mode/display-mode-provider";
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
    default: "AP | Next.js Technical SEO Engineer",
    template: "%s | AP",
  },

  icons: { icon: "/ap-icon.svg" },

  description:
    "Technical SEO engineering for Next.js and TypeScript: audits, implementation, programmatic SEO, AI-assisted automation, and performance. India-based, remote worldwide.",

  keywords: ["Next.js technical SEO", "Technical SEO Engineer", "Programmatic SEO", "SEO automation", "Web performance"],

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
    title: "AP | Next.js Technical SEO Engineer",
    description:
      "Technical SEO, programmatic SEO, automation, and performance engineering for Next.js websites.",
    images: [
      {
        url: DEFAULT_SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: "AP — Technical SEO, engineered for Next.js",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AP | Next.js Technical SEO Engineer",
    description:
      "India-based Next.js Technical SEO Engineer available for remote projects worldwide.",
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
      <head>
        <script dangerouslySetInnerHTML={{ __html: displayModeBootstrapScript }} />
      </head>
      <body className={`mx-auto bg-background antialiased ${FONT_VARS}`}>
        <JsonLd data={siteIdentityJsonLd} />
        <DisplayModeProvider>
          <DisplayModeShell>{children}</DisplayModeShell>
        </DisplayModeProvider>
      </body>
    </html>
  );
}
