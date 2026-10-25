import { ArrowRight, Check, MoveUpRight } from "lucide-react";
import Link from "next/link";

import { MorphingNav } from "@/components/navbar";
import type { ServicePageContent } from "@/content/service-pages";

export function ServicePage({
  service,
  relatedServices,
}: {
  service: ServicePageContent;
  relatedServices: ServicePageContent[];
}) {
  return (
    <div className="service-page">
      <MorphingNav />

      <div className="page-sections">
        <section className="service-hero" data-first-section>
          <div className="service-hero-meta">
            <span>AP / Services</span>
            <span>Remote / India</span>
          </div>
          <p className="service-eyebrow">{service.eyebrow}</p>
          <h1>{service.title}</h1>
          <div className="service-hero-summary">
            <p>{service.promise}</p>
            <Link href="/hire-ap" className="service-primary-cta">
              Discuss your project <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="service-section service-fit" id="fit">
          <ServiceSectionHeading number="01" title="A good fit when" />
          <div className="service-fit-grid">
            <p>{service.description}</p>
            <ul>
              {service.idealFor.map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="service-section" id="outcomes">
          <ServiceSectionHeading number="02" title="What you get" />
          <div className="service-card-grid">
            {service.outcomes.map((outcome, index) => (
              <article key={outcome.title}>
                <span>0{index + 1}</span>
                <h2>{outcome.title}</h2>
                <p>{outcome.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="service-section" id="process">
          <ServiceSectionHeading number="03" title="How the work moves" />
          <ol className="service-process">
            {service.process.map((step, index) => (
              <li key={step.title}>
                <span>0{index + 1}</span>
                <h2>{step.title}</h2>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="service-section" id="capabilities">
          <ServiceSectionHeading number="04" title="Relevant capabilities" />
          <div className="service-capabilities">
            {service.capabilities.map((capability) => (
              <span key={capability}>{capability}</span>
            ))}
          </div>
        </section>

        <section className="service-section" id="questions">
          <ServiceSectionHeading number="05" title="Common questions" />
          <div className="service-faqs">
            {service.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="service-section service-related" id="related-services">
          <ServiceSectionHeading number="06" title="Related services" />
          <div>
            {relatedServices.map((related) => (
              <Link key={related.slug} href={`/services/${related.slug}`}>
                <span>{related.shortTitle}</span>
                <MoveUpRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <section className="service-section service-related" aria-label="More resources">
          <ServiceSectionHeading number="07" title="More resources" />
          <div>
            {service.resources?.map((resource) => (
              <Link key={resource.href} href={resource.href}>
                <span>{resource.title}</span>
                <MoveUpRight aria-hidden="true" />
              </Link>
            ))}
            <Link href="/work"><span>Selected work</span><MoveUpRight aria-hidden="true" /></Link>
            <Link href="/tools"><span>Tools</span><MoveUpRight aria-hidden="true" /></Link>
            <Link href="/writing"><span>Writing guides</span><MoveUpRight aria-hidden="true" /></Link>
            <Link href="/hire-ap"><span>Hire AP</span><MoveUpRight aria-hidden="true" /></Link>
          </div>
        </section>

        <section className="service-closing">
          <p>Have a defined brief, or just a stubborn problem?</p>
          <h2>Let&apos;s work out the right next move.</h2>
          <div>
            <Link href="/hire-ap" className="service-primary-cta">
              Start a conversation <ArrowRight aria-hidden="true" />
            </Link>
            <a href="mailto:rawat@apnatva.dev">rawat@apnatva.dev</a>
          </div>
        </section>
      </div>

      <div id="page-end-sentinel" aria-hidden="true" />
    </div>
  );
}

function ServiceSectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <header className="service-section-heading">
      <span>{number}</span>
      <h2>{title}</h2>
      <span>AP®</span>
    </header>
  );
}
