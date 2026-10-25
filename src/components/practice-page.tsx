import Link from "next/link";

import { MorphingNav } from "@/components/navbar";
import { JsonLd } from "@/components/json-ld";
import { PERSON_ID, SITE_URL } from "@/lib/site";
import { breadcrumbs } from "@/lib/metadata";
import type { PracticePageContent } from "@/content/practice";

export function PracticePage({ practice }: { practice: PracticePageContent }) {
  const isSeo = practice.path === "/seo";

  return (
    <div className={`practice-page practice-page--${isSeo ? "seo" : "front-end"}`}>
      <JsonLd data={[
        breadcrumbs([{ name: "Home", path: "/" }, { name: isSeo ? "Technical SEO" : "Front-end development", path: practice.path }]),
        { "@context": "https://schema.org", "@type": "Service", "@id": `${SITE_URL}${practice.path}#service`, name: isSeo ? "Technical SEO for Next.js websites" : "Next.js front-end design and development", serviceType: isSeo ? "Technical SEO" : "Front-end development", description: practice.subtitle, url: `${SITE_URL}${practice.path}`, provider: { "@id": PERSON_ID }, areaServed: "Worldwide" },
      ]} />
      <MorphingNav />

      <div id="practice-main" className="practice-sheet">
        <header className="practice-hero" data-first-section>
          <div className="practice-running-head">
            <span>AP / Working practice</span>
            <span>Field notes · {practice.number}</span>
          </div>

          <div className="practice-hero-grid">
            <div className="practice-title-block">
              <p className="practice-kicker">{practice.eyebrow}</p>
              <h1 className="practice-title">{practice.title}</h1>
              <p className="practice-subtitle">{practice.subtitle}</p>
            </div>
            <aside className="practice-margin-note" aria-label="Working note">
              <span className="practice-margin-note-index">Note {practice.number}</span>
              <p>{practice.introduction}</p>
              <span className="practice-signature">A note from AP</span>
            </aside>
          </div>

          <PracticeDiagram steps={practice.sequence} />
          <a className="practice-down-link" href="#practice-notes">
            <span>Read the working notes</span><span aria-hidden="true">↓</span>
          </a>
          <svg className="practice-orbit" viewBox="0 0 240 240" fill="none" aria-hidden="true">
            <g className="practice-orbit-glyph">
              <circle cx="120" cy="120" r="84" stroke="currentColor" strokeWidth="0.8" />
              <ellipse cx="120" cy="120" rx="104" ry="39" stroke="currentColor" strokeWidth="0.8" transform="rotate(-34 120 120)" />
              <ellipse cx="120" cy="120" rx="102" ry="30" stroke="currentColor" strokeWidth="0.7" transform="rotate(58 120 120)" />
              <circle cx="218" cy="82" r="3.5" fill="currentColor" />
              <path d="M120 20v18M120 202v18M20 120h18M202 120h18M49 49l13 13m116 116 13 13m0-142-13 13M62 178l-13 13" stroke="currentColor" strokeWidth="0.8" />
            </g>
            <circle cx="120" cy="120" r="8" stroke="currentColor" strokeWidth="0.8" />
            <path d="M120 102v36M102 120h36" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </header>

        <section id="practice-notes" className="practice-notes" aria-label={`${practice.eyebrow} notes`}>
          {practice.chapters.map((chapter) => (
            <article className="practice-chapter" key={chapter.number}>
              <aside className="practice-chapter-margin">
                <span className="practice-chapter-number">{chapter.number}</span>
                <p>{chapter.margin}</p>
              </aside>
              <div className="practice-chapter-copy">
                <h2>{chapter.title}</h2>
                {chapter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {chapter.points ? (
                  <ul className="practice-point-list">
                    {chapter.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                ) : null}
              </div>
            </article>
          ))}
        </section>

        <section className="practice-method" aria-labelledby="practice-method-title">
          <div className="practice-section-heading">
            <p className="practice-kicker">A way of working</p>
            <h2 id="practice-method-title">Small enough to review. Complete enough to use.</h2>
          </div>
          <ol className="practice-method-list">
            {practice.sequence.map((step, index) => (
              <li key={step.label}>
                <span className="practice-method-number">0{index + 1}</span>
                <h3>{step.label}</h3>
                <p>{step.note}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="practice-deliverables" aria-labelledby="practice-deliverables-title">
          <div className="practice-deliverables-heading">
            <p className="practice-kicker">Depending on the agreed scope</p>
            <h2 id="practice-deliverables-title">What can leave the desk</h2>
            <p>Each engagement has a written boundary: the routes or features in scope, the access needed, what will be delivered, and what should happen next.</p>
          </div>
          <ul>
            {practice.deliverables.map((deliverable, index) => (
              <li key={deliverable}><span>0{index + 1}</span><p>{deliverable}</p></li>
            ))}
          </ul>
        </section>

        <section className="practice-projects" aria-labelledby="practice-projects-title">
          <div className="practice-projects-heading">
            <p className="practice-kicker">Selected implementations</p>
            <h2 id="practice-projects-title">A few things made for the web.</h2>
            <p>Client websites and independent products, with notes on the structure, interface, and implementation behind each one.</p>
          </div>
          <div className="practice-project-grid">
            {practice.projectNotes.map((project, index) => (
              <article className={`practice-project practice-project--${index + 1}`} key={project.title}>
                <span className="practice-project-number">Project / 0{index + 1}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href={project.href} target="_blank" rel="noreferrer">{project.linkLabel}<span aria-hidden="true"> ↗</span></a>
              </article>
            ))}
          </div>
          <Link className="practice-work-link" href="/#work">See more work and projects <span aria-hidden="true">↗</span></Link>
        </section>

        <section className="practice-resources" aria-labelledby="practice-resources-title">
          <div className="practice-resources-intro">
            <p className="practice-kicker">For the curious</p>
            <h2 id="practice-resources-title">A few useful pages to keep nearby.</h2>
          </div>
          <ul>
            <li><span>↗</span><div><Link href={isSeo ? "/services/technical-seo" : "/services/nextjs-developer"}>{isSeo ? "Next.js SEO audit & implementation" : "Hire a Next.js developer"} <span aria-hidden="true">↗</span></Link><p>Project fit, scope, and concrete deliverables.</p></div></li>
            {practice.resources.map((resource, index) => (
              <li key={resource.href}>
                <span>0{index + 1}</span>
                <div><Link href={resource.href}>{resource.label} <span aria-hidden="true">↗</span></Link><p>{resource.note}</p></div>
              </li>
            ))}
          </ul>
        </section>

        <aside className="practice-crosslink">
          <span className="practice-crosslink-mark" aria-hidden="true">↗</span>
          <div><p className="practice-kicker">Also in the notebook</p><h2>{practice.crossLink.title}</h2><p>{practice.crossLink.description}</p></div>
          <Link href={practice.crossLink.href}>{practice.crossLink.label}<span aria-hidden="true"> ↗</span></Link>
        </aside>

        <footer className="practice-cta" id="contact">
          <p className="practice-kicker">A useful first conversation</p>
          <h2>Bring the page, the question, or the knot in the thread.</h2>
          <p>{practice.closing}</p>
          <Link href="/hire-ap">Tell me what you’re working on <span aria-hidden="true">↗</span></Link>
        </footer>
      </div>
    </div>
  );
}

function PracticeDiagram({ steps }: { steps: PracticePageContent["sequence"] }) {
  return (
    <div className="practice-diagram" aria-label="A five-part working sequence">
      <svg aria-hidden="true" viewBox="0 0 1000 94" preserveAspectRatio="none">
        <path d="M40 48 C155 8 175 88 285 48 S420 8 500 48 S645 88 715 48 S855 8 960 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 7" />
        {[40, 285, 500, 715, 960].map((x) => <circle key={x} cx={x} cy="48" r="5" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" />)}
      </svg>
      <ol>
        {steps.map((step, index) => <li key={step.label}><span>0{index + 1}</span><strong>{step.label}</strong></li>)}
      </ol>
    </div>
  );
}
