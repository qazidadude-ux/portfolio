import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="container-max py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-semibold">Terms of Service</h1>
          <p className="mt-6 text-gray-600">
            Placeholder terms of service. Replace this page with your own terms before launch —
            edit{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm">
              src/app/legal/terms/page.tsx
            </code>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
