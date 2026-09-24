import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/data/site";
import { GridLines } from "@/components/GridLines";
import { ProgressiveBlur } from "@/components/ProgressiveBlur";

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
  return (
    <html lang="en" className={`${spaceMono.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative min-h-full flex flex-col bg-white text-black">
        {children}
        <GridLines />
        <ProgressiveBlur />
      </body>
    </html>
  );
}
