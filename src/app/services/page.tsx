import { ArrowRight, MoveUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { MorphingNav } from "@/components/navbar";
import { ServicePricing } from "@/components/service-page";
import {
  SERVICE_PRICING,
  servicePages,
} from "@/content/service-pages";
import { SITE_URL, WEBSITE_ID } from "@/lib/site";

export const metadata: Metadata = {
  title: "Development & Automation Services",
  description:
    "Next.js development, web automation, and full-stack delivery from $30/hour or $1,000 per project.",
  keywords: [
    "Next.js developer rates",
    "web automation consultant pricing",
    "full-stack developer for startups",
    "$30 per hour developer",
    "freelance development projects from $1000",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Development & Automation Services | AP",
    description:
      "Next.js, automation, and full-stack services from $30/hour or $1,000 per project.",
    url: "/services",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Development & Automation Services | AP",
    description:
      "Next.js, automation, and full-stack services from $30/hour or $1,000 per project.",
    images: [],
  },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/services#webpage`,
    url: `${SITE_URL}/services`,
    name: "Development and automation services",
    description: metadata.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": "OfferCatalog",
      name: "AP development and automation services",
      itemListElement: servicePages.map((service) => ({
        "@type": "OfferCatalog",
        name: service.shortTitle,
        itemListElement: [
          {
            "@type": "Offer",
            name: `${service.shortTitle} hourly engagement`,
            price: SERVICE_PRICING.hourlyMinimum,
            priceCurrency: SERVICE_PRICING.currency,
            description: "Minimum hourly rate.",
          },
          {
            "@type": "Offer",
            name: `${service.shortTitle} project engagement`,
            price: SERVICE_PRICING.projectMinimum,
            priceCurrency: SERVICE_PRICING.currency,
            description: "Projects start at this price.",
          },
        ],
      })),
    },
  };

  return (
    <div className="services-index service-page">
      <JsonLd data={jsonLd} />
      <MorphingNav />
      <main>
        <section className="service-hero" data-first-section>
          <div className="service-hero-meta">
            <span>AP / Services</span>
            <span>Remote / India</span>
          </div>
          <p className="service-eyebrow">Development, automation, and product delivery</p>
          <h1>Focused technical help for work that needs to ship</h1>
          <div className="service-hero-summary">
            <p>
              Choose the service closest to the problem. Each engagement is shaped around
              the outcome, existing constraints, and the people who will own the work next.
            </p>
            <Link href="/hire-ap" className="service-primary-cta">
              Discuss your project <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>

        <ServicePricing />

        <section className="service-section service-index-list">
          <ServiceIndexHeading />
          <div>
            {servicePages.map((service, index) => (
              <article key={service.slug}>
                <span>0{index + 1}</span>
                <div>
                  <h2>{service.shortTitle}</h2>
                  <p>{service.description}</p>
                </div>
                <Link href={`/services/${service.slug}`} aria-label={`Explore ${service.shortTitle}`}>
                  <span>Explore service</span>
                  <MoveUpRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <div id="page-end-sentinel" aria-hidden="true" />
    </div>
  );
}

function ServiceIndexHeading() {
  return (
    <header className="service-section-heading">
      <span>01</span>
      <h2>Choose by need</h2>
      <span>AP®</span>
    </header>
  );
}
