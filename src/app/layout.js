import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Apnatva's Website - Portfolio for a Software Developer",
  description: "A portfolio website meant to replace a traditional CV. Includes information about previous work experience, projects completed, and education of Apnatva Singh Rawat. Crisp detailing and animations showcase Next.js skills and familiarity with JavaScript. Website additionally contains links to LinkedIn, GitHub, and a downloadable CV to make available the website content in more conventional formats. A 'Get in Touch' section is included to make it easier for users to contact Apnatva Singh Rawat via e-mail, phone, or social media like Instagram and LinkedIn." ,
  icons: {
    icon: '/ap-icon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
