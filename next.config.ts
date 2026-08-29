import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ocdemchudinh.hgdigital.vn",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "ianpabkxuzjnksrgsvtr.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
