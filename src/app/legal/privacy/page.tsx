import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="container-max py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-semibold">Privacy Policy</h1>
          <p className="mt-6 text-gray-600">
            Placeholder privacy policy. Replace this page with your own policy before launch —
            edit{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm">
              src/app/legal/privacy/page.tsx
            </code>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
