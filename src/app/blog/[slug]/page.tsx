import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { getAllPosts, getPost, formatDate } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main className="container-max py-16 md:py-24">
        <Reveal className="mx-auto max-w-2xl">
          <Link href="/blog" className="text-sm text-gray-500 hover:text-black">
            &larr; Blog
          </Link>
          <p className="mt-6 font-mono text-xs text-gray-400">
            {formatDate(post.date)} · By {post.author} · {post.readingTime}
          </p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3rem)] font-semibold leading-tight">
            {post.title}
          </h1>

          <article className="prose prose-neutral mt-10 max-w-none prose-headings:font-semibold prose-a:text-black">
            <MDXRemote source={post.content} />
          </article>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
