import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { ServicePage } from "@/components/service-page";
import {
  getServicePage,
  primaryServicePages,
  servicePages,
} from "@/content/service-pages";
import { DEFAULT_SOCIAL_IMAGE, PERSON_ID, SITE_URL, WEBSITE_ID } from "@/lib/site";

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

  return {
    title: service.shortTitle,
    description: service.description,
    keywords: [
      service.shortTitle,
      `${service.shortTitle} consulting`,
      `${service.shortTitle} implementation`,
    ],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: `${service.shortTitle} | AP`,
      description: service.description,
      url: path,
      images: [DEFAULT_SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.shortTitle} | AP`,
      description: service.description,
      images: [DEFAULT_SOCIAL_IMAGE],
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
        relatedServices={primaryServicePages.filter((item) => item.slug !== service.slug)}
      />
    </>
  );
}
