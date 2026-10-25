import { ArrowRight, MoveUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { MorphingNav } from "@/components/navbar";
import { primaryServicePages } from "@/content/service-pages";
import { DEFAULT_SOCIAL_IMAGE, SITE_URL, WEBSITE_ID } from "@/lib/site";

export const metadata: Metadata = {
  title: "SEO & Web Performance Services",
  description:
    "Technical SEO, programmatic SEO, SEO automation, and Core Web Vitals consulting and implementation.",
  keywords: [
    "technical SEO consultant",
    "programmatic SEO implementation",
    "SEO automation",
    "Core Web Vitals optimization",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "SEO & Web Performance Services | AP",
    description: "Technical SEO, programmatic SEO, SEO automation, and Core Web Vitals work.",
    url: "/services",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO & Web Performance Services | AP",
    description: "Technical SEO, programmatic SEO, SEO automation, and Core Web Vitals work.",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/services#webpage`,
    url: `${SITE_URL}/services`,
    name: "SEO and web performance services",
    description: metadata.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": "OfferCatalog",
      name: "AP SEO and web performance services",
      itemListElement: primaryServicePages.map((service) => ({
        "@type": "Service",
        name: service.shortTitle,
        description: service.description,
        url: `${SITE_URL}/services/${service.slug}`,
        provider: { "@type": "Person", "@id": `${SITE_URL}/#person` },
        areaServed: "Worldwide",
      })),
    },
  };

  return (
    <div className="services-index service-page">
      <JsonLd data={jsonLd} />
      <MorphingNav />
      <div className="page-sections">
        <section className="service-hero" data-first-section>
          <div className="service-hero-meta">
            <span>AP / Services</span>
            <span>Remote / India</span>
          </div>
          <p className="service-eyebrow">Search visibility and web performance</p>
          <h1>Specialist SEO and performance work, grounded in implementation</h1>
          <div className="service-hero-summary">
            <p>
              Technical audits, scalable page systems, workflow automation, and speed improvements. Each engagement starts with evidence, a defined scope, and a practical handover.
            </p>
            <Link href="/hire-ap" className="service-primary-cta">
              Discuss your project <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="service-section service-index-list">
          <ServiceIndexHeading />
          <div>
            {primaryServicePages.map((service, index) => (
              <article key={service.slug}>
                <span>0{index + 1}</span>
                <div>
                  <h2>{service.shortTitle}</h2>
                  <p>{service.description}</p>
                </div>
                <Link href={`/services/${service.slug}`} aria-label={`Explore service: ${service.shortTitle}`}>
                  <span>Explore service</span>
                  <MoveUpRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
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
