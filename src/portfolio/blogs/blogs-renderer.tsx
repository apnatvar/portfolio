"use client";

import { useDisplayMode } from "@/components/display-mode/display-mode-provider";
import { ThemedMenu } from "@/components/themed-menu";
import { formatBlogDate, type BlogPost } from "@/lib/blogs";
import Link from "next/link";
import { CreativeBlogs } from "./creative-blogs";

export function BlogsRenderer({ posts }: { posts: BlogPost[] }) {
  const { mode } = useDisplayMode();

  if (mode === "creative") return <CreativeBlogs posts={posts} />;

  return (
    <div className={mode === "resume" ? "resume-blogs" : "swiss-blogs"}>
      <ThemedMenu />
      <header>
        <div><span>{mode === "swiss" ? "INDEX—WRITING" : "Writing / Index"}</span><span>AP®</span></div>
        <h1>Blogs</h1>
        <p>Notes, essays, and field reports. Read them here, or follow the original posts on Medium.</p>
      </header>
      <main aria-label="Blog posts">
        {posts.length ? posts.map((post, index) => (
          <article key={post.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><h2>{post.title}</h2><time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time></div>
            <div className="blogs-mode-links">
              <Link href={`/blogs/${post.slug}`}>Read here</Link>
              <a href={post.mediumUrl} target="_blank" rel="noopener noreferrer">Read on Medium</a>
            </div>
          </article>
        )) : <p className="blogs-empty">The blog feed could not be loaded right now. Please check back in a little while.</p>}
      </main>
    </div>
  );
}
