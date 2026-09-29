import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { ServicePage } from "@/components/service-page";
import {
  SERVICE_PRICING,
  SERVICE_PRICING_SUMMARY,
  getServicePage,
  servicePages,
} from "@/content/service-pages";
import { PERSON_ID, SITE_URL, WEBSITE_ID } from "@/lib/site";

type ServiceRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ServiceRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) return {};

  const path = `/services/${service.slug}`;

  const pricedDescription = `${service.description} ${SERVICE_PRICING_SUMMARY}`;

  return {
    title: service.shortTitle,
    description: pricedDescription,
    keywords: [
      service.shortTitle,
      `${service.shortTitle} rates`,
      `${service.shortTitle} pricing`,
      "$30 per hour developer",
      "projects from $1000",
    ],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: `${service.shortTitle} | AP`,
      description: pricedDescription,
      url: path,
      images: [],
    },
    twitter: {
      card: "summary",
      title: `${service.shortTitle} | AP`,
      description: pricedDescription,
      images: [],
    },
  };
}

export default async function ServiceRoute({ params }: ServiceRouteProps) {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) notFound();

  const url = `${SITE_URL}/services/${service.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: service.title,
        description: service.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": `${url}#service` },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.shortTitle,
        description: service.description,
        url,
        provider: { "@id": PERSON_ID },
        areaServed: "Worldwide",
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${SITE_URL}/hire-ap`,
        },
        offers: [
          {
            "@type": "Offer",
            name: "Hourly engagement",
            price: SERVICE_PRICING.hourlyMinimum,
            priceCurrency: SERVICE_PRICING.currency,
            description: "Minimum hourly rate.",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: SERVICE_PRICING.hourlyMinimum,
              priceCurrency: SERVICE_PRICING.currency,
              unitCode: "HUR",
            },
          },
          {
            "@type": "Offer",
            name: "Project engagement",
            price: SERVICE_PRICING.projectMinimum,
            priceCurrency: SERVICE_PRICING.currency,
            description: "Fixed-scope projects start at this price.",
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
          { "@type": "ListItem", position: 3, name: service.shortTitle, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ServicePage
        service={service}
        relatedServices={servicePages.filter((item) => item.slug !== service.slug)}
      />
    </>
  );
}
