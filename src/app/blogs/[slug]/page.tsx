import { MorphingNav } from "@/components/navbar";
import {
  formatBlogDate,
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
      robots: {
        index: true,
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
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      creator: "@nattupi0",
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

  return (
    <>
      <MorphingNav /> <div className="min-h-[60svh] md:min-h-[50svh]" />
      <div className="min-h-svh bg-background px-4 text-foreground md:px-8">
        <article className="mx-auto w-full max-w-3xl">
          <nav className="mb-12 flex items-center justify-between gap-4 text-sm text-muted-foreground">
            <a
              href={post.mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              Read on Medium
            </a>
          </nav>

          <header className="border-b border-border pb-10">
            <h1 className="text-6xl leading-tight tracking-normal md:text-8xl font-italianno">
              {post.title}
            </h1>
            <time
              className="mt-6 block text-sm text-muted-foreground"
              dateTime={post.publishedAt}
            >
              {formatBlogDate(post.publishedAt)}
            </time>
          </header>

          <div
            className="blog-content mt-10"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </div>
    </>
  );
}
