import { getAllPosts } from "@/lib/blog";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BlogPreviewList } from "@/components/BlogPreviewList";

export function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="container-max py-20 md:py-28">
      <Reveal className="flex items-end justify-between gap-4">
        <div>
          <Eyebrow>From my blog</Eyebrow>
          <SectionHeading className="mt-4">Design insights.</SectionHeading>
        </div>
        <Button href="/blog" variant="secondary" className="hidden sm:inline-flex">
          View All
        </Button>
      </Reveal>

      <BlogPreviewList posts={posts} />

      <div className="mt-8 flex justify-center sm:hidden">
        <Button href="/blog" variant="secondary">
          View All
        </Button>
      </div>
    </section>
  );
}
