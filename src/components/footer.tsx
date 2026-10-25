import Link from "next/link";

const navigation = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about-ap" },
  { label: "Contact", href: "/#contact" },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com/nattupi/" },
  { label: "GitHub", href: "https://github.com/apnatvar" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/apnatva-singh-rawat/" },
];

export function SiteFooter() {
  return (
    <footer className="w-full bg-foreground px-6 py-10 text-background md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <p className="font-italianno text-6xl leading-none md:text-8xl">See you around.</p>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          {navigation.map((item) => (
            <Link key={item.label} href={item.href} className="hover:text-background">
              {item.label}
            </Link>
          ))}
        </nav>
        <nav id="socials" aria-label="Social links" className="flex gap-x-4 text-sm text-muted">
          {socials.map((item) => (
            <Link key={item.label} href={item.href} target="_blank" rel="noreferrer" className="hover:text-background">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
