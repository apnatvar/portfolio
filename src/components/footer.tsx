"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const workedWith = [
  "Avaya LLC",
  "Haneri Electricals Ltd.",
  "Elza International Ltd.",
  "Motilal Oswal Financial Services Ltd.",
  "and more...",
];

type FooterLink = {
  label: string;
  href: string;
};

const sitemapLinks: FooterLink[] = [
  { label: "Work", href: "/#work" },
  { label: "Hire Me", href: "/hire-ap" },
  { label: "About", href: "/about-ap" },
];

const importantLinks: FooterLink[] = [
  { label: "Medium", href: "https://medium.com/@nattupi" },
  { label: "GitHub", href: "https://github.com/apnatvar" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/apnatva-singh-rawat/",
  },
];

const socialLinks: FooterLink[] = [
  { label: "Instagram", href: "https://instagram.com/nattupi/" },
  { label: "Chess.com", href: "https://www.chess.com/member/nattupi" },
  { label: "Reddit", href: "https://www.reddit.com/user/apnatva-dev/" },
  { label: "Benable", href: "https://benable.com/apnatva" },
  { label: "Apple Music", href: "https://music.apple.com/profile/nattupi" },
];

type FooterLinkGroupProps = {
  title: string;
  links: FooterLink[];
};

function getAnimationVars(index: number) {
  const delay = -((index * 1.37) % 6.4);
  const duration = 5.5 + ((index * 0.73) % 3.2);

  return {
    "--footer-link-delay": `${delay}s`,
    "--footer-link-duration": `${duration}s`,
  } as React.CSSProperties;
}

function WorkedWith() {
  return (
    <div className="flex justify-center text-left md:justify-end md:text-right">
      <div className="flex flex-col max-md:text-center gap-1">
        <h3 className="text-3xl font-medium tracking-tight text-background">
          Worked With
        </h3>

        {workedWith.map((item) => (
          <p key={item} className="text-sm text-muted md:text-base">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <h3
        id="socials"
        className="text-lg font-medium tracking-tight text-background"
      >
        {title}
      </h3>

      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        {links.map((link, index) => (
          <Button
            key={link.label}
            variant="link"
            asChild
            className="px-2 text-muted decoration-muted-foreground"
          >
            <Link
              href={link.href}
              target="_blank"
              className="footer-animated-link"
              style={getAnimationVars(index)}
            >
              {link.label}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}

function Sitemap() {
  return <FooterLinkGroup title="Sitemap" links={sitemapLinks} />;
}

function ImportantLinks() {
  return <FooterLinkGroup title="Important Links" links={importantLinks} />;
}

function Socials() {
  return <FooterLinkGroup title="Socials" links={socialLinks} />;
}

export function SiteFooter() {
  return (
    <footer className="w-full px-4 py-12 md:px-6 md:py-16 bg-foreground">
      <section className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-10 md:gap-8">
        <div className="flex w-full flex-col items-center gap-8 md:flex-row md:items-start md:justify-between md:gap-4">
          <h2 className="max-w-3xl text-center text-base leading-relaxed tracking-tight md:basis-1/2 md:text-left md:text-lg text-muted">
            <span className="block text-5xl font-medium md:inline md:text-7xl text-background font-italianno">
              Hi Again!
            </span>{" "}
            In an increasingly online world, information is power. If you can
            control what you want to share, you have already won half the
            battle. Websites are a great way of getting yourself or your brand
            out there.
            <span className="inline-block text-background md:text-2xl">
              Always ready for an adventure.
            </span>
          </h2>

          <div className="md:basis-1/3">
            <WorkedWith />
          </div>
        </div>

        <div className="grid w-full gap-8 md:gap-4">
          <Sitemap />
          <ImportantLinks />
          <Socials />
        </div>
      </section>
    </footer>
  );
}
