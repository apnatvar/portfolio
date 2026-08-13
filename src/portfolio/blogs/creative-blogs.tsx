import { MorphingNav } from "@/components/navbar";
import { formatBlogDate, type BlogPost } from "@/lib/blogs";
import Link from "next/link";

export function CreativeBlogs({ posts }: { posts: BlogPost[] }) {
  return (
    <>
      <MorphingNav /> <div className="min-h-[60svh] md:min-h-[50svh]" />
      <div className="min-h-svh bg-background px-4 text-foreground md:px-8 pb-20">
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-10">
          <header className="max-w-3xl pt-16 md:pt-24">
            <h1 className="mt-8 text-5xl leading-none tracking-normal md:text-9xl font-italianno">Blogs</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Notes, essays, and field reports. Read them here, or follow the original posts on Medium.
            </p>
          </header>
          <CreativeBlogList posts={posts} />
        </section>
      </div>
    </>
  );
}

function CreativeBlogList({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) {
    return <p className="rounded-3xl border border-border bg-card px-6 py-8 text-muted-foreground">The blog feed could not be loaded right now. Please check back in a little while.</p>;
  }

  return (
    <div className="flex flex-col gap-3" aria-label="Blog posts">
      {posts.map((post) => (
        <article key={post.slug} className="flex flex-wrap gap-2 md:flex-nowrap">
          <div className="flex min-h-24 w-full flex-col justify-center rounded-full border border-border bg-card px-6 py-5 md:w-1/2 md:px-8">
            <h2 className="text-lg leading-snug md:text-xl">{post.title}</h2>
            <time className="mt-2 text-sm text-muted-foreground" dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
          </div>
          <Link href={`/blogs/${post.slug}`} prefetch={false} className="grid min-h-16 w-[calc(50%-0.25rem)] place-items-center rounded-full border border-border bg-background px-4 text-center text-sm transition-colors hover:bg-secondary md:min-h-24 md:w-1/4 md:text-base">Read here</Link>
          <a href={post.mediumUrl} target="_blank" rel="noopener noreferrer" className="grid min-h-16 w-[calc(50%-0.25rem)] place-items-center rounded-full border border-border bg-foreground px-4 text-center text-sm text-background transition-opacity hover:opacity-90 md:min-h-24 md:w-1/4 md:text-base">Read on Medium</a>
        </article>
      ))}
    </div>
  );
}
