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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "AP | Full-Stack Developer & Designer",
    template: "%s | AP",
  },

  icons: DEFAULT_SOCIAL_IMAGE,

  description:
    "Portfolio of AP, a full-stack developer and designer building web applications, APIs, automation workflows, and responsive digital experiences.",

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
    title: "AP | Full-Stack Developer & Designer",
    description:
      "Portfolio of AP, a full-stack developer and designer building web applications, APIs, automation workflows, and responsive digital experiences.",
    images: [
      {
        url: DEFAULT_SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: "AP design-first developer portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AP | Full-Stack Developer & Designer",
    description:
      "Full-stack developer and designer building web applications, APIs, automation workflows, and responsive digital experiences.",
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
