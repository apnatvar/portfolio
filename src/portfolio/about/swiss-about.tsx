import Image from "next/image";
import Link from "next/link";

import { ThemedMenu } from "@/components/themed-menu";
import type { PortfolioContent } from "@/content/portfolio-content";

export function SwissAbout({ content }: { content: PortfolioContent }) {
  return (
    <div className="swiss-about">
      <ThemedMenu />

      <header className="swiss-about-header">
        <div className="swiss-about-meta"><span>ABOUT—AP</span><span>PROFILE / 2026</span></div>
        <p>About</p>
        <h1>{content.hero.name}</h1>
        <div className="swiss-about-roles">
          {content.hero.roles.map((role, index) => <span key={role.title}>0{index + 1} / {role.title}</span>)}
        </div>
        <figure>
          <Image src={content.imagery.swiss.src} alt={content.imagery.swiss.alt} fill priority sizes="(max-width: 767px) 100vw, 48vw" />
          <figcaption>{content.profile.education.join(" · ")}</figcaption>
        </figure>
      </header>

      <main>
        <section className="swiss-about-profile" id="profile">
          <SwissAboutLabel number="01" title="Profile" />
          <div>
            {content.profile.paragraphs.map((paragraph, index) => <p key={paragraph} className={index === 0 ? "is-lead" : undefined}>{paragraph}</p>)}
          </div>
        </section>

        <section className="swiss-about-history" id="history">
          <SwissAboutLabel number="02" title="History" />
          {content.experience.map((item, index) => (
            <article key={item.year}><span>0{index + 1}</span><time>{item.year}</time><p>{item.text}</p></article>
          ))}
        </section>

        <section className="swiss-about-education" id="education">
          <SwissAboutLabel number="03" title="Education" />
          {content.educationDetails.map((education, index) => (
            <article key={education.institution}>
              <span>ED—0{index + 1}</span>
              <h2>{education.institution}</h2>
              <ul>{education.points.map((point) => <li key={point}>{point}</li>)}</ul>
            </article>
          ))}
        </section>

        <section className="swiss-about-skills" id="skills">
          <SwissAboutLabel number="04" title="Capabilities" />
          <div>{[...content.capabilities.services, ...content.capabilities.technologies].map((item, index) => <span key={`${item}-${index}`} className={index % 6 === 0 ? "is-accent" : undefined}>{item}</span>)}</div>
        </section>

        <section className="swiss-about-links">
          <SwissAboutLabel number="05" title="Links" />
          <div>{content.profileLinks.map((link, index) => <Link key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined}><span>0{index + 1}</span>{link.label} ↗</Link>)}</div>
        </section>
      </main>
    </div>
  );
}

function SwissAboutLabel({ number, title }: { number: string; title: string }) {
  return <header><span>{number}</span><h2>{title}</h2><span>AP®</span></header>;
}
