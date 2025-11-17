import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Explicitly set Turbopack root to this app folder
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
