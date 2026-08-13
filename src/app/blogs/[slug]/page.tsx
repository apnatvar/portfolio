import { BlogDetailRenderer } from "@/portfolio/blogs/blog-detail-renderer";
import {
  getBlogPost,
  getBlogPosts,
  getBlogUrl,
} from "@/lib/blogs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type BlogPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog post",
      alternates: {
        canonical: getBlogUrl(slug),
      },
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const description =
    post.excerpt || `Read ${post.title}, an essay by AP, on apnatva.dev.`;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: post.mediumUrl,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: getBlogUrl(post.slug),
      publishedTime: post.publishedAt,
      authors: ["AP"],
      images: ["/4.webp"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      creator: "@nattupi0",
      images: ["/4.webp"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  return <BlogDetailRenderer post={post} />;
}
