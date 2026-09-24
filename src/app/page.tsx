import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { ProjectDockProvider } from "@/components/motion/ProjectDock";
import { FeaturedQuote } from "@/components/FeaturedQuote";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { ClientLogos } from "@/components/ClientLogos";
import { Testimonials } from "@/components/Testimonials";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative">
        <ProjectDockProvider>
          <Hero />
          <ProjectsGrid />
        </ProjectDockProvider>
        <FeaturedQuote />
        <Services />
        <About />
        <ClientLogos />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
