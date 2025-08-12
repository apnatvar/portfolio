import { Montserrat, JetBrains_Mono, Roboto_Slab } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto-slab",
});

export const metadata = {
  title: "Apnatva's Website - Portfolio for a Software Developer",
  description: "A portfolio website meant to replace a traditional CV. Includes information about previous work experience, projects completed, and education of Apnatva Singh Rawat. Crisp detailing and animations showcase Next.js skills and familiarity with JavaScript. Website additionally contains links to LinkedIn, GitHub, and a downloadable CV to make available the website content in more conventional formats. A 'Get in Touch' section is included to make it easier for users to contact Apnatva Singh Rawat via e-mail, phone, or social media like Instagram and LinkedIn." ,
  icons: {
    icon: '/ap-icon.svg',
  },
  keywords: [
    "Tech Consultant",
    "Full-Stack Developer",
    "Python",
    "JavaScript",
    "AI",
    "Machine Learning",
    "Next.js",
    "AWS",
    "Docker",
    "Cloud Solutions",
    "FinTech",
    "Portfolio",
    "Software Development"
  ],
  authors: [
    { name: "Apnatva 'AP' Singh Rawat", url: "https://apnatva.vercel.app" }
  ],
  creator: "Apnatva 'AP' Singh Rawat",
  publisher: "AP Technology Consultant",
  robots: "index, follow",
  applicationName: "AP's Next.js Portfolio Website",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  themeColor: "#000000",
  colorScheme: "dark light",
  category: "technology",
  openGraph: {
    title: "Your Website Name – Tech Consulting & Development",
    description:
      "Portfolio of [Your Name], a tech consultant specializing in modern, scalable, and efficient technology solutions.",
    url: "https://yourwebsite.com",
    siteName: "Your Website Name",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Your Website Open Graph Image"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Website Name – Tech Consulting & Development",
    description:
      "Portfolio of [Your Name], delivering technology solutions that bridge the gap between ideas and execution.",
    creator: "@your_twitter_handle",
    images: ["https://yourwebsite.com/twitter-image.jpg"]
  },
  icons: {
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png"
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://apnatva.vercel.app",
    languages: {
      "en-US": "https://apnatva.vercel.app",
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
      className={`${montserrat.variable} ${jetbrainsMono.variable} ${robotoSlab.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
