"use client";

import { useDisplayMode } from "@/components/display-mode/display-mode-provider";
import { MorphingNav } from "@/components/navbar";
import { ThemedMenu } from "@/components/themed-menu";
import { formatBlogDate, type BlogPost } from "@/lib/blogs";
import Link from "next/link";

export function BlogDetailRenderer({ post }: { post: BlogPost }) {
  const { mode } = useDisplayMode();

  if (mode === "creative") {
    return (
      <>
        <MorphingNav /> <div className="min-h-[60svh] md:min-h-[50svh]" />
        <div className="min-h-svh bg-background px-4 text-foreground md:px-8">
          <article className="mx-auto w-full max-w-3xl">
            <nav className="mb-12 flex items-center justify-between gap-4 text-sm text-muted-foreground">
              <a href={post.mediumUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">Read on Medium</a>
            </nav>
            <header className="border-b border-border pb-10">
              <h1 className="text-6xl leading-tight tracking-normal md:text-8xl font-italianno">{post.title}</h1>
              <time className="mt-6 block text-sm text-muted-foreground" dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
            </header>
            <div className="blog-content mt-10" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          </article>
        </div>
      </>
    );
  }

  return (
    <div className={mode === "resume" ? "resume-blog-detail" : "swiss-blog-detail"}>
      <ThemedMenu />
      <article>
        <nav><Link href="/blogs">Blogs</Link><a href={post.mediumUrl} target="_blank" rel="noopener noreferrer">Read on Medium</a></nav>
        <header>
          <span>{mode === "swiss" ? "ESSAY—AP" : "Essay / AP"}</span>
          <h1>{post.title}</h1>
          <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
        </header>
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </div>
  );
}
