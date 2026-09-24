import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="container-max flex flex-col items-center justify-center py-32 text-center">
        <p className="font-mono text-sm text-gray-400">404</p>
        <h1 className="mt-3 text-3xl font-semibold">Page not found</h1>
        <p className="mt-2 text-gray-600">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Button href="/" className="mt-8">
          Back home
        </Button>
      </main>
      <Footer />
    </>
  );
}
