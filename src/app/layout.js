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
  title: "Apnatva's Portfolio Website - Tech Consulting & Development",
  description: "A portfolio website meant to replace a traditional CV. Includes information about previous work experience, projects completed, and education of Apnatva Singh Rawat. Crisp detailing and animations showcase Next.js skills and familiarity with JavaScript. Website additionally contains links to LinkedIn, GitHub, and a downloadable CV to make available the website content in more conventional formats. A 'Get in Touch' section is included to make it easier for users to contact Apnatva Singh Rawat via e-mail, phone, or social media like Instagram and LinkedIn.",
  keywords: [
    "Tech Consultant", "Freelancer", "Apnatva", "AP",
    "Full-Stack Developer", "Software Development", "Backend Developer",
    "Python", "JavaScript", "SQL", 
    "AI", "Artificial Intelligence", "Machine Learning", "ML", "Deep Learning", "Reinforcement Learning", "Gen AI", "AI Thesis",
    "Next.js", "React",
    "AWS", "Azure", "Excel", "PowerPoint", "Tableau", 
    "Docker", "Kubernetes", "Helm", "Kafka", "POSTMAN",
    "Cloud Solutions", "FinTech", "Blockchain", "Standalone Applications",
    "Portfolio", "CV", "Resume", "Remote", "Europe", "India", "US", "Projects", "Experience", "Education", 
    "Trinity College Dublin", "St. George's College Mussoorie",
    "Linkedin", "Instagram", "Github", "LinkedIn", "Contact"
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
  themeColor: "#1A1A1E",
  colorScheme: "dark light",
  category: "technology",
  openGraph: {
    title: "Apnatva's Portfolio Website - Tech Consulting & Development",
    description:
      "Portfolio of Apnatva Singh Rawat, a Software Developer specializing in modern, scalable, and efficient AI-based technology solutions.",
    url: "https://apnatva.vercel.app",
    siteName: "Apnatva's Website Portfolio",
    images: [
      {
        url: "https://apnatva.vercel.app/ap-icon.png",
        alt: "AP Icon"
      }
    ],
    locale: "en-IN",
    type: "website"
  },
  twitter: {
    card: "https://apnatva.vercel.app/ap-icon.png",
    title: "AP's Portfolio Webstie – Tech Consulting & Development",
    description:
      "Portfolio of Apnatva, building technology solutions to help you see your ideas come to life.",
    creator: "nattupi0",
    images: ["https://apnatva.vercel.app/ap-icon.png"]
  },
  icons: {
    icon: '/ap-icon.svg',
    shortcut: "/ap-icon.svg",
  },
  alternates: {
    canonical: "https://apnatva.vercel.app",
    languages: {
      "en-IN": "https://apnatva.vercel.app",
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
