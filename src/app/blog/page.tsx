import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getAllPosts, formatDate } from "@/lib/blog";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = { title: "Blog" };

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />
      <main className="container-max py-16 md:py-24">
        <Reveal>
          <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-semibold">Blog</h1>
          <p className="mt-3 max-w-lg text-gray-600">
            Notes on design, collaboration, and building things that work.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col divide-y divide-gray-150">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-2 py-8 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold group-hover:underline underline-offset-4">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-gray-500">{post.excerpt}</p>
                </div>
                <div className="shrink-0 font-mono text-xs text-gray-400 sm:text-right">
                  <p>{formatDate(post.date)}</p>
                  <p className="mt-1">{post.readingTime}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
