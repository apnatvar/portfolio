import { BlogsRenderer } from "@/portfolio/blogs/blogs-renderer";
import { getBlogPosts } from "@/lib/blogs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Essays and notes by AP, mirrored from Medium for a clean on-site reading experience.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Blogs | AP",
    description:
      "Essays and notes by AP, mirrored from Medium for a clean on-site reading experience.",
    url: "/blogs",
    type: "website",
    images: ["/4.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | AP",
    description:
      "Essays and notes by AP, mirrored from Medium for a clean on-site reading experience.",
    images: ["/4.webp"],
  },
};

export const revalidate = 3600;

export default async function BlogsPage() {
  const posts = await getBlogPosts();

  return <BlogsRenderer posts={posts} />;
}
