import "@/app/globals.css";
import "@/app/atelier.css";
import "@/app/message-bar.css";
import { DisplayModeShell } from "@/components/display-mode/display-mode-shell";
import { JsonLd } from "@/components/json-ld";
import { NotebookCursor } from "@/components/notebook-cursor";
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

const amita = Amita({
  preload: false,
  subsets: ["devanagari"],
  weight: ["700"],
  display: "swap",
  variable: "--font-amita",
});

const FONT_VARS = [
  amita.variable,
  italianno.variable,
  manrope.variable,
].join(" ");

export const viewport: Viewport = {
  themeColor: "#e8d8b7",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "AP | Front-end Development & Technical SEO",
    template: "%s | AP",
  },

  icons: { icon: "/ap-icon.svg" },

  description:
    "Front-end development and interface design with React, Next.js, and TypeScript. Technical SEO, accessible interaction, and web performance by Apnatva Singh Rawat.",

  keywords: ["Apnatva Singh Rawat", "Front-end developer", "React developer", "Next.js developer", "Web design", "Technical SEO"],

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
    title: "AP | Front-end Development & Technical SEO",
    description:
      "Front-end development, interface design, and technical SEO by Apnatva Singh Rawat.",
    images: [
      {
        url: DEFAULT_SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: "AP — Front-end development, design, and technical SEO",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AP | Front-end Development & Technical SEO",
    description:
      "React and Next.js front-ends, interface design, and technical SEO. The independent work of Apnatva Singh Rawat.",
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
    <html lang="en" data-display-mode="creative">
      <body className={`mx-auto bg-background antialiased ${FONT_VARS}`}>
        <JsonLd data={siteIdentityJsonLd} />
        <NotebookCursor />
        <DisplayModeShell>{children}</DisplayModeShell>
      </body>
    </html>
  );
}
