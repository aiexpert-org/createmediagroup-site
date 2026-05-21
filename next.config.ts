import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Keep old Journal links alive after the rename to Resources.
      { source: "/blog", destination: "/resources", permanent: true },
      { source: "/blog/:slug*", destination: "/resources/:slug*", permanent: true },
    ];
  },
};

export default nextConfig;
