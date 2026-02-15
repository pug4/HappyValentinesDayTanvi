import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images from the local public folder
    unoptimized: false,
  },
};

export default nextConfig;
