// Pure, client-safe helpers and types split out of lib/blog.ts so client
// components (e.g. BlogPreviewList) never pull in the Node `fs`/`path`
// filesystem code that the fs-based helpers depend on.

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  readingTime: string;
};

export type Post = PostMeta & { content: string };

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
