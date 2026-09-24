"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RevealGroup, revealItem } from "@/components/motion/Reveal";
import { formatDate, type PostMeta } from "@/lib/blog-format";

export function BlogPreviewList({ posts }: { posts: PostMeta[] }) {
  return (
    <RevealGroup className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
      {posts.map((post) => (
        <motion.div key={post.slug} variants={revealItem}>
          <Link
            href={`/blog/${post.slug}`}
            className="group flex h-full flex-col rounded-[16px] border border-gray-150 p-6 transition-colors hover:border-black"
          >
            <p className="font-mono text-xs text-gray-400">
              {formatDate(post.date)} · By {post.author}
            </p>
            <h3 className="mt-3 text-lg font-semibold leading-snug">{post.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-gray-500">{post.excerpt}</p>
            <span className="mt-4 text-sm font-medium underline-offset-4 group-hover:underline">
              Read more &rarr;
            </span>
          </Link>
        </motion.div>
      ))}
    </RevealGroup>
  );
}
