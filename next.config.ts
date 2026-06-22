import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "greenlandarcticxplorers.com" }],
        destination: "https://www.greenlandarcticxplorers.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "bokun.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "imgcdn.bokun.tools",
      },
    ],
  },
};

export default nextConfig;
