import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Material Depot product photographs are referenced from their own CDN (unoptimized, credited).
    remotePatterns: [{ protocol: "https", hostname: "image-transform.materialdepot.com" }],
  },
};

export default nextConfig;
