import Image from "next/image";
import Link from "next/link";

import { ThemedMenu } from "@/components/themed-menu";
import type { PortfolioContent } from "@/content/portfolio-content";

export function SwissPortfolio({ content }: { content: PortfolioContent }) {
  return (
    <div className="swiss-portfolio">
      <ThemedMenu />
      <header className="swiss-hero">
        <div className="swiss-kicker"><span>AP—2026</span><span>DEHRADUN / INDIA</span></div>
        <p className="swiss-hello">{content.hero.greeting}</p>
        <h1>{content.hero.name}</h1>
        <div className="swiss-role-grid">
          {content.hero.roles.map((role, index) => (
            <article key={role.title}>
              <span>0{index + 1}</span>
              <h2>{role.title}</h2>
              <p>{role.description}</p>
            </article>
          ))}
        </div>
        <figure className="swiss-hero-image">
          <Image src={content.imagery.swiss.src} alt={content.imagery.swiss.alt} fill priority sizes="(max-width: 767px) 100vw, 55vw" />
          <figcaption>Logic, Beautifully</figcaption>
        </figure>
      </header>

      <main>
        <section className="swiss-profile" id="profile">
          <SwissLabel index="01" title="Profile" />
          <div className="swiss-profile-copy">
            {content.profile.paragraphs.map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? "swiss-profile-lead" : undefined}>{paragraph}</p>
            ))}
          </div>
          <div className="swiss-education">{content.profile.education.map((item) => <span key={item}>{item}</span>)}</div>
        </section>

        <section className="swiss-work" id="work">
          <SwissLabel index="02" title="Selected Work" />
          <div className="swiss-project-list">
            {content.projects.map((project, index) => (
              <article key={project.title}>
                <div className="swiss-project-title">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{project.title}</h3>
                </div>
                <ul>{project.points.map((point) => <li key={point}>{point}</li>)}</ul>
                <div className="swiss-project-links">
                  {project.links.map((link) => <Link key={link.label} href={link.href} target="_blank">{link.label} ↗</Link>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="swiss-capabilities" id="capabilities">
          <SwissLabel index="03" title="Capabilities" />
          <div className="swiss-word-field">
            {[...content.capabilities.services, ...content.capabilities.technologies].map((item, index) => (
              <span key={`${item}-${index}`} className={index % 5 === 0 ? "is-accent" : undefined}>{item}</span>
            ))}
          </div>
        </section>

        <section className="swiss-experience" id="experience">
          <SwissLabel index="04" title="Experience / Education" />
          {content.experience.map((item, index) => (
            <article key={item.year}>
              <span>0{index + 1}</span>
              <time>{item.year}</time>
              <p>{item.text}</p>
            </article>
          ))}
        </section>

        <section className="swiss-contact" id="contact">
          <SwissLabel index="05" title="Contact" />
          <p>Always ready for an adventure.</p>
          <a className="swiss-email" href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
          <div>
            <a href={content.contact.booking} target="_blank" rel="noreferrer">Book a Call</a>
            {content.contact.links.map((link) => <Link key={link.label} href={link.href} target="_blank">{link.label}</Link>)}
          </div>
        </section>
      </main>
    </div>
  );
}

function SwissLabel({ index, title }: { index: string; title: string }) {
  return <header className="swiss-section-label"><span>{index}</span><h2>{title}</h2><span>AP®</span></header>;
}
