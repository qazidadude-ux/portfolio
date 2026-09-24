import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { FeaturedQuote } from "@/components/FeaturedQuote";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Pricing } from "@/components/Pricing";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { FAQ } from "@/components/FAQ";
import { BlogPreview } from "@/components/BlogPreview";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProjectsGrid />
        <FeaturedQuote />
        <Services />
        <About />
        <Pricing />
        <TestimonialsCarousel />
        <FAQ />
        <BlogPreview />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
