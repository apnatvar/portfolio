import Link from "next/link";

export function EngineeringNav() {
  return <nav className="engineering-nav" aria-label="Technical SEO navigation"><Link href="/" className="engineering-brand">AP<span> / SEO Engineering</span></Link><div><Link href="/services">Services</Link><Link href="/work">Work</Link><Link href="/tools">Tools</Link><Link href="/writing">Writing</Link><Link href="/about-ap">About</Link><Link href="/hire-ap">Discuss a project ↗</Link></div></nav>;
}
