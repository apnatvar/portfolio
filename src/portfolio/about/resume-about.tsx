import Image from "next/image";
import Link from "next/link";

import { ThemedMenu } from "@/components/themed-menu";
import type { PortfolioContent } from "@/content/portfolio-content";

export function ResumeAbout({ content }: { content: PortfolioContent }) {
  return (
    <div className="resume-about">
      <ThemedMenu />

      <header className="resume-about-header">
        <div>
          <p>About / Profile</p>
          <h1>{content.hero.name}</h1>
          <span>{content.hero.roles.map((role) => role.title).join(" / ")}</span>
        </div>
        <nav aria-label="About sections">
          <a href="#profile">Profile</a>
          <a href="#history">History</a>
          <a href="#education">Education</a>
          <a href="#skills">Skills</a>
        </nav>
      </header>

      <main>
        <section id="profile" className="resume-about-profile">
          <div className="resume-about-section-label"><span>01</span><h2>Profile</h2></div>
          <div className="resume-about-copy">
            {content.profile.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <figure>
            <div><Image src={content.imagery.resume.src} alt={content.imagery.resume.alt} fill sizes="(max-width: 767px) 100vw, 34vw" /></div>
            <figcaption>{content.profile.education.join(" · ")}</figcaption>
          </figure>
        </section>

        <section id="history" className="resume-about-row">
          <div className="resume-about-section-label"><span>02</span><h2>History</h2></div>
          <div className="resume-about-timeline">
            {content.experience.map((item) => (
              <article key={item.year}><time>{item.year}</time><p>{item.text}</p></article>
            ))}
          </div>
        </section>

        <section id="education" className="resume-about-row">
          <div className="resume-about-section-label"><span>03</span><h2>Education</h2></div>
          <div className="resume-about-education">
            {content.educationDetails.map((education) => (
              <article key={education.institution}>
                <h3>{education.institution}</h3>
                <ul>{education.points.map((point) => <li key={point}>{point}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="resume-about-row">
          <div className="resume-about-section-label"><span>04</span><h2>Skills</h2></div>
          <div className="resume-about-skill-groups">
            <AboutSkillGroup title="Services" items={content.capabilities.services} />
            <AboutSkillGroup title="Technologies" items={content.capabilities.technologies} />
          </div>
        </section>

        <section className="resume-about-row resume-about-links">
          <div className="resume-about-section-label"><span>05</span><h2>Links</h2></div>
          <div>{content.profileLinks.map((link) => <Link key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined}>{link.label} ↗</Link>)}</div>
        </section>
      </main>
    </div>
  );
}

function AboutSkillGroup({ title, items }: { title: string; items: string[] }) {
  return <div><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}
