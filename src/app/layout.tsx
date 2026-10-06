import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/data/site";
import { GridLines } from "@/components/GridLines";
import { GridStreaks } from "@/components/GridStreaks";
import { NeonCursor } from "@/components/NeonCursor";
import { ProgressiveBlur } from "@/components/ProgressiveBlur";
import { Nav } from "@/components/Nav";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ThumbnailsProvider } from "@/components/ThumbnailsProvider";
import { findProjectThumbnails } from "@/lib/thumbnails";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.role}`,
  description: SITE.tagline,
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.tagline,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // Always dark: data-theme="dark" applies the dark ramp in globals.css (there is no theme switch).
  return (
    <html lang="en" data-theme="dark" className={`${spaceMono.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative min-h-full flex flex-col bg-white text-black">
        <ThumbnailsProvider thumbnails={findProjectThumbnails()}>
          {/* Pinned to the viewport, so outside the smoothed content. */}
          <Nav />
          <SmoothScroll>
            {/* Holds the space the nav used to take in the flow (56px). */}
            <div aria-hidden className="h-14" />
            {children}
            <GridLines />
          </SmoothScroll>
          <GridStreaks />
          <NeonCursor />
          <ProgressiveBlur />
        </ThumbnailsProvider>
      </body>
    </html>
  );
}
