import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { ProjectDockProvider } from "@/components/motion/ProjectDock";
import { Intro } from "@/components/Intro";
import { SelectedVisuals } from "@/components/SelectedVisuals";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { ClientLogos } from "@/components/ClientLogos";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative">
        <ProjectDockProvider>
          <Hero />
          <SocialProof />
          <ProjectsGrid />
        </ProjectDockProvider>
        <Intro />
        <SelectedVisuals />
        <Services />
        <About />
        <ClientLogos />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
