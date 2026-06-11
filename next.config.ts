import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        port: "",
        pathname: "/s2/favicons/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // Optional: pathname: '/**', // Allow all paths
      },
    ],
  },
};

export default nextConfig;
