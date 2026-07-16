import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blog/interactive-pets-2-0-1",
        destination: "/blog/interactive-pets-2-1-0",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
