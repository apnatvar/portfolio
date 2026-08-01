import Image from "next/image";
import Link from "next/link";

import { ThemedMenu } from "@/components/themed-menu";
import type { PortfolioContent } from "@/content/portfolio-content";

export function ResumePortfolio({ content }: { content: PortfolioContent }) {
  return (
    <div className="resume-portfolio">
      <ThemedMenu />
      <header className="resume-header">
        <div>
          <p className="resume-eyebrow">{content.hero.shortName}</p>
          <h1>{content.hero.name}</h1>
          <p className="resume-role-line">
            {content.hero.roles.map((role) => role.title).join(" / ")}
          </p>
        </div>
        <address>
          <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
          <a href="https://wa.me/918791414856">{content.contact.phone}</a>
          <a href={content.contact.booking} target="_blank" rel="noreferrer">Book a Call</a>
        </address>
      </header>

      <nav className="resume-index" aria-label="Resume sections">
        {[
          ["Profile", "profile"],
          ["Work", "work"],
          ["Capabilities", "capabilities"],
          ["Experience", "experience"],
          ["Contact", "contact"],
        ].map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>

      <main>
        <section id="profile" className="resume-section resume-profile">
          <SectionHeading index="01" title="Profile" />
          <div className="resume-section-body resume-profile-grid">
            <div className="resume-profile-copy">
              {content.profile.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <figure>
              <div className="resume-image-frame">
                <Image src={content.imagery.resume.src} alt={content.imagery.resume.alt} fill sizes="(max-width: 767px) 100vw, 32vw" />
              </div>
              <figcaption>{content.profile.education.join(" · ")}</figcaption>
            </figure>
          </div>
        </section>

        <section id="work" className="resume-section">
          <SectionHeading index="02" title="Selected work" />
          <div className="resume-section-body resume-projects">
            {content.projects.map((project) => (
              <article key={project.title} className="resume-project">
                <div className="resume-project-heading">
                  <h3>{project.title}</h3>
                  <div>{project.links.map((link) => <Link key={link.label} href={link.href} target="_blank">{link.label}</Link>)}</div>
                </div>
                <ul>{project.points.map((point) => <li key={point}>{point}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section id="capabilities" className="resume-section">
          <SectionHeading index="03" title="Capabilities" />
          <div className="resume-section-body resume-capabilities">
            <CapabilityList label="Services" items={content.capabilities.services} />
            <CapabilityList label="Technologies" items={content.capabilities.technologies} />
          </div>
        </section>

        <section id="experience" className="resume-section">
          <SectionHeading index="04" title="Experience & education" />
          <div className="resume-section-body resume-timeline">
            {content.experience.map((item) => (
              <article key={item.year}>
                <time>{item.year}</time>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="resume-section resume-contact">
          <SectionHeading index="05" title="Contact" />
          <div className="resume-section-body">
            <h2>Always ready for an adventure.</h2>
            <div className="resume-contact-links">
              <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
              {content.contact.links.map((link) => <Link key={link.label} href={link.href} target="_blank">{link.label}</Link>)}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function SectionHeading({ index, title }: { index: string; title: string }) {
  return <header><span>{index}</span><h2>{title}</h2></header>;
}

function CapabilityList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <h3>{label}</h3>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}
