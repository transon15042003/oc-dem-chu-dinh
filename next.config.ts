import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ocdemchudinh.hgdigital.vn",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
