import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["better-auth"],
  typescript: {
    ignoreBuildErrors: true, 
  },
};

export default nextConfig;