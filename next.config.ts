import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 is Next's default; 92 keeps the small text and thin lines in UI screenshots (project
    // thumbnails) crisp instead of soft; 100 is for Selected Visuals, which are resized to fit
    // the slide but not recompressed.
    qualities: [75, 92, 100],
  },
};

export default nextConfig;
